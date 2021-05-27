<template>
  <column-list :list="list" ></column-list>
  <uploader action="/asdc" :beforeUpload="beforeUpload" @file-uploaded="onFileUplaoded">
    <h2>点击上传</h2>
    <template #loading>
      <div class="spinner-border" role="status">
        <span class="sr-only">Loading...</span>
      </div>
    </template>
    <template #success="dataProps">
      <img :src="dataProps.uploadedData.data.url">
    </template>
  </uploader>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ColumnList, { columnProp } from '../components/ColumnList.vue'
import Uploader from '../components/Uploader.vue'
import { ResponseType, ImageProps } from '../store'

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
  components: { ColumnList, Uploader },
  setup () {
    const aciton = 'http://www.yd.com'
    const beforeUpload = (file: File) => {
      const isJpg = file.type === 'image/jpeg'
      if (!isJpg) {
        alert('不是jpg')
      }
      return isJpg
    }
    const onFileUplaoded = (rawData: ResponseType<ImageProps>) => {
      console.log(rawData.data._id)
    }
    return {
      list: testData,
      aciton,
      beforeUpload,
      onFileUplaoded
    }
  }
})
</script>
