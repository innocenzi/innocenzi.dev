export default defineAppConfig({
	ui: {
		colors: {
			primary: 'rose',
			neutral: 'zinc',
		},
		header: {
			slots: {
				root: 'bg-transparent border-none backdrop-blur-none static z-0',
			},
		},
		badge: {
			defaultVariants: {
				variant: 'soft',
			},
		},
		link: {
			variants: {
				active: {
					true: 'text-primary',
					false: 'text-default',
				},
			},
			compoundVariants: [
				{
					active: false,
					disabled: false,
					class: [
						'hover:text-highlighted underline decoration-transparent hover:decoration-primary underline-offset-[6px]',
						'transition-colors',
					],
				},
			],
		},
		footer: {
			slots: {
				root: 'bg-transparent',
			},
		},
	},
})
