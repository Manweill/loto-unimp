<script setup lang="ts">
import { ref } from 'vue'
import lockImg from '@/static/lock.png'
import nfcImg from '@/static/nfc.png'

const current = ref({ currentIndex: 0 })
const tabs = ref(['全部', '我的', '共享'])

const avatarURL = 'https://wot-ui.cn/assets/panda.jpg'
const name = '用户名'
const account = '189****1234'

const devices = ref([
  {
    id: 'lock1',
    name: '锁 1号',
    status: '在线',
  },
  {
    id: 'lock2',
    name: '锁 2号',
    status: '离线',
  },
  {
    id: 'lock3',
    name: '锁 3号',
    status: '在线',
  },
  {
    id: 'lock4',
    name: '锁 4号',
    status: '在线',
  },
  {
    id: 'lock5',
    name: '锁 5号',
    status: '离线',
  },
])

function onClickItem(vvv) {
  current.value = vvv
//   animate(scope.current, { translateX: `${100 * vvv.currentIndex}%` })
}

function onItemPress(device: any) {
  uni.navigateTo({ url: `/pages-sub/device-lock?id=${device.id}` })
}
</script>

<template>
  <view class="fixed-gradient-bg" />
  <view class="container flex flex-col pt-4">
    <view class="flex justify-between px-4 items-center h-16">
      <view class="flex gap-4 items-center">
        <image :src="avatarURL" class="size-14 rounded-full" />
        <view class="flex-col flex items-start">
          <text class="text-lg">
            {{ name }}
          </text>
          <text class="text-xs">
            {{ account }}
          </text>
        </view>
      </view>
      <button type="info" plain class="!bg-[#667eea3f]" icon="add">
        添加设备
      </button>
    </view>

    <view class="p-2 mx-8 !bg-gray-50/35 rounded-full pos-relative">
      <view
        class="pos-absolute h-74% -z-1 w-32% bg-gray-50 rounded-full"
        :style="`transform: translateX(${100 * current.currentIndex}%)`"
      />

      <uni-segmented-control
        :values="tabs"
        style-type="text"
        class="segmented"
        @click-item="onClickItem"
      />
    </view>
    <view class="gap-2 flex flex-col">
      <!-- 渲染列表 -->

      <view class="content flex justify-center">
        <view class="gap-4 flex flex-wrap justify-stretch w-[98vw] p-4">
          <view
            v-for="device in devices"
            :key="device.id"
            :title="device.name"
          >
            <view
              class="card bg-gray-100"
              @click="onItemPress(device)"
            >
              <view
                class="w-full flex-col items-stretch overflow-hidden p-2"
              >
                <view
                  class="flex flex-row items-start justify-between px-4 pt-2 pb-2"
                >
                  <image
                    :src="lockImg"
                    size="w-8 h-8"
                    class="bg-white p-2 rounded-xl"
                  />
                  <image
                    :src="nfcImg"
                    size="w-4 h-4"
                    class="bg-green-500 p-1 rounded-full"
                  />
                </view>
                <view
                  class="flex-1 flex flex-col items-start px-4"
                >
                  <text class="text-base text-gray-950">
                    {{ device.name }}
                  </text>
                  <text class="mt-1 text-xs text-gray-500">
                    {{ device.status }}
                  </text>
                </view>
              </view>
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.container {
    padding-top: calc(var(--status-bar-height) + 4rem);
}

.fixed-gradient-bg {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: linear-gradient(to bottom, #a9c5f3 0%, #fff 100%);
    z-index: -1;
}

.segmented {
    ::v-deep .segmented-control__item--text {
        border-width: 0 !important;
        border-color: transparent !important;
    }
}

.content {
    line-height: 120px;
    text-align: center;
}

.card {
    width: calc(48vw - 1.5rem);
    height: 30vw;
    /* background-color: ; */
    border-radius: 12px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
</style>
