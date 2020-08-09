import Vue from "vue";
import VueRouter from "vue-router";
import store from "./store";
import PhotoList from "./pages/PhotoList.vue";
import Login from "./pages/Login.vue";
import SystemError from "./pages/errors/System.vue";
import PhotoDetail from "./pages/PhotoDetail.vue";

// VueRouterプラグインの使用を宣言
Vue.use(VueRouter);

// パスとコンポーネントのマッピング
const routes = [
  {
    path: "/",
    component: PhotoList
  },
  {
    path: "/login",
    component: Login,
    beforeEnter(to, from, next) {
      if (store.getters["auth/check"]) {
        next("/");
      } else {
        next();
      }
    }
  },
  {
    path: "/500",
    component: SystemError
  },
  {
    path: "/photos/:id",
    component: PhotoDetail,
    props: true
  }
];

// VueRouterインスタンスを作成する
const router = new VueRouter({
  mode: "history",
  routes
});

// VueRouterインスタンスをエクスポートする
// app.jsでインポートする
export default router;
