---
title: Managing files using Laravel's scoped driver
ogTitle: ['Managing files', 'using the scoped driver']
description: Back in september 2022, a new "scoped" filesystem driver has been introduced to Laravel. This article shows how to use it to improve file management and refactoring.
created_at: 2023-04-13
---

Back in september 2022, [Frank de Jonge](https://twitter.com/frankdejonge) introduced a new [scoped](https://github.com/laravel/framework/pull/44105) filesystem driver to Laravel.

This driver works by extending an existing disk and configuring a `prefix`, which would be a path to a directory in the extended disk.

```php
's3' => [
    'driver' => 's3',
    'key' => env('AWS_ACCESS_KEY_ID'),
    'secret' => env('AWS_SECRET_ACCESS_KEY'),
    'region' => env('AWS_DEFAULT_REGION'),
    'bucket' => env('AWS_BUCKET'),
    // ...
    'throw' => false,
],
's3_videos' =>
    'driver' => 'scoped', // This is the new scoped driver!
    'disk' => 's3',       // It uses the `s3` disk above
    'prefix' => 'path/for/videos',
],
```

## The issue with using a single disk

Usually, you would use the `Storage` facade and either specify a disk (eg. `s3`, `local`) or let Laravel use the globally-configured one:

```php
// Using FILESYSTEM_DISK=local
Storage::put('example.txt', 'Contents');

// Specifying the disk
Storage::disk('local')->put('example.txt', 'Contents');
```

This pattern can be really cumbersome and error-prone the larger your application becomes and the more different paths you have, because each time you need to reference a file, you have to specify its full path from the root of the disk.

For instance, say you have user avatars, contracts and passports. In this situation, you will have to either repeat the paths or use some sort of single source of truth for them:

```php
Storage::disk('s3')->put("avatars/$avatar_path", $content);
// or
Storage::disk('s3')->put(
    path: config('filesystems.avatars_path') . "/$avatar_path",
    contents: $content
);
```

If you use them in different places, like actions, models and tests, you will need to ensure there's no typo in each reference of the paths. You may have to go back to a place where you used a specific path to ensure you're using the correct syntax, and refactoring paths overall will be harder.

## How the `scoped` driver can help

The idea is to create as many scoped disks as you have paths, and always specify the disk when working with `Storage`:

```php
// config/filesystems.php
use App\Support\Disk;

return [
    'default' => env('DEFAULT_FILESYSTEM_DISK', 'local'),
    'disks' => [
        'local' => [ /* ... */ ],
        's3' => [ /* ... */ ],

        Disk::UserAvatars => [
            'driver' => 'scoped',
            'disk' => env('FILESYSTEM_DISK', 's3'),
            'prefix' => 'users/avatars',
        ],
        Disk::UserContracts => [
            'driver' => 'scoped',
            'disk' => env('FILESYSTEM_DISK', 's3'),
            'prefix' => 'users/contracts',
        ],
        Disk::UserPassports => [
            'driver' => 'scoped',
            'disk' => env('FILESYSTEM_DISK', 's3'),
            'prefix' => 'users/passports',
        ],
    ]
];
```

There are three things to notice:

- We renamed the environment variable used by `default` from `FILESYSTEM_DISK` to `DEFAULT_FILESYSTEM_DISK`

The reason for that is that most of the time, we no longer use the default disk, so configuring it is not necessary. An exception to this is when you are using Livewire's temporary upload feature, which will use the default disk unless you configure it.

- We use `FILESYSTEM_DISK` as the underlying disk in our scoped disks

Since `default` no longer use it, we can use the `FILESYSTEM_DISK` environment variable to configure the base disk for all our scoped disks. For instance, you can set it to `local` in development and `s3` in production and the disks will use it.

- We use a `Disk` class to reference the disks' names

This object is a simple class that contains constants for referencing the disks' names. It acts as the source of truth and helps with refactoring, as an IDE may rename the symbols used everywhere in an application.

```php
namespace App\Support;

final class Disk
{
    public const UserAvatars = 'user:avatars';
    public const UserContracts = 'user:contracts';
    public const UserPassports = 'user:passports';
}
```

Using this setup, you may now perform any usual filesystem operation with the following syntax:

```php
// Writing a file
Storage::disk(Disk::UserAvatars)->put($avatar_name, $avatar);
Storage::disk(Disk::UserAvatars)->putFile($uploaded_file);

// Getting an URL
Storage::disk(Disk::UserAvatars)->url($avatar_name);

// Getting a temporary URL
Storage::disk(Disk::UserAvatars)->temporaryUrl(
    path: $avatar_name,
    expiration: now()->addHour()
);

// Using Filament to manage files
FileUpload::make('avatar_path')
    ->disk(Disk::UserAvatars)
    ->image();
```

How elegant is that?

## Bonus: dealing with temporary URLs and the local disk

If your application relies on S3 and deals with temporary URLs, you may have stumbled upon this error:

```
This driver does not support creating temporary URLs.
```

This happens if you're using the `local` disk locally, or more frequently in tests. While it's usually a good practice to use the same tools in tests and in production, it may not be prefereable to use S3 when running thousands of tests.

We may fix the problem using `Storage::buildTemporaryUrlsUsing`. Unfortunately, our approach to disks requires us to call this method for each disk we created:

```php
Storage::disk(Disk::UserAvatars)->buildTemporaryUrlsUsing(fn (string $path) => Storage::disk(Disk::UserAvatars)->url($path));
Storage::disk(Disk::UserContracts)->buildTemporaryUrlsUsing(fn (string $path) => Storage::disk(Disk::UserContracts)->url($path));
Storage::disk(Disk::UserPassports)->buildTemporaryUrlsUsing(fn (string $path) => Storage::disk(Disk::UserPassports)->url($path));
```

This is neither elegant nor practical, even if we're using a loop. The way I fixed this issue is by creating a `disks` and a `patchTemporaryUrls` method in my `Disk` class:

```php
final class Disk
{
    public const UserAvatars = 'user:avatars';
    public const UserContracts = 'user:contracts';
    public const UserPassports = 'user:passports';

    public static function disks(): array
    {
        return (new \ReflectionClass(static::class))
            ->getConstants(\ReflectionClassConstant::IS_PUBLIC);
    }

    public static function patchTemporaryUrls(): void
    {
        foreach (static::disks() as $disk) {
            if (config("filesystems.disks.$disk.disk") !== 's3') {
                Storage::disk($disk)->buildTemporaryUrlsUsing(fn (string $path) => Storage::disk($disk)->url($path));
            }
        }
    }
}
```

The `disks` method uses `Reflection` to get our disk names, while `patchTemporaryUrls` loops over them to call `buildTemporaryUrlsUsing` on all non-S3 disks.

This way, you only need to call `Disk::patchTemporaryUrls()` in a service provider, and you've fixed both your `local` and `testing` environments.
