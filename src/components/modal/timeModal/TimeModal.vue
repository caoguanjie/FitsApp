<template>
    <div class="time-modal-box">
        <ion-backdrop @ionBackdropTap="ionBackdropTap"></ion-backdrop>
        <div class="time-wrap" :style="{ width: datetimeOps.width }">
            <!-- 这里本来设置了mode为ios，但是ion-datetime有个bug，安卓用了ios模式的会滑动不了，所以不设置mode了，等官网改了这个bug可以再设置 -->
            <ion-datetime ref="dateTime" locale="zh-cn" :presentation="datetimeOps.isShowTime ? 'date-time' : 'date'"
                @ionChange="timeChange" :min="datetimeOps.min" :max="datetimeOps.max" :dayValues="datetimeOps.dayValues"
                :hourValues="datetimeOps.hourValues" :minuteValues="datetimeOps.minuteValues"
                :monthValues="datetimeOps.monthValues" :yearValues="datetimeOps.yearValues"
                :value="datetimeOps.initValue"></ion-datetime>
            <div class="time-footer" v-if="datetimeOps.isShowFooterBtns && showMonthAndYear">
                <div class="cancel" @click="cancel">{{ datetimeOps.cancelText }}</div>
                <div class="confirm" @click="confirm">{{ datetimeOps.doneText }}</div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { modalController, IonDatetime, DatetimeCustomEvent, IonBackdrop } from "@ionic/vue"
import { onMounted, reactive, ref } from "vue"
import { timeFormat } from "@/filter/index"
import { TimeModalProps } from "./types"
import { toast } from "@/utils/message/toast"
import moment from "moment"
const props = withDefaults(defineProps<{ options: TimeModalProps }>(), {
    options: () => new TimeModalProps(),
})

// 给body添加timePopover类名是为了解决时间控件弹出时分的弹窗定位问题
const body = document.querySelector("body")
body?.classList.add("timePopover")

const datetimeOps = reactive(new TimeModalProps(props.options))

const time = ref(datetimeOps.initValue)
const dateTime = ref(null)
const showMonthAndYear = ref(datetimeOps.isShowFooterBtns)

onMounted(() => {
    // showMonthAndYear 年月份的变量
    // isTimePopoverOpen 时分秒的变量

    const _el = (dateTime.value as any).$el
    // 保存datetime组件切换年月份的函数
    const toggleFn = _el.toggleMonthAndYearView
    const _fn = function () {
        showMonthAndYear.value = _el.showMonthAndYear
        toggleFn()
    }
    // 重写datetime组件切换年月份的函数
    _el.toggleMonthAndYearView = _fn
})

// 时间发生改变
const timeChange = (e: DatetimeCustomEvent) => {
    time.value = e.detail.value ? timeFormat(e.detail.value, "YYYY-MM-DD HH:mm:ss") : ""
    // 没有展示底部按钮的，值改变就要调用传过来的回调函数
    !datetimeOps.isShowFooterBtns && datetimeOps.doneCallback && datetimeOps.doneCallback(e.detail.value)
    // 只有不展示底部，并且不展示时分的时间才改变值就关闭弹窗（建议有时分的时间都加上底部确认按钮，因为如果选中时分的时候，值发生改变，然后关闭弹窗之后，时分的dom是不会被关闭的，如果需要关闭的话可能要看源码调什么方法）
    if (!datetimeOps.isShowFooterBtns && !datetimeOps.isShowTime) {
        modalController.dismiss(e.detail.value)
    }
}

// 确认
const confirm = () => {
    // if (datetimeOps.max && new Date(datetimeOps.max).getTime() > Date.now()) {
    //     return toast("请在范围时间内选择!")
    // }
    if (datetimeOps.max && time.value && new Date(time.value).getTime() > new Date(datetimeOps.max).getTime()) {
        return toast("请在范围时间内选择!")
    }
    if (datetimeOps.min && time.value && new Date(time.value).getTime() < new Date(datetimeOps.min).getTime()) {
        return toast("请在范围时间内选择!")
    }
    const _time = moment(time.value).format()
    datetimeOps.doneCallback && datetimeOps.doneCallback(_time)
    dismiss(_time)
}

// 取消
const cancel = () => {
    datetimeOps.cancelCallback && datetimeOps.cancelCallback()
    dismiss()
}

// 关闭弹窗
const dismiss = (value = "") => {
    // 关闭弹窗时将类名去掉，否则会影响全局的popover组件样式（因为时间控件的时分弹窗内部是用popover做的）
    const body = document.querySelector("body")
    body?.classList.remove("timePopover")
    modalController.dismiss(value)
}

// 点击蒙层
const ionBackdropTap = () => {
    dismiss()
}
</script>

<style lang="scss">
.timePopover {
    ion-popover {
        // --offset-y: 30rem !important;
        // --offset-x: 6rem !important;
    }
}

// .popover-translucent {
//     --offset-y: 300px !important;
//     --offset-x: 60px;
// }
// ion-popover::part(content) {
//     --offset-y: 300px;
//     --offset-x: 60px;
// }
</style>

<style scoped lang="scss">
.time-modal-box {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: center;

    .time-wrap {
        z-index: 5;

        // display: flex;
        // align-items: center;
        // justify-content: center;
        // flex-direction: column;
        .time-footer {
            border-top: 0.55px solid var(--ion-color-step-200, #cccccc);
            background: var(--ion-color-light, #ffffff);
            padding: 8px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            font-size: 17px;
            color: var(--ion-color-primary, #3880ff);

            &>div {
                margin: 0 2px;
                padding: 0 5px;
                height: 32px;
                line-height: 32px;
                font-weight: 400;
                letter-spacing: 0px;
            }
        }
    }
}
</style>
