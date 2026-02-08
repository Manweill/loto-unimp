<script lang="ts" setup>
const name = '张三'
const account = '123456789'
const avatarURL = 'https://wot-ui.cn/assets/panda.jpg'
</script>

<template>
  <div class="gradient-bg">
    <view class="flex-col flex items-center justify-end h-[30vh]">
      <wd-avatar :src="avatarURL" size="large" class="bg-gray-200" icon="user" />
      <text class="text-lg mt-2">
        {{ name }}
      </text>
      <text class="text-xs">
        {{ account }}
      </text>
    </view>
    <view class="gap-4 flex flex-col mt-4">
      <wd-cell-group border insert>
        <wd-cell title="操作手册" value="" />
        <wd-cell title="隐私声明" value="" />
        <wd-cell title="意见反馈" value="" />
        <wd-cell title="关于我们" value="" />
      </wd-cell-group>
      <wd-button type="default" block class="!mx-4 !bg-gray-50 !rounded-lg">
        退出登录
      </wd-button>
    </view>
  </div>
</template>

<style scoped lang="scss">
.gradient-bg {
  background: linear-gradient(to bottom, #a9c5f3 0%, #fff 100%);
  min-height: calc(100vh - $uni-nav-height);
  padding: 0 1rem;
}
</style>
