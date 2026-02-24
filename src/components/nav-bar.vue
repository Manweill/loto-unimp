<script setup lang="ts">
function handleBack() {
  uni.navigateBack({})
}
</script>

<template>
  <uni-nav-bar background-color="transparent" :border="false" status-bar @click-left="handleBack">
    <template #left>
      <view class="i-lucide:chevron-left text-gray-900 size-7" />
    </template>
  </uni-nav-bar>
</template>

<style scoped lang="scss">

</style>
