import moment from 'moment'
const ALL = 2
export default {
  data(){
    return {
      selectType: ALL,
      desc: {
        all: '全部',
        positive: '好评',
        negative: '差评'
      },
      onlyContent: true
    }
  },
  methods: {
    format(time){
      return moment(time).format('YYYY-MM-DD hh:mm')
    },
    onSelect(type){
      this.selectType = type
    },
    onToggle(){
      this.onlyContent = !this.onlyContent
    }
  },
  computed: {
    computedRatings(){
      let ret = []
      this.ratings.forEach((rating) => {
        if (this.onlyContent && !rating.text) {
          return
        }
        if (this.selectType === ALL || rating.rateType === this.selectType) {
          ret.push(rating)
        }
      })
      return ret
    }
  }
}
