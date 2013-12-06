/**
 * 异步解决方案
 * @module async
 * @version 0.1.1
 * @author jcode
 */
if ("undefined" !== typeof module) {
	// 供node.js用
	module.exports = async;
}

/**
 * 多个任务顺序执行
 * @method async
 * @param {function} task 每个参数是一个任务函数,函数第一个参数个回调函数,后面为参数(前一个任务返回)
 * @param {function} cb 最后一个参数是回调函数,函数接受两个参数,第一个参数是错误信息,第二个参数是结果
 */
function async() {
	var

		// 把所有的参数当成各个任务
		tasks = [].slice.call(arguments),

		// 最后一个参数做为回调函数
		// 当出错或所有任务执行完时执行
		cb = tasks.pop();

	// 转换到下一个任务
	// 每个任务的第一个参数就是这个函数
	// 函数参数第一个表示错误信息,第一个是前一个运行结果
	(function(err, ret) {
		// 当前任务
		var task;

		if (err) {
			// 一旦有错误信息,将忽然后面任务直接执行回调函数
			if (cb) cb(err, ret);
		} else if (task = tasks.shift()) {
			// 如果没遇到错误,并且还有未完成任务时,将执行后续任务
			task(arguments.callee, ret);
		} else {
			// 如果所有任务执行完毕,将执行回调函数
			if (cb) cb(null, ret);
		}
	})();
}

/**
 * 一个任务循环执行多次
 * @method async/loop
 * @param {function} task 循环执行的任务.
 * 		任务函数第一个参数是预设函数,
 * 		第二个参数是上一次循环返回值(第一次执行时为undefined)
 * @param {function} cb 回调函数,当循环完后执行.
 * 		函数有一个参数,为最后一次循环返回值
 * @description 任务相当于do-while,先执行一次再判断条件是否继续下一个循环
 */
async.loop = function(task, cb){
	// 转换到下一个任务
	// 待调用函数参数第一个表示是否继续循环,第二个参数是结果
	(function(loop, ret) {
		if (loop) {
			// 当检查结果为true时,继续循环执行任务
			task(arguments.callee, ret);
		} else {
			// 一旦有错误信息,将忽然后面任务直接执行回调函数
			if (cb) cb(ret);
		}
	})(true);
}
