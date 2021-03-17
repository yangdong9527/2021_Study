<template>
  <div class="shop">
    <img class="shop__img" :src="item.imgUrl" >
    <div class="shop__content" :class="{'shop__content--border': hasBorder}">
      <div class="shop__content__title">{{item.name}}</div>
      <div class="shop__content__tag">
        <span>月售{{item.sales}}</span>
        <span>起送￥{{item.expressPrice}}</span>
        <span>基础运费￥{{item.expressLimit}}</span>
      </div>
      <p>{{item.slogan}}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ShowInfo',
  props: ['item', 'hasBorder']
}
</script>

<style lang="scss" scoped>
@import '../styles/variable.scss';
.shop {
  display: flex;
  margin-top: .12rem;
  &__img {
    width: .56rem;
    height: .56rem;
  }
  &__content {
    flex: 1;
    margin-left: .16rem;
    padding-bottom: .12rem;
    &--border {
      border-bottom: .01rem solid $content-color;
    }
    &__title {
      font-size: .16rem;
      line-height: .22rem;
      margin-bottom: .08rem;
    }
    &__tag {
      font-size: .13rem;
      line-height: .18rem;
      span {
        margin-right: .16rem;
      }
    }
    p {
      color: #E93B3B;
      font-size: .13rem;
      line-height: .18rem;
      margin: 0.08rem 0 0 0;
    }
  }
}
</style>