<template>
    <div class="my-modal-box">
        <ion-backdrop @ionBackdropTap="ionBackdropTap"></ion-backdrop>
        <div class="my-modal-wrapper">
            <ion-label class="modal-header" :style="
                myPackages.type === 'prompt' || myPackages.type === 'confirm'
                    ? ''
                    : 'border-bottom: 1px solid #dedede;'
            " v-if="myPackages.isShowTitle !== false">{{ myPackages.title }}</ion-label>

            <div class="modal-content" v-if="myPackages.type === 'prompt' || myPackages.type === 'confirm'">
                <div v-if="myPackages.type === 'prompt'">
                    <ion-input v-model="inputValue" ref="myInput" class="fits-custom-alert-input"
                        :type="myPackages.subType ? myPackages.subType : 'text'" :placeholder="myPackages.placeholder">
                    </ion-input>
                </div>
                <div v-if="myPackages.type === 'confirm'" class="fits-custom-alert-confirm">
                    {{ myPackages.content }}
                </div>
            </div>

            <ion-list no-lines v-if="myPackages.type && myPackages.type === 'radio'">
                <button ion-item mode="md" v-for="(item, i) in myPackages.radioArray" :key="i"
                    @click="changeValue($event, item, i)">
                    <ion-label :style="{ color: item.isSelected ? '#29a1f7' : '#333' }">{{ item.name }}</ion-label>
                    <ion-icon :icon="checkmark" item-end :color="item.isSelected ? 'primary' : ''"
                        :style="{ 'font-size': '3.5rem', margin: '0 10px' }"
                        v-if="!myPackages.isShowBtn && item.isSelected"></ion-icon>
                    <div item-end tappable v-if="myPackages.isShowBtn">
                        <ion-icon :icon="radioButtonOff" color="medium" v-if="!item.isSelected"></ion-icon>
                        <ion-icon :icon="checkmarkCircle" color="primary" v-if="item.isSelected"></ion-icon>
                    </div>
                </button>
            </ion-list>
            <ion-list no-lines v-if="myPackages.type && myPackages.type === 'checkbox'">
                <button ion-item mode="md" v-for="(item, i) in myPackages.radioArray" :key="i"
                    @click="changeValue($event, item, i)">
                    <ion-label>{{ item.name }}</ion-label>
                    <div item-end tappable>
                        <ion-icon :icon="squareOutline" color="medium" v-if="!item.isSelected"></ion-icon>
                        <ion-icon :icon="checkbox" color="primary" v-if="item.isSelected"></ion-icon>
                    </div>
                </button>
            </ion-list>

            <ion-item class="my-modal-footer" v-if="myPackages.isShowBtn">
                <ion-label class="cancel" tappable @click="cancel">
                    {{ myPackages.cancleBtnText ? myPackages.cancleBtnText : "取消" }}
                </ion-label>
                <ion-label class="ok" tappable @click="ok">
                    {{ myPackages.okBtnText ? myPackages.okBtnText : "确定" }}
                </ion-label>
            </ion-item>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { modalController, IonBackdrop, IonInput } from "@ionic/vue"
import { onMounted, reactive, ref } from "vue"
import { checkmark, radioButtonOff, checkmarkCircle, checkbox, squareOutline } from "ionicons/icons"
import { FitsAlert, FitsAlertInputOptions } from "@/components/modal/alert-modal/types"
const props = withDefaults(defineProps<{ packages: FitsAlert }>(), {
    packages: () => new FitsAlert(),
})
// 由于vue是单向数据流，不能直接修改props传进来的值，所以需要重新赋值到一个新的对象里
const myPackages = reactive(JSON.parse(JSON.stringify(props.packages)))
const lastItemIndex = ref(0) // 上一个索引
let resultArray: string[] = reactive([]) // 存放结果数组
const inputValue = ref("") // 输入框的值
const myInput: any = ref(null)
/**
 * ionic5获取标签写法，比如获取input标签
 * 1. const myInput1 = ref(IonInput);
 * 2. myInput1.value.$el
 * 这样就能获取到标签聚焦了：myInput1.value.$el.setFocus()
 *
 * vue3获取标签写法，比如获取input标签
 * 1. const myInput: any = ref(null);
 * 2. myInput.value.$el
 * 这样就能获取到标签聚焦了：myInput1.value.$el.setFocus()
 */
onMounted(() => {
    if (myPackages.type === "prompt") {
        setTimeout(() => {
            myInput.value.$el.setFocus()
        }, 1000)
    } else if (myPackages.type === "radio" || myPackages.type === "checkbox") {
        myPackages.radioArray.forEach((element: FitsAlertInputOptions, key: number) => {
            if (element.isSelected) {
                lastItemIndex.value = key
            }
        })
    }
})

const isRadio = (item: any, index: number) => {
    if (lastItemIndex.value >= 0) {
        /* 
          留个标记：这是后来写组件交互案例时发现单选框弹窗的一个bug
          （bug就是选中单选框的第一项时不会返回选中的数据，因为当选中单选框第一项时执行这行代码直接return掉了）
        */
        /*  if (lastItemIndex.value === index) {
          return;
        } */
        myPackages.radioArray[lastItemIndex.value].isSelected = false
        resultArray = []
        resultArray.push(item.code)
        lastItemIndex.value = index
    } else {
        lastItemIndex.value = index
        resultArray.push(item.code)
    }
}

