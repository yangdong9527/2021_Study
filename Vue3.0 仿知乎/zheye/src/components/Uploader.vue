<template>
  <div class="file-upload">
    <div class="file-upload-container" @click.prevent="triggerUpload">
      <slot v-if="fileStatus === 'loading'" name="loading">
        <button class="btn btn-primary" disabled>正在上传...</button>
      </slot>
      <slot v-if="fileStatus === 'success'" :uploadedData="uploadedData" name="success">
        <button class="btn btn-primary" disabled>上传成功</button>
      </slot>
      <slot v-else name="default">
        <button class="btn btn-primary">点击上传</button>
      </slot>
    </div>
    <input
      type="file"
      class="file-input d-none"
      ref="fileInput"
      @change="handleFileChange"
    />
  </div>
</template>

<script lang="ts">
import axios from 'axios'
import { defineComponent, ref, PropType } from 'vue'
type UploadStatus = 'ready' | 'loading' | 'success' | 'error'
type checkFunction = (file: File) => boolean
export default defineComponent({
  name: 'UploadFile',
  props: {
    action: {
      type: String,
      required: true
    },
    beforeUpload: {
      type: Function as PropType<checkFunction>
    }
  },
  emits: ['file-uploaded', 'file-uploaded-error'],
  setup (props, context) {
    const fileInput = ref<null | HTMLInputElement>(null)
    const fileStatus = ref<UploadStatus>('ready')
    const uploadedData = ref('')
    const triggerUpload = () => {
      if (fileInput.value) {
        fileInput.value.click()
      }
    }
    const handleFileChange = (e: Event) => {
      const currentTarget = e.target as HTMLInputElement | null
      if (currentTarget?.files) {
        const files = Array.from(currentTarget.files)
        if (props.beforeUpload) {
          const result = props.beforeUpload(files[0])
          if (!result) return
        }
        fileStatus.value = 'loading'
        const formdata = new FormData()
        formdata.append('file', files[0])
        axios.post(props.action, formdata, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
          .then(resp => {
            context.emit('file-uploaded', resp.data)
            uploadedData.value = resp.data
            fileStatus.value = 'success'
          })
          .catch(err => {
            context.emit('file-uploaded-error', { err })
            fileStatus.value = 'error'
          })
          .finally(() => {
            if (fileInput.value) {
              fileInput.value.value = ''
            }
          })
      }
    }

    return {
      fileInput,
      fileStatus,
      triggerUpload,
      uploadedData,
      handleFileChange
    }
  }
})
</script>
