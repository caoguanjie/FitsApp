<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-buttons slot="start">
                    <ion-back-button default-href="/" mode="ios"></ion-back-button>
                </ion-buttons>
                <ion-title>测试页面</ion-title>
            </ion-toolbar>
        </ion-header>

        <ion-content :fullscreen="true">
            <VantButton id="open-modal" expand="block">打开弹窗</VantButton>
            <VantButton @click="openwindow">打开Vant弹窗</VantButton>
            <ion-modal ref="modal" trigger="open-modal" @willDismiss="onWillDismiss">
                <ion-header>
                    <ion-toolbar>
                        <ion-buttons slot="start">
                            <ion-button @click="cancel()">Cancel</ion-button>
                        </ion-buttons>
                        <ion-title>Welcome</ion-title>
                        <ion-buttons slot="end">
                            <ion-button :strong="true">Confirm</ion-button>
                        </ion-buttons>
                    </ion-toolbar>
                </ion-header>
                <ion-content class="ion-padding">
                    <ion-item>
                        <ion-button id="bottom-start">打开popver</ion-button>
                        <ion-popover trigger="bottom-start" side="bottom" alignment="start">
                            <ion-content class="ion-padding">Hello World!</ion-content>
                        </ion-popover>
                    </ion-item>
                    <ion-button id="present-alert">Click Me</ion-button>
                    <ion-alert trigger="present-alert" header="A Short Title Is Best"
                        sub-header="A Sub Header Is Optional"
                        message="A message should be a short, complete sentence."></ion-alert>
                </ion-content>
            </ion-modal>

        </ion-content>
    </ion-page>
</template>

<script setup lang="ts">
import {
    IonContent, IonBackButton, IonButton, IonButtons, IonModal, IonItem,
    IonHeader, IonPage, IonTitle, IonToolbar, IonPopover, IonAlert
} from '@ionic/vue';
import { Button as VantButton } from 'vant'
import { onBeforeMount, onMounted, ref } from 'vue';
import { OverlayEventDetail } from '@ionic/core/components';
import { showDialog } from 'vant';
const modal = ref();
const cancel = () => modal.value.$el.dismiss(null, 'cancel');
const message = ref('This modal example uses triggers to automatically open a modal when the button is clicked.');

const onWillDismiss = (ev: CustomEvent<OverlayEventDetail>) => {
    if (ev.detail.role === 'confirm') {
        message.value = `Hello, ${ev.detail.data}!`;
    }
};
onBeforeMount(() => {
    console.log('onBeforeMount');
})
onMounted(() => {
    console.log('onMounted');
})
function openwindow() {
    const abc = showDialog({ message: '提示' });
    console.log(abc)
}
</script>

<style scoped lang="scss">
#container {
    text-align: center;

    position: absolute;
    left: 0;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
}

#container strong {
    font-size: 20px;
    line-height: 26px;
}

#container p {
    font-size: 16px;
    line-height: 22px;

    color: #8c8c8c;

    margin: 0;
}

#container a {
    text-decoration: none;
}
</style>