<template>
    <div>
        <!--home首页轮播图-->
        <mt-swipe :auto="4000">
            <mt-swipe-item v-for="(img,index) in imgs" :key="index"><a href=""><img :src="img.src" alt=""></a></mt-swipe-item>
        </mt-swipe>

        <!--九宫格-->
        <div class="mui-content">
            <ul class="mui-table-view mui-grid-view mui-grid-9">
                <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                    <router-link :to="{name:'news.list'}">
                        <span class="mui-icon mui-icon-home"></span>
                        <div class="mui-media-body">新闻资讯</div>
                    </router-link>
                </li>
                <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                    <router-link :to="{name:'photo.list'}">
                        <span class="mui-icon mui-icon-email"></span>
                        <div class="mui-media-body">图文分享</div>
                    </router-link>
                </li>
                <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                    <router-link :to="{name:'goods.list'}">
                        <span class="mui-icon mui-icon-chatbubble"></span>
                        <div class="mui-media-body">商品展示</div>
                    </router-link>
                </li>
                <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
                    <span class="mui-icon mui-icon-location"></span>
                    <div class="mui-media-body">留言反馈</div></a></li>
                <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
                    <span class="mui-icon mui-icon-search"></span>
                    <div class="mui-media-body">搜索资讯</div></a></li>
                <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
                    <span class="mui-icon mui-icon-phone"></span>
                    <div class="mui-media-body">联系我们</div></a></li>
            </ul>
        </div>
    </div>
</template>
<script>
    export default {
        data(){
             return {
                 imgs:[] //轮播图列表
            }
        },
        created(){
            this.$ajax.get('/src/static/data/home/homelunbo.json')
                .then(res => {
                    this.imgs = res.data.message;
                })
                .catch(err => {
                    console.log(err);
                })
        }

    }
</script>
<style scoped>
    /*轮播图样式*/
    .mint-swipe{
        width: 360px;
        height: 220px;
    }
    .mint-swipe img{
        width: 360px;
        height: 100%;
    }

    /*九宫格样式*/
     .mui-table-view.mui-grid-view.mui-grid-9{
         background-color: white;
         border: 0;
         margin-top: 0;
     }

    .mui-table-view-cell.mui-media.mui-col-xs-4.mui-col-sm-3{
        border: 0;
    }
    .mui-icon{
        width: 50px;
        height: 50px;
    }

    .mui-icon-home:before,
    .mui-icon-email:before,
    .mui-icon-chatbubble:before,
    .mui-icon-location:before,
    .mui-icon-search:before,
    .mui-icon-phone:before{
        content:'';
    }

    .mui-icon-home{
        background-image:url(/src/static/img/news.png);
        background-repeat: round;
    }
    .mui-icon-email{
        background-image:url(/src/static/img/picShare.png);
        background-repeat: round;
    }
    .mui-icon-chatbubble{
        background-image:url(/src/static/img/goodShow.png);
        background-repeat: round;
    }
    .mui-icon-location{
        background-image:url(/src/static/img/feedback.png);
        background-repeat: round;
    }
    .mui-icon-search{
        background-image:url(/src/static/img/search.png);
        background-repeat: round;
    }
    .mui-icon-phone{
        background-image:url(/src/static/img/callme.png);
        background-repeat: round;
    }

</style>