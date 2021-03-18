<template>
  <div class="wrapper">
    <div class="search">
      <div class="search__back__icon iconfont" @click="handleBack">&#xe6e6;</div>
      <div class="search__content">
        <span class="search__content__icon iconfont">&#xe67d;</span>
        <input class="search__content__input" type="text" placeholder="请输入商品名称搜索">
      </div>
    </div>
    <div class="wrapper__shop">
      <ShopInfo :item="item" />
    </div>
    <Content />
    <Cart />
  </div>
</template>

<script>
import { reactive, toRefs } from 'vue'
import {useRoute, useRouter} from 'vue-router'
import {get} from '../../utils/request'
import ShopInfo from '../../components/ShopInfo'
import Content from './Content'
import Cart from './Cart'

const useShopInfoEffect = () => {
  const route = useRoute()
  const router = useRouter()
  const data = reactive({item: {}})
  const getShopInfoByID = async () => {
    const result = await get(`/api/shop/${route.params.id}`)
    if(result?.errno === 0) {
      data.item = result.data
    }
  }
  const handleBack = () => {
    router.back()
  }
  const {item} = toRefs(data)
  return {item, getShopInfoByID, handleBack}
}

export default {
  name: 'Shop',
  components: {ShopInfo, Content, Cart},
  setup() {
    const {item, getShopInfoByID, handleBack} = useShopInfoEffect()
    getShopInfoByID()
    return {item, handleBack}
  }
}
</script>

<style lang="scss" scoped>
.wrapper {
  .search {
    padding: 0 .18rem;
    display: flex;
    margin-top: .16rem;
    .search__back__icon {
      color: #B6B6B6;
      font-size: .2rem;
      margin-right: .16rem;
      line-height: .32rem;
    }
    .search__content {
      flex: 1;
      background-color: #f5f5f5;
      height: .32rem;
      padding: 0 .16rem;
      border-radius: .16rem;
      display: flex;
      line-height: .32rem;
      font-size: .14rem;
      .search__content__icon {
        font-size: .16rem;
        color: #B7B7B7 ;
        margin-right: .16rem;
      }
      .search__content__input {
        flex: 1;
        height: 100%;
        background-color: transparent;
        border: none;
        outline: none;
      }
    }
  }
  &__shop {
    padding: 0 .18rem;
    box-sizing: border-box;
  }
}
</style>