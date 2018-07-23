<template>
    <div class="tmpl" style="overflow:scroll" >   <!--overflow属性必须加上-->
        <!--商品列表-->
        <nav-bar title="商品列表" ></nav-bar>

        <!--商品列表数据:上拉加载，下拉刷新和加载更多功能-->
        <mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :auto-fill="false" ref="loadmore">
            <ul class="mui-table-view mui-grid-view">
                <li v-for="prod in pageList" :key="prod.id" class="mui-table-view-cell mui-media mui-col-xs-6">
                    <router-link :to="{name:'goods.detail'}">
                        <img class="mui-media-object" :src="prod.img_url">
                        <div class="mui-media-body">{{prod.title}}</div>
                        <div class="desc">
                            <div class="sell">
                                <span>￥{{prod.sell_price}}</span>
                                <s>￥{{prod.market_price}}</s>
                            </div>
                            <div class="detail">
                                <div class="hot">
                                    热卖中
                                </div>
                                <div class="count">
                                    剩{{prod.stock_quantity}}件
                                </div>
                            </div>
                        </div>
                    </router-link>
                </li>
            </ul>
        </mt-loadmore>
    </div>
</template>
<script>
    export default {
        data(){
            return {
                pageList:[],
                allLoaded:false
            }
        },
        created(){
            //发起请求获取商品数据
            this.loadMore();
        },
        methods:{
            loadBottom:function() { //组件提供的上拉触发方法
                // 上拉加载
                this.loadMoreConcat();
                this.$refs.loadmore.onBottomLoaded();// 固定方法，查询完要调用一次，用于重新定位
            },

            loadTop:function() { //组件提供的下拉触发方法
                //下拉加载
                this.$refs.loadmore.onTopLoaded();// 固定方法，查询完要调用一次，用于重新定位
            },

            loadMore(){
                //发起请求获取数据填充到页面
            this.$ajax.get('/src/static/data/goods/goodsList.json')
                .then(res => {
                    this.pageList = res.data.message;
                })
                .catch(err => {
                    console.log(err);
                })
            },

            loadMoreConcat(){
                //发起请求加载更多数据
                this.$ajax.get('/src/static/data/goods/goodsList1.json')
                    .then(res => {
                        this.pageList = this.pageList.concat(res.data.message);
                        //判断是否还有数据
                        if(res.data.message.length != 10){
                            this.allLoaded = true;
                        }
                    })
                    .catch(err => {
                        console.log(err);
                    })
            }
        }
    }

</script>
<style scoped>
    .mui-table-view.mui-grid-view .mui-table-view-cell > a:not(.mui-btn) {
        margin: 0;
        padding: 0;
        border: 1px solid #5c5c5c;
        box-shadow: 0 0 4px #666;
    }

    .sell > span {
        float: left;
        color: red;
        text-align: left;
    }

    .detail >.hot {
        float: left;
        text-align: left;
        font-size: 15px;
    }

    .detail >.count {
        float: right;
        text-align: right;
        font-size: 15px;
    }


    /*撑开，去除浮动没有的高度*/

    .detail {
        overflow: hidden;
    }

    .desc {
        color: rgba(92, 92, 92, 0.8);
        background-color: rgba(0, 0, 0, 0.2);
    }
    .tmpl{
        height: 577px;
    }

    /*.mui-table-view.mui-grid-view{*/
        /*margin-bottom: 50px;*/
    /*}*/

    .mui-table-view.mui-grid-view .mui-table-view-cell .mui-media-object {
        height: 200px;
    }
</style>
