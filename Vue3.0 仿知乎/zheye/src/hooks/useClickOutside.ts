import { ref, onMounted, onUnmounted, Ref } from 'vue'

function useClickOutside (element: Ref<HTMLElement | null>): Ref<boolean> {
  const isClickOuthSide = ref(false)
  const handler: (e: MouseEvent) => void = (e) => {
    if (element.value) {
      if (element.value.contains(e.target as HTMLElement)) {
        isClickOuthSide.value = false
      } else {
        isClickOuthSide.value = true
      }
    }
  }
  onMounted(() => {
    document.addEventListener('click', handler)
  })
  onUnmounted(() => {
    document.removeEventListener('click', handler)
  })
  return isClickOuthSide
}
export default useClickOutside
