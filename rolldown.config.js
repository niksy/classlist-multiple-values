import { defineConfig } from 'rolldown';
import { dts } from 'rolldown-plugin-dts';

export default defineConfig([
	{
		input: 'index.js',
		output: {
			cleanDir: true,
			dir: 'dist',
			format: 'esm',
			sourcemap: true
		},
		external: [/^[^./]/],
		transform: {
			target: ['chrome100', 'firefox100', 'edge100', 'ios13.3', 'opera100', 'safari13.1']
		},
		plugins: [dts({ sourcemap: true })]
	}
]);
