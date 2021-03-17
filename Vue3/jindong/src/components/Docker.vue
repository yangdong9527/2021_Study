<template>
  <div class="docker">
    <div class="docker__item">
      <span class="iconfont docker__item__icon">&#xe600;</span>
      <div class="docker__item__text">首页</div>
    </div>
    <div class="docker__item">
      <span class="iconfont docker__item__icon">&#xe6fc;</span>
      <div class="docker__item__text">购物车</div>
    </div>
    <div class="docker__item">
      <span class="iconfont docker__item__icon">&#xe6c2;</span>
      <div class="docker__item__text">订单</div>
    </div>
    <div class="docker__item">
      <span class="iconfont docker__item__icon">&#xe640;</span>
      <div class="docker__item__text">我的</div>
    </div>
  </div>
</template>

<script>
  export default {
    
  }
</script>

<style lang="scss" scoped>
@import '../styles/variable.scss';
.docker {
  position: absolute;
  background-color: #fff;
  width: 100%;
  bottom: 0;
  height: .5rem;
  box-shadow: 0 -1px 1px 0 #F1F1F1;
  padding: 0 .18rem;
  box-sizing: border-box;
  display: flex;
  .docker__item {
    flex: 1;
    text-align: center;
    padding-top: .07rem;
    .docker__item__icon {
      color: $content-color2;
      font-size: 0.2rem;
      margin-bottom: .02rem;
    }
    .docker__item__text {
      font-size: 0.2rem;
      transform: scale(.5);
      transform-origin: center top;
      color: $content-color2;
    }
  }
}
</style>