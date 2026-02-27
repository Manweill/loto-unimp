<script setup lang="ts">
import { useBle } from '@/common/useBle'
import bgLock from '@/static/bg-lock3.png'

const { bleState, onStart } = useBle({ deviceId: '12323A6E-D871-2448-B08F-74B5BEA7BE94' })

function navigateBack() {
  uni.navigateBack({})
}

function handleBackHome() {
  uni.reLaunch({ url: '/pages/index' })
}

function showNfcModel() {
  onStart()
}
</script>

<template>
  <uni-nav-bar background-color="transparent" :border="false" status-bar fixed @click-left="navigateBack">
    <template #left>
      <view class="i-lucide:chevron-left text-gray-900 size-7" />
    </template>
  </uni-nav-bar>
  <view class="bg pos-absolute top-0">
    <image :src="bgLock" class="w-full h-full" mode="aspectFill" />
  </view>
  <view class="safe-area-container pos-relative">
    <view class="flex flex-col items-center justify-start h-full">
      <text class="text-lg mt-4">
        设备锁2
      </text>
      <view class="flex flex-row w-full h-[26vh]">
        <view class="flex flex-1 pl-6 flex-col gap-4 justify-center">
          <view class="flex flex-col">
            <text class="text-[0.725rem] text-gray-500">
              电量
            </text>
            <text class="text-size-[1.15rem] text-gray-900">
              98%
            </text>
          </view>
          <view>
            <view>
              <view class="size-14 rounded-full bg-gray-200 justify-center items-center flex">
                <image src="https://avatars.githubusercontent.com/u/5?v=4" class="size-14 rounded-full" />
                <!--                <text v-else class="font-bold text-lg"> -->
                <!--                  {{ '张三'.substring(0, 1) }} -->
                <!--                </text> -->
              </view>
            </view>
            <text class="text-gray-400 text-size-[0.725rem] mt-2">
              上次使用时间：2026-02-02 12:00
            </text>
          </view>
        </view>
        <view class="flex pr-8 pl-4 flex-col items-center justify-center gap-2">
          <view
            class="flex w-[5.5rem] h-[5.5rem] items-center justify-center  border-blue-900 border-8 bg-blue-700 rounded-full"
            @click="showNfcModel"
          >
            <view
              class="flex w-[1.5rem] h-[1.5rem] items-center justify-center p-4 bg-gray-50 rounded-full overflow-hidden"
            >
              <view class="i-lucide:link-2 text-blue-900 size-12 rotate-125" />
            </view>
          </view>
          <text class="text-gray-700 text-[0.75rem]">
            点击解锁
          </text>
        </view>
      </view>
      <view class="bg-white flex-col flex flex-1 rounded-t-3xl shadow-2xl w-full justify-start">
        <view class="flex justify-between gap-2 mt-6 px-6">
          <view class="w-[24vw] h-[24vw] rounded-2xl flex flex-col justify-center items-center gap-2 bg-green-100/65">
            <view class="i-lucide:user-round-check size-8 text-green-500" />
            <text class="text-xs font-light">
              授权
            </text>
          </view>
          <view class="w-[24vw] h-[24vw] rounded-2xl flex flex-col justify-center items-center gap-2 bg-amber-100/65">
            <view class="i-lucide:rotate-ccw-key size-8 text-amber-500" />
            <text class="text-xs font-light">
              恢复闭锁
            </text>
          </view>
          <view class="w-[24vw] h-[24vw] rounded-2xl flex flex-col justify-center items-center gap-2 bg-sky-100/65">
            <view class="i-lucide:battery-charging size-8 text-sky-500" />
            <text class="text-xs font-light">
              充电
            </text>
          </view>
        </view>
        <view class="my-4 px-2">
          <view class="!rounded-xl px-1 overflow-hidden bg-gray-50 mx-4">
            <uni-list class="!bg-transparent">
              <uni-list-item class="!bg-transparent" show-arrow title="授权记录" />
              <uni-list-item class="!bg-transparent" show-arrow title="操作日志" />
              <uni-list-item class="!bg-transparent" show-arrow title="充电" />
              <uni-list-item class="!bg-transparent" show-arrow title="OTA 升级" />
            </uni-list>
          </view>
        </view>
        <view class="flex flex-1 flex-col items-center justify-center px-8">
          <button plain :border="false" class="!mx-4 !bg-gray-100 !rounded-full !border-gray-100 w-full">
            解除绑定
          </button>
        </view>
      </view>
    </view>
  </view>
</template>

<style scoped lang="scss">
.bg {
  position: absolute !important;
  width: 100vw;
  height: 50vh;
  z-index: -1;
  opacity: 0.3;
}
</style>