const ok = () => {
    if (myPackages.type && myPackages.type === "radio") {
        modalController.dismiss(resultArray)
    } else if (myPackages.type && myPackages.type === "checkbox") {
        resultArray = []
        myPackages.radioArray.forEach((element: FitsAlertInputOptions) => {
            if (element.isSelected) {
                resultArray.push(element.code)
            }
        })
        if (myPackages.radioArray[0].name === "请选择" && myPackages.radioArray[0].isSelected) {
            modalController.dismiss(null)
            return
        }
        modalController.dismiss(resultArray)
    } else if (myPackages.type && myPackages.type === "prompt") {
        if (inputValue.value && inputValue.value.trim().length > 0) {
            modalController.dismiss(inputValue.value)
        }
    } else if (myPackages.type && myPackages.type === "confirm") {
        modalController.dismiss(true)
    }
}

const changeValue = (e: any, item: any, index: number) => {
    e.stopPropagation()
    if (myPackages.type && myPackages.type === "radio") {
        isRadio(item, index)
        if (!myPackages.radioArray[index].isSelected) {
            myPackages.radioArray[index].isSelected = true
        }
    } else {
        // 如果有全选选项
        if (myPackages.isSelectAll) {

            // 如果点击的是全选按钮
            if (index === 0) {
                console.log(item.isSelected)
                if (item.isSelected) {
                    myPackages.radioArray.map((ele: any) => ele.isSelected = false)
                } else {
                    myPackages.radioArray.map((ele: any) => ele.isSelected = true)
                }

            } else {
                myPackages.radioArray[index].isSelected = !myPackages.radioArray[index].isSelected
                // 当前被选数量
                const selectedNum = myPackages.radioArray.filter((item: any) => item.isSelected).length
                if (myPackages.radioArray[0].isSelected && selectedNum === myPackages.radioArray.length - 1) {
                    myPackages.radioArray[0].isSelected = false
                    return
                }
                if (selectedNum === myPackages.radioArray.length - 1) {
                    myPackages.radioArray[0].isSelected = true
                }
            }
            return
        }

        myPackages.radioArray[index].isSelected = !myPackages.radioArray[index].isSelected
    }
    if (!myPackages.isShowBtn) {
        // 去除底部按钮
        resultArray = []
        resultArray.push(item.code)
        setTimeout(() => {
            ok()
        }, 200)
    }
}

const dismiss = () => {
    modalController.dismiss()
}

const cancel = () => {
    modalController.dismiss(false)
}

// const isShowBtn = (item: any) => {
//     // 只有单选才能去掉底部按钮
//     if (myPackages.type === "radio") {
//         resultArray = []
//         resultArray.push(item.code)
//         if (myPackages.radioArray[0].name === "请选择" && myPackages.radioArray[0].isSelected) {
//             modalController.dismiss(null)
//             return
//         }
//         modalController.dismiss(resultArray)
//     }
// }

const ionBackdropTap = () => {
    dismiss()
}
</script>

<style scoped lang="scss">
.my-modal-box {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: center;

    .my-modal-wrapper {
        position: relative;
        z-index: 5;
        width: 25rem;
        max-width: 280px;
        background-color: #fff;
        border-radius: 0.4rem;
        overflow: hidden;
        box-shadow: 0 0.4rem 0.4rem rgba(0, 17, 30, 0.1);

        .modal-header {
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.8rem;
            color: #333;
            width: 100%;
            text-align: center;
            min-height: 50px;
            font-weight: 600;
        }

        .modal-content {
            width: 100%;
            max-height: 20rem;
            overflow-y: auto;
            padding: 1.5rem;
            font-size: 1.5rem;
            text-align: center;

            ion-input {
                text-indent: 1rem;
                text-align: left;
                --background: #eee;
            }
        }

        ion-list {
            width: 100%;
            max-height: 20rem;
            overflow-y: auto;

            &>button {
                width: 100%;
                padding: 0 2.5rem;
                display: flex;
                justify-content: space-between;
                border: 0;
                height: 4.5rem;
                min-height: 50px;
                background: #fff;
                align-items: center;
                font-size: 1.44rem;
            }

            &>button:last-child {
                border: 0;
            }

            .list-md .item-block .item-inner,
            .list-ios .item-block .item-inner {
                border: 0;
            }

            .list-md,
            .list-ios {
                margin: 0;
            }

            ion-icon {
                font-size: 1.9rem;
                color: #ccc;
            }
        }

        .my-modal-footer {
            height: 4rem;
            display: flex;
            flex-flow: row nowrap;
            align-items: center;
            justify-content: center;
            min-height: 50px;
            border-top: 1px solid #dedede;
            --inner-padding-end: 0;

            &::part(native) {
                padding: 0;
            }

            ion-label {
                width: 50%;
                height: 4rem;
                min-height: 50px;
                text-align: center;
                display: flex;
                flex-flow: row nowrap;
                align-items: center;
                justify-content: center;
                font-size: 1.5rem;
                margin: 0;
            }

            .cancel {
                color: #999999;
                border-right: 1px solid #ddd;
            }

            .ok {
                color: #108ee9;
            }
        }
    }
}
</style>
