<template>
        <!-- 评论内容开始 -->
        <div class="photo-bottom">
            <ul>
                <li class="photo-comment">
                    <div>
                        <span>提交评论</span>
                    </div>
                </li>
                <li class="txt-comment">
                    <textarea v-model="msg"></textarea>
                </li>
                <li>
                    <mt-button @click="sendComment" size="large" type="primary">发表评论</mt-button>
                </li>
                <li class="photo-comment">
                    <div>
                        <span>评论列表</span>
                        <span>{{num}}条评论</span>
                    </div>
                </li>
            </ul>
            <ul class="comment-list">
                <li v-for="(comment,index) in comments" :key="index">
                    {{comment.user_name}}：{{comment.content}} {{comment.add_time|convertDate}}
                </li>
            </ul>
            <mt-button type="danger" size="large" plain @click="loadByPage">加载更多</mt-button>
        <!-- 评论内容结束 -->
    </div>
</template>
<script>
    export default {
        data() {
            return {
                comments: [],//存放评论数据
                msg: '',//发表的评论
                num: '', //评论的条数
                pageIndex:1
            }
        },
        created() {
            //评论操作 开始
            this.loadFirst();
            //评论操作 结束
        },
         methods: {
            //加载初始评论
            loadFirst() {
                this.$ajax.get('src/static/data/photo/comment.json')
                    .then(res => {
                        this.comments = res.data.message;
                        this.num = this.comments.length;
                    })
                    .catch(err => {
                        console.log(err);
                    })
            },
            //发表评论
            sendComment() {
                let data = {
                    "user_name": "匿名用户",
                    "add_time": "2018-7-20",
                    "content": this.msg
                };
                this.comments.unshift(data);
                this.num = this.comments.length;
                this.msg = '';
            },
             loadByPage(){
                 this.$ajax.get('src/static/data/photo/comment' + this.pageIndex +'.json')
                     .then(res=>{
                         //追加
                         this.comments = this.comments.concat(res.data.message);
                         this.num = this.comments.length;
                     })
                     .catch(err=>{
                         console.log(err);
                     })
             },
        }
    }
</script>
<style scoped>
    /*评论样式 开始*/
    .photo-comment > div span:nth-child(1) {
        float: left;
        font-weight: bold;
        margin-left: 5px;
    }

    .photo-comment > div span:nth-child(2) {
        float: right;
    }

    .photo-comment {
        height: 30px;
        border-bottom: 1px solid rgba(0, 0, 0, 0.4);
        line-height: 30px;
        margin-bottom: 5px;
    }

    .txt-comment {
        padding: 5px 5px;
    }

    .txt-comment textarea {
        margin-bottom: 5px;
    }

    .comment-list li {
        border-bottom: 1px solid rgba(0, 0, 0, 0.2);
        padding-bottom: 5px;
        margin-bottom: 5px;
        padding-left: 5px;
    }

    li {
        list-style: none;
    }

    ul {
        margin: 0;
        padding: 0;
    }

    /*评论样式 结束*/
</style>