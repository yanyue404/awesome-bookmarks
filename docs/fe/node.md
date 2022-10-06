## 模块机制

node 的基础中毫无疑问的应该是有关于模块机制的方面的, 也即 `require` 这个内置功能的一些原理的问题.

关于模块互相引用之类的, 不了解的推荐先好好读读[官方文档](https://nodejs.org/dist/latest-v6.x/docs/api/modules.html).

其实官方文档已经说得很清楚了, 每个 node 进程只有一个 VM 的上下文, 不会跟浏览器相差多少, 模块机制在文档中也描述的非常清楚了:

```javascript
function require(...) {
  var module = { exports: {} };
  ((module, exports) => {
    // Your module code here. In this example, define a function.
    function some_func() {};
    exports = some_func;
    // At this point, exports is no longer a shortcut to module.exports, and
    // this module will still export an empty default object.
    module.exports = some_func;
    // At this point, the module will now export some_func, instead of the
    // default object.
  })(module, module.exports);
  return module.exports;
}
```

> <a name="q-global"></a> 如果 a.js require 了 b.js, 那么在 b 中定义全局变量 `t = 111` 能否在 a 中直接打印出来?

① 每个 `.js` 能独立一个环境只是因为 node 帮你在外层包了一圈自执行, 所以你使用 `t = 111` 定义全局变量在其他地方当然能拿到. 情况如下:

```javascript
// b.js
(function (exports, require, module, __filename, __dirname) {
  t = 111;
})();

// a.js
(function (exports, require, module, __filename, __dirname) {
  // ...
  console.log(t); // 111
})();
```

> <a name="q-loop"></a> a.js 和 b.js 两个文件互相 require 是否会死循环? 双方是否能导出变量? 如何从设计上避免这种问题?

② 不会, 先执行的导出其 **未完成的副本**, 通过导出工厂函数让对方从函数去拿比较好避免. 模块在导出的只是 `var module = { exports: {...} };` 中的 exports, 以从 a.js 启动为例, a.js 还没执行完会返回一个 a.js 的 exports 对象的 **未完成的副本** 给 b.js 模块。 然后 b.js 完成加载，并将 exports 对象提供给 a.js 模块。

另外还有非常基础和常见的问题, 比如 module.exports 和 exports 的区别这里也能一并解决了 exports 只是 module.exports 的一个引用. 没看懂可以在细看我以前发的[帖子](https://cnodejs.org/topic/5734017ac3e4ef7657ab1215).

再晋级一点, 众所周知, node 的模块机制是基于 [`CommonJS`](http://javascript.ruanyifeng.com/nodejs/module.html) 规范的. 对于从前端转 node 的同学, 如果面试官想问的难一点会考验关于 [`CommonJS`](http://javascript.ruanyifeng.com/nodejs/module.html) 的一些问题. 比如比较 `AMD`, `CMD`, [`CommonJS`](http://javascript.ruanyifeng.com/nodejs/module.html) 三者的区别, 包括询问关于 node 中 `require` 的实现原理等.

## 如何获取某个文件夹下所有的文件名?

一个简单的例子:

```js
const fs = require("fs");
const path = require("path");

function traversal(dir) {
  let res = [];
  for (let item of fs.readdirSync(dir)) {
    let filepath = path.join(dir, item);
    try {
      let fd = fs.openSync(filepath, "r");
      let flag = fs.fstatSync(fd).isDirectory();
      //   fs.close(fd); // TODO
      if (flag) {
        res.push(...traversal(filepath));
      } else {
        res.push(filepath);
      }
    } catch (err) {
      if (
        err.code === "ENOENT" && // link 文件打不开
        !!fs.readlinkSync(filepath)
      ) {
        // 判断是否 link 文件
        res.push(filepath);
      } else {
        console.error("err", err);
      }
    }
  }
  return res.map((file) => path.basename(file));
}

console.log(traversal("."));
```

当然也可以使用[glob](https://github.com/isaacs/node-glob) 模块：

```js
const glob = require("glob");

glob("**/*.js", (err, files) => {
  if (err) {
    throw new Error(err);
  }
  files.map((filename) => {
    console.log("Here you are:", filename);
  });
});
```
