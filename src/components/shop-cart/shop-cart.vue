<template>
  <div class="shopCart">
    <div class="content" @click="toggleList">
      <div class="content-left">
        <div class="logo-wrapper">
          <div class="logo" :class="{'highlight':totalCount>0}">
            <i class="icon-shopping_cart" :class="{'highlight':totalCount>0}"></i>
          </div>
          <div class="num" v-if="totalCount>0">
            <bubble :num="totalCount"></bubble>
          </div>
        </div>
        <div class="price" :class="{'highlight':totalPrice>0}">
          ￥{{totalPrice}}
        </div>
        <div class="desc">
          另需配送费￥{{deliveryPrice}}
        </div>
      </div>
      <div class="content-right">
        <div class="pay" :class="payClass" @click="toPay">
          {{payDesc}}
        </div>
      </div>
    </div>
    <!-- 需要下落的小球(默认位置是在购物车里面隐藏着多个小球) -->
    <div class="ball-container">
      <div v-for="(ball, index) in balls" :key="index">
        <transition @before-enter="beforeDrop" @enter="dropping" @after-enter="afterDrop">
          <div class="ball" v-show="ball.show">
            <div class="inner inner-hook">
            </div>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import Bubble from 'components/bubble/bubble'
const BALL_LEN = 10
const INNER_CLS_HOOK = 'inner-hook'
function createBall(){
  let balls = []
  for (let i = 0; i < BALL_LEN; i++) {
    balls.push({
      show: false
    })
  }
  return balls
}
export default {
    name: 'shop-cart',
    props: {
      selectFoods: {
        type: Array,
        default() {
          return []
        }
      },
      deliveryPrice: {
        type: Number,
        default: 0
      },
      minPrice: {
        type: Number,
        default: 0
      },
      fold: {
        type: Boolean,
        default: true
      },
      sticky: {
        type: Boolean,
        default: false
      }
    },
    data(){
        return {
          balls: createBall(),
          listFold: this.fold
        }
    },
    created(){
      this.dropBalls = []
    },
    methods: {
      toPay(e){
        if (this.totalPrice >= this.minPrice){
          this.$createDialog({
            title: '去结算',
            content: `共支付${this.totalPrice}元`,
            confirmBtn: {
              text: '确认',
              active: true,
              disable: false
            }
          }).show()
          e.stopPropagation() // 阻止事件冒泡
        }
      },
      drop(el){
        for (let i = 0; i < this.balls.length; i++) {
          const ball = this.balls[i]
          if (!ball.show) {
            ball.show = true
            ball.el = el
            this.dropBalls.push(ball)
            return
          }
        }
      },
      beforeDrop(el){
        // 找到最后添加的小球
        const ball = this.dropBalls[this.dropBalls.length - 1]
        let position = ball.el.getBoundingClientRect()
        let positionX = position.left - 32
        let positionY = -(window.innerHeight - position.top - 22)
        el.style.display = ''
        el.style.tranform = el.style.webkitTransform = `translate3d(0, ${positionY}px, 0)`
        let inner = el.getElementsByClassName(INNER_CLS_HOOK)[0]
        inner.style.tranform = inner.style.webkitTransform = `translate3d(${positionX}px, 0, 0)`
      },
      dropping(el, done){
        // 重绘
        this._reflow = document.body.offsetHeight
        // 归位-还是归在原来的位置
        el.style.tranform = el.style.webkitTransform = `translate3d(0, 0, 0)`
        let inner = el.getElementsByClassName(INNER_CLS_HOOK)[0]
        inner.style.tranform = inner.style.webkitTransform = `translate3d(0, 0, 0)`
        el.addEventListener('transitionend', done)
      },
      afterDrop(el){
        let ball = this.dropBalls.shift()
        if (ball.show){
          ball.show = false
          el.style.display = 'none'
        }
      },
      toggleList(){
        if (this.listFold){
          if (!this.totalCount){
            return
          }
          this.listFold = false
          this._showShopCartList()
          this._showShopCartSticky()
        } else {
          this.listFold = true
          this._hideShopCartList()
        }
      },
      _showShopCartList(){
        this.shopCartListComp = this.shopCartListComp || this.$createShopCartList({
          $props: {
            selectFoods: 'selectFoods'
          },
          $events: {
            hide: () => {
              this.listFold = true
            },
            leave: this._hideShopCarSticky,
            add: (event) => {
              this.shopCartStickyComp.drop(event)
            }
          }
        })
        this.shopCartListComp.show()
      },
      _showShopCartSticky(){
        this.shopCartStickyComp = this.shopCartStickyComp || this.$createShopCartSticky({
          $props: {
            selectFoods: 'selectFoods',
            deliveryPrice: 'deliveryPrice',
            minPrice: 'minPrice',
            fold: 'listFold',
            list: 'shopCartListComp'
          },
          $events: {
            hide: () => {
              this.listFold = true
            }
          }
        })
        this.shopCartStickyComp.show()
      },
      _hideShopCartList(){
        let comp = this.sticky ? this.$parent.list : this.shopCartListComp
        comp.hide && comp.hide()
      },
      _hideShopCarSticky(){
        this.shopCartStickyComp.hide()
      }
  },
    computed: {
      // 商品总价
      totalPrice(){
        let price = 0
        this.selectFoods.forEach(food => {
          price += food.price * food.count
        })
        return price
      },
      // 商品总数
      totalCount(){
        let count = 0
        this.selectFoods.forEach((food) => {
          count += food.count
        })
        return count
      },
      // 支付内容描述
      payDesc(){
        if (this.totalPrice === 0) {
          return `￥${this.minPrice}元起送`
        } else if (this.totalPrice < this.minPrice) {
          let diff = this.minPrice - this.totalPrice
          return `还差￥${diff}元起送`
        } else {
          return '去结算'
        }
      },
      // 跟随支付价格的变化显示不同的样式
      payClass(){
        if (!this.totalPrice || this.totalPrice < this.minPrice) {
          return 'not-enough'
        } else {
          return 'enough'
        }
      }
    },
    watch: {
      fold(newVal){
        this.listFold = newVal
      },
      totalCount(newVal){
        if (!this.fold && !newVal) this._hideShopCartList()
      }
    },
    components: {
      Bubble
    }
}
</script>

