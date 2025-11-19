/**
 * @typedef {string[]|string} Values
 */

/**
 * @param  {Values} values
 */
function resolveValues(values) {
	if (Array.isArray(values)) {
		return values;
	}
	return values.split(' ').reduce((array, rawValue) => {
		const value = rawValue.trim();
		if (value !== '') {
			array.push(value);
		}
		return array;
	}, /** @type {string[]}*/ ([]));
}

/**
 * Use multiple values for `classList.add` and `classList.remove` methods.
 *
 * @param  {DOMTokenList} classList
 */
export default function (classList) {
	if (typeof classList.add === 'undefined' && typeof classList.remove === 'undefined') {
		throw new TypeError('`add` and `remove` methods are undefined');
	}

	return {
		/**
		 * Array of strings or space-separated string of class values to add to the element.
		 *
		 * @param  {Values} values
		 */
		add: (values) => {
			resolveValues(values).forEach((value) => {
				classList.add(value);
			});
		},
		/**
		 * Array of strings or space-separated string of class values to remove from the element.
		 *
		 * @param  {Values} values
		 */
		remove: (values) => {
			resolveValues(values).forEach((value) => {
				classList.remove(value);
			});
		}
	};
}
