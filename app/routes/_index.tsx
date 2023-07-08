import * as React from 'react';
import type { V2_MetaFunction } from '@remix-run/node';
import { useFetcher } from '@remix-run/react';

export const meta: V2_MetaFunction = () => {
	return [{ title: 'New Remix App' }, { name: 'description', content: 'Welcome to Remix!' }];
};

export default function Index() {
	const [search, setSearch] = React.useState('');
	const fetcher = useFetcher();
	const load = fetcher.load;
	const clients = fetcher.data?.clients || [];
	const isLoading = fetcher.state !== 'idle';

	React.useEffect(() => {
		load(`/clients?search=${search}`);
	}, [search, load]);

	return (
		<div
			style={{
				fontFamily: 'system-ui, sans-serif',
				lineHeight: '1.8',
				maxWidth: '600px',
				margin: '0 auto',
				padding: '2rem',
			}}
		>
			<h1>Remix bug repro</h1>

			<label htmlFor="search">Search</label>
			<input
				id="search"
				type="text"
				value={search}
				onChange={e => setSearch(e.target.value)}
				placeholder="Search for a user"
				style={{
					display: 'block',
					width: '100%',
					padding: '0.5rem',
					fontSize: '1rem',
					lineHeight: '1.5',
					color: '#000',
					backgroundColor: '#fff',
					backgroundImage: 'none',
					border: '1px solid #ccc',
					borderRadius: '0.25rem',
					boxShadow: 'inset 0 1px 1px rgba(0, 0, 0, 0.075)',
					transition: 'border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s',
				}}
			/>

			{isLoading && <p>Loading...</p>}

			{clients.length > 0 && (
				<ul>
					{clients.map((client: any) => (
						<li key={client.id}>{client.name}</li>
					))}
				</ul>
			)}
		</div>
	);
}
