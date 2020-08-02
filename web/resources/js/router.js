import Vue from "vue";
import VueRouter from "vue-router";
import PhotoList from "./pages/PhotoList.vue";
import Login from "./pages/Login.vue";

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
    component: Login
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
