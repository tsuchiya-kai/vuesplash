import Vue from "vue";
// routeingの定義
import router from "./router";
// rootComponent
import App from "./App.vue";

new Vue({
  el: "#app",
  router, // routeingの定義
  components: { App }, // rootComponentの使用を宣言
  template: "<App />" // rootComponentを描画
});
