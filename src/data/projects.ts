export interface Project {
	name: string;
	description: string;
	repository: string;
	site?: string;
	role?: 'creator' | 'core_maintainer' | 'co_maintainer';
	deprecated?: boolean;

	// Featured projects are the ones currently worked on.
	featured?: boolean;
}

export const projects: Project[] = [
	{
		name: 'Tempest',
		description:
			'Innovative, modern and elegant PHP framework. With zero configuration and zero boilerplate, it provides the architectural freedom to focus entirely on business logic.',
		repository: 'https://github.com/tempestphp/tempest-framework',
		site: 'https://tempestphp.com',
		role: 'core_maintainer',
		featured: true,
	},
	{
		name: 'Hybridly',
		description:
			'Solution to develop server-driven, client-rendered applications on top of Laravel and Vue. An alternative to Inertia, written with TypeScript and developer experience in mind.',
		repository: 'https://github.com/hybridly/hybridly',
		site: 'https://hybridly.dev',
		role: 'creator',
		featured: true,
	},
	{
		name: 'Preset',
		description: 'Elegant, ecosystem-agnostic preset mechanism. Define changes and apply them in your new projects in just one command.',
		repository: 'https://github.com/preset/preset',
		site: 'https://preset.dev',
		role: 'creator',
		featured: true,
	},
	{
		name: 'Discovery for Laravel',
		description: 'Code discovery in your Laravel codebase without relying on path conventions.',
		repository: 'https://github.com/innocenzi/discovery-for-laravel',
	},
	{
		name: 'Vite for Laravel',
		description: 'Vite integration for Laravel. It was the de-facto solution before Laravel released their official integration.',
		repository: 'https://github.com/innocenzi/laravel-vite',
		site: 'https://laravel-vite.innocenzi.dev/',
		deprecated: true,
	},
	{
		name: 'Awesome Tailwind CSS',
		description: 'A curated list of awesome Tailwind CSS resources.',
		repository: 'https://github.com/aniftyco/awesome-tailwindcss',
		role: 'co_maintainer',
	},
	{
		name: 'Encore for Laravel',
		description: 'Webpack Encore integration for Laravel.',
		repository: 'https://github.com/innocenzi/laravel-encore',
		deprecated: true,
	},
	{
		name: 'Rename',
		description: 'Command-line interface to batch-rename files from your preferred editor.',
		repository: 'https://github.com/innocenzi/rename',
	},
	{
		name: 'vite-plugin-run',
		description: 'Run commands when Vite starts, builds, or when a file changes.',
		repository: 'https://github.com/innocenzi/vite-plugin-run',
	},
	{
		name: 'vite-plugin-mjml',
		description: 'Compiles MJML templates during development and when Vite builds.',
		repository: 'https://github.com/innocenzi/vite-plugin-mjml',
	},
	{
		name: 'Forge recipe for Deployer',
		description: 'Recipe that helps implement zero-downtime deployments on Laravel Forge.',
		repository: 'https://github.com/innocenzi/deployer-recipe-forge',
		deprecated: true,
	},
	{
		name: 'Tailwind CSS theming',
		description: 'CSS-variables-based swappable themes for Tailwind CSS.',
		repository: 'https://github.com/innocenzi/tailwindcss-theming',
		deprecated: true,
	},
	{
		name: 'Awesome Inertia',
		description: 'A curated list of awesome Inertia.js resources.',
		repository: 'https://github.com/innocenzi/awesome-inertiajs',
	},
	{
		name: 'Avatar',
		description: 'Simple online tool for cropping images from a URL, your clipboard, or your disk.',
		repository: 'https://github.com/innocenzi/avatar',
		site: 'https://avatar.innocenzi.dev',
	},
	{
		name: 'Tailwind CSS scroll-snap',
		description: 'Adds scroll-snap utilities to Tailwind CSS. This plugin has been incorporated in Tailwind’s core.',
		repository: 'https://github.com/innocenzi/tailwindcss-scroll-snap',
		deprecated: true,
	},
	{
		name: 'Vertical slices preset for Laravel',
		description: 'Preset that configures a vertical slice architecture on a fresh Laravel project.',
		repository: 'https://github.com/laravel-presets/slices',
	},
];
