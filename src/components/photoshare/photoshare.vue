<template>
    <div class="tmpl">
        <!--图文分享-->
        <nav-bar title="图文分享"></nav-bar>

        <!--图文分享列表-->
        <div class="photo-list">
            <ul>
                <li v-for="img in imgs" :key="img.id">
                    <router-link :to="{name:'photo.detail',params:{id:img.id}}">
                        <!-- 懒加载 -->
                        <img v-lazy="img.img_url">
                        <p>
                            <span v-text="img.title"></span>
                            <br>
                            <span v-text="img.zhaiyao"></span>
                        </p>
                    </router-link>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                imgs: []  //图文分享图片
            }
        },
        created() {
            //请求本地的图文列表数据
            this.$ajax.get('/src/static/data/photo/photoList.json')
                .then(res => {
                    this.imgs = res.data.message;
                })
                .catch(err => {
                    console.log(err);
                })
        }
    }
</script>
<style>
    .photo-header li {
        list-style: none;
        display: inline-block;
        margin-left: 10px;
        height: 30px;
    }

    .photo-header ul {
        /*强制不换行*/
        white-space: nowrap;
        overflow-x: auto;
        padding-left: 0;
        margin: 5px;
    }

    /*下面的图片*/
    .photo-list li {
        list-style: none;
        position: relative;
    }

    .photo-list li img {
        width: 100%;
        height: 230px;
        vertical-align: top;
    }

    .photo-list ul {
        padding-left: 0;
        margin: 0;
    }

    .photo-list p {
        position: absolute;
        bottom: 0;
        color: white;
        background-color: rgba(0, 0, 0, 0.3);
        margin-bottom: 0;
    }

    .photo-list p span:nth-child(1) {
        font-weight: bold;
        font-size: 16px;
    }

    /*图片懒加载的样式*/
    image[lazy=loading] {
        width: 40px;
        height: 300px;
        margin: auto;
    }
    .photo-list{
        margin-bottom: 50px;
    }

</style>
