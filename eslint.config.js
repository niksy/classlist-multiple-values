import { defineConfig } from 'eslint/config';
import configBase from 'eslint-config-nitpick';
import configTypescript from 'eslint-config-nitpick/typescript';
import configBrowser from 'eslint-config-nitpick/browser';
import configTests from 'eslint-config-nitpick/tests';
import configPrettier from 'eslint-config-prettier/flat';
import pluginPrettier from 'eslint-plugin-prettier';
import globals from 'globals';

export default defineConfig([
	configBase,
	configTypescript,
	configBrowser,
	configPrettier,
	{
		plugins: {
			prettier: pluginPrettier
		},
		rules: {
			'prettier/prettier': 1
		}
	},
	{
		files: ['karma.conf.js', 'rolldown.config.js'],
		languageOptions: {
			globals: {
				...globals.node
			}
		},
		rules: {
			'no-console': 0
		}
	},
	{
		files: ['test/**/*'],
		extends: [configTests],
		ignores: ['**/fixtures']
	}
]);
