<template>
    <div class="explainAlert">
        <div class="my-modal-box custom-modal" @click="backdropDismiss">
            <div class="my-modal-wrapper" @click.stop>
                <div class="explain_content">
                    <div class="message_header">
                        <div class="logo"></div>
                        <div>
                            <div class="version_code">发现新版本：{{ versionCode }}</div>
                            <div class="version_size">版本大小：{{ versionSize }}</div>
                        </div>
                    </div>
                    <div class="message_information">
                        <div>
                            <div class="msg_instructions">{{ tipMsg }}</div>
                            <div class="msg_progressbar" v-if="!isShow">
                                <div>下载中...48.6%</div>
                                <ion-progress-bar class="msg_progress" :value="current">
                                </ion-progress-bar>
                            </div>
                            <div class="explain_btns">
                                <div v-if="props.type === 2" class="explain_btn cancel_btn clickRipple"
                                    @click="cancel()">残忍拒绝</div>
                                <div class="explain_btn confirm_btn clickRipple" @click="confirm()" v-if="isOpen">立即更新
                                </div>
                            </div>
                            <div class="msg_manual">
                                <div class="tips">若升级失败，请尝试手动下载安装</div>
                                <div class="download" @click="gotoBrowser">下载安装包></div>
                            </div>
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
    versionCode?: string;// 版本号
    versionSize?: string;//版本大小
    msgtext?: string;
    type?: number; // 是否强制更新， 1=强制， 2=普通
    backdropDismiss?: boolean,

}

const props = withDefaults(
    defineProps<upgradeParams>(),
    {
        versionCode: "1.0.67",
        versionSize: "29MB",
        msgtext: "更新说明：" + "\n" + " 1、搜书算法优化，重点优化源站权重，匹配算法，结果更快、更好 " + "\n" + " 2、新增购物商场，领券有大折扣，还有额外惊喜赠送 " + "\n" + " 3、修复部分bug",
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
    if (props.backdropDismiss) {
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
        })
    }
};


</script>

<style lang="scss">
ion-modal {
    --border-radius: 16px;
}
</style>

<style scoped lang="scss">
.explainAlert {
    .my-modal-box {
        width: 100%;
        height: 100%;
        position: absolute;
        left: 0;
        bottom: 0;
        display: flex;
        flex-flow: row nowrap;
        // align-items: center;
        color: var(--ion-text-color, #000);
        justify-content: center;
    }

    .my-modal-wrapper {
        position: relative;
        z-index: 5;
        // width: 27rem;
        max-width: 100%;
        background-color: #fff;
        border-top-left-radius: 1.2rem;
        border-top-right-radius: 1.2rem;
        overflow: hidden;
        box-shadow: 0 0.4rem 0.4rem rgba(0, 17, 30, 0.1);
    }

    .explain_content {
        padding: 0 0 0.8rem;

        .message_header {
            display: flex;
            align-items: center;
            margin-top: 2rem;
            padding: 0 1.7rem;

            .logo {
                width: 5rem;
                height: 5rem;
                background: url(http://localhost:8081/img/icon.58cc8a9b.png);
                border-radius: 50%;
                margin-right: 2rem;
                background-repeat: round;
                border: 1px solid #F1F7FF;
            }

            .version_code {
                font-size: 1.6rem;
                font-weight: bold;
            }

            .version_size {
                margin-top: 0.7rem;
                font-size: 1.1rem;
                color: #999999;
            }
        }

        .message_information {
            min-height: 10rem;
            display: flex;
            flex-direction: column;
            justify-content: center;
            padding: 0 1.7rem;
        }

        .msg_instructions {
            font-size: 1.2rem;
            color: #666;
            margin: 2rem 0rem;
            background: #F4F4F4;
            padding: 1rem;
            line-height: 2rem;
            max-height: 12rem;
            overflow: scroll;
            word-break: break-all;
            white-space: break-spaces;
        }

        .msg_progressbar {
            margin-bottom: 2rem;

            div:first-child {
                margin-bottom: 0.5rem;
                font-size: 1.2rem;
                color: #999999;
            }

            .progress-buffer-bar {
                background: #2F8EFF;
            }
        }

        .msg_manual {
            font-size: 1.4rem;
            text-align: center;
            margin-top: 1rem;

            .tips {
                color: #999999;
            }

            .download {
                color: red;
                text-decoration: underline;
                margin: 1rem 0rem;
            }
        }

        .msg_progress {
            height: 0.2rem;
            border-radius: 0.5rem;
            --background: #fff;
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
        padding-bottom: 1rem;
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

    .explain_btn:last-child {
        margin-right: 0;
    }

    .cancel_btn {
        color: #333333;
        font-size: 1.4rem;
        background: #FFFFFF;
        border-radius: 0.2rem;
        border: 1px solid #CCCCCC;
    }

    .confirm_btn {
        color: #fff;
        font-size: 1.4rem;
        background: #2F8EFF;
        border-radius: 0.2rem;
    }

    .btnwidth {
        width: 100%;
    }
}
</style>
