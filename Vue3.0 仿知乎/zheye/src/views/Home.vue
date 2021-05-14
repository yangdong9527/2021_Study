<template>
  <column-list :list="list" ></column-list>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ColumnList, { columnProp } from '../components/ColumnList.vue'

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
export default defineComponent({
  name: 'Home',
  components: { ColumnList },
  setup () {
    return {
      list: testData
    }
  }
})
</script>
