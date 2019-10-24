import axios from 'axios';

export default ({
  namespaced: true, // 轉為區域變數
  state: {
    // 定義資料狀態
    carts: {
      carts: [],
    },
  },

  actions: {
    // 定義操作行為
    //  context 第一个参数，payload(載荷) 第二个参数（可选）

    // 取得 carts
    CART_GET(context) {
      context.commit('LOADING', true, { root: true });
      const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;
      axios.get(url).then((response) => {
        if (response.data.data.carts) {
          // vm.cart = response.data.data;
          context.commit('CARTS', response.data.data);
        }
        context.commit('LOADING', false, { root: true });
        console.log('取得購物車', response.data.data);
      });
    },

    // 加入 carts
    CART_ADD(context, data) {
      const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;
      context.commit('LOADING', true, { root: true });
      const item = {
        product_id: data.id,
        qty: data.qty,
      };
      context.commit('LOADING', true, { root: true });
      axios.post(url, { data: item }).then((response) => {
        context.commit('LOADING', false, { root: true });
        context.dispatch('CART_GET');
        // context.commit('CARTS_ADD', response.data.data);
        console.log('加入購物車:', response);
      });
    },

    // 移除 carts 的商品
    CART_REMOVE(context, id) {
      const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart/${id}`;
      context.commit('LOADING', true, { root: true });
      axios.delete(url).then((response) => {
        context.commit('LOADING', false, { root: true });
        context.dispatch('CART_GET');
        // context.commit('CARTS_REMOVE', id);
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
    CARTS(state, payload) {
      state.carts = payload;
    },
  },

  getters: {
    // 可以儲存 Component 的 computed
    // 在 component 使用 import { mapGetters } from 'vuex  (只取得 vuex 中的  mapGetters，是解構的概念)
    // 可當作 computed 使用
    // 可使用箭頭函式

    cart: state => state.carts,
  },
});
