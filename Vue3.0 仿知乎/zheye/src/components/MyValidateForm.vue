<template>
  <form class="validate-form-container">
    <slot name="default"></slot>
    <div class="submit-area" @click.prevent="submitForm">
      <slot name="submit">
        <button type="submit" class="btn btn-primary">点击提交</button>
      </slot>
    </div>
  </form>
</template>

<script lang="ts">
import { defineComponent, onUnmounted } from 'vue'
import mitt, { Handler } from 'mitt'
type ValidateFun = () => boolean
export const emitter = mitt()
export default defineComponent({
  name: 'MyValidateForm',
  setup () {
    let funArr: ValidateFun[] = []
    const submitForm: () => boolean = () => {
      const result = funArr.map(fn => fn()).every(bool => bool)
      console.log(result)
      return result
    }
    const handler: Handler = (fun : ValidateFun) => {
      funArr.push(fun)
    }
    emitter.on('form-item-created', handler)
    onUnmounted(() => {
      emitter.off('form-item.created', handler)
      funArr = []
    })
    return {
      submitForm
    }
  }
})
</script>
