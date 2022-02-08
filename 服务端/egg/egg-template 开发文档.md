## egg-template 开发文档

### 创建项目

首先创建一个基础项目

```powershell
mkdir egg-template
cd egg-template
npm init egg --type=simple
npm i
```



### 中间件的创建

先来做一个记录日志的中间件

```js
// app/middleware/httpLog.js
'use strict';
const dayjs = require('dayjs');
const fs = require('fs');
module.exports = options => {
  return async (ctx, next) => {
    const sTime = Date.now();
    const startTime = dayjs(sTime).format('YYYY-MM-DD HH:mm:ss');
    await next();
    const req = ctx.request;
    const log = {
      method: req.method,
      url: req.url,
      data: req.body,
      startTime,
      endTime: dayjs(Date.now()).format('YYYY-MM-DD HH:mm:ss'),
      timeLength: Date.now() - sTime,
    };
    const data = dayjs(Date.now()).format('YYYY-MM-DD HH:mm:ss') + '[httpLog]' + JSON.stringify(log) + '\r\n';
    fs.appendFileSync(ctx.app.baseDir + '/' + options.fileName, data);
  };
};
```

写好了一个中间件, 就需要应用到项目中去, 在 `config.default.js` 文件中

```js
module.exports = {
    ...
    config.httpLog = {
        fileName: 'httpLog.log'
    }
    config.middleware = [ 'httpLog' ]
}
```



### 插件的创建

#### not-found 插件实现

首先创建`/lib/plugin/egg-notFound/app`文件夹, 然后创建`package.json`文件

```json
{
 "name": "egg-notFound",
  "eggPlugin": {
      "name": "notFound"
  }
}
```

然后写业务代码逻辑

```js
//...app/middleware/notFound.js
'use strict';

module.exports = () => {
    return async (ctx, next) => {
        const bool = ctx.app.router.stack.semo(item => {
            return item.regexp.text(ctx.request.url)
        })
        if (bool) {
            await next()
        } else {
            ctx.body = {
                code: 404,
                errMsg: "我可没写过这个接口,你不会单词拼错了把"
            }
        }
    }
}
```

接下来通过配置`app.js 和 plugin.js` 将插件应用到项目中去

```js
// plugin.js
exports.notFound = {
    enable: true,
    path: path.join(__dirname, '../lib/plugin/egg-notFound')
}


// app.js
module.exports = app => {
  app.config.coreMiddleware.unshift('notFound');
}
```



#### egg-auth 插件

借助了 `egg-token`插件 做权限校验 其他的和 上面的是一样的

```js
// lib/plugin/egg-auth/app/moduleware/auth.js
module.exports = options => {
  return async (ctx, next) => {
    const exclude = options.exclude;
    const url = ctx.request.url;
    const pass = exclude.some(item => {
      return item === url;
    });
    if (pass) {
      await next();
    } else {
      try {
        // ctx.token 是 extend/context.js 扩展的方法
        const tokenInfo = ctx.app.jwt.verify(ctx.token, ctx.app.config.jwt.secret);
        ctx.tokenInfo = tokenInfo;
        await next();
      } catch (error) {
        if (error.message === 'jwt expired') {
          ctx.body = {
            code: 1001,
            errMsg: '你的这个token过期了,麻烦你重新登录下',
          };
          ctx.status = 401;
          return;
        }
        ctx.body = {
          code: 401,
          errMsg: 'token错误,或者你还没有登录',
        };
        ctx.status = 401;
        return;
      }
    }
  };
};
```



### 全局的统一错误处理

首先 我们把错误分为 已知错误 和 未知错误, 其中的已知错误 是我们自己暴露出去的 , 我们先定义一个全局的已知错误文件

```js
// http_exceptions.js
'use strict';
class BaseExceptions extends Error {
  constructor({ code = 1000, errMsg = '', status = 400 }) {
    super();
    this.message = errMsg;
    this.code = code;
    this.status = status;
  }
}
module.exports = { BaseExceptions };
```

可以通过 `throw new BaseExceptions({ errMsg: '更新失败' })` 的方式 暴露出一个错误, 然后定义一个中间件 通过 `try/catch`来捕获全局错误 然后统一处理

