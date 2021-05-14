<template>
  <div class="validate-input-container pb-3">
    <input
      class="form-control"
      :class="{'is-invalid': validResult.error}"
      :value="validResult.val"
      @blur="validateInput"
      @input="updateValue"
      v-bind="$attrs"
    />
    <span v-if="validResult.error" class="invalid-feedback">{{validResult.message}}</span>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, reactive, onMounted } from 'vue'
import { emitter } from './ValidateForm.vue'

interface RuleProp {
  type: 'required' | 'email',
  message: string
}
export type RulesProp = RuleProp[]
const emailReg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
export default defineComponent({
  name: 'ValidateInput',
  props: {
    rules: Array as PropType<RulesProp>,
    modelValue: String
  },
  setup (props, context) {
    const validResult = reactive({
      val: props.modelValue || '',
      error: false,
      message: ''
    })

    const validateInput = () => {
      if (props.rules) {
        const allPassed = props.rules.every(rule => {
          let passed = true
          validResult.message = rule.message
          switch (rule.type) {
            case 'required':
              passed = validResult.val.trim() !== ''
              break
            case 'email':
              passed = emailReg.test(validResult.val)
              break
            default:
              break
          }
          return passed
        })
        validResult.error = !allPassed
        return allPassed
      } else {
        return true
      }
    }
    const updateValue = (e: KeyboardEvent) => {
      const tragetValue = (e.target as HTMLInputElement).value
      validResult.val = tragetValue
      context.emit('update:modelValue', tragetValue)
    }
    onMounted(() => {
      emitter.emit('form-item-created', validateInput)
    })
    return {
      validResult,
      validateInput,
      updateValue
    }
  }
})
</script>
