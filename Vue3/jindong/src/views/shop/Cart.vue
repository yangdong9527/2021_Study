<template>
  <div class="product">
    <div class="product__header">
      <div class="product__header__allCheck">
        <span class="iconfont product__header__icon" v-if="calculations.allCheck">&#xe70f;</span>
        <span class="iconfont product__header__icon" style="color: #ccc" v-else>&#xe625;</span>
        <span>全选</span>
      </div>
      <span class="product__header__clear">清空购物车</span>
    </div>
  </div>
  <div class="cart">
    <div class="cart__icon">
      <img
        src="http://www.dell-lee.com/imgs/vue3/basket.png"
        class="check__icon__img"
      />
      <div class="cart__icon__tag">{{calculations.total}}</div>
    </div>
    <div class="cart__info">
      <span class="cart__info__text">总计:</span>
      <span class="cart__info__price">&yen; {{calculations.price}}</span>
    </div>
    <div class="cart__btn">
      去结算
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'

const userCartEffect = (shopId) => {
  const store = useStore()
  const calculations = computed(() => {
    let result = {total: 0, price: 0, allCheck: false}
    const cartList = store.state.cartList
    const shopInfo = cartList?.[shopId]
    if(shopInfo) {
      // 获取所有不为0的商品
      const hasProduct = Object.values(shopInfo).filter(item => {
        return item.count > 0
      })
      let price = 0
      let total = 0
      hasProduct.forEach(item => {
        total = total + item.count
        price = price + (item.count * item.price)
      })
      result.total = total
      result.price = price
      if(hasProduct.length) {
        result.allCheck = hasProduct.some(item => {
          return item.check
        })
      }
    }
    result.price = result.price.toFixed(2)
    return result;
  })

  return {calculations}
}
export default {
  name: 'Cart',
  setup() {
    const route = useRoute()
    const shopId = route.params.id

    const {calculations} = userCartEffect(shopId)
    return {shopId, calculations}
  }
}
</script>

<style lang="scss" scoped>
.product {
  position: absolute;
  left: 0;
  right: 0;
  bottom: .5rem;
  background-color: #fff;
  .product__header {
    width: 100%;
    box-sizing: border-box;
    padding: 0 .18rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: .14rem;
    height: .52rem;
    border-bottom: .01rem solid #f1f1f1;
    .product__header__allCheck {
      display: flex;
      align-items: center;
    }
    &__icon {
      font-size: .2rem;
      color: #0091FF;
      margin-right: .1rem;
    }
  }
}
.cart {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: .5rem;
  background-color: #fff;
  display: flex;
  .cart__icon {
    position: relative;
    width: .76rem;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    .check__icon__img {
      width: .28rem;
      height: .26rem;
      display: inline-block;
    }
    .cart__icon__tag {
      position: absolute;
      top: .04rem;
      left: .4rem;
      transform: scale(.5);
      min-width: .2rem;
      height: .2rem;
      font-size: .14rem;
      line-height: .2rem;
      text-align: center;
      border-radius: .5rem;
      background-color: #E93B3B;
      color: #fff;
    }
  }
  .cart__info {
    flex: 1;
    height: 100%;
    line-height: .5rem;
    display: flex;
    align-items: center;
    .cart__info__text {
      margin: 0 .08rem;
    }
    .cart__info__price {
      font-size: .18rem;
      color: #E93B3B;
    }
  }
  .cart__btn {
    width: .98rem;
    height: 100%;
    background-color: #4FB0F9;
    color: #fff;
    font-size: .14rem;
    line-height: .5rem;
    text-align: center;
  }
}
</style>