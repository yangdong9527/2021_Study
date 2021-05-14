<template>
  <div class="container">
    <global-header :user="user" />
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import GlobalHeader, { UserProps } from '@/components/GlobalHeader.vue'

const testUser: UserProps = {
  isLogin: true,
  name: 'yd',
  id: 999
}
export default defineComponent({
  name: 'App',
  components: {
    GlobalHeader
  },
  setup () {
    return {
      user: testUser
    }
  }
})
</script>

<style>

</style>
