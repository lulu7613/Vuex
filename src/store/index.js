import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  strict: true, // 開啟嚴謹模式，幫助除錯

  state: {
    // 定義資料狀態
    isLoading: false, // 各元件使用 this.$store.state.count 抓取資料 (不建議直接抓 state 資料)
  },

  actions: {
    // 定義操作行為
    //  context 第一个参数，payload(載荷) 第二个参数（可选）
    updateLoading(context, payload) {
      context.commit('LOADING', payload); // payload 為 LOADING 的 stats.isLoading 狀態
    },

    // 元件中載入 Vuex 的方式:
    // this.$store.dispatch('updateLoading', false) 和 this.$store.dispatch('updateLoading', true)
  },

  mutations: {
    // 改變操作狀態 (執行操作動作，類似 methods )
    // state 第一个参数（如果定义在模块中，则为模块的局部状态），payload 第二个参数（可选）
    // 使用常數方法定義(全部大寫)
    LOADING(state, payload) {
      // state 為 state
      // payload 為 updateLoading 的 payload
      state.isLoading = payload;
    },
  },
});
