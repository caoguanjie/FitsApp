<template>
    <div class="explainAlert">
        <div class="my-modal-box custom-modal" @click="backdropDismiss">
            <div class="my-modal-wrapper" @click.stop>
                <div class="explain_content">
                    <div class="explain_title">{{ props.title }}</div>
                    <div class="message_information">
                        <div v-if="isShow">
                            <div class="msg_instructions">{{ tipMsg }}</div>
                            <div class="explain_btns">
                                <div
                                    v-if=" props.type === 2"
                                    class="explain_btn cancel_btn clickRipple"
                                    @click="cancel()"
                                >残忍拒绝</div>
                                <div
                                    class="explain_btn confirm_btn clickRipple"
                                    @click="confirm()"
                                    v-if="isOpen"
                                >立即更新</div>
                                 <div
                                   v-if="!isOpen"
                                    class="explain_btn confirm_btn clickRipple"
                                    @click="gotoBrowser"
                                >去官网下载</div>
                            </div>
                        </div>
                        <div v-if="!isShow">
                            <div class="msg_tips">正在加载…</div>
                            <div class="msg_precess">{{ process }}</div>
                            <ion-progress-bar color="primary" class="msg_progress" :value="current"></ion-progress-bar>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
(
<script lang="ts" setup>
import { modalController } from "@ionic/vue";
import { onMounted, ref } from "vue";
import { IonProgressBar } from "@ionic/vue";
import eventBus from "@/utils/common/EventBus";
import { useFileStore } from '@/store/modules/fileSystem'
import { isIos } from "@/utils/is";
import ENV from "@/environments/dev";

interface upgradeParams {
    title?: string;
    msgtext?: string;
    type?: number; // 是否强制更新， 1=强制， 2=普通
    backdropDismiss?: boolean
}

const props = withDefaults(
    defineProps<upgradeParams>(),
    {
        title: "正在升级，请稍等 ···",
        msgtext: "检查有新的版本更新，是否立即更新?",
        type: 2,
        backdropDismiss: false
    }
)

const fileStore = useFileStore();
let isShow = ref(true);
const tipMsg = ref(props.msgtext)
const current = ref(0);
const process = ref('0%')
const isOpen = ref(true)

onMounted(() => {
    eventBus.on('fileTransferProgres', (Progres: number) => {
        current.value = Progres;
        process.value = Progres + "%"

    })
})
// 从浏览器打开
const gotoBrowser = () => {
    cancel();
     fileStore.openBrowserUrl('http://192.168.32.51:9005/api/File/Apk')
}

const cancel = () => {
    if (props.type === 2) {
        modalController.dismiss();
    }
};
const backdropDismiss = () => {
    if(props.backdropDismiss){
        cancel()
    }
}

const confirm = () => {
    if (isIos()) {
        fileStore.openBrowserUrl('https://apps.apple.com/us/app/丰德运维/id1401949037')
     } else {
        const newName = ENV.appName + 'V' + ENV.VersionName + '.apk'
        isShow.value = false;
        fileStore.downloadFiles('http://192.168.32.51:9005/api/File/Apk', newName, false).then((res: any) => {
            //    安卓直接打开安装包（强制更新的话不关闭弹窗）
            if (props.type === 2) {
                modalController.dismiss();
            } else {
                isShow.value = true
            }
            fileStore.openFiles(res?.fileNativeUrl)
        }).catch(() => {
             isShow.value = true;
              tipMsg.value = "安装失败，请前往官网下载安装"
              isOpen.value = false;
        } )
    }
};


</script>

<style scoped lang="scss">
.explainAlert {
    .my-modal-box {
        width: 100%;
        height: 100%;
        position: absolute;
        left: 0;
        top: 0;
        display: flex;
        flex-flow: row nowrap;
        align-items: center;
        color: var(--ion-text-color, #000);
        justify-content: center;
    }
    .my-modal-wrapper {
        position: relative;
        z-index: 5;
        width: 27rem;
        max-width: 80%;
        background-color: #fff;
        border-radius: 1.2rem;
        overflow: hidden;
        box-shadow: 0 0.4rem 0.4rem rgba(0, 17, 30, 0.1);
    }

    .explain_content {
        padding: 0 0 0.8rem;
        .message_information {
            min-height: 10rem;
            display: flex;
            flex-direction: column;
            justify-content: center;
            padding: 0 1.7rem;
        }
        .msg_instructions {
            font-size: 1.4rem;
            color: #666;
            margin: 2rem 0 0.5rem;
        }
        .msg_progress {
            height: 1rem;
            border-radius: 0.5rem;
        }
        .msg_tips {
            position: absolute;
            left: 1.7rem;
            top: 10rem;
        }
        .msg_precess {
            position: absolute;
            right: 1.7rem;
            top: 10rem;
        }
    }
    .explain_title {
        height: 8rem;
        background: url("@/assets/images/upgrade.jpg");
        font-size: 1.6rem;
        padding: 0 1.7rem 0rem;
        background-size: 100%;
        color: #fff;
        line-height: 8rem;
        text-align: center;
    }

    .explain_btns {
        width: 100%;
        display: flex;
        justify-content: center;
        padding: 2.5rem 0 1rem;
    }
    .explain_btn {
        width: 47%;
        height: 3.4rem;
        text-align: center;
        border-radius: 2rem;
        font-size: 1.4rem;
        line-height: 3.4rem;
        margin-right: 6%;
    }
     .explain_btn:last-child{
         margin-right: 0;
     }
    .cancel_btn {
        border: var(--ion-color-light-shade) solid 0.1rem;
        color: #666;
        font-size: 1.4rem;
    }
    .confirm_btn {
        border: var(--ion-color-primary-shade) solid 0.1rem;
        color: var(--ion-color-primary-shade);
        font-size: 1.4rem;
    }
    .btnwidth {
        width: 100%;
    }
}
</style>