```js
// ..middleware/handleError.js
const { BaseExceptions } = require('../exceptions/http_exceptions');
module.exports = () => {
  return async (ctx, next) => {
    try {
      await next();
    } catch (error) {
      // 全局统一 错误处理
      let status = error.status || 500;
      const result = {};
      if (error instanceof BaseExceptions) {
        result.errMsg = error.message;
        result.code = error.code;
        status = error.status;
      } else {
        if (status === 422) {
            result.errMsg = '参数校验失败'
            result.code = 1000
        } else {
           result.errMsg = ctx.app.config.env === 'prod' ? '我靠,有BUG 快跑' : error.message;
        	result.code = 1000; 
        }
      }
      ctx.body = result;
      ctx.status = status;
    }
  };
};
```

这样就可以监听 全局的错误了, 为了方便使用 还可以封装一个`BaseController`来方便使用

```js
// .../controller/base.js
const Controller = require('egg').Controller;
const { BaseExceptions } = require('../exceptions/http_exceptions');

class BaseController extends Controller {
  success(data) {
    const { ctx } = this;
    ctx.status = 200;
    const result = {
      code: 200,
      errMsg: '操作成功',
    };
    if (data) {
      result.data = data;
    }
    ctx.body = result;
  }

  error({ code = 1000, errMsg = '', status = 400 }) {
    throw new BaseExceptions({ code, errMsg, status });
  }
}

module.exports = BaseController;
```

 然后在实际的应用中直接使用这个`BaseController`

```js
// .../controller/home.js
'use strict';
const BaseController = require('./base');

class HomeController extends BaseController {
  async test() {
    this.error({ status: 400, errMsg: '报错了哦' });
  }
}
module.exports = HomeController;
```

nice 感觉瞬间就方便了一大堆啊



### 常见插件的使用

+ egg-validate
+ egg-jwt
+ md5
+ egg-sequelize

#### 参数校验

```shell
npm i egg-validate -S
```

配置和使用

```js
// plugin.js 配置
exports.validate = {
    enable: true,
    package: 'egg-validate'
}

// 使用方式 有两种
// 第一种
const rule = { title: { required: true, type: string} }
ctx.validate(rule,ctx.request.body)
```



#### egg-jwt使用

```shell
npm i egg-jwt -S
```

基本配置和使用

```js
//plugin.js
exports.jwt = {
    enable: true,
    package: 'egg-jwt'
}
//config.default.js
config.jwt = {
  	secret: 'miyao'
}
// 生成 token
const token = app.jwt.sign({ userId: 1 }, app.config.jwt.secret , { expiresIn: 60 * 60 * 1 })
// 解析 校验 token
try {
    const params = ctx.app.jwt.verify(token, ctx.app.config.jwt.secret)
} catch (error) {
    if(err.message === 'jwt expired') {
        // 过期
    } else {
        // 错误
    }
}
```



#### egg-sequelize 使用

查询文档[Sequelize文档](https://www.sequelize.com.cn/)

```shell
npm i egg-sequelize mysql2 -S
```

##### 配置

```js
// config.default.js
config.sequelize = {
    dialect: 'mysql',
    database: 'blog',
    timezone: '+08:00',
    host: '127.0.0.1',
    port: 3306,
    username: 'root',
    password: '123456',
    define: {
        freezeTableName: true, // 强制表名称 等于模型名称
        timestamps: false,
    },
};
```



##### 创建表

创建在 `app/model`下

```js
'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE, BOOLEAN } = app.Sequelize;
  const User = app.model.define('user', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    username: STRING,
    password: STRING,
    avatar: STRING,
    sign: STRING,
    createTime: DATE,
    updateTime: DATE,
    isDelete: {
      type: BOOLEAN,
      dafaultValue: false,
      get() {
        const val = this.getDataValue('isDelete');
        return val === 1;
      },
      set(val) {
        this.setDataValue('isDelete', val ? 1 : 0);
      },
    },
  });

  return User;
};
```

你可以通过`ctx.model.User`来访问数据库

##### 常见操作

**新增一条数据**

**修改一条数据**

**删除一条数据**

**查询一条数据**

**分页查询**

**联表查询**

