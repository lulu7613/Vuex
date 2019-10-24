import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

// Vuex 的流程:
// Vue 從 Components 的 methods __dispatch 行為__>> Action
// Action 定義操作行為 __commit payload__>> Mutation
// Mutation 將 payload 寫進參數 state __mutate__>> State
// State __render__>> Vue
// Vue computed return state 資料

export default new Vuex.Store({
  strict: true, // 開啟嚴謹模式，幫助除錯

  state: {
    // 定義資料狀態
    isLoading: false, // 各元件使用 this.$store.state.count 抓取資料 (不建議直接抓 state 資料)
    products: [], // 取得非同步行為 AJAX
    categories: [],
    carts: [],
  },

  actions: {
    // 定義操作行為
    //  context 第一个参数，payload(載荷) 第二个参数（可选）
    updateLoading(context, payload) {
      context.commit('LOADING', payload); // payload 為 LOADING 的 stats.isLoading 狀態
    },

    // 取得非同步行為 AJAX
    getProducts(context) {
      const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/products/all`;
      context.commit('LOADING', true);
      axios.get(url).then((response) => {
        // vm.products = response.data.products; // 儲存資料的行為
        context.commit('PRODUCTS', response.data.products);
        console.log('取得產品列表:', response);
        // vm.getUnique(); // 儲存資料的行為
        context.commit('CATEGORY', response.data.products);
        context.commit('LOADING', false);
      });
    },

    // 取得 carts
    CART_GET(context) {
      context.commit('LOADING', true);
      const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;
      axios.get(url).then((response) => {
        if (response.data.data.carts) {
          // vm.cart = response.data.data;
          context.commit('CARTS_GET', response.data.data);
        }
        context.commit('LOADING', false);
        console.log('取得購物車', response.data.data);
      });
    },

    // 加入 carts
    CART_ADD(context, data) {
      const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;
      context.commit('LOADING', true);
      const item = {
        product_id: data.id,
        qty: data.qty,
      };
      context.commit('LOADING', true);
      axios.post(url, { data: item }).then((response) => {
        context.commit('LOADING', false);
        context.commit('CARTS_ADD', response.data.data);
        context.commit('CATEGORY', response.data.data);
        console.log('加入購物車:', response);
      });
    },

    // 移除 carts 的商品
    CART_REMOVE(context, id) {
      const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart/${id}`;
      context.commit('LOADING', true);
      axios.delete(url).then((response) => {
        context.commit('LOADING', false);
        context.commit('CARTS_REMOVE', id);
        console.log('刪除購物車項目', response);
      });
    },

    // 元件傳入行為到 Vuex 的方式:
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

    PRODUCTS(state, payload) {
      state.products = payload;
    },

    CATEGORY(state, payload) {
      console.log(payload);
      const categories = new Set();
      payload.forEach((item) => {
        categories.add(item.category);
      });
      state.categories = Array.from(categories);
    },

    CARTS_GET(state, payload) {
      state.carts = payload;
    },

    CARTS_ADD(state, data) {
      state.carts.carts.push(data);
    },

    CARTS_REMOVE(state, itemId) {
      state.carts.carts.filter((item, index) => {
        if (item.id === itemId) {
          return state.carts.carts.splice(index, 1);
        } return null; // ESLint 嚴謹寫法
      });
    },
  },
});
