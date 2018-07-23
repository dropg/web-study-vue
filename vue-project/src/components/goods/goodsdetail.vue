<template>
    <div>
        <nav-bar title="商品详情"></nav-bar>
        <div class="outer-swiper">
            <div class="swiper">
                <!--商品轮播图-->
                <mt-swipe :auto="4000">
                    <mt-swipe-item class="pic" v-for="img in imgs">
                        <a href=""><img style="width: 340px;height: 200px;" :src="img.src" alt=""></a>
                    </mt-swipe-item>
                </mt-swipe>
            </div>
        </div>

        <div class="product-desc">
            <ul>
                <li><span class="product-desc-span">
                    {{prodInfo.title}}
                </span></li>
                <li class="price-li">市场价：
                    <s>￥{{prodInfo.market_price}}</s> 销售价：<span>￥{{prodInfo.sell_price}}</span></li>
                <li class="number-li">购买数量：<span @click="substract">-</span><span>{{num}}</span><span @click="add">+</span></li>
                <li>
                    <mt-button type="primary">立即购买</mt-button>
                    <mt-button type="danger" @click="addShopcart">加入购物车</mt-button>
                </li>
            </ul>
        </div>

        <!--加入购物车动画效果-->
        <transition name="ball" @after-enter="afterEnter">
            <div class="ball" v-if="isShow"></div>
        </transition>

        <!--商品详情列表-->
        <div class="product-props">
            <ul>
                <li>商品参数</li>
                <li>商品货号：{{prodInfo.goods_no}}</li>
                <li>库存情况：{{prodInfo.stock_quantity}}件</li>
                <li>上架时间：{{prodInfo.add_time | convertData}}</li>
            </ul>
        </div>
        <div class="product-info">
            <ul>
                <li>
                    <mt-button type="primary" size="large" plain>图文介绍</mt-button>
                </li>
                <li>
                    <mt-button type="danger" size="large" plain @click="showProdComment">商品评论</mt-button>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
    import connect from '../common/connect';
    import prodTools from '../common/prodTools';
    export default {
        data(){
            return {
                isShow:false,
                prodInfo:{},
                imgs:[],
                detail:87,
                num: 1
            }
        },
        created() {
            //获取信息图片
            this.goodsDetailUrl = '/src/static/img/goods/huaweiP20.json';

            //合并请求
            this.$ajax.all([
                this.$ajax.get('src/static/data/goods/goodsDetail'+ this.detail + '.json'),
                this.$ajax.get('src/static/data/goods/goodspic.json')
            ])
                .then(this.$ajax.spread((resInfo,resImgs)=> {
                this.prodInfo = resInfo.data.message;
                this.imgs = resImgs.data.message;
                console.log(this.imgs[0].src);
            }))
                .catch(err => {
                        console.log(err);
                });
        },
        methods:{
            add(){
                if(this.num >= this.prodInfo.stock_quantity) return;
                this.num ++;
            },
            substract(){
                if(this.num <= 0) return;
                this.num --;
            },
            //组件之间的消息发送
            addShopcart(){
                connect.$emit('addShopcart',this.num);

                //小球动画显示
                this.isShow = true;

                //向购物车中添加商品
                prodTools.AddOrUpdate(
                    {
                        id:this.prodInfo.id,
                        num :this.num
                    });
                console.log(prodTools.getProds());
            },
            //处理过渡效果进入之后的效果
            afterEnter(){
                this.isShow = false;
            },
            showProdComment(){
                this.$router.push({
                    name:'goods.comment'
                })
            }
        }
    }
</script>
<style scoped>
    .ball-enter-active {
        animation: bounce-in .5s;
    }

    @keyframes bounce-in {
        0% {
            transform: translate3d(0, 0, 0);
        }
        50%{
            transform: translate3d(120px,-50px,0);
        }
        75%{
            transform: translate3d(140px,0,0);
        }
        100%{
            transform: translate3d(100px,300px,0);
        }
    }

    .swiper {
        border: 1px solid rgba(0, 0, 0, 0.2);
        margin: 8px;
        width: 95%;
        border-radius: 15px;
        overflow: hidden;
        height: 200px;
    }

    .outer-swiper,
    .product-desc,
    .product-props,
    .product-info {
        border-radius: 5px;
        border: 1px solid rgba(0, 0, 0, 0.2);
        margin: 3px;
    }


    /*请ulpadding*/

    .outer-swiper ul,
    .product-desc ul,
    .product-props ul,
    .product-info ul {
        padding: 0;
    }

    .product-desc ul li,
    .product-props ul li,
    .product-info ul li {
        list-style: none;
        font-size: 15px;
        color: rgba(0, 0, 0, 0.5);
        margin-top: 8px;
    }

    .product-desc ul >:nth-child(1) span {
        color: blue;
        font-size: 22px;
        font-weight: bold;
    }

    .product-desc ul >:nth-child(1) {
        border-bottom: 1px solid rgba(0, 0, 0, 0.5);
    }

    .product-desc ul,
    .product-info ul,
    .product-props ul {
        padding-left: 10px;
    }

    .price-li span {
        color: red;
        font-size: 25px;
    }

    .price-li s {
        margin-right: 16px;
    }


    /*加减*/

    .number-li span {
        display: inline-block;
        border: 2px solid rgba(0, 0, 0, 0.1);
        width: 25px;
    }


    /*商品参数*/

    .product-props ul >:nth-child(1) {
        text-align: left;
    }

    .product-props ul:not(:nth-child(1)) {
        margin-left: 40px;
    }

    .product-info ul {
        margin-bottom: 70px;
        padding: 0 5px;
    }

    .number-li span {
        text-align: center;
    }

    .number-li >:nth-child(2) {
        width: 40px;
    }

    .ball {
        border-radius: 50%;
        background-color: red;
        width: 24px;
        height: 24px;
        position: absolute;
        top: 440px;
        left: 120px;
        display: inline-block;
        z-index: 9999;
    }
</style>
