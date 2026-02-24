<script setup lang="ts">
import { onLoad, onReachBottom } from '@dcloudio/uni-app'
import dayjs from 'dayjs'
import { computed, onMounted, ref } from 'vue'
import { users } from '@/common/mock-data'

const tabs = ref<string[]>(['全部', '执行中', '已结束'])

const current = ref(0)
const currentTab = computed(() => tabs.value[current.value])

const state = ref<'loading' | 'more' | 'noMore'>('loading')

const tasks = ref<Array<any>>([])

const filterTasks = computed(() => {
  if (current.value === 0) {
    return tasks.value
  }
  return tasks.value.filter(task => task.status === currentTab.value)
})

onLoad(() => {
  requestTasks()
})

onReachBottom(async () => {
  await requestTasks()
})

async function timeout(delay: number) {
  return new Promise(res => setTimeout(() => {
    res(true)
  }, delay))
}

async function requestTasks() {
  state.value = 'loading'
  await timeout(1500)
  tasks.value.push(...Array.from({ length: 20 }, (_, index) => {
    const endTime = dayjs().add(Math.random() * 100 % 3, 'day').format('YYYY-MM-DD HH:mm')
    const isExpired = dayjs().isBefore(endTime)

    return {
      id: `task${tasks.value.length + index}`,
      title: `任务 ${tasks.value.length + index + 1}`,
      status: Math.random() * 100 % 3 <= 1 ? '执行中' : '已结束',
      startTime: dayjs().add(-Math.random() * 100 % 3, 'day').format('YYYY-MM-DD HH:mm'),
      endTime,
      isExpired,
      creator: users[Math.floor(Math.random() * users.length)],
      joiners: users.filter(() => Math.random() * 100 % 3 <= 1),
    }
  }))

  state.value = tasks.value.length < 45 && tasks.value.length > 0 ? 'more' : 'noMore'
}

onMounted(() => {

})
</script>

<template>
  <view class="fixed-gradient-bg" />
  <uni-nav-bar background-color="transparent" class="bg-transparent" :border="false" status-bar />
  <view class="safe-area-container flex flex-col pt-4">
    <view class="flex items-center justify-between px-4">
      <text class="text-xl">
        任务列表
      </text>
      <button type="primary" class="!bg-[#518DE8FF] !border-none m-0 text-base px-4 py-2">
        添加任务
      </button>
    </view>
    <view class="w-80vw flex flex-col px-4">
      <segmented-control
        v-model="current"
        :tabs="tabs"
        class="mt-8 mx-3"
      />
    </view>
    <view class="flex flex-col gap-4 my-4 !bg-transparent p-4">
      <!-- 渲染列表 -->
      <uni-card
        v-for="task in filterTasks"
        :key="task.id"
        class="!bg-gray-50/85 card"
        is-full
        :is-shadow="false"
      >
        <text class="font-bold text-base text-gray-800">
          {{ task.title }}
        </text>
        <view class="flex gap-2 items-center py-2">
          <text class="text-xs text-gray-700">
            {{ task.startTime }}
          </text>
          <text class="text-xs text-gray-700">
            ~
          </text>
          <text class="text-xs text-gray-700">
            {{ task.endTime }}
          </text>
        </view>
        <view class="flex gap-6 items-center mt-2 ">
          <view class="flex gap-2 items-center">
            <view class="size-10 rounded-full bg-gray-200 justify-center items-center flex">
              <image v-if="task.creator.avatar" :src="task.creator.avatar" class="size-10 rounded-full" />
              <text v-else class="font-bold text-lg">
                {{ task.creator.name.substring(0, 1) }}
              </text>
            </view>
            <text class="font-bold text">
              {{ task.creator.name }}
            </text>
          </view>
          <view class="flex ml-8">
            <view
              v-for="(joiner, index) in task.joiners.slice(0, (task.joiners.length > 3 ? 2 : 3))"
              :key="joiner.id"
              class="size-10 rounded-full bg-gray-200 justify-center items-center flex -ml-2 border-gray-50 border-solid"
              :style="{
                // 关键：索引越小，z-index 越高
                zIndex: index,
              }"
            >
              <image v-if="joiner.avatar" :src="joiner.avatar" class="size-10 rounded-full z-1" />
              <block v-else>
                <text class="font-bold text-lg">
                  {{ joiner.name.substring(0, 1) }}
                </text>
              </block>
            </view>
            <view v-if="task.joiners.length > 3" class="z-3 size-10 rounded-full bg-gray-200 justify-center items-center flex -ml-2 border-gray-50 border-solid">
              <text class="text-base text-align-center">
                +{{ task.joiners.length - 2 }}
              </text>
            </view>
          </view>
        </view>
        <template #actions>
          <view class="flex flex-row gap-2 items-center justify-between p-2">
            <view class="flex gap-2">
              <uni-tag mark :type="task.status === '执行中' ? 'primary' : 'success'" :text="task.status" />
              <uni-tag v-if="task.status === '执行中'" mark :type="task.isExpired ? 'error' : 'success'" :text="task.isExpired ? '已过期' : '生效中' " />
            </view>
            <button
              type="primary" class="px-4 py-2 text-xs rounded-full mx-0"
              @click="uni.navigateTo({ url: `/pages-sub/task-detail?id=${task.id}&title=${task.title}` })"
            >
              查看详情
            </button>
          </view>
        </template>
      </uni-card>
    </view>
    <uni-load-more :status="state" class="mt-4" />
  </view>
</template>

<style lang="scss" scoped>
.card {
  border-radius: 0.75rem;
  display: flex;
  flex-direction: column;
  overflow: hidden;
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
</style>
