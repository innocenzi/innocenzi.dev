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
		prose: {
			codeGroup: {
				slots: {
					root: 'border border-default rounded-lg p-0.5 group/code-group code-group',
					list: 'pt-0.75 pb-1 px-0.75 bg-transparent border-none',
					indicator: 'bottom-1 top-0.75',
					trigger: 'text-sm py-1 cursor-pointer text-toned data-[state=active]:text-default',
					triggerIcon: 'hidden',
				},
			},
		},
	},
})
