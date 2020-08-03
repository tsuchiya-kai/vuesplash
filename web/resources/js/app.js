//記述として読み込む場合は別名をつけない
import "./bootstrap";
import Vue from "vue";
import router from "./router";
import store from "./store";
import App from "./App.vue";

const createApp = async () => {
  await store.dispatch("auth/currentUser");

  new Vue({
    el: "#app",
    router,
    store,
    components: { App },
    template: "<App />"
  });
};

createApp();
