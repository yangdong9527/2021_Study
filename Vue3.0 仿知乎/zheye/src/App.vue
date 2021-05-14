<template>
  <div class="container">
    <global-header :user="user" />
    <column-list :list="list" ></column-list>
    <validate-form @formSubmit="formSubmit">
      <div class="mb-3">
        <label for="exampleInputEmail1" class="form-label">邮箱地址</label>
        <validate-input v-model="email" type="text" placeholder="请输入邮箱地址" :rules="emailRules" />
      </div>
      <div class="mb-3">
        <label for="exampleInputPassword" class="form-label">密码</label>
        <validate-input v-model="password" type="password" placeholder="请输入密码" :rules="passRules" />
      </div>
      <template #submit>
        <button class="btn btn-primary">点我啊</button>
      </template>
    </validate-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import ColumnList, { columnProp } from './components/ColumnList.vue'
import GlobalHeader, { UserProps } from '@/components/GlobalHeader.vue'
import ValidateForm from '@/components/ValidateForm.vue'
import ValidateInput, { RulesProp } from '@/components/ValidateInput.vue'

const testData: columnProp[] = [
  {
    id: 1,
    avatar: 'https://vue3js.cn/docs/logo.png',
    description: '这是一个标题',
    title: '这是这个专栏的一些描述性的话语'
  },
  {
    id: 2,
    avatar: 'https://vue3js.cn/docs/logo.png',
    description: '这是一个标题',
    title: '这是这个专栏的一些描述性的话语'
  },
  {
    id: 3,
    avatar: 'https://vue3js.cn/docs/logo.png',
    description: '这是一个标题',
    title: '这是这个专栏的一些描述性的话语'
  },
  {
    id: 3,
    description: '这是一个标题',
    title: '这是这个专栏的一些描述性的话语'
  }
]
const testUser: UserProps = {
  isLogin: true,
  name: 'yd',
  id: 999
}
export default defineComponent({
  name: 'App',
  components: {
    ColumnList,
    GlobalHeader,
    ValidateForm,
    ValidateInput
  },
  setup () {
    const email = ref('')
    const emailRules: RulesProp = [
      { type: 'required', message: '请输入电子邮箱' },
      { type: 'email', message: '请输入正确的电子邮箱格式' }
    ]
    const password = ref('')
    const passRules: RulesProp = [
      { type: 'required', message: '请输入密码' }
    ]
    const formSubmit = (valid: boolean) => {
      // 点击提交按钮
      if (valid) {
        console.log('验证成功')
      } else {
        console.log('验证失败')
      }
    }
    return {
      list: testData,
      user: testUser,
      emailRules,
      email,
      password,
      passRules,
      formSubmit
    }
  }
})
</script>

<style>

</style>
