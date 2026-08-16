import type { RequestHandler } from './$types';

type Quote = {
	id: number;
	date: string;
	contents: string[];
};

const CORS_HEADERS = {
	'Access-Control-Allow-Origin': '*',
	'Access-Control-Allow-Methods': 'GET, OPTIONS',
	'Content-Type': 'image/svg+xml',
	'Cache-Control': 'no-cache, no-store, must-revalidate'
};

function escapeXml(text: string): string {
	return text
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&apos;');
}

function buildSvg(lines: string[]): string {
	const width = 600;
	const lineHeight = 34;
	const paddingY = 40;
	const height = lines.length * lineHeight + paddingY * 2;
	const centerY = height / 2 - ((lines.length - 1) * lineHeight) / 2;

	const tspans = lines
		.map((line, i) => `<tspan x="50%" y="${centerY + i * lineHeight}">${escapeXml(line)}</tspan>`)
		.join('');

	return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
	<rect width="100%" height="100%" fill="#000000" />
	<text text-anchor="middle" font-family="Georgia, serif" font-size="18" letter-spacing="0.5" fill="#ffffff">${tspans}</text>
</svg>`;
}

export const GET: RequestHandler = async ({ fetch }) => {
	const res = await fetch('/quotes.json');
	const quotes: Quote[] = await res.json();
	const picked = quotes[Math.floor(Math.random() * quotes.length)];

	return new Response(buildSvg(picked.contents), { headers: CORS_HEADERS });
};

export const OPTIONS: RequestHandler = async () => {
	return new Response(null, { headers: CORS_HEADERS });
};
