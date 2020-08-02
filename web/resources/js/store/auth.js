//storeはモジュールに分けられる
//index.jsでVuexに登録
const state = {
  //ログイン済ユーザーを保持する
  user: null
};

const getters = {};

const mutations = {
  // userのステートの値を更新する
  setUser(state, user) {
    state.user = user;
  }
};

const actions = {
  // 会員登録、API を呼び出す
  async register(context, data) {
    const response = await axios.post("/api/register", data);
    //contextオブジェクトにはmutationsを呼び出すメソッドcommitがあるのでそちらを使用している
    context.commit("setUser", response.data);
  },
  //ログイン
  async login(context, data) {
    const response = await axios.post("/api/login", data);
    context.commit("setUser", response.data);
  },
  //ログアウト
  async logout(context) {
    const response = await axios.post("/api/logout");
    context.commit("setUser", null);
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
