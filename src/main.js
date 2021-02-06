import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import firebase from "firebase/app"

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
  store,
  created() {
    const firebaseConfig = {
      apiKey: "AIzaSyC0hArFUmrHVX-SpwIy-anINzeYf2KX_w8",
      authDomain: "wattshop-302003.firebaseapp.com",
      projectId: "wattshop-302003",
      storageBucket: "wattshop-302003.appspot.com",
      messagingSenderId: "325363078952",
      appId: "1:325363078952:web:feed63d84ec83fa5b0621d",
      measurementId: "G-ELVWLVMVMV"
    };
    firebase.initializeApp(firebaseConfig)
    console.log("initialized firebase")
  }
}).$mount('#app')
