import { json } from '@remix-run/node';

export async function loader() {
	await sleep(1000);

	return json({
		clients: [
			{ id: 1, name: 'John Doe' },
			{ id: 2, name: 'Jane Doe' },
		],
	});
}

function sleep(ms: number) {
	return new Promise(resolve => setTimeout(resolve, ms));
}
