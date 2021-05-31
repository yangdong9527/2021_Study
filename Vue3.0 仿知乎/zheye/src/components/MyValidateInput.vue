<template>
  <div class="validate-input-container pb-3">
    <input
      class="form-control"
      :class="{'is-invalid': validResult.error}"
      v-model="validResult.value"
      v-bind="$attrs"
      @input="onUploadData"
      @blur="validateInput"
    />
    <span v-if="validResult.error" class="invalid-feedback">{{validResult.message}}</span>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, PropType, reactive } from 'vue'
import { emitter } from '@/components/MyValidateForm.vue'

interface RuleProp {
  type: 'required' | 'email';
  message: string
}
export type RulesProp = RuleProp[]
const emailReg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
export default defineComponent({
  name: 'MyValidateInput',
  inheritAttrs: false,
  props: {
    modelValue: String,
    rules: Array as PropType<RulesProp>
  },
  setup (props, context) {
    const validResult = reactive({
      value: props.modelValue || '',
      error: false,
      message: ''
    })

    const onUploadData = (e: KeyboardEvent) => {
      const targetValue = (e.target as HTMLInputElement).value
      validResult.value = targetValue
      context.emit('upload:modelValue', targetValue)
    }
    const validateInput = () => {
      if (props.rules) {
        const allPassed = props.rules.every(rule => {
          let passed = true
          validResult.message = rule.message
          switch (rule.type) {
            case 'required':
              passed = validResult.value.trim() !== ''
              break
            case 'email':
              passed = emailReg.test(validResult.value)
              break
            default:
              break
          }
          return passed
        })
        validResult.error = !allPassed
      } else {
        return true
      }
    }

    onMounted(() => {
      emitter.emit('form-item-created', validateInput)
    })
    return {
      validResult,
      onUploadData,
      validateInput
    }
  }
})

</script>
