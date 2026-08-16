import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

type Quote = {
	id: number;
	date: string;
	contents: string[];
};

const CORS_HEADERS = {
	'Access-Control-Allow-Origin': '*',
	'Access-Control-Allow-Methods': 'GET, OPTIONS'
};

export const GET: RequestHandler = async ({ fetch }) => {
	const res = await fetch('/quotes.json');
	const quotes: Quote[] = await res.json();
	const picked = quotes[Math.floor(Math.random() * quotes.length)];

	return json(picked, { headers: CORS_HEADERS });
};

export const OPTIONS: RequestHandler = async () => {
	return new Response(null, { headers: CORS_HEADERS });
};
