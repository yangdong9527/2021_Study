import { ref, onMounted, onUnmounted, Ref } from 'vue'

function useClickOutside (element: Ref<HTMLElement | null>) : Ref<boolean> {
  const isClickOutside = ref(false)
  const handler = (e: MouseEvent) => {
    if (element.value) {
      if (element.value.contains(e.target as HTMLElement)) {
        isClickOutside.value = false
      } else {
        isClickOutside.value = true
      }
    }
  }
  onMounted(() => {
    document.addEventListener('click', handler)
  })
  onUnmounted(() => {
    document.removeEventListener('click', handler)
  })
  return isClickOutside
}
export default useClickOutside
