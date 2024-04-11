<template>
    <ion-header>
        <ion-toolbar>
            <ion-buttons slot="start">
                <ion-button color="medium" @click="cancel">{{options.cancelText}}</ion-button>
            </ion-buttons>
            <ion-buttons slot="end">
                <ion-button @click="confirm">{{options.confirmText}}</ion-button>
            </ion-buttons>
        </ion-toolbar>
    </ion-header>
    <ion-content :scroll-y="false">
        <ion-datetime :presentation="options.presentation" :prefer-wheel="true" :value="dateValue" id="myDate"
            @ion-change="dateChange">
        </ion-datetime>
    </ion-content>
</template>
  
<script lang="ts" setup>
import { IonContent, IonHeader, IonToolbar, IonButtons, IonButton, IonDatetime, modalController } from '@ionic/vue';

import { ref, nextTick } from 'vue';
import { DateTimePickerProps } from './types';

const props = withDefaults(defineProps<{ options: DateTimePickerProps }>(), {
    options: () => new DateTimePickerProps(),
})

const dateValue = ref(props.options.modelValue)

function dateChange(e: any) {
    dateValue.value = e.detail.value
}

function cancel() {
    return modalController.dismiss(null, 'cancel');
}
function confirm() {
    return modalController.dismiss(dateValue.value, 'confirm');
}
</script>

<style lang="scss">
.DateTimeModal {
    --max-height: 480px;
    --min-height: 240px;
    --height: 40%;
    --width: 100%;
    align-items: flex-end;

    ion-datetime {
        justify-content: center;
        margin: auto;
        height: 100%;
        max-width: unset;
        --background: #fff;
        --ion-color-step-150: linear-gradient(to top, var(--background, var(--ion-background-color, #fff)) 0%, rgba(var(--background-rgb, var(--ion-background-color-rgb, 255, 255, 255)), 0.8) 0%) !important;

        ion-picker-column-internal {
            font-size: 16px !important;
        }
    }
}
</style>
<style lang="scss" scoped>

</style>