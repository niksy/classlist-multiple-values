'use strict';

const assert = require('assert');
const classListFactory = require('class-list');
const fn = require('../index');

let element;

before(function () {
	const fixture = window.__html__['test/fixtures/index.html'];
	document.body.insertAdjacentHTML('beforeend', `<div id="fixture">${fixture}</div>`);
	element = document.querySelector('.jackie');
});

after(function () {
	document.body.removeChild(document.getElementById('fixture'));
});

it('should add multiple classes', function () {

	const classList = classListFactory(element);
	const cl = fn(classList);

	cl.add('henry winnie');
	cl.add(['scooter', 'emma']);

	assert.ok(classList.contains('jackie'));
	assert.ok(classList.contains('henry'));
	assert.ok(classList.contains('winnie'));
	assert.ok(classList.contains('scooter'));
	assert.ok(classList.contains('emma'));

});

it('should remove multiple classes', function () {

	const classList = classListFactory(element);
	const cl = fn(classList);

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
			fn(classList);
		},
		'`add` and `remove` methods are undefined'
	);

});
