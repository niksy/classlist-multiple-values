import path from 'node:path';
import { defineEnv } from 'unenv';
// @ts-expect-error
import istanbul from 'rollup-plugin-istanbul';
import nycConfig from './nyc.config.js';
import rolldownConfig from './rolldown.config.js';

/** @type {import('karma-rolldown-preprocessor')} */
/** @type {import('karma').ConfigOptions} */
let config;

const isCI = typeof process.env['CI'] !== 'undefined' && process.env['CI'] !== 'false';
const isPR =
	typeof process.env['GITHUB_HEAD_REF'] !== 'undefined' && process.env['GITHUB_HEAD_REF'] !== '';
const local = !isCI || (isCI && isPR);

const port = 0;

const { env } = defineEnv({
	nodeCompat: true
});

if (local) {
	config = {
		browsers: ['Chrome']
	};
} else {
	config = {
		hostname: 'bs-local.com',
		browserStack: {
			username: process.env['BROWSER_STACK_USERNAME'],
			accessKey: process.env['BROWSER_STACK_ACCESS_KEY'],
			startTunnel: true,
			project: 'classlist-multiple-values',
			name: 'Automated (Karma)',
			build: 'Automated (Karma)'
		},
		customLaunchers: {
			'BS-Chrome': {
				'base': 'BrowserStack',
				'project': 'classlist-multiple-values',
				'build': 'Automated (Karma)',
				'browser': 'Chrome',
				'browser_version': '80',
				'name': 'Chrome',
				'os': 'Windows',
				'os_version': '7'
			},
			'BS-Edge': {
				'base': 'BrowserStack',
				'project': 'classlist-multiple-values',
				'build': 'Automated (Karma)',
				'browser': 'Edge',
				'browser_version': '80',
				'name': 'Edge',
				'os': 'Windows',
				'os_version': '10'
			},
			'BS-Firefox': {
				'base': 'BrowserStack',
				'project': 'classlist-multiple-values',
				'build': 'Automated (Karma)',
				'browser': 'Firefox',
				'browser_version': '72',
				'name': 'Firefox',
				'os': 'Windows',
				'os_version': '7'
			}
		},
		browsers: ['BS-Chrome', 'BS-Edge', 'BS-Firefox']
	};
}

/**
 * @param  {import('karma').Config} baseConfig
 */
export default function (baseConfig) {
	baseConfig.set({
		basePath: '',
		frameworks: ['mocha', 'fixture'],
		files: ['test/**/*.html', { pattern: 'test/**/*.js', watched: false }],
		exclude: [],
		preprocessors: {
			'test/**/*.html': ['html2js'],
			'test/**/*.js': ['rolldown', 'sourcemap']
		},
		reporters: ['coverage', 'mocha'],
		port: port,
		colors: true,
		logLevel: baseConfig.LOG_INFO,
		autoWatch: false,
		client: {
			captureConsole: true
		},
		browserConsoleLogOptions: {
			level: 'log',
			format: '%b %T: %m',
			terminal: true
		},
		rolldownPreprocessor: {
			// @ts-expect-error
			transform: {
				inject: env.inject,
				target: rolldownConfig[0]?.transform?.target ?? []
			},
			resolve: {
				alias: {
					...rolldownConfig[0]?.resolve?.alias,
					...env.alias
				}
			},
			plugins: [
				istanbul({
					exclude: ['test/**/*.js', 'node_modules/**/*']
				}),
				...(Array.isArray(rolldownConfig[0]?.plugins)
					? rolldownConfig[0]?.plugins.filter((plugin) => {
							return !(
								/** @type {import('rolldown').Plugin[]}*/ (
									plugin
								)?.[0]?.name?.includes('rolldown-plugin-dts')
							);
						})
					: [])
			],
			output: {
				format: 'iife',
				name: 'classlistMultipleValues',
				sourcemap: 'inline'
			}
		},
		coverageReporter: {
			dir: path.join(import.meta.dirname, 'coverage'),
			reporters: [{ type: 'html' }, { type: 'text' }],
			check: {
				global: nycConfig
			}
		},
		singleRun: true,
		concurrency: Infinity,
		...config
	});
}
