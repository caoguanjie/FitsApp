<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title>首页展示</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Blank</ion-title>
        </ion-toolbar>
      </ion-header>

      <div id="container">
        <strong>Ready to create an app?</strong>
        <p>Start with Ionic <a target="_blank" rel="noopener noreferrer"
            href="https://ionicframework.com/docs/components">UI Components</a></p>
      </div>
      <p>
        <Button @click="gotoPage">前往测试页</Button>
        <Button @click="login" type="primary">点击请求登录接口</Button>
        <Button @click="userList" type="success">点击请求用户接口</Button>

      </p>
      <p>{{ data }}</p>
      <p>{{ userdata }}</p>


    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { fetchUserList } from '@/services';
import useStore from '@/store';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/vue';

import { Button } from 'vant'
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter();
const { userStore } = useStore()
const data = ref()
/** useRequest的hook也可以写在这里，也可以写在api */
// const { loading, data: fetachGetData, send: sendFetachGet } = useRequest(fetchLogin, { immediate: false, middleware: delayLoadingMiddleware() })
const { data: userdata, send: sendFetchUserList } = fetchUserList()
function gotoPage() {
  router.push('/test')
}
onMounted(async () => {


})

async function login() {
  // sendFetachGet()
  data.value = await userStore.login({
    userName: '',
    password: '',
  })
}

function userList() {
  sendFetchUserList()
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
