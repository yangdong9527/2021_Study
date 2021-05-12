<template>
  <div class="container">
    <global-header :user="user" />
    <column-list :list="list" ></column-list>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import ColumnList, { columnProp } from './components/ColumnList.vue'
import GlobalHeader, { UserProps } from '@/components/GlobalHeader.vue'

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
    GlobalHeader
  },
  setup () {
    return {
      list: testData,
      user: testUser
    }
  }
})
</script>

<style>

</style>
