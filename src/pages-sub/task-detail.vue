<script setup lang="ts">
import type { TTask } from '@/common/mock-data'
import { onLoad, onReachBottom } from '@dcloudio/uni-app'
import dayjs from 'dayjs'
import { onMounted, ref } from 'vue'
import { users } from '@/common/mock-data'
import { useRoute } from '@/common/useRoute'

function navigateBack() {
  uni.navigateBack({})
}

const { params } = useRoute()

const open = ref(false)

const endTime = dayjs().add(Math.random() * 100 % 3, 'day').format('YYYY-MM-DD HH:mm')
const isExpired = dayjs().isBefore(endTime)

const task = ref<TTask>({
  creator: {},
  joiners: [],
} as any)

const state = ref<'loading' | 'more' | 'noMore'>('loading')

onMounted(async () => {
  task.value = {
    id: '',
    title: '',
    status: Math.random() * 100 % 3 <= 1 ? '执行中' : '已结束',
    startTime: dayjs().add(-Math.random() * 100 % 3, 'day').format('YYYY-MM-DD HH:mm'),
    endTime,
    isExpired,
    creator: users[Math.floor(Math.random() * users.length)],
    joiners: Array.from({ length: Math.round(6 / 4) * 4 }).fill({}, users.length).map((item, index) => users[index] ?? item),
    ...(params.value ?? {}),
  }
  // 加载完数据后再展开面板
  setTimeout(() => {
    open.value = true
  }, 100)
})

onLoad(() => {
  // requestTasks()
})

onReachBottom(async () => {
  // await requestTasks()
})
</script>

<template>
  <uni-nav-bar background-color="transparent" :border="false" status-bar fixed @click-left="navigateBack">
    <!--    <view class=" flex flex-1 items-center justify-center pr-3"> -->
    <!--      <text class="text-gray-900 text-lg text-center"> -->
    <!--        {{ params?.title }} -->
    <!--      </text> -->
    <!--    </view> -->
    <template #left>
      <view class="i-lucide:chevron-left text-gray-900 size-7" />
    </template>
  </uni-nav-bar>
  <view class="fixed-gradient-bg" />
  <view class="safe-area-container p-4 gap-col-6 flex-col scroll-auto ">
    <view class="flex justify-center">
      <text class="font-bold text-lg text-gray-900">
        {{ task.title }}
      </text>
    </view>
    <view
      class="!bg-gray-50/85 card p-4 mt-4 gap-y-4"
    >
      <view class="flex justify-between">
        <view class="flex gap-2 items-center">
          <view class="size-10 rounded-full bg-gray-200 justify-center items-center flex">
            <image v-if="task.creator.avatar" :src="task.creator.avatar" class="size-10 rounded-full" />
            <text v-else class="font-bold text-lg">
              {{ task.creator.name?.substring(0, 1) }}
            </text>
          </view>
          <text class="font-bold text">
            {{ task.creator.name }}
          </text>
        </view>
        <view class="flex flex-col items-center justify-center">
          <view class="flex gap-2">
            <uni-tag mark :type="task.status === '执行中' ? 'primary' : 'success'" :text="task.status" />
            <uni-tag mark :type="task.isExpired ? 'error' : 'success'" :text="task.isExpired ? '已过期' : '生效中' " />
          </view>
        </view>
      </view>
      <view class="w-full h-[0.125rem] rounded-full bg-gray-400" />
      <view class="flex justify-between gap-2">
        <text class="text-base text-gray-900 text-center">
          {{ task.startTime }}
        </text>
        <view class="i-lucide:arrow-left-right self-center mx-2" />
        <text class="text-base text-gray-900 text-center">
          {{ task.endTime }}
        </text>
      </view>
    </view>
    <uni-collapse class="card mt-6 !bg-gray-50/85">
      <uni-collapse-item v-model:open="open" class="!bg-gray-50/85">
        <template #title>
          <view class="p-4 text-sm justify-between">
            <text class="text-gray-900 text-base">
              被共享人
            </text>
            <text>（{{ users.length }}）</text>
          </view>
        </template>
        <uni-grid :column="4" :show-border="false" :square="false" class=" !bg-gray-50/85">
          <uni-grid-item v-for="(joiner, index) in task.joiners" :key="index" :index="index" class="py-2 !bg-gray-50/85">
            <view v-if="joiner.id" class="flex flex-1 flex-col justify-center items-center">
              <view
                class="size-10 rounded-full bg-gray-200 justify-center items-center flex border-gray-50 border-solid"
              >
                <image v-if="joiner.avatar" class="size-10 rounded-full" :src="joiner.avatar" mode="aspectFill" />
                <block v-else>
                  <text class="font-bold text-lg">
                    {{ joiner.name.substring(0, 1) }}
                  </text>
                </block>
              </view>
              <text class="text">
                {{ joiner.name }}
              </text>
            </view>
          </uni-grid-item>
        </uni-grid>
      </uni-collapse-item>
    </uni-collapse>

    <!--    <text class="text-sm text-gray-700 mt-6 ml-4"> -->
    <!--      锁具列表 -->
    <!--    </text> -->
    <uni-list class="rounded-2xl overflow-hidden  mt-6">
      <uni-list-item v-for="(index) in Array.from({ length: 6 })" :key="index" class="items-center" thumb="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXhwwTe2HiTapsMX-qZNcYw-CAA_1-KhnatA&s" thumb-size="lg">
        <template #header>
          <image class="size-12 mr-2" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXhwwTe2HiTapsMX-qZNcYw-CAA_1-KhnatA&s" mode="widthFix" />
        </template>
        <!-- 自定义 body -->
        <template #body>
          <view class="flex flex-1 flex-col">
            <text class="text-base text-gray-900">
              锁1
            </text>
            <text class="text-xs text-gray-700">
              斗门区/白藤街道/五洲家园
            </text>
          </view>
        </template>
        <!-- 自定义 footer -->
        <template #footer>
          <view class="flex-row items-center flex">
            <button
              size="mini"
              type="primary"
              hover-class="is-hover"
            >
              解锁
            </button>
          </view>
        </template>
      </uni-list-item>
    </uni-list>
    <uni-load-more class="mt-4" :state="state" />
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
.card {
  border-radius: 0.75rem;
  display: flex;
  flex-direction: column;
  overflow: hidden;

  :deep(.uni-collapse-item__title-arrow){
    align-items: normal !important;
    display: block !important;
  }
}
</style>
