'use strict';
//引入vue
import Vue from 'vue';

//引入自己的组件
import App from './app.vue';
//按需加载
import Home from './components/home/home.vue';
import Member from'./components/member/member.vue';
import Search from './components/search/search.vue';
import Shopcart from './components/shopcart/shopcart.vue';
import NewsList from './components/news/newsList.vue';
import NewsDetail from './components/news/newsDetail.vue';
import PhotoShare from './components/photoshare/photoshare.vue';
import PhotoDetail from './components/photoshare/photodetail.vue';
import GoodsList from './components/goods/goodslist.vue';
import GoodsDetail from './components/goods/goodsdetail.vue';
import GoodsComment from './components/goods/goodscomment.vue';

//引入第三方包
//引入vue-router组件
import vueRouter from 'vue-router';
Vue.use(vueRouter);

//引入图片预览组件
import vuePicturePreview from 'vue-picture-preview';
Vue.use(vuePicturePreview);

//引入mint-ui组件
import Mint from 'mint-ui';
import 'mint-ui/lib/style.css';
Vue.use(Mint);

//引入mui组件样式
import './static/vendor/mui/dist/css/mui.css';
import './static/css/global.css';

//引入axios
import Axios from 'axios';
Vue.prototype.$ajax = Axios;

//Axios 拦截器用来操作页面为完全加载时的Loading
Axios.interceptors.request.use(function (config) {
    //显示图标
    Mint.Indicator.open({
        text:'加载中...',
        spinnerType:'fading-circle'
    });
    return config;
});
Axios.interceptors.response.use(function (config) {
    //隐藏图标
    Mint.Indicator.close();
    return config;
});

//引入moment组件，定义时间格式的过滤器
import Moment from 'moment';
Vue.filter('convertData',function (value) {
    return Moment(value).format('YYYY-MM-DD');
});

//引入并配置全局组件
import NavBar from './components/common/navBar.vue';//导航栏的全局组件
import Comment from './components/common/comment.vue';  //评论列表的全局组件
Vue.component('navBar',NavBar);
Vue.component('comment',Comment);


//配置路由规则
let router = new vueRouter({
        linkActiveClass:'mui-active',    //底部导航栏选中高亮
        routes:[
            { path:'/', redirect:{name:'home'}},                 //重定向
            { name:'home', path:'/home', component:Home},       //首页
            { name:'member', path:'/member', component: Member}, // 会员页面
            { name:'search', path:'/search', component:Search},  //搜索页面
            { name:'shopcart', path:'/shopcart', component:Shopcart}, // 购物车页面
            { name:'news.list', path:'/news/list', component:NewsList}, //新闻列表页面
            { name:'news.detail', path:'/news/detail', component:NewsDetail}, // 新闻详情页面
            { name:'photo.list', path:'/photo/list', component:PhotoShare},   //图文分享列表页面
            { name:'photo.detail', path:'/photo/detail/:id', component:PhotoDetail}, //图文详情页面
            { name:'goods.list', path:'/goods/list', component:GoodsList},  //购物车列表页面
            { name:'goods.detail', path:'/goods/detail', component:GoodsDetail}, //购物车详情页面
            { name:'goods.comment',path:'/goods/comment',component:GoodsComment}
        ]
    }
);

//创建Vue实例
new Vue({
    el:"#app",
    //引入路由规则
    router,
    render:c => c(App)
});
