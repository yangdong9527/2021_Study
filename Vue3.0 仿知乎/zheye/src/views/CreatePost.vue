<template>
  <div class="create-post-page">
    <input type="file" @change="handleFileChange" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'CreatePost',
  setup () {
    const handleFileChange = (e: Event) => {
      const target = e.target as HTMLInputElement
      const files = target.files
      if (files) {
        const uploadFile = files[0]
        const formdata = new FormData()
        formdata.append(uploadFile.name, uploadFile)
        // 请求接口
      }
    }

    return {
      handleFileChange
    }
  }
})
</script>
