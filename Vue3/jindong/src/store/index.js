import { createStore } from 'vuex'

export default createStore({
  state: {
    cartList: {}
  },
  mutations: {
    changeCartListInfo(state, playload) {
      const {shopId, productId, item, num} = playload
      const shopInfo = state.cartList[shopId] || {}
      let product = shopInfo[productId]
      if(!product) {
        product = item
        item.count = 0
      }
      product.count = product.count + num
      if(num > 0) {product.check = true}
      if(product.count < 0) { 
        product.count = 0
        product.check = false
      }
      shopInfo[productId] = product
      state.cartList[shopId] = shopInfo
    }
  },
  actions: {
  },
  modules: {
  }
})
