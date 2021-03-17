<template>
  <div class="toast">{{message}}</div>
</template>

<script>
import {reactive, toRefs} from 'vue'
export const useToastEffect = () => {
  let data = reactive({
    show: false,
    message: ''
  })

  const showToast = (message) => {
    data.show = true
    data.message = message
    setTimeout(() => {
      data.show = false
      data.message = ''
    }, 2000)
  }

  let {show, message} = toRefs(data)
  return {
    show, message,
    showToast
  }
}
export default {
  name: 'Toast',
  props: ['message']
}
</script>

<style lang="scss" scoped>
.toast {
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  padding: .1rem;
  background: rgba(0, 0, 0, .35);
  border-radius: .05rem;
  color: #fff;
}
</style>