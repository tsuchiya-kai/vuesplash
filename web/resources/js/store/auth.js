import { OK, UNPROCESSABLE_ENTITY } from "../util";

//storeはモジュールに分けられる
//index.jsでVuexに登録
const state = {
  //ログイン済ユーザーを保持する
  user: null,
  apiStatus: null,
  loginErrorMessages: null,
  registerErrorMessages: null
};

const getters = {
  check: state => !!state.user,
  username: state => (state.user ? state.user.name : "")
};

const mutations = {
  // userのステートの値を更新する
  setUser(state, user) {
    state.user = user;
  },
  // エラー用のステートを更新
  setApiStatus(state, status) {
    state.apiStatus = status;
  },
  //ログインエラー用
  setLoginErrorMessages(state, messages) {
    state.loginErrorMessages = messages;
  },
  registerErrorMessages(state, messages) {
    state.registerErrorMessages = messages;
  }
};

const actions = {
  // 会員登録、API を呼び出す
  async register(context, data) {
    context.commit("setApiStatus", null);
    const response = await axios.post("/api/register", data);

    if (response.status === CREATED) {
      //contextオブジェクトのmutationsを呼び出すメソッドcommit
      context.commit("setApiStatus", true);
      context.commit("setUser", response.data);
      return false;
    }
    context.commit("setApiStatus", false);

    //バリデーションメッセージを格納
    if (response.status === UNPROCESSABLE_ENTITY) {
      context.commit("setRegisterErrorMessages", response.data.errors);
    } else {
      context.commit("error/setCode", response.status, { root: true });
    }
  },
  //ログイン
  async login(context, data) {
    context.commit("setApiStatus", null);
    const response = await axios
      .post("/api/login", data)
      .catch(err => err.response || err);

    if (response.status === OK) {
      context.commit("setApiStatus", true);
      context.commit("setUser", response.data);
      return false;
    }

    context.commit("setApiStatus", false);
    if (response.status === UNPROCESSABLE_ENTITY) {
      context.commit("setLoginErrorMessages", response.data.errors);
    } else {
      context.commit("error/setCode", response.status, { root: true });
    }
  },
  //ログアウト
  async logout(context) {
    context.commit("setApiStatus", null);
    const response = await axios.post("/api/logout");

    if (response.status === OK) {
      context.commit("setApiStatus", true);
      //ログインしているユーザーを消す（つまりログアウト）
      context.commit("setUser", null);
      return false;
    }

    context.commit("setApiStatus", false);
    context.commit("error/setCode", response.status, { root: true });
  },
  //ユーザー名取得（ログインユーザーチェック）
  async currentUser(context) {
    context.commit("setApiStatus", null);
    const response = await axios.get("/api/user");
    const user = response.data || null;

    if (response.status === OK) {
      context.commit("setApiStatus", true);
      context.commit("setUser", user);
      return false;
    }

    context.commit("setApiStatus", false);
    context.commit("error/setCode", response.status, { root: true });
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
