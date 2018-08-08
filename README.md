### 安装包依赖
1. webpack相关的包 webpack,html-webpack-plugin
2. CSS样式需要的包 css-loader,style-loader,Less,Less-loader,autoprefixer-loader,mint-ui
3. 编译ES6需要的包babel-loader,babel-core,babel-preset-es2015,babel-plugin-transform-runtime
4. 文件和路径 url-loader,file-loader
5. 编译vue需要的包 vue-loader,vue-template-compiler,vue-preview,vue,vue-router
6. 获取时间信息 monent
7. 使用http axios

### 运行
1. 首先根据package.json文件利用npm安装项目所需要的包，在终端输入代码 `npm install`
2. 然后根据webpack中的设置在终端输入 `npm run dev` 运行项目，窗口大小360*640

### 功能实现
1. 项目可以分为4个主界面:首页、会员、购物车和查找页面。
2. 首页可以实现新闻资讯、图文分享和商品展示功能：
    新闻咨询可以跳转到新闻列表页面（将新闻列表导航栏设置为全局组件可供其他页面使用）；点击新闻列表可跳转到新闻详情页面获取新闻详细信息。
    图文分享可以跳转到图文列表页面，具有懒加载的功能；点击图文获取图文详情，实现了图片预览、发表评论和加载更多的功能。
    商品展示可以跳转到商品列表页面，实现懒加载、下拉刷新、上拉加载更多功能；点击商品获取商品详情，通过子组件向父组件发送数据是实现加入购物车功能。
3. 购物车页面可以实现对选中商品进行增加和删除操作，并对选中的商品的总价进行计算。

### 遇到的问题和解决方案
1. 由于本项目中没有服务端，无法得到服务端提供的数据。
    将数据存储到本地的json文件中，通过运用axios来访问本地的json数据，但是axios只能通过get来获取json中的数据，所以本项目中通过操作数组的方法实现添加评论。


