<script setup lang="ts">
defineOptions({
  options: { styleIsolation: 'shared' },
})
const props = defineProps({
  tabs: {
    type: Array,
    default: () => ['选项一', '选项二', '选项三'],
  },
  modelValue: { type: Number, default: 0 }, // 接收 v-model
})
const emit = defineEmits<{
  'update:modelValue': [index: number]
  'itemClick': [index: number]
}>()

function onTabClick(v: { currentIndex: number }) {
  emit('update:modelValue', v.currentIndex)
  emit('itemClick', v.currentIndex)
}
</script>

<template>
  <view class="p-2 !bg-gray-100/50 rounded-full pos-relative overflow-hidden w-full">
    <view
      class="pos-absolute h-70% -z-1 bg-white rounded-full shadow-sm transition-all duration-300"
      :style="{
        width: `${(100 - props.tabs.length * 1.5) / props.tabs.length}%`,
        transform: `translateX(${props.modelValue * 100}%)`,
      }"
    />

    <uni-segmented-control
      :current="props.modelValue"
      :values="tabs"
      style-type="text"
      class="segmented"
      @click-item="onTabClick"
    />
  </view>
</template>

<style lang="scss" scoped>
/* 推荐写法：确保前面有一个本地定义的类名 */
.segmented {
  :deep(.segmented-control__item--text) {
    border-width: 0 !important;
    border-color: transparent !important;

  }
  :deep(.segmented-control__text) {
    font-weight: bolder;
  }
}
</style>
