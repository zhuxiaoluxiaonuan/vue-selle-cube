<template>
  <div class="tab">
    <cube-tab-bar v-model="selectedLabel"
                  :showSlider=true
                  ref="tabBar"
                  :data="tabs">
    </cube-tab-bar>
    <div class="slide-wrapper">
      <cube-slide
        ref="slide"
        :loop=false
        :initial-index="index"
        :auto-play=false
        :show-dots=false
        :options="slideOptions"
        @scroll="scroll"
        @change="changePage"
      >
        <cube-slide-item v-for="(item, index) in tabs" :key="index">
          <component :is="item.component" :data="item.data" ref="component"></component>
        </cube-slide-item>
      </cube-slide>
    </div>
  </div>
</template>

<script>
  import { savePage } from 'common/js/storage'
  const KEY = 'page'
  export default {
  name: 'tab',
  props: {
      tabs: {
        type: Array,
        default (){
          return []
        }
      },
      initIndex: {
        type: Number,
        default: 0
      }
  },
  data(){
    return {
      index: this.initIndex,
      slideOptions: {
        listenScroll: true,
        probeType: 3,
        directionLockThreshold: 0
      }
    }
  },
  mounted(){
  this.changePage(this.index)
},
  methods: {
    changePage (current) {
      this.selectedLabel = this.tabs[current].label
      // 调用子组件的fetch方法
      let component = this.$refs.component[current]
      component.fetch && component.fetch()
      // 切换本地存储的当前选项
      savePage(KEY, current)
    },
    scroll (pos) {
      const x = Math.abs(pos.x)
      const tabItemWidth = this.$refs.tabBar.$el.clientWidth
      const slideScrollerWidth = this.$refs.slide.slide.scrollerWidth
      const deltaX = x / slideScrollerWidth * tabItemWidth
      this.$refs.tabBar.setSliderTransform(deltaX)
    }
  },
  computed: {
    selectedLabel: {
      get(){
        return this.tabs[this.index].label
      },
      set(newVal){
        this.index = this.tabs.findIndex(item => item.label === newVal)
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~common/stylus/variable'
.tab {
  display: flex;
  flex-direction: column;
  height: 100%;
  >>> .cube-tab {
    padding: 10px 0;
  }
  .slide-wrapper {
    flex: 1;
    overflow: hidden;
    height: 100%
  }
}
</style>
