<template>
  <div class="container">
    <column-list :list="list" ></column-list>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import ColumnList, { columnProp } from './components/ColumnList.vue'

const testData: columnProp[] = [
  {
    id: 1,
    avatar: 'https://vue3js.cn/docs/logo.png',
    description: 'asdf',
    title: 'asdf'
  },
  {
    id: 2,
    avatar: 'https://vue3js.cn/docs/logo.png',
    description: 'asdf',
    title: 'asdf'
  },
  {
    id: 3,
    avatar: 'https://vue3js.cn/docs/logo.png',
    description: 'asdf',
    title: 'asdf'
  }
]
export default defineComponent({
  name: 'App',
  components: {
    ColumnList
  },
  setup () {
    return {
      list: testData
    }
  }
})
</script>

<style>

</style>
