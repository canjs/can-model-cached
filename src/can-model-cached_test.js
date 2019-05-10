require('./can-model-cached');
require('can/util/fixture/fixture');
require('steal-qunit');

var Task;
QUnit.module('can/model/cached');
QUnit.test('findAll', function(assert) {
	var done = assert.async();
	var numRequests = 0,
		origDelay = can.fixture.delay;
	can.fixture.delay = 500;
	can.fixture('/tasks', function () {
		if (numRequests++ === 0) {
			return [{
				id: 1,
				name: 'first'
			}, {
				id: 2,
				name: 'second'
			}];
		} else {
			return [{
				id: 1,
				name: 'First'
			}, {
				id: 2,
				name: 'second'
			}];
		}
	});
	Task = can.Model.Cached({
		findAll: '/tasks'
	}, {});
	Task.cacheClear();
	Task.findAll({}, function (tasks) {
		setTimeout(function () {
			Task.findAll({}, function (secondTasks) {
				assert.deepEqual(tasks.attr(), secondTasks.attr());
				secondTasks.bind('change', function () {
					can.fixture.delay = origDelay;
					done();
				});
			});
		}, 13);
	});
});
QUnit.test('findOne', function(assert) {
	var done = assert.async();
	var numRequests = 0,
		origDelay = can.fixture.delay;
	can.fixture.delay = 500;
	can.fixture('/tasks/1', function () {
		if (numRequests++ === 0) {
			return {
				id: 1,
				name: 'first'
			};
		} else {
			return {
				id: 1,
				name: 'First'
			};
		}
	});
	Task = can.Model.Cached({
		findOne: '/tasks/{id}'
	}, {});
	Task.cacheClear();
	Task.findOne({
		id: 1
	}, function (task) {
		setTimeout(function () {
			Task.findOne({
				id: 1
			}, function (secondTask) {
				assert.deepEqual(task.attr(), secondTask.attr());
				secondTask.bind('change', function (ev, attr) {
					if (attr !== 'updated') {
						can.fixture.delay = origDelay;
						done();
					}
				});
			});
		}, 13);
	});
});
QUnit.test('findAll and findOne', function(assert) {
	var done = assert.async();
	var origDelay = can.fixture.delay;
	can.fixture.delay = 500;
	can.fixture('/tasks', function () {
		return [{
			id: 1,
			name: 'first'
		}, {
			id: 2,
			name: 'second'
		}];
	});
	can.fixture('/tasks/1', function () {
		return {
			id: 1,
			name: 'First'
		};
	});
	Task = can.Model.Cached({
		findAll: '/tasks',
		findOne: '/tasks/{id}'
	}, {});
	Task.cacheClear();
	Task.findAll({}, function (tasks) {
		setTimeout(function () {
			Task.findOne({
				id: 1
			}, function (task) {
				assert.deepEqual(tasks[0].attr(), task.attr());
				task.bind('change', function (ev, attr) {
					if (attr !== 'updated') {
						can.fixture.delay = origDelay;
						done();
					}
				});
			});
		}, 13);
	});
});
QUnit.test('destroy', function(assert) {
	var done = assert.async();
	var TASKS = [{
		id: 1,
		name: 'first'
	}, {
		id: 2,
		name: 'second'
	}];
	can.fixture('GET /tasks', function () {
		return TASKS;
	});
	can.fixture('DELETE /tasks/{id}', function () {
		//TASKS.splice( (+options.data.id)-1,1)
		return {};
	});
	Task = can.Model.Cached({
		findAll: '/tasks',
		destroy: '/tasks/{id}'
	}, {});
	Task.cacheClear();
	Task.findAll({}, function (tasks) {
		tasks[0].destroy(function () {
			Task.findAll({}, function (tasks2) {
				assert.equal(tasks2.length, 1);
				assert.equal(tasks2[0].name, 'second');
				done();
			});
		});
	});
});
