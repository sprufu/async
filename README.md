async
=====

一个小型的异步库

___使用示例___
. 
```js
var time = 10;
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

async( f1, f2, function (err, ret) {
  console.log(ret); // {f1:1, f2:2}
});
```
