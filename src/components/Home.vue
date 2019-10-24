<template>
  <div>
    <div class="container main-content mb-3">
      <div class="row">
        <div class="col-md-3">
          <!-- 左側選單 (List group) -->
          <div class="list-group sticky-top">
            <a class="list-group-item list-group-item-action"
              href="#" @click.prevent="searchText = item"
              :class="{ 'active': item === searchText}"
              v-for="item in categories" :key="item">
              <i class="fa fa-street-view" aria-hidden="true"></i>
              {{ item }}
            </a>
            <a href="#" class="list-group-item list-group-item-action"
              @click.prevent="searchText = ''"
              :class="{ 'active': searchText === ''}">
              全部顯示
            </a>
          </div>
        </div>

        <!-- 子頁面 -->
        <div class="col-md-9">
          <div class="d-flex mb-4">
            <!-- Search bar -->
            <form class="form-inline my-3 my-lg-0">
              <div class="input-group">
                <input class="form-control" type="text" v-model="searchText"
                  placeholder="Search" aria-label="Search">
                <div class="input-group-append">
                  <button class="btn btn-outline-secondary" type="button"
                    @click="searchText = ''">
                    <i class="fa fa-times"></i>
                  </button>
                </div>
              </div>
            </form>
            <button class="btn btn-outline-primary ml-auto" type="button"
              @click="getProducts">
              重新取得資料
            </button>
          </div>
          <!-- content -->
          <div class="tab-pane" id="list-gift">
            <div class="row align-items-stretch">
              <!-- 禮品 -->
              <div class="col-md-4 mb-4" v-for="(item) in filterData" :key="item.id">
                <div class="card border-0 box-shadow text-center h-100">
                  <img class="card-img-top" :src="item.image" alt="Card image cap">
                  <div class="card-body">
                    <h4 class="card-title">{{ item.title }}</h4>
                    <p class="card-text text-left">{{ item.content }}</p>
                  </div>
                  <div class="card-footer border-top-0 bg-white">
                    <button class="btn btn-outline-secondary btn-block btn-sm"
                      @click="addtoCart(item.id)">
                      <i class="fa fa-cart-plus" aria-hidden="true"></i> 加到購物車
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// 取得 vues 的 Getters，引入至 computed
// 取得 vues 的 action，引入至 methods (只能引入沒有帶 payload 的 action)
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'Home',
  data() {
    return {
      searchText: '',
      // isLoading: false,
    };
  },
  computed: {
    filterData() {
      const vm = this;
      if (vm.searchText) {
        return vm.products.filter((item) => {
          const data = item.title.toLowerCase().includes(vm.searchText.toLowerCase());
          return data;
        });
      }
      return this.products;
    },

    // 用 ES6 展開的方式寫入
    ...mapGetters('productsModules', ['products', 'categories']),
  },
  methods: {
    ...mapActions('productsModules', ['getProducts']),

    addtoCart(id, qty = 1) {
      console.log(this.$store);
      this.$store.dispatch('cartsModules/CART_ADD', { id, qty });
    },
    // getUnique() {
    //   const vm = this;
    //   const categories = new Set();
    //   vm.products.forEach((item) => {
    //     categories.add(item.category);
    //   });
    //   vm.categories = Array.from(categories);
    // },
  },
  created() {
    this.getProducts();
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