<style lang="stylus" scoped>
@import '~common/stylus/mixin';
@import '~common/stylus/variable';
.shopCart{
  height: 100%;
  .content{
    display: flex;
    height: 100%;
    background: $color-background;
    font-size: 0;
    color: $color-light-grey;
    .content-left{
      flex: 1
      .logo-wrapper{
        display: inline-block;
        vertical-align: top;
        position: relative;
        top: -10px;
        margin: 0 12px;
        padding: 6px;
        width: 56px;
        height: 56px;
        box-sizing: border-box;
        border-radius: 50%;
        background: $color-background;
        .logo{
          width: 100%;
          height: 100%;
          border-radius: 50%;
          text-align: center;
          background: $color-dark-grey;
          &.highlight {
            background: $color-blue;
          }
          .icon-shopping_cart {
            line-height: 44px;
            font-size: $fontsize-large-xxx;
            color: $color-light-grey;

            &.highlight {
              color: $color-white;
            }
          }
        }
        .num{
          position: absolute;
          top: 0;
          right: 0;
        }
      }
      .price {
        display: inline-block;
        vertical-align: top;
        margin-top: 12px;
        line-height: 24px;
        padding-right: 12px;
        box-sizing: border-box;
        border-right: 1px solid rgba(255, 255, 255, 0.1);
        font-weight: 700;
        font-size: $fontsize-large;

        &.highlight {
          color: $color-white;
        }
      }

      .desc {
        display: inline-block;
        vertical-align: top;
        margin: 12px 0 0 12px;
        line-height: 24px;
        font-size: $fontsize-small-s;
      }
    }
    .content-right {
      flex: 0 0 105px;
      width: 105px;
      .pay {
        height: 48px;
        line-height: 48px;
        text-align: center;
        font-weight: 700;
        font-size: $fontsize-small;
        &.not-enough {
          background: $color-dark-grey;
        }
        &.enough {
          background: $color-green;
          color: $color-white;
        }
      }
    }
  }
  .ball-container {
    .ball {
      position: fixed;
      left: 32px;
      bottom: 22px;
      z-index: 200;
      transition: all 0.4s cubic-bezier(0.49, -0.29, 0.75, 0.41);

      .inner {
        width: 16px;
        height: 16px;
        border-radius: 50%;
        background: $color-blue;
        transition: all 0.4s linear;
      }
    }
  }
}
</style>
