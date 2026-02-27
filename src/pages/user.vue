<script lang="ts" setup>
const name = '张三'
const account = '123456789'
const avatarURL = 'https://wot-ui.cn/assets/panda.jpg'
</script>

<template>
  <view class="fixed-gradient-bg" />
  <view class="safe-area-tab-container justify-center h-80vh">
    <view class="flex-col flex items-center justify-end flex-1">
      <view class="size-16 rounded-full bg-gray-200 justify-center items-center flex">
        <image v-if="avatarURL" :src="avatarURL" class="size-16 rounded-full" />
        <text v-else class="font-bold text-lg">
          {{ name.substring(0, 1) }}
        </text>
      </view>
      <text class="text-lg mt-2">
        {{ name }}
      </text>
      <text class="text-xs">
        {{ account }}
      </text>
    </view>
    <view class="gap-4 flex flex-col mt-4 flex-1">
      <view class="!rounded-xl px-1 overflow-hidden bg-gray-50 mx-4">
        <uni-list class="!bg-transparent">
          <uni-list-item class="!bg-transparent" show-arrow title="操作手册" />
          <uni-list-item class="!bg-transparent" show-arrow title="隐私声明" />
          <uni-list-item class="!bg-transparent" show-arrow title="意见反馈" />
          <uni-list-item class="!bg-transparent" show-arrow title="关于我们" />
        </uni-list>
      </view>
      <view class="flex flex-1 flex-col items-center justify-end px-4 p-2">
        <button plain :border="false" class="!mx-4 !bg-gray-100 !rounded-full !border-gray-100 w-full">
          退出登录
        </button>
      </view>
    </view>
  </view>
</template>

<style scoped lang="scss">
.fixed-gradient-bg {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: linear-gradient(to bottom, #a9c5f3 0%, #fff 100%);
  z-index: -1;
}
</style>
