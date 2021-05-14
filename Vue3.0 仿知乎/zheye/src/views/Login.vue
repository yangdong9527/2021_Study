<template>
  <div class="form-wrap">
    <validate-form @formSubmit="formSubmit">
      <validate-input v-model="email" :rules="emailRules"  type="text" placeholder="请输入邮箱"></validate-input>
      <validate-input v-model="password" :rules="passRules" type="password" placeholder="请输入密码"></validate-input>
      <template v-slot:submit>
        <button class="btn btn-primary">点击提交</button>
      </template>
    </validate-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import ValidateForm from '@/components/ValidateForm.vue'
import ValidateInput, { RulesProp } from '@/components/ValidateInput.vue'

export default defineComponent({
  name: 'Login',
  components: {
    ValidateForm,
    ValidateInput
  },
  setup () {
    const formSubmit: (res: boolean) => void = (result) => {
      if (result) {
        alert('验证成功了!')
      }
    }
    const email = ref(null)
    const password = ref(null)
    const emailRules: RulesProp = [
      { type: 'required', message: '请输入电子邮箱地址' },
      { type: 'email', message: '请输入正确的电子邮箱地址' }
    ]
    const passRules: RulesProp = [
      { type: 'required', message: '请输入密码' }
    ]
    return {
      email,
      password,
      formSubmit,
      emailRules,
      passRules
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
