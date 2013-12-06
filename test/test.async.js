var errorMessage = "err_", errRet = "ERR";
var time = 0;

"use strict";
mocha.setup("bdd");
function assert(expr, msg){
	if(!expr) throw new Error(msg || "failed");
}

var runner;
window.onload = function(){
	runner = mocha.run();
}

describe("async基本功能测试", function(){

	describe("#async()测试", function () {

		it("执行全部任务测试", function (done) {
			async(f1, f2, f3, f4, function (err, ret) {
				assert( !err );
				assert( ret.f1 === 1 &&
					ret.f2 === 2 &&
					ret.f3 === 3 &&
					ret.f4 === 4 );
				done();
			});
		});

		it("中间插入同步代码测试", function (done) {
			async(f1, f2, f3, sync, f4, function (err, ret) {
				assert( !err );
				assert( ret.f1 === 1 &&
					ret.f2 === 2 &&
					ret.f3 === 3 &&
					ret.sync === 'sync' &&
					ret.f4 === 4 );
				done();
			});
		});

		it("执行部份任务中途退出测试", function (done) {
			async(f1, f2, err, f3, f4, function (err, ret){
				assert( err === errorMessage );
				assert( ret === errRet );
				done();
			});
		});

	});

	describe("#async.loop()测试", function () {
		it("#async.loop()测试", function (done) {

			async.loop( function(cb, ret){
				setTimeout( function(){
					if (!ret) {
						cb(true, 1);
					} else if (ret > 10) {
						cb(false, ret);
					} else {
						cb(true, ret + ret);
					}
				}, time)
			}, function(ret){
				assert( ret === 16 );
				done();
			});

		});
	});

});

function err(cb, ret){
	cb( errorMessage, errRet );
}

function sync(cb, ret){
	ret.sync = "sync";
	cb( null, ret);
}

function f1(cb, ret){
	setTimeout(function () {
		ret = {f1:1};
		cb(null, ret);
	}, time);
}

function f2(cb, ret){
	setTimeout(function () {
		ret.f2 = 2;
		cb(null, ret);
	}, time);
}

function f3(cb, ret){
	setTimeout(function () {
		ret.f3 = 3;
		cb(null, ret);
	}, time);
}

function f4(cb, ret){
	setTimeout(function () {
		ret.f4 = 4;
		cb(null, ret);
	}, time);
}
