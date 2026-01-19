---
title: Type-safe enum metadata with Hybridly and Laravel
description: When I work on the front-end of a Laravel and Hybridly application, I always aim for as much type safety as possible. Here's how to add type-safe metadata to enums.
date: 2026-01-19
---

When a Hybridly application is scaffolded, [`spatie/typescript-transformer`](https://github.com/spatie/typescript-transformer) is included. This package is what powers the automatic TypeScript type generation from PHP data objects and enums.

By default, it converts enums to a simple union of their values:

:::code-group

```ts [types.d.ts]
export type Permission =
	| 'notices-to-airmen:view'
	| 'notices-to-airmen:acknowledge'
	| 'notices-to-airmen:override'
```

```php [Permission.php]
enum Permission: string
{
    case VIEW_NOTICES_TO_AIRMEN = 'notices-to-airmen:view';
    case ACKNOWLEDGE_NOTICES_TO_AIRMEN = 'notices-to-airmen:acknowledge';
    case OVERRIDE_NOTICES_TO_AIRMEN = 'notices-to-airmen:override';
}
```

:::

However, I often need metadata with my enums. Things like labels, descriptions, colors, icons... stuff that makes the enum useful in a UI context.

## Implementing metadata transformation

Well, it's actually pretty straightforward to implement this with a custom transformer, which the transformer package has support for:

```php [src/Infrastructure/HybridableEnumTransformer.php]
use Hybridly\Support\Hybridable;
use ReflectionEnumBackedCase;
use Spatie\TypeScriptTransformer\Transformers\EnumTransformer;

final class HybridableEnumTransformer extends EnumTransformer
{
    protected function toEnumValue(ReflectionEnumBackedCase $case): string
    {
        $enum = $case->getValue();
        
        if ($enum instanceof Hybridable) {
            return json_encode($enum->toHybridArray());
        }
        
        return parent::toEnumValue($case);
    }
}
```

This transformer checks if the enum being transformed to a TypeScript type implements [`Hybridable`](https://github.com/hybridly/hybridly/blob/0.x/packages/laravel/src/Support/Hybridable.php). If it does, it JSON-encodes the array returned by `toHybridArray()`, which would actually result in a valid TypeScript interface.

Because we're not using [Tempest](https://tempestphp.com/3.x/essentials/discovery), this transformer class has to be manually registered in the package's config:

```php [config/typescript-transformer.php]
// ...

'transformers' => [
    \Infrastructure\Hybridable\HybridableEnumTransformer::class,

    // ...
],

// ...
```

With that in place, to add metadata to an enum, simply implement the `Hybridable` interface and define the `toHybridArray()` method:

```php [src/Security/Authorization/Permission.php]
use Hybridly\Support\Hybridable;

enum Permission: string
{
    case VIEW_NOTICES_TO_AIRMEN = 'notices-to-airmen:view';
    case ACKNOWLEDGE_NOTICES_TO_AIRMEN = 'notices-to-airmen:acknowledge';
    case OVERRIDE_NOTICES_TO_AIRMEN = 'notices-to-airmen:override';

    public function toHybridArray(): array
    {
        return match ($this) {
            self::VIEW_NOTICES_TO_AIRMEN => [
                'value' => $this->value,
                'label' => 'Allows accessing the NOTAM acknowledgement tool.',
            ],
            self::ACKNOWLEDGE_NOTICES_TO_AIRMEN => [
                'value' => $this->value,
                'label' => 'Allows acknowledging a notice.',
            ],
            self::OVERRIDE_NOTICES_TO_AIRMEN => [
                'value' => $this->value,
                'label' => 'Allows overriding a notice.',
            ],
        };
    }
}
```

This is it! When passing this enum to the front-end, it will now have type-safe metadata.

## Abstracting metadata into attributes

In a project where you use a lot of enums, implementing `toHybridArray()` on each enum can get repetitive.

To solve this, I created a couple of attributes and traits that use `Reflection` to find them and build the array.

You may find the implementation [here](https://gist.github.com/innocenzi/e2cd788e204c6c780f143dbfccf1ab65). The experience looks like this:

```php [src/Security/Authorization/Permission.php]
enum Permission: string implements Hybridable
{
    use HasMetadata;
    use IsHybridableEnum;

    #[Label('View motices to airmen')]
    #[Description('Allows accessing the NOTAM acknowledgement tool.')]
    case VIEW_NOTICES_TO_AIRMEN = 'notices-to-airmen:view';
}
```
