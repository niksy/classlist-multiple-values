import assert from 'node:assert';
import function_ from '../index.js';

before(function () {
	// @ts-expect-error
	const fixture = window.__html__['test/fixtures/index.html'];
	document.body.insertAdjacentHTML('beforeend', `<div id="fixture">${fixture}</div>`);
});

after(function () {
	document.body.removeChild(/** @type {HTMLDivElement} */ (document.querySelector('#fixture')));
});

it('should add multiple classes', function () {
	const element = /** @type {HTMLDivElement} */ (document.querySelector('.jackie'));
	const classList = element.classList;
	const cl = function_(classList);

	cl.add('henry winnie');
	cl.add(['scooter', 'emma']);

	assert.ok(classList.contains('jackie'));
	assert.ok(classList.contains('henry'));
	assert.ok(classList.contains('winnie'));
	assert.ok(classList.contains('scooter'));
	assert.ok(classList.contains('emma'));
});

it('should remove multiple classes', function () {
	const element = /** @type {HTMLDivElement} */ (document.querySelector('.jackie'));
	const classList = element.classList;
	const cl = function_(classList);

	cl.remove('henry winnie');
	cl.remove(['scooter', 'emma']);

	assert.ok(classList.contains('jackie'));
	assert.ok(!classList.contains('henry'));
	assert.ok(!classList.contains('winnie'));
	assert.ok(!classList.contains('scooter'));
	assert.ok(!classList.contains('emma'));
});

it('should throw if `add` and `remove` methods are undefined', function () {
	const classList = {};

	assert.throws(
		() => {
			// @ts-expect-error
			function_(classList);
		},
		{
			name: 'TypeError',
			message: '`add` and `remove` methods are undefined'
		}
	);
});
