<template>
    <ion-page>
        <ion-content>
            <slot name="content" />
        </ion-content>
    </ion-page>
</template>
<script lang='ts' setup>
import { IonPage, IonContent } from '@ionic/vue'
</script>