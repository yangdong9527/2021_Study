<template>
  <div class="wrapper">
    <div class="wrapper__shop">
      <ShopInfo :item="item" />
    </div>
  </div>
</template>

<script>
import { reactive, toRefs } from 'vue'
import {useRoute} from 'vue-router'
import {get} from '../../utils/request'
import ShopInfo from '../../components/ShopInfo'

const useShopInfoEffect = () => {
  const route = useRoute()
  const data = reactive({item: {}})
  const getShopInfoByID = async () => {
    const result = await get(`/api/shop/${route.params.id}`)
    if(result?.errno === 0) {
      data.item = result.data
    }
  }
  const {item} = toRefs(data)
  return {item, getShopInfoByID}
}

export default {
  name: 'Shop',
  components: {ShopInfo},
  setup() {
    const {item, getShopInfoByID} = useShopInfoEffect()
    getShopInfoByID()
    return {item}
  }
}
</script>

<style lang="scss" scoped>
.wrapper {
  &__shop {
    padding: .16rem .18rem;
    box-sizing: border-box;
  }
}
</style>