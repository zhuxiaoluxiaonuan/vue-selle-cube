<template>
    <transition name="fade">
      <div v-show="visible" class="detail">
        <div class="detail-wrapper">
          <div class="detail-main">
            <h1 class="name">{{seller.name}}</h1>
            <div class="star-wrapper">
              <star :size="48" :score="seller.score" />
            </div>
            <div class="title">
              <div class="line"></div>
              <div class="text">优惠信息</div>
              <div class="line"></div>
            </div>
            <ul v-if="seller.supports" class="supports">
              <li class="support-item" v-for="(item,index) in seller.supports" :key="index">
                <support-ico :size="2" :type="item.type"/>
                <span class="text">{{item.description}}</span>
              </li>
            </ul>
            <div class="title">
              <div class="line"></div>
              <div class="text">商家公告</div>
              <div class="line"></div>
            </div>
            <div class="bulletin">
              <p class="content">{{seller.bulletin}}</p>
            </div>
          </div>
        </div>
        <div class="detail-close" @click="hide">
          <i class="icon-close"></i>
        </div>
      </div>
    </transition>
</template>

<script>
  import Star from 'components/star/star'
  import SupportIco from 'components/support-ico/support-ico'
  import popupMixin from 'common/mixins/popup'
  export default {
      name: 'header-detail',
      mixins: [popupMixin],
      props: {
        seller: {
          type: Object,
          default(){
            return {}
          }
        }
      },
      components: {
        star: Star,
        SupportIco
      }
  }
</script>

<style scoped lang="stylus">
@import "~common/stylus/mixin"
@import "~common/stylus/variable"
.detail
  position: fixed
  top: 0
  left: 0
  width: 100%
  height 100%
  background-filter: blur(10px)
  opacity: 1
  background-color: $color-background-s
  &.fade-enter-active, &.fade-leave-active
    transition: all 0.5s
  &.fade-enter, &.fade-leave-active
    opacity: 0
    background: rgba(7, 17, 27, 0)
  .detail-wrapper
    width: 100%
    min-height: 100%
    .detail-main
      margin-top: 64px
      padding-bottom: 64px
      .name
        text-align: center
        font-size: 16px
        font-weight: 700
        color: rgb(255, 255, 255)
        line-height: 16px
      .star-wrapper
        display: flex
        justify-content: center
        margin-top: 16px
        height: 24px

      .title
        display: flex
        width: 80%
        margin: 28px auto 24px auto
        .line
          flex: 1
          position: relative
          top: -6px
          width: 112px
          border-1px(rgba(255, 255, 255, 0.2))
        .text
          margin: 0 12px
          font-size: 14px
          font-weight: 700
          color: rgb(255, 255, 255)
          line-height: 14px
      .supports
        margin: 0 auto
        width: 80%
        .support-item
          display: flex
          align-items: center
          margin-bottom: 12px
          height: 16px
          .text
            margin-left: 6px
            font-size: 12px
            font-weight: 200
            color: rgb(255, 255, 255)
          &:last-child
            margin-bottom: none
      .bulletin
        margin: 0 auto
        width: 80%
        .content
          margin: 0 12px
          font-size: 12px
          font-weight: 200
          color: rgb(255, 255, 255)
          line-height: 24px
  .detail-close
    position: absolute
    bottom: 32px
    width: 100%
    text-align: center
    font-size: 32px
    color: rgba(255, 255, 255, 0.5)
</style>
