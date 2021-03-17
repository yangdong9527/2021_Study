<template>
  <div class="nearby">
    <h3 class="nearby__title">附近商店</h3>
    <router-link v-for="item in shopList" :key="item._id" :to="`/shop/${item._id}`" >
      <ShopInfo  :item="item" :hasBorder="true" />
    </router-link>
  </div>
</template>

<script>
import { ref } from 'vue'
import { get } from '../../utils/request'
import ShopInfo from '../../components/ShopInfo'

const useNearByEffect = () => {
  let shopList = ref([])

  const getShopList = async () => {
    try {
      const result = await get('/api/shop/hot-list')
      if(result?.errno === 0 && result?.data.length) {
        shopList.value = result.data
      }
    } catch (error) {
      console.log(error)
    }
  }

  return { shopList, getShopList }
}

export default {
  name: 'NearBy',
  components: {ShopInfo},
  setup() {
    const { shopList, getShopList } = useNearByEffect()
    getShopList()
    return {
      shopList
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../styles/variable.scss';
.nearby {
  &__title {
    font-size: .18rem;
    margin: .16rem 0 .02rem;
  }
  a {
    text-decoration: none;
    color: $content-color2;
  }
}
</style>