---
title: async/await是如何实现的？
date: '2022-07-17'
summary: ES2017引入了`Async/Await`语法，使得我们的异步代码看起来更像是同步代码，隐藏了成堆的回调函数。但是 Javascript 引擎内部是如何实现的呢？
---



ES2017引入了`Async/Await`语法，使得我们的异步代码看起来更像是同步代码，隐藏了成堆的回调函数。但是 Javascript 引擎内部是如何实现的呢？

## 先来看看 Babel 的实现

在前几年浏览器还没有完全原生支持`async`语法时，为了抢先体验 ECMA Spec 中的新功能，我们一般使用 Babel 将最新语法转译`Transpile`成浏览器支持的语法结构

如：

```js	
async function foo(url) {
  try {
    const response = await fetch(url);
    console.log(await response.text());
  }
  catch (err) {
    console.log('fetch failed', err);
  }
}
```

转译成了

```js
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function foo(_x) {
  return _foo.apply(this, arguments);
}

function _foo() {
  _foo = _asyncToGenerator(function* g_foo(url) {
    try {
      const response = yield fetch(url);
      console.log(yield response.text());
    } catch (err) {
      console.log('fetch failed', err);
    }
  });
  return _foo.apply(this, arguments);
}
```

Babel 替我们生成了两个 helper 函数，如果我们对它稍加简化，可以得到：

```js
function _asyncToGenerator(fn) {
  return function () {
    var gen = fn.apply(this, arguments);
    return new Promise(function (resolve) {
      function step(key, arg) {
        var info = gen[key](arg);
        var value = info.value;
       if (info.done) {
          resolve(value);
        } else {
          // 如果value不是一个promise，则将它转化成一个resolved promise
          Promise.resolve(value).then(function(val) {
            step("next", val)
          }, function(err) {
            step("throw", err)
          });
        }
      }
      step("next")
    });
  };
}
```



### 生成器 Generator

在这里例子中异步函数被转换成了生成器函数。这里先简要回顾一下生成器：

- 通过`function* () {}`定义生成器函数，其返回一个生成器对象
- 调用生成器函数的`.next()`方法后，开始执行生成器函数代码
- 生成器对象中可使用`yield`关键字，生成器函数执行时遇到`yield`将暂停函数的执行，转而执行`.next()`之后的代码
- 再次调用`.next()`方法时，从之前`yield`的位置继续执行

生成器函数与主函数之间可进行数据传递：

- 主函数 -> 生成器函数：`gen.next(val)` 参见[🔗](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Generator/next#%E5%90%91%E7%94%9F%E6%88%90%E5%99%A8%E4%BC%A0%E5%80%BC)
- 生成器函数 -> 主函数：`yield val`

### `_asyncToGenerator `在干什么？

我们知道在`async`函数`await`一个 promise 对象，我们会等到它 fulfilled 以后开始执行后面的代码。在转换后的生成器函数中，`yield`相当于`await`。然后我们调用`gen.next()`方法执行生成器函数，取得`yield fetch(url)`中的 promise，并`.then()`方法中进行递归——调用`gen.next(arg)`继续执行生成器函数，promise resolve 的值通过`arg`传递给生成器函数, ...

具体步骤为：

1. 创建生成器对象`gen`，async 函数返回一个 promise

2. 执行传入 promise 的函数，调用`gen.next()`，引擎跳转到生成器函数`g_foo`开始执行

3. 遇到`yield`,暂停函数执行，`fetch(url)`返回一个 promise，并被传回给主函数，赋值给`info.value`

4. 调用`promise.then`设置 resolved 后的回调函数，`_asyncToGenerator`结束运行

5. 此时将继续执行主函数中的剩余代码。

6. 当 fetch 从服务器得到数据后，执行回调函数，即`step`，并将promise resolved后的值传入其中
7. 重复执行2～6，知道生成器函数返回，`done`为真

## 浏览器（V8）实际是如何处理的？

根据 V8 官方的 [blog](https://v8.dev/blog/fast-async#async-functions),在 Node.js 12 的一系列优化后，`async`函数在内部被转化成了

```js
async function foo(v) {
  const w = await v
  return w
}

resumable function foo(v) {
  implicit_promise = createPromise()
  // 如果v不是promise，则将其转化成promise
  promise = promiseResolve(v)
  // 设置fulfilled和rejected时的回调函数，恢复foo的运行
  performPromiseThen(promise,
    res => resume(<<foo>>, res),
    err => throw(<<foo>>, err))
  // 挂起foo，并返回隐式创建的promise
  w = suspend(<<foo>>, implicit_promise)
  resolvePromise(implicit_promise, w)
}
```

观察发现代码结构其实与 Babel polyfill 十分相似，内部同样使用Promise，`resume`和`suspend`这些引擎内部函数与 generator 也有异曲同工之妙。`performPromiseThen`在引擎的微任务队列中创建了[PromiseReactionJob](https://tc39.es/ecma262/#sec-promisereactionjob),与回调函数绑定。当主函数运行完，且await的promise resolve了之后，执行微任务，恢复foo函数的执行。