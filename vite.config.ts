import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],
	server: {
		proxy: {
			'/graphql': {
				target: 'http://78.111.111.77:8090', // GraphQL API base URL
				changeOrigin: false,
				secure: false,
				rewrite: (path) => path.replace(/^\/graphql/, '/graphql'), // Optional, sadece /graphql yolunu proxy'le
			}
		},
		cors: {
			credentials: false,
			origin: 'http://78.111.111.77:4173', // SvelteKit'in çalıştığı host
		}
	}
});