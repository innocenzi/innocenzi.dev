<template>
	<svg width="30" height="30" viewBox="0 0 30 30" fill="none" class="bluesky-flutter" xmlns="http://www.w3.org/2000/svg">
		<defs>
			<path
				id="left-wing"
				d="M15.3333 20.0003C15.3333 20.4448 15.1111 21.1114 14.6667 22.0003C14.1787 22.975 12.6667 26.667 10 26.667C8.99467 26.667 7.81733 25.9043 6.444 24.547C3.48133 21.611 4.60667 18.2203 10 17.3336C6.91467 17.8416 3.692 17.459 2.74133 14.175C2.46667 13.231 2 7.41365 2 6.62698C2 2.68965 5.57467 3.92698 7.78 5.52565C10.8373 7.74165 14.1267 12.2563 15.3333 14.667"
				stroke="currentColor"
				stroke-width="2.66667"
				stroke-linecap="round"
				stroke-linejoin="round"
			/>
			<path
				id="right-wing"
				d="M15.592 20.0003C15.592 20.4448 15.8142 21.1114 16.2587 22.0003C16.7467 22.975 18.2587 26.667 20.9253 26.667C21.9307 26.667 23.108 25.9057 24.4813 24.547C27.444 21.6097 26.3187 18.219 20.9253 17.3337C24.0107 17.8403 27.232 17.459 28.184 14.175C28.4587 13.231 28.9253 7.41232 28.9253 6.62699C28.9253 2.68965 25.352 3.92699 23.1453 5.52565C20.088 7.74165 16.7987 12.2563 15.592 14.667"
				stroke="currentColor"
				stroke-width="2.66667"
				stroke-linecap="round"
				stroke-linejoin="round"
			/>
		</defs>
		<use xlink:href="#left-wing" class="left" />
		<use xlink:href="#right-wing" class="right" />
	</svg>
</template>

<style scoped>
.bluesky-flutter svg {
	width: 2em;
	height: 2em;
	transition: 200ms;
}
.bluesky-flutter .left {
	transform-origin: center;
}
.bluesky-flutter .right {
	transform-origin: center;
}
.bluesky-flutter:hover .left,
.bluesky-flutter:focus .left {
	animation: flutter 430ms ease-in-out;
	--flip: 1;
}
.bluesky-flutter:hover .right,
.bluesky-flutter:focus .right {
	animation: flutter 500ms ease-in-out;
	--flip: 1;
}
.bluesky-flutter:hover svg,
.bluesky-flutter:focus svg {
	transform: rotate(-5deg);
	transition: 500ms;
}

@media (prefers-reduced-motion) {
	.bluesky-flutter:hover .left,
	.bluesky-flutter:focus .left,
	.bluesky-flutter:hover .right,
	.bluesky-flutter:focus .right {
		animation: none;
	}
}

@keyframes flutter {
	10% {
		transform: scale(calc(var(--flip) * 1), 0.9);
	}
	20% {
		transform: scale(calc(var(--flip) * 0.5), 1);
	}
	40% {
		transform: scale(calc(var(--flip) * 0.9), 0.95);
	}
	60% {
		transform: scale(calc(var(--flip) * 0.3), 1);
	}
	80% {
		transform: scale(calc(var(--flip) * 0.9), 0.95);
	}
	100% {
		transform: scale(calc(var(--flip) * 1), 1);
	}
}
</style>
