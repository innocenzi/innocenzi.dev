const { Theme, ThemeManager } = require('tailwindcss-theming/api');

const main = new Theme() //
	.setName('light')
	.targetable()
	.addColors({
		background: '#ffffff',
		'on-background': '#061030',
		brand: '#4854bc',
		'on-brand': '#ffffff',
		navigation: '#1a202c',
		'on-navigation': '#ffffff',
		highlight: '#f9dbff',
		icon: '#e4f7ff',
		'on-icon': '#4854bc',
		technology: '#5e6890',
		callout: '#4854bc',
		'on-callout': '#ffffff',
		metadata: '#6f7895',
	})
	.addColorVariant('reverse', '#4854bc', 'icon')
	.addColorVariant('reverse', '#e4f7ff', 'on-icon')
	.addColorVariant('1', '#f9dbff', 'highlight')
	.addColorVariant('2', '#dbf5ff', 'highlight')
	.addColorVariant('muted', '#727ee6', 'on-callout')
	.addOpacityVariant('muted', 0.75, 'metadata')
	.addOpacityVariant('muted', 0.5, 'on-background')
	.addOpacityVariant('bullet', 0.25, 'technology')
	.addColorVariant('hover', '#2d384d', 'navigation')
	.addColorVariant('active', '#242b3a', 'navigation')
	.setVariable('navigation-active', 'inset 0 -4px #6b6e75', 'boxShadow', 'shadow')
	.setVariable('focus', 'inset 0 0 0 4px rgba(66, 153, 225, 0.5)', 'boxShadow', 'shadow')
	.setVariable('article', '#f4f5f7', 'borderColor', 'border');

const dark = new Theme() //
	.setName('dark')
	.targetable()
	.addColors({
		background: '#1c1e26',
		'on-background': '#f1f1f1',
		brand: '#ecb0e2',
		'on-brand': '#21001c',
		navigation: '#2f3344',
		'on-navigation': '#ffffff',
		highlight: '#32343c',
		icon: '#ecb0e2',
		'on-icon': '#21001c',
		technology: '#95a0cc',
		callout: '#272a35',
		'on-callout': '#ecb0e2',
	})
	.addColorVariant('reverse', '#252832', 'icon')
	.addColorVariant('reverse', '#ecb0e2', 'on-icon')
	.addColorVariant('1', '#4c426d', 'highlight')
	.addColorVariant('2', '#6e4141', 'highlight')
	.addColorVariant('muted', '#343846', 'on-callout')
	.addOpacityVariant('muted', 0.75, 'on-background')
	.addOpacityVariant('bullet', 0.25, 'technology')
	.addColorVariant('hover', '#252833', 'navigation')
	.setVariable('focus', 'inset 0 0 0 4px rgba(66, 153, 225, 0.5)', 'boxShadow', 'shadow')
	.setVariable('article', '#f4f5f7', 'borderColor', 'border');

module.exports = new ThemeManager() //
	.setDefaultTheme(main)
	.setDefaultDarkTheme(dark);
