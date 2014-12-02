async
=====

一个小型的异步库

## 使用示例
#### 任务函数
任务函数接受两个参数:
- 第一个函数是一个函数,当任务执行完成或遇到错误时候调用这个函数
	- 这个函数接受两个参数,第一个表示错误信息,运行中没有错误时请传入null,当传入非真值时将忽略后面任务
	- 第二个参数将把值传给下一个任务,从而实现各任务衔接
- 第二个参数是前一个任务传入

```javascript
function task (cb, ret) {
    setTimeout( function () {
        cb (null, new Date); // 调用这函数以后将转入执行下一个任务,前一个参数null表示没遇到错误
    });
}
```

#### 依次执行各个任务(可以是异步也可以是同步),最后一个参数为各任务执行完后回调函数. 

```javascript
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

#### 当执行过程中遇错时,忽略后面任务直接调用回调函数

```javascript
function err(cb, ret) {
	setTimeout(function () {
		cb("error message", ret);
	}, 10);
}

async( f1, err, f2, function (err, ret) {
	console.log(err); // error message
});
```

#### 循环执行指定任务,第一个是任务函数,第二个是执行完成回调函数

```javascript
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
