<template>
  <div class="form-wrap">
    <validate-form @formSubmit="formSubmit">
      <validate-input v-model="email" :rules="emailRules"  type="text" placeholder="请输入邮箱"></validate-input>
      <validate-input v-model="password" :rules="passRules" type="password" placeholder="请输入密码"></validate-input>
      <template v-slot:submit>
        <button class="btn btn-primary">点击提交</button>
      </template>
    </validate-form>
    <my-validate-form ref="formRef">
      <my-validate-input v-model="testData" :rules="myRules" class="abc" placeholder="请输入名字" />
    </my-validate-form>
    <button class="btn btn-primary" @click="testClick">点我</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import ValidateForm from '@/components/ValidateForm.vue'
import ValidateInput, { RulesProp } from '@/components/ValidateInput.vue'
import MyValidateInput from '@/components/MyValidateInput.vue'
import MyValidateForm from '@/components/MyValidateForm.vue'

// 如何调用子组件中的方法
interface formRefProp extends HTMLElement {
  submitForm: () => boolean
}

export default defineComponent({
  name: 'Login',
  components: {
    ValidateForm,
    ValidateInput,
    MyValidateInput,
    MyValidateForm
  },
  setup () {
    const formSubmit: (res: boolean) => void = (result) => {
      if (result) {
        alert('验证成功了!')
      }
    }
    const email = ref(null)
    const password = ref(null)
    const testData = ref(null)
    const emailRules: RulesProp = [
      { type: 'required', message: '请输入电子邮箱地址' },
      { type: 'email', message: '请输入正确的电子邮箱地址' }
    ]
    const passRules: RulesProp = [
      { type: 'required', message: '请输入密码' }
    ]
    const myRules: RulesProp = [
      { type: 'required', message: '该项不能为空' },
      { type: 'email', message: '请输入合法邮箱' }
    ]
    const formRef = ref<formRefProp | null>(null)
    const testClick = () => {
      if (formRef.value) {
        formRef.value.submitForm()
      }
    }
    return {
      email,
      password,
      formSubmit,
      emailRules,
      passRules,
      testData,
      myRules,
      testClick,
      formRef
    }
  }
})
</script>

<style scoped>
  .form-wrap {
    width: 300px;
    margin: 0 auto;
  }
</style>
