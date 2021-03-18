<template>
  <div class="content">
    <div class="category">
      <div 
        class="category__item" 
        :class="{'category__item--active': item.tab === currTab}"
        v-for="(item, index) in categories" 
        :key="index"
        @click="handleChangeTab(item)">
        {{item.name}}
      </div>
    </div>
    <div class="product">
      <div class="product__item" v-for="item in productList" :key="item._id">
        <img class="product__img" :src="item.imgUrl" alt="">
        <div class="product__item__detail">
          <h4 class="product__item__title">{{item.name}}</h4>
          <p class="product__item__sales">月销{{item.sales}}件</p>
          <div class="poduct__item__price">
            <span class="product__item__curr">&yen;{{item.price}}</span>
            <span class="product__item__old">&yen;{{item.oldPrice}}</span>
          </div>
        </div>
        <div class="product__item__number">
          <span class="iconfont product__icon__minus" @click="changeCartList( shopId, item._id, item,  -1)">&#xe960;</span>
            {{getCartListCount(shopId, item._id)}}
          <span class="iconfont product__icon__add" @click="changeCartList(shopId, item._id, item, 1)">&#xe613;</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import {get} from '../../utils/request'

const categories = [
  { name: '全部商品', tab: 'all' },
  { name:'秒杀', tab: 'seckill' },
  { name: '新鲜水果', tab: 'fruit'}
]

const useCategotyEffect = (shopId, productList) => {
  let currTab = ref(categories[0].tab)

  const handleChangeTab = (item) => {
    currTab.value = item.tab
  }

  // 根据currTab获取产品列表
  const getProudctByTab = async () => {
    const result = await get(`/api/shop/${shopId}/products`, {
      tab: currTab.value
    })
    if(result?.errno === 0) {
      productList.value = result.data
    }
  }

  // 监听currTab的变化调用参数
  watchEffect(() => {
    getProudctByTab()
  })
  return {currTab, handleChangeTab}
}

const useProductEffect = () => {
  const store = useStore()
  const cartList = store.state.cartList
  let productList = ref([])

  const changeCartList = (shopId, productId, item, num) => {
    store.commit('changeCartListInfo', {shopId, productId, item, num})
  }
  const getCartListCount = (shopId, productId) => {
    return cartList?.[shopId]?.[productId]?.count || 0
  }

  return {productList, changeCartList, getCartListCount}
}

export default {
  name: 'Content',
  setup() {
    const route = useRoute()
    const shopId = route.params.id
    const { productList, changeCartList,getCartListCount} = useProductEffect()
    const {currTab, handleChangeTab} = useCategotyEffect(shopId, productList)
    return {
      categories, currTab, productList, handleChangeTab,
      changeCartList, shopId, getCartListCount
    }
  }
}
</script>

<style lang="scss" scoped>
.content {
  position: absolute;
  top: 1.5rem;
  bottom: .5rem;
  left: 0;
  right: 0;
  display: flex;
  .category {
    width: .76rem;
    height: 100%;
    overflow-y: scroll;
    background-color: #f5f5f5;
    &__item {
      height: .4rem;
      font-size: .14rem;
      line-height: .4rem;
      text-align: center;
    }
    &__item--active {
      background-color: #fff;
    }
  }
  .product {
    flex: 1;
    height: 1;
    overflow-y: scroll;
    padding: 0 .16rem;
    .product__item {
      display: flex;
      position: relative;
      padding-bottom: .12rem;
      margin-bottom: .12rem;
      border-bottom: .01rem solid #f1f1f1;
      .product__img {
        display: block;
        width: .68rem;
        height: .68rem;
        margin-right: .16rem;
      }
      .product__item__detail {
        flex: 1;
        position: relative;
        .product__item__title {
          margin: 0;
          font-size: .14rem;
          color: #333;
          line-height: .2rem;
        }
        .product__item__sales {
          margin: .06rem 0;
          font-size: .12rem;
          color: #333;
          line-height: .16rem;
        }
        .product__item__curr {
          color: #E93B3B;
          font-size: .14rem;
          margin-right: .06rem;
        }
        .product__item__old {
          color: #999;
          font-size: .12rem;
          text-decoration: line-through;
        }
      }
      .product__item__number {
        position: absolute;
        right: 0;
        bottom: .12rem;
        .product__icon__minus {
          display: inline-block;
          width: .2rem;
          height: .2rem;
          border: .01rem solid #666;
          color: #666;
          line-height: .2rem;
          text-align: center;
          font-size: .16rem;
          border-radius: 50%;
          margin-right: .1rem;
        }
        .product__icon__add {
          display: inline-block;
          width: .2rem;
          height: .2rem;
          background-color: #0091FF;
          border-radius: 50%;
          font-size: .16rem;
          color: #fff;
          text-align: center;
          line-height: .2rem;
          margin-left: .1rem;
        }
      }
    }
  }
}
</style>