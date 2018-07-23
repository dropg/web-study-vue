<template>
    <div class="tmpl">
        <nav-bar title="购物车"></nav-bar>
        <div class="pay-detail">
            <ul>
                <li v-for="(goods,index) in goodsList" :key="index" class="p-list">
                    <mt-switch v-model="goods.isPicked"></mt-switch>
                    <img :src="goods.thumb_path">
                    <div class="pay-calc">
                        <p v-text="goods.title"></p>
                        <div class="calc">
                            <span>￥{{goods.sell_price}}</span>
                            <span @click="sub(index)">-</span>
                            <span>{{goods.num}}</span>
                            <span @click="add(index)">+</span>
                            <a href="javascript:" @click="deleteid(index)">删除</a>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
        <div class="show-price">
            <div class="show-1">
                <p>总计(不含运费):</p>
                <span>已经选择商品{{payment.num}}件，总价￥{{payment.sum}}元</span>
            </div>
            <div class="show-2">
                <mt-button type="danger" size="large">去结算</mt-button>
            </div>
        </div>
    </div>
</template>
<script>
    //引入商品操作工具对象
    import prodTools from '../common/prodTools.js';
    //通知底部变更数据
    import connect from '../common/connect.js';
    export default {
        data(){
            return {
                goodsList:[],//商品数组数据
            }
        },
        created(){
            //获取local的数据
            let prods = prodTools.getProds();

            //判断没有商品时
            if(Object.keys(prods).length === 0) return;

            this.$ajax.get('/src/static/data/shopcart/shopcart.json')
                .then(res => {
                    this.goodsList = res.data.message;
                        this.goodsList.forEach((ele,index)=>{
                            if(prods[ele.id]){
                                this.$set(ele,'num',prods[ele.id]);
                                this.$set(ele,'isPicked',true);
                            }
                })
                .catch(err => {
                    console.log(err);
                })
        })
    },
        methods:{
            add(i){
                this.goodsList[i].num ++;
                connect.$emit('addShopcart',1);
                prodTools.AddOrUpdate({
                    id:this.goodsList[i].id,
                    num:1
                })
            },
            sub(i){
                if(this.goodsList[i].num <= 1) return;
                this.goodsList[i].num --;
                connect.$emit('addShopcart',-1);
                prodTools.AddOrUpdate({
                    id:this.goodsList[i].id,
                    num:-1
                })
            },
            deleteid(i){
                //删除内存和storage
                let goods = this.goodsList[i];
                prodTools.delete(goods.id);
                connect.$emit('addShopcart',-goods.num);

                this.goodsList.splice(i,1);
            }
        },
        computed:{
            payment(){
                //1.如果商品没有被选中，不参与计算
                //总金额 = 单价 * 价格
                let num = 0;
                let sum = 0;
                this.goodsList.forEach((ele) => {
                    if(ele.isPicked){
                        sum += ele.num * ele.sell_price;
                        num += ele.num;
                    }
                });
                return {
                    num,sum
                }
            }
        }
    }

</script>
<style scoped>
    .pay-detail ul li {
        list-style: none;
        border-bottom: 1px solid rgba(0, 0, 0, 0.2);
        margin-bottom: 3px;
    }

    .pay-detail ul {
        padding-left: 5px;
        margin-top: 5px;
    }

    .pay-detail ul li img {
        width: 80px;
        height: 80px;
        display: inline-block;
        vertical-align: top;
        margin-top: 10px;
    }

    .pay-detail ul li >:nth-child(1),
    .pay-detail ul li >:nth-child(3) {
        display: inline-block;
    }

    .pay-calc p {
        display: inline-block;
        width: 250px;
        overflow: hidden;
        color: blue;
        font-size: 15px;
        margin-bottom: 10px;
    }

    .pay-detail ul li >:nth-child(1) {
        line-height: 80px;
    }

    .calc:nth-child(1) {
        color: red;
        font-size: 20px;
    }

    .calc span:not(:nth-child(1)) {
        border: 1px solid rgba(0, 0, 0, 0.3);
        display: inline-block;
        width: 20px;
        text-align: center;
    }

    .calc a {
        margin-left: 20px;
    }

    .show-1,
    .show-2 {
        display: inline-block;
    }

    .show-1,
    .show-2 {
        margin-left: 30px;
    }

    .show-price {
        background-color: rgba(0, 0, 0, 0.2);
    }
</style>
