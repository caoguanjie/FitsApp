<template>
    <div class="explainAlert">
        <div class="my-modal-box custom-modal">
            <div class="my-modal-wrapper">
                <div class="explain_content">
                    <div class="explain_title">温馨提示</div>
                    <div class="explain_welcome">欢迎来到运维APP！！！</div>
                    <p>
                        1.为更好的提供相关服务，我们会根据您使用的具体功能需要，收集必要的用户信息(可能涉及账户、交易、设备等相关信息);
                    </p>
                    <p>2.未经您同意，我们不会从第三方获取、共享、或对外提供您的信息;</p>
                    <p>3.您可以访问、更正、删除您的个人信息,我们也将提供注销、投诉方式。</p>
                    <div class="explain_textsa">
                        您可以阅读完整版<a @click="userAgreement()">用户协议</a>和<a @click="privacy()">隐私政策</a>
                    </div>

                    <div class="explain_btns">
                        <div class="explain_btn cancel_btn" @click="cancel()">不同意并退出</div>
                        <div class="explain_btn confirm_btn" @click="confirm()">同意并继续</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { modalController } from "@ionic/vue"
import { storage } from "@/utils/storage/index"
import { App } from "@capacitor/app"
import { originModal } from "@/utils/message/alertModal"
import AgreementNav from "@/components/modal/alert-modal/AgreementNav.vue"

const cancel = () => {
    modalController.dismiss()
    App.exitApp()
}
const confirm = () => {
    storage.set("agreement", true)
    modalController.dismiss()
}
const userAgreement = () => {
    originModal(AgreementNav, { title: "用户协议" })
}
const privacy = () => {
    originModal(AgreementNav, { title: "隐私政策" })
}
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
        width: 30rem;
        max-width: 80%;
        background-color: #fff;
        border-radius: 0.6rem;
        overflow: hidden;
        box-shadow: 0 0.4rem 0.4rem rgba(0, 17, 30, 0.1);
    }

    .explain_content {
        padding: 2rem 3rem;
    }
    .explain_title {
        font-weight: bold;
        font-size: 1.8rem;
        text-align: center;
    }
    .explain_welcome {
        font-size: 1.3rem;
        font-weight: bold;
        margin-top: 1.5rem;
        margin-bottom: 1rem;
    }
    p {
        font-size: 1.2rem;
        line-height: 2rem;
        margin: 0;
    }
    .explain_textsa {
        font-size: 1rem;
        font-weight: bold;
        text-align: center;
        margin: 2rem 0rem;
    }
    .explain_textsa a {
        font-size: 1rem;
        font-weight: bold;
    }

    .explain_btns {
        display: flex;
        justify-content: space-between;
    }
    .explain_btn {
        width: 46%;
        text-align: center;
        border-radius: 2rem;
        font-size: 1.2rem;
        font-weight: bold;
        line-height: 3rem;
    }
    .cancel_btn {
        background-color: #fff;
        border: #e0e0e0 solid 0.1rem;
        color: #a6a6a6;
    }
    .confirm_btn {
        background-color: rgb(86, 143, 240);
        color: #fff;
    }
}
</style>
