import { onLoad } from '@dcloudio/uni-app'
import { ref } from 'vue'

export function useRoute() {
  const params = ref<Record<string, string>>({})
  onLoad((query) => {
    if (query) {
      params.value = query
    }
  })

  return { params }
}
