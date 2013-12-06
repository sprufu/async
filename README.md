async
=====

一个小型的异步库

___使用示例___

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
