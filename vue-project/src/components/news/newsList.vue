<template>
    <div class="tmpl">
        <!--新闻列表-->
        <nav-bar title="新闻列表"></nav-bar>

        <!-- MUI 图文列表 -->
        <ul class="mui-table-view">
            <li v-for="news in newsList" :key="news.id" class="mui-table-view-cell mui-media">
                <router-link :to="{name:'news.detail',query:{id:news.id}}">
                    <img class="mui-media-object mui-pull-left" src="/src/static/img/a.jpg">
                    <div class="mui-media-body">
                        <span v-text="news.title"></span>
                        <div class="news-desc">
                            <p>点击数:{{news.click}}</p>
                            <p>发表时间:{{news.add_time | convertData}}</p>
                        </div>
                    </div>
                </router-link>
            </li>
        </ul>
    </div>
</template>
<script>
    export default {
        data(){
            return {
                newsList:[],//新闻列表数据
            }
        },
        created(){
            //请求本地新闻列表的json数据
            this.$ajax.get('/src/static/data/news/newsList.json')
                .then(res => {
                    this.newsList = res.data.message;
                })
                .catch(err=>{
                    console.log(err);
                })
        },
        methods:{
        }
    }

</script>
<style scoped>
    .mui-media-body p {
        color: #0bb0f5;
    }

    .news-desc p:nth-child(1) {
        float: left;
    }

    .news-desc p:nth-child(2) {
        float: right;
    }
    .mui-table-view{
        margin-bottom: 50px;
    }
</style>