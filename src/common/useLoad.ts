import { onLoad } from '@dcloudio/uni-app'
import { ref } from 'vue'

export function useLoad(cb?: (query: any) => void) {
  const params = ref<Record<string, string>>({})
  onLoad((query) => {
    if (query) {
      params.value = query
    }
    // 回调函数
    cb && cb(query)
  })

  return { params }
}
