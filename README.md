### Installation dependency package
1. Webpack related package: webpack,html-webpack-plugin
2. Packages required for CSS styles: css-loader,style-loader,Less,Less-loader,autoprefixer-loader,mint-ui
3. Packages needed for compile ES6: babel-loader,babel-core,babel-preset-es2015,babel-plugin-transform-runtime
4. File and path: url-loader,file-loader
5. Compile the vue: vue-loader,vue-template-compiler,vue-preview,vue,vue-router
6. Get the time: monent
7. Use http: axios

### Run
1. First, according to the package.json file, use the package required by the npm installation project, and enter the code `npm install` in the terminal.
2. Then enter `npm run dev` to run the project at the terminal according to the settings in webpack.

### Function realization
1. The project can be divided into four main interfaces: home page, member, shopping cart and search page.
2. The home page can realize news information, graphic sharing and product display functions:<br/>
(a) News consultation can jump to the news list page (set the news list navigation bar as a global component for other pages); click on the news list to jump to the news details page to get news details.<br/>
(b) Graphic and text sharing can jump to the graphic list page, with lazy loading function; click on the graphic to get the graphic details, realize the image preview, comment and load more functions.<br/>
(c) Product display can jump to the product list page, realize lazy loading, pull-down refresh, pull-up and load more functions; click on the product to get the product details, and send the data to the parent component through the sub-component is to realize the function of adding the shopping cart.
3. The shopping cart page can add and delete selected items and calculate the total price of the selected items.

### Problems and solutions encountered
1. Since there is no server in this project, the data provided by the server cannot be obtained.<br/>
Store the data in a local json file, and use axios to access the local json data, but axios can only get the data in json through get, so in this project, add comments by operating the array method.

2. Due to the plugin version upgrade, the usage was changed or was directly discarded.<br/>
For example, the autoprefixer-loader that automatically adds multiple prefixes to css to optimize browser compatibility issues is deprecated. Now use postcss-loader with autoprefixer plugin, and configure postcss.config.js file in the root directory.

### 安装依赖包
1. webpack相关的包 webpack,html-webpack-plugin
2. CSS样式需要的包 css-loader,style-loader,Less,Less-loader,autoprefixer-loader,mint-ui
3. 编译ES6需要的包babel-loader,babel-core,babel-preset-es2015,babel-plugin-transform-runtime
4. 文件和路径 url-loader,file-loader
5. 编译vue需要的包 vue-loader,vue-template-compiler,vue-preview,vue,vue-router
6. 获取时间信息 monent
7. 使用http axios

### 运行
1. 首先根据package.json文件利用npm安装项目所需要的包，在终端输入代码 `npm install`
2. 然后根据webpack中的设置在终端输入 `npm run dev` 运行项目.

### 功能实现
1. 项目可以分为4个主界面:首页、会员、购物车和查找页面。
2. 首页可以实现新闻资讯、图文分享和商品展示功能：<br/>
    (a)新闻咨询可以跳转到新闻列表页面（将新闻列表导航栏设置为全局组件可供其他页面使用）；点击新闻列表可跳转到新闻详情页面获取新闻详细信息。<br/>
    (b)图文分享可以跳转到图文列表页面，具有懒加载的功能；点击图文获取图文详情，实现了图片预览、发表评论和加载更多的功能。<br/>
    (c)商品展示可以跳转到商品列表页面，实现懒加载、下拉刷新、上拉加载更多功能；点击商品获取商品详情，通过子组件向父组件发送数据是实现加入购物车功能。
3. 购物车页面可以实现对选中商品进行增加和删除操作，并对选中的商品的总价进行计算。

### 遇到的问题和解决方案
1. 由于本项目中没有服务端，无法得到服务端提供的数据。<br/>
    将数据存储到本地的json文件中，通过运用axios来访问本地的json数据，但是axios只能通过get来获取json中的数据，所以本项目中通过操作数组的方法实现添加评论。

2. 由于插件版本升级，导致用法改变或者被直接弃用。<br/>
    如：为css自动添加多种前缀，优化浏览器兼容问题的autoprefixer-loader被弃用，现在要使用postcss-loader并配合autoprefixer插件使用，并在需要在根目录下配置postcss.config.js文件。

