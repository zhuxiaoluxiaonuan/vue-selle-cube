<template>
  <div id="app">
    <v-header  :seller = 'seller'/>
    <div class="tab-wrapper">
      <tab :tabs="tabs" :init-index='index'></tab>
    </div>
  </div>
</template>

<script>
import VHeader from 'components/v-header/v-header'
import Tab from 'components/tab/tab'
import { getSeller } from 'api'
import Goods from 'components/goods/goods'
import Ratings from 'components/ratings/ratings'
import Seller from 'components/seller/seller'
import qs from 'query-string'
import { loadPage } from 'common/js/storage'
const KEY = 'page'
export default {
  name: 'app',
  data(){
    return {
      seller: {}
    }
  },
  created(){
    this._getSeller()
    this.index = loadPage(KEY, 0)
  },
  methods: {
    _getSeller(){
      getSeller({
        id: qs.parse(location.search).id
      }).then(seller => {
        this.seller = seller
      })
    }
  },
  components: {
    VHeader,
    Tab
  },
  computed: {
    tabs(){
      return [
        {
          label: '商品',
          component: Goods,
          data: {
            seller: this.seller
          }
        },
        {
          label: '评价',
          component: Ratings,
          data: {
            seller: this.seller
          }
        },
        {
          label: '商家',
          component: Seller,
          data: {
            seller: this.seller
          }
        }
      ]
    }
  }
}
</script>

<style lang="stylus" scoped>
  #app {
    .tab-wrapper {
      position: fixed;
      top: 136px;
      left: 0;
      right: 0;
      bottom: 0;
    }
  }
</style>
