<template>
    <div class="tmpl">
        <!--新闻详情-->
        <nav-bar title="新闻详情"></nav-bar>

        <!--新闻详情列表-->
        <div class="news-title">
            <p v-html="newsDetail.title"></p>
            <div>
                <span>{{newsDetail.click}}次点击</span>
                <span>分类:民生经济</span>
                <span>{{newsDetail.add_time | convertData}}</span>
            </div>
        </div>
        <div class="news-content" v-html="newsDetail.content"></div>
    </div>
</template>
<script>
    export default {
        data(){
            return {
                newsDetail:{}, //新闻详情数据
            }
        },
        created(){
            //获取路由参数
            let id = this.$route.query.id;  //由于请求的是本地json数据 所以未用到path方法
            //请求本地新闻详情的json数据
            this.$ajax.get('/src/static/data/news/newsDetail.json')
                .then(res => {
                   this.newsDetail = res.data.message[id];
                })
                .catch(err => {
                    console.log(err);
                })
        }
    }

</script>
<style scoped>
    .news-title p {
        color: #0a87f8;
        font-size: 20px;
        font-weight: bold;
    }

    .news-title span {
        margin-right: 30px;
    }

    .news-title {
        margin-top: 5px;
        border-bottom: 1px solid rgba(0, 0, 0, 0.2);
    }


    /*主体文章的左右距离*/
    .news-content {
        padding: 10px 5px;
    }

    /*文章底部距离*/
    .news-content{
        margin-bottom: 50px;
    }
</style>
