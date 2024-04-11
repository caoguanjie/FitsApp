<template>
    <base-layout :page-title=modalTitle template="#content" :is-show-back-btn=false>
        <template #actionsBtn>
            <ion-button @click="closeModal()">取消</ion-button>
        </template>
        <template #content>
            <div class="tips">{{ tipsText }}</div>
            <div class="gesture_div">
                <canvas id='gesture' width="350" height="350"></canvas>
            </div>
        </template>
    </base-layout>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import storage from '@/utils/storage';
import { Md5 } from "ts-md5/dist/md5";
import { toast } from "@/utils/message/toast";
import { useAppStore } from "@/store/modules/app";
import { modalController } from "@ionic/core";
import { IonButton } from "@ionic/vue";
import eventBus from "@/utils/common/EventBus";
import BaseLayout from "@/components/Layout/BaseLayout.vue"
import GesturePassword from "@/components/GesturePassword/GesturePassword";

const appStore = useAppStore();

let props = withDefaults(defineProps<{ status?: string }>(), {
    status: 'check',// 手势状态两种：验证和设置
})

let modalTitle = ref("设置手势密码图案");
let tipsText = ref("请绘制解锁图案");// 提示语
let gesture: any;// 手势实例
let errorSum = appStore.gesture.checkingMaxFrequency;// 最大错误次数
let errorNum = ref(0);// 错误计算
let tempGesture = ref();// 中间变量，用于处理手势确认绘制


const closeModal = () => {
    // eventBus.emit("gesturelogin");
    modalController.dismiss();
}

const initGesture = () => {
    const config = {
        id: 'gesture',
        width: 350,
        height: 350,
        onChange: props.status == 'check' ? checkChange : setPwdChange
    }
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    gesture = new GesturePassword(config)
}

// 验证手势密码时发生变化
const checkChange = (data: any) => {
    // 根据本地存储错误密码次数以及手势密码进行判断
    let myData = data.join(',');// 转字符串好判断
    if (Md5.hashStr(myData) == storage.get("gesture")) {
        toast("验证手势密码成功")
        closeModal();
        errorNum.value = 0;
        eventBus.emit("gesturelogin");
    } else {
        gesture.setLineColor("red");
        errorNum.value++;
        console.log(errorNum.value);
        if (errorSum - errorNum.value > 0) {
            tipsText.value = "图案错误,剩余可登录次数" + (errorSum - errorNum.value) + "次";
        } else {
            tipsText.value = "手势解锁已锁定，请重新登录"
            gesture.resetCanvas();
            storage.set("gesturelock", true);
            closeModal();
            toast("手势密码登录已锁定，请使用其他登录方式")
        }
    }
}

// 设置手势密码时发生变化
const setPwdChange = (data: any) => {
    console.log(data);
    let myData = data.join(',');// 转字符串好判断
    // 当连接点少于四个时，标红提示
    if (data.length < 4) {
        gesture.setLineColor("red");
        tipsText.value = "至少连接绘制四个点"
        // if (tempGesture.value) {
        //     tempGesture.value = "";
        // }
    } else {
        if (tempGesture.value) {
            // 对比当前数组与中间变量是否一致，相同则设置成功
            if (myData == tempGesture.value) {
                toast("设置手势密码成功")
                closeModal();// 关闭modal
                // 保存手势密码到本地
                console.log(Md5.hashStr(myData));
                storage.set("gesture", Md5.hashStr(myData));
                storage.set("gesturelock", "");
                console.log(storage.get("gesture"));
            } else {
                gesture.resetCanvas()
                tempGesture.value = "";
                tipsText.value = "与上一次绘制不一致，请重新绘制"
            }

        } else {
            tempGesture.value = myData;
            gesture.resetCanvas()
            tipsText.value = "请再次确认解锁图案"
        }

    }
}

const initTipsFromStatus = () => {
    console.log("当前状态" + props.status)
    // 判断处于什么状态
    if (props.status == 'check') {
        modalTitle.value = "手势密码登录";
    } else {
        modalTitle.value = "设置手势图案";
    }
}

onMounted(() => {
    initGesture();// 初始化手势
    initTipsFromStatus();// 根据状态初始化提示和标题
})
// onMounted(() => {
//     initGesture();// 初始化手势
//     initTipsFromStatus();// 根据状态初始化提示和标题
// })

</script>
<style scoped lang="scss">
.tips {
    width: 100%;
    text-align: center;
    display: inline-block;
    font-size: 1.6rem;
    margin-top: 5rem;
}

.cancelBtn {
    display: inline-block;
    position: absolute;
}

.gesture_div {
    width: 100%;
    text-align: center;
}
</style>