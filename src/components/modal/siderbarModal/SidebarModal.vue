<template>
    <ion-page>
        <ion-content :fullscreen="true">
            <ion-button color="primary" @click="dismiss">{{ props.cancleBtnText }}</ion-button>
            <ion-card-content>
                <p>
                    {{ props.content }}
                </p>
            </ion-card-content>
        </ion-content>
    </ion-page>
</template>

<script lang="ts" setup>
import { IonCardContent, modalController } from "@ionic/vue"
const props = withDefaults(defineProps<{ cancleBtnText?: string; content?: string }>(), {
    cancleBtnText: "dismiss关闭",
    content: "侧边栏内容",
})
const dismiss = () => {
    modalController.dismiss()
}
</script>
