'use strict';

/**
 * @param  {String[]|String} values
 *
 * @return {String[]}
 */
function resolveValues ( values ) {

	if ( Array.isArray(values) ) {
		return values;
	}

	return values.split(' ')
		.map(( value ) => {
			return value.trim();
		})
		.filter(( value ) => {
			return value !== '';
		});

}

/**
 * @param  {Object|DOMTokenList} classList
 *
 * @return {Object}
 */
module.exports = ( classList ) => {

	if (
		typeof classList.add === 'undefined' &&
		typeof classList.remove === 'undefined'
	) {
		throw new Error('`add` and `remove` methods are undefined');
	}

	return {
		add: ( values ) => {
			resolveValues(values).forEach(( value ) => {
				classList.add(value);
			});
		},
		remove: ( values ) => {
			resolveValues(values).forEach(( value ) => {
				classList.remove(value);
			});
		}
	};

};
