<template>
  <div class="wrapper">
    <div class="span">
      <div class="coffee_cup"></div>
      <span class="title">Loading</span>
    </div>
  </div>
</template>

<script>
    export default {
        name: 'loader'
    }
</script>

<style lang="stylus" scoped>
@import '~common/stylus/variable';
* {
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
}
.wrapper{
  position: absolute;
  top: 50%;
  left: 50%;
  margin: -50px 0 0 -50px;
  width: 100px;
  height: 100px;
}
.span{
  width: 100px;
  height: 100px;
  vertical-align: middle;
  border-radius: 1px;
}
.title{
  position: absolute;
  bottom: 5px;
  width: 100%;
  text-align: center;
  font-size: 12px;
  color: $color-green;
  font-family: -webkit-pictograph
}
.coffee_cup{
  width: 20px;
  height: 24px;
  border: 1px $color-green solid;
  border-radius: 0px 0px 5px 5px;
  position: relative;
  margin: 36px auto;
}
.coffee_cup:after, .coffee_cup:before{
  position: absolute;
  content: "";
}
.coffee_cup:after{
  width: 5px;
  height: 12px;
  border: 1px $color-green solid;
  border-left: none;
  border-radius: 0px 20px 20px 0px;
  left: 20px;
}
.coffee_cup:before{
  width: 1px;
  height: 6px;
  background-color: $color-green;
  top: -10px;
  left: 4px;
  box-shadow: 5px 0px 0px 0px $color-green,
    5px -5px 0px 0px $color-green,
    10px 0px 0px 0px $color-green;
  -webkit-animation: steam 1s linear infinite alternate;
  -moz-animation: steam 1s linear infinite alternate;
  animation: steam 1s linear infinite alternate;
}
@-webkit-keyframes steam{
  0%{height: 0px;}
  100%{height: 6px;}
}
@-moz-keyframes steam{
  0%{height: 0px}
  100%{height: 6px;}
}
@keyframes steam{
  0%{height: 0px}
  100%{height: 6px;}
}
</style>
