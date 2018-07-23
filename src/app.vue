<template>
    <div>
        <!--头部内容-->
        <mt-header title="信息管理系统"></mt-header>
        <transition name="router" mode="out-in">
            <router-view></router-view>
        </transition>
        <lg-preview></lg-preview>
        <!--底部内容-->
        <nav class="mui-bar mui-bar-tab">
            <router-link class="mui-tab-item" :to="{name:'home'}">
                <span class="mui-icon icon-shouye1"></span>
                <span class="mui-tab-label">首页</span>
            </router-link>
            <router-link class="mui-tab-item" :to="{name:'member'}">
                <span class="mui-icon icon-huiyuan1"></span>
                <span class="mui-tab-label">会员</span>
            </router-link>
            <router-link class="mui-tab-item" :to="{name:'shopcart'}">
                <span class="mui-icon icon-gouwucheman"><span class="mui-badge">{{number}}</span></span>
                <span class="mui-tab-label">购物车</span>
            </router-link>
            <router-link class="mui-tab-item" :to="{name:'search'}">
                <span class="mui-icon mui-icon-search"></span>
                <span class="mui-tab-label">查找</span>
            </router-link>
        </nav>
    </div>
</template>
<script>
    import connect from './components/common/connect';
    import prodTools from './components/common/prodTools';
    export default {
        data(){
             return {
                     number : prodTools.getTotalCount()
            }
        },
        created(){
            //监听子组件发送的消息
            connect.$on('addShopcart',num => {
                this.number += num;
            })
        },
        methods:{

        }
    }
</script>
<style>
    .router-enter-active,.router-leave-active{
        transition:opacity .3s;
    }
    .router-enter,.router-leave-to{
        opacity:0 ;
    }
</style>