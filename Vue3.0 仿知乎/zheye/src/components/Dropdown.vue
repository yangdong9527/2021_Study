<template>
  <div class="dropdown" ref="dropdownRef">
    <a href="#" class="btn btn-outline-light my-2 dropdown-toggle" @click="toggleOpen">你好啊,{{title}}</a>
    <ul class="dropdown-menu" :style="{display: 'block'}" v-if="isOpen">
      <slot></slot>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import useClickOutside from '../hooks/useClickOutside'

export default defineComponent({
  name: 'Dropdown',
  props: {
    title: String
  },
  setup () {
    const isOpen = ref(false)
    const dropdownRef = ref<null | HTMLElement>(null)
    const toggleOpen: () => void = () => {
      isOpen.value = !isOpen.value
    }
    const isClickOutside = useClickOutside(dropdownRef)
    watch(isClickOutside, (newValue) => {
      if (newValue && isOpen.value) {
        isOpen.value = false
      }
    })
    return {
      isOpen,
      toggleOpen,
      dropdownRef
    }
  }
})
</script>
