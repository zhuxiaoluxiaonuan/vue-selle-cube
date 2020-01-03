<template>
    <div class="header" @click="showDetail">
        <div class="content-wrapper">
            <div class="avatar">
                <img width="64" height="64" :src="seller.avatar">
            </div>
            <div class="content">
                <div class="title">
                    <span class="icon"></span>
                    <span>{{ seller.name }}</span>
                </div>
                <div class="description">{{ seller.description }}  / {{ seller.deliveryTime }}分钟送达</div>
                <div class="support" v-if="seller.supports">
                  <support-ico :size=1 :type='seller.supports[0].type' />
                  <span>{{ seller.supports[0].description}}</span>
                </div>
            </div>
            <div class="support-count" v-if="seller.supports">
              <span class="count">{{ seller.supports.length }}个</span>
              <i class="icon-keyboard_arrow_right"></i>
            </div>
        </div>
        <div class="bulletin-wrapper">
            <span class="bulletin-title"></span>
            <span class="bulletin-text">{{ seller.bulletin }}</span>
            <i class="icon-keyboard_arrow_right"></i>
        </div>
        <div class="background">
            <img :src="seller.avatar" width="100%" height="100%" />
        </div>
    </div>
</template>
<script>
import SupportIco from 'components/support-ico/support-ico'
export default {
    name: 'v-header',
    props: {
        seller: {
            type: Object,
            default(){
              return {}
            }
        }
    },
    methods: {
      showDetail(){
        let headerDetailCmp = this.$createHeaderDetail({
          $props: {
            seller: 'seller'
          }
        })
        headerDetailCmp.show()
      }
    },
    components: {
      SupportIco
    }
}
</script>
<style lang="stylus" scoped ref="stylesheet/stylus">
@import "~common/stylus/mixin"
@import "~common/stylus/variable"
.header
    position: relative
    width: 100%
    height: 134px
    background-color: $color-background-ss
  .content-wrapper
    position: relative
    display: flex
    padding: 24px 24px 18px 24px
    height: 64px
    .avatar
      width: 64px
      height: 64px;
      border-radius: 4px
    .content
      margin: 2px 0 2px 16px
      .title
        display: flex
        span
          font-size: 16px
          color: rgb(255, 255, 255)
          font-weight: bold
          line-height: 18px
          &.icon
            display: inline-block
            margin-right: 6px
            width: 30px
            height: 18px
            color: $color-background-ss
            bg-image('brand')
            background-size: 30px 18px
            background-repeat: no-repeat
      .description
        margin-top: 8px
        font-size: 12px
        color: rgb(255, 255, 255)
        font-weight: 200
        line-height: 12px

      .support
        vertical-align: top
        margin-top: 10px
        span
          margin-left: 4px
          font-size: 10px
          color: rgb(255, 255, 255)
          font-weight: 200
          line-height: 12px
    .support-count
      display: flex
      align-items: center
      position: absolute
      right: 12px
      bottom: 14px
      padding: 0 8px
      height: 24px
      line-height: 24px
      border-radius: 14px
      background: rgba(0, 0, 0, 0.2)
      color: rgb(255, 255, 255)
      text-align: center
      .count
        font-size: 10px
        font-weight: 200
      .icon-keyboard_arrow_right
        margin-left: 2px
        line-height: 24px
        font-size: 10px
  .bulletin-wrapper
    position: relative
    height: 28px
    line-height: 28px
    padding: 0 22px 0 12px
    white-space: nowrap
    overflow: hidden
    text-overflow: ellipsis
    background: $color-background-sss
    color: rgb(255, 255, 255)
    .bulletin-title
      display: inline-block
      vertical-align: top
      margin-top: 8px
      width: 22px
      height: 12px
      bg-image('bulletin')
      background-size: 22px 12px
      background-repeat: no-repeat
    .bulletin-text
      vertical-align: top
      margin: 0 4px
      font-size: 10px
    .icon-keyboard_arrow_right
      position: absolute
      font-size: 10px
      right: 12px
      top: 8px
.background
    position: absolute
    top: 0
    left: 0
    width: 100%
    height: 100%
    z-index: -1
    filter: blur(10px)
</style>
