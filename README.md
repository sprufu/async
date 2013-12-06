async
=====

一个小型的异步库

***使用示例***

- 依次执行各个任务(可以是异步也可以是同步),最后一个参数为各任务执行完后回调函数. 

```js
function f1(cb, ret){
	setTimeout(function () {
		ret = {f1:1};
		cb(null, ret);
	}, 10);
}

function f2(cb, ret){
	setTimeout(function () {
		ret.f2 = 2;
		cb(null, ret);
	}, 10);
}

async( f1, f2, function (err, ret) {
  console.log(ret); // {f1:1, f2:2}
});
```

- 当执行过程中遇错时,忽略后面任务直接调用回调函数

```js
function err(cb, ret) {
	setTimeout(function () {
		cb("error message", ret);
	}, 10);
}

async( f1, err, f2, function (err, ret) {
	console.log(err); // error message
});
```

- 循环执行指定任务,第一个是任务函数,第二个是执行完成回调函数

```js
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
	console.log(ret); // 16
});
```
