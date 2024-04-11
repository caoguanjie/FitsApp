<template>
    <DemoLayout>
        <template #content>
            <van-list class="list">
                <!-- <van-cell v-for="item in list" :key="item.id" :title="item.name" /> -->
                <div class="item clickRipple" v-for="item in list" :key="item.id" @click="gotoPage()">
                    <van-image :src="item.img" />
                    <div class="right">
                        <div class="title">{{ item.name }}</div>
                        <div class="tag">
                            <span v-for="el in item.tag" :key="el">{{ el }}</span>
                        </div>
                        <div class="address">{{ item.address }}</div>
                    </div>
                </div>
            </van-list>
        </template>
    </DemoLayout>
</template>

<script lang='ts' setup>
import DemoLayout from "@/layout/DemoLayout.vue"
import { List as VanList, Image as VanImage } from 'vant';
import { reactive } from "vue";
import { useRouter } from "vue-router";
const router = useRouter()
const list = reactive([
    { id: 1, img: new URL('@/assets/images/demo.jpg', import.meta.url).href, name: '天河院区', tag: ['三级甲等', '综合医院'], address: '广州市黄浦区开创大道111号' },
    { id: 2, img: new URL('@/assets/images/demo.jpg', import.meta.url).href, name: '岭南院区', tag: ['三级甲等', '综合医院'], address: '广州市黄浦区开创大道111号' },
    { id: 3, img: new URL('@/assets/images/demo.jpg', import.meta.url).href, name: '中国院区', tag: ['三级甲等', '综合医院'], address: '广州市黄浦区开创大道111号' },
    { id: 4, img: new URL('@/assets/images/demo.jpg', import.meta.url).href, name: '南沙院区', tag: ['二级甲等', '综合医院'], address: '广州市黄浦区开创大道111号' },
])

function gotoPage() {
    console.log('跳转')
    router.push('/home')
}
</script>
<style lang='scss' scoped>
.list {
    background: #F8F8F8;
    padding: 24px;
    width: 100vw;
    min-height: 100vh;

    height: auto;

    .item {
        display: flex;
        align-items: center;
        background-color: #fff;
        padding: 32px 22px;
        margin-bottom: 24px;
    }

    .right {
        margin-left: 20px;
    }

    .van-image {
        width: 140px;
        height: 140px;
    }

    .title {
        font-size: 30px;
        color: #333333;
        line-height: 42px;
    }

    .tag {
        margin-bottom: 16px;
    }

    .tag>span {
        font-size: 24px;
        color: #333333;
        line-height: 33px;
        padding: 0 12px;
        background: #F5F5F5;
        border-radius: 4px;
        margin-right: 16px;
    }

    .address {
        font-size: 24px;
        color: #999999;
        line-height: 33px;
    }
}
</style>