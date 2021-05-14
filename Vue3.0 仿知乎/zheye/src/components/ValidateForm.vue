<template>
  <form class="validate-form-container">
    <slot name="default"></slot>
    <div class="submit-area" @click.prevent="submitForm">
      <slot name="submit">
        <button type="submit" class="btn btn-primary">提交</button>
      </slot>
    </div>
  </form>
</template>

<script lang="ts">
import { defineComponent, onUnmounted } from 'vue'
import mitt, { Handler } from 'mitt'
export const emitter = mitt()
type ValidateFun = () => boolean
export default defineComponent({
  emits: ['form-submit'],
  setup (props, context) {
    const submitForm = () => {
      const result = funArr.map(fn => fn()).every(bool => bool)
      context.emit('form-submit', result)
    }
    let funArr: ValidateFun[] = []
    const callback: Handler = (func: ValidateFun) => {
      funArr.push((func))
    }
    emitter.on('form-item-created', callback)
    onUnmounted(() => {
      emitter.off('form-item-created', callback)
      funArr = []
    })
    return {
      submitForm
    }
  }
})
</script>
