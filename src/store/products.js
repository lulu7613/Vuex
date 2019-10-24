// 模組化資料
// 預設狀態:
// state 屬於模組區域變數
// actions, mutations, getters 屬於全域變數
// 缺點: 如果store 內其他模組使用相同名稱，會出現錯誤

// namespaced: true; // 將 actions, mutations, getters 轉為模組區域變數
// ...mapGetters( '模組名稱', ['products', 'categories']),

// 單獨區域變數轉為全域變數: { root: true }
// context.commit('LOADING', true, { root: true });

import axios from 'axios';

export default ({
  namespaced: true, // 轉為模組區域變數

  state: {
    // 定義資料狀態
    products: [], // 取得非同步行為 AJAX
    categories: [],
  },

  actions: {
    // 定義操作行為
    //  context 第一个参数，payload(載荷) 第二个参数（可选）

    // 取得非同步行為 AJAX
    getProducts(context) {
      const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/products/all`;
      context.commit('LOADING', true, { root: true });
      axios.get(url).then((response) => {
        // vm.products = response.data.products; // 儲存資料的行為
        context.commit('PRODUCTS', response.data.products);
        console.log('取得產品列表:', response);
        // vm.getUnique(); // 儲存資料的行為
        context.commit('CATEGORY', response.data.products);
        context.commit('LOADING', false, { root: true });
      });
    },

    // 元件傳入行為到 Vuex 的方式:
    // this.$store.dispatch('updateLoading', false) 和 this.$store.dispatch('updateLoading', true)
  },

  mutations: {
    // 改變操作狀態 (執行操作動作，類似 methods )
    // state 第一个参数（如果定义在模块中，则为模块的局部状态），payload 第二个参数（可选）
    // 使用常數方法定義(全部大寫)
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
  },

  getters: {
    // 可以儲存 Component 的 computed
    // 在 component 使用 import { mapGetters } from 'vuex  (只取得 vuex 中的  mapGetters，是解構的概念)
    // 可當作 computed 使用
    // 可使用箭頭函式

    products: state => state.products,
    categories: state => state.categories,
  },
});
