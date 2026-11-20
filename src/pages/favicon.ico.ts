import type { APIRoute } from 'astro';

import { iconPng } from '../logo/logo';

const sizes = [16, 32, 48];

export const GET: APIRoute = () => {
	const images = sizes.map((size) => iconPng(size));

	// An ICO header, one 16-byte entry per image, then the images, here PNGs.
	const header = 6 + 16 * images.length;
	const ico = new Uint8Array(header + images.reduce((total, image) => total + image.byteLength, 0));
	const view = new DataView(ico.buffer);

	view.setUint16(2, 1, true);
	view.setUint16(4, images.length, true);

	let offset = header;

	images.forEach((image, index) => {
		const entry = 6 + 16 * index;

		view.setUint8(entry, sizes[index]!);
		view.setUint8(entry + 1, sizes[index]!);
		view.setUint16(entry + 4, 1, true);
		view.setUint16(entry + 6, 32, true);
		view.setUint32(entry + 8, image.byteLength, true);
		view.setUint32(entry + 12, offset, true);
		ico.set(image, offset);
		offset += image.byteLength;
	});

	return new Response(ico, { headers: { 'Content-Type': 'image/x-icon' } });
};
