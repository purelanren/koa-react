# koa-react

### 环境准备
`node@6`  `webpack@1` `webpack -globle`

### 编译顺序
1. 先`webpack`打包静态资源
2. 利用`webpack`编译`server.js`，或直接运行已配置命令`npm run build`，需要第一步打包出的html文件
3. `node ./build/server.js` 或者 `npm run start`

### 本地环境
直接运行 `npm run watch`

### 测试环境
1. `NODE_ENV=test webpack --progress`
2. `NODE_ENV=test npm run build`
3. `NODE_ENV=test npm run start`

### 正式环境
1. `NODE_ENV=production webpack --progress`
2. `NODE_ENV=production npm run build`

**注意： 正式环境的静态资源（html）引用方式可能会变化，应该会有真正的静态资源服务器，所以会稍有不同，有疑问请联系前端**
