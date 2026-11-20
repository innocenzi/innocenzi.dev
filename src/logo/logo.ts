import { Resvg } from '@resvg/resvg-js';

// The dark palette, plus the light ground. Keep in sync with `@theme` and the light palette in src/styles/global.css.
export const COLOURS = {
	ground: '#0b0b0d',
	ink: '#edebe7',
	muted: '#a3a1a8',
	faint: '#868490',
	lightGround: '#f5f3ef',
};

// The handwritten signature, as two strokes drawn in order.
export const SIGNATURE = {
	viewBox: { x: 452, y: 155, width: 954, height: 871 },
	strokeWidth: 56,
	strokes: [
		'M492.961,504.077C512.296,528.499 590.697,646.946 757.926,689.034C991.549,747.833 1084.348,589.633 930.325,528.536C754.396,458.749 396.082,605.28 569.043,823.036C729.722,1025.328 1345.685,1066.752 1172.332,472.607',
		'M1062.961,278.077C1054.618,331.901 1150.173,355.05 1169.8,280.56C1181.537,236.011 1109.552,195.938 1079.145,212.568C1029.943,239.478 1069.926,290.324 1074.037,295.553',
	],
};

const { x, y, width, height } = SIGNATURE.viewBox;

export const SIGNATURE_VIEW_BOX = `${x} ${y} ${width} ${height}`;

export function signatureSvg(colour: string): string {
	return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${SIGNATURE_VIEW_BOX}">${strokes(colour)}</svg>`;
}

// A square with the dark ground, so the signature shows on light and dark tabs alike.
export function iconSvg(): string {
	const size = 1000;
	const scale = (size * 0.74) / Math.max(width, height);
	const offsetX = (size - width * scale) / 2 - x * scale;
	const offsetY = (size - height * scale) / 2 - y * scale;

	return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}"><rect width="${size}" height="${size}" rx="${size * 0.22}" fill="${COLOURS.ground}"/><g transform="translate(${offsetX} ${offsetY}) scale(${scale})">${strokes(COLOURS.ink)}</g></svg>`;
}

export function iconPng(size: number): Buffer {
	return new Resvg(iconSvg(), { fitTo: { mode: 'width', value: size } }).render().asPng();
}

function strokes(colour: string): string {
	return SIGNATURE.strokes
		.map((d) => `<path d="${d}" fill="none" stroke="${colour}" stroke-width="${SIGNATURE.strokeWidth}" stroke-linecap="butt" stroke-linejoin="miter"/>`)
		.join('');
}
