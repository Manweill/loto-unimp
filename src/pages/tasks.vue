<script setup lang="ts">
import { onLoad, onReachBottom } from '@dcloudio/uni-app'
import dayjs from 'dayjs'
import { computed, ref } from 'vue'

// 用户列表
// 用户头像链接使用 github 的头像
// 名字使用中国名字，如张三李四王五等，升成 10 个人
const users = ref([
  {
    id: 'user1',
    name: '张三',
    avatar: 'https://avatars.githubusercontent.com/u/1?v=4',
  },
  {
    id: 'user2',
    name: '李四',
    avatar: undefined,
  },
  {
    id: 'user3',
    name: '王五',
    avatar: 'https://avatars.githubusercontent.com/u/3?v=4',
  },
  {
    id: 'user4',
    name: '赵六',
    avatar: 'https://avatars.githubusercontent.com/u/4?v=4',
  },
  {
    id: 'user5',
    name: '孙七',
    avatar: 'https://avatars.githubusercontent.com/u/5?v=4',
  },
  {
    id: 'user6',
    name: '周八',
    avatar: undefined,
  },
])

const list = ref<string[]>(['全部', '执行中', '已结束'])

const current = ref(0)

const state = ref<'loading' | 'error' | 'finished'>('loading')

const tasks = ref<Array<any>>([])

const filterTasks = computed(() => {
  if (current.value === '全部') {
    return tasks.value
  }
  return tasks.value.filter(task => task.status === current.value)
})

onLoad(() => {
  requestTasks()
})

onReachBottom(() => {
  if (tasks.value.length === 45) {
    state.value = 'error'
  }
  else if (tasks.value.length < 45) {
    requestTasks()
  }
  else if (tasks.value.length === 45) {
    state.value = 'finished'
  }
})

function requestTasks() {
  setTimeout(() => {
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
        creator: users.value[Math.floor(Math.random() * users.value.length)],
        joiners: users.value.filter(() => Math.random() * 100 % 3 <= 1),
      }
    }))
    state.value = 'loading'
  }, 200)
}
</script>

<template>
  <view class="fixed-gradient-bg" />
  <view class="container flex flex-col pt-4">
    <view class="flex items-center justify-between px-4 h-16">
      <text class="text-xl">
        任务列表
      </text>
      <wd-button type="info" plain class="!bg-[#667eea3f]" icon="add">
        添加任务
      </wd-button>
    </view>
    <view class="p-2 mx-8 !bg-gray-50/35 rounded-full pos-relative">
      <uni-segmented-control v-model="current" :values="list" style-type="text" class="segmented" @click-item="onClickItem" />
      <view class="pos-absolute h-full z-1 w-30%  bg-gray-50" />
    </view>
    <view class="gap-2 flex flex-col">
      <!-- 渲染列表 -->

      <uni-card v-for="task in filterTasks" :key="task.id" :title="task.title">
        <view class="flex gap-2 items-center justify-center">
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
        <view class="flex gap-6 items-center mt-2">
          <view class="flex gap-2 items-center">
            <wd-avatar
              size="2rem" :src="task.creator.avatar"
              :alt="task.creator.name.substring(0, 1)"
              :text="task.creator.name.substring(0, 1)"
            />
            <text>
              {{ task.creator.name }}
            </text>
          </view>
          <wd-avatar-group size="2rem" :max-count="2" cascading="left-up">
            <wd-avatar
              v-for="joiner in task.joiners"
              :key="joiner.id"
              :src="joiner.avatar"
              :alt="joiner.name.substring(0, 1)"
              :text="joiner.name.substring(0, 1)"
            />
          </wd-avatar-group>
        </view>
        <template #footer>
          <view class="flex gap-2 items-center justify-between">
            <view class="flex gap-2">
              <wd-tag mark :type="task.status === '执行中' ? 'primary' : 'success'">
                {{ task.status }}
              </wd-tag>
              <wd-tag v-if="task.status === '执行中'" mark :type="task.isExpired ? 'danger' : 'success'">
                {{ task.isExpired ? '已过期' : '生效中' }}
              </wd-tag>
            </view>
            <wd-button size="small">
              查看详情
            </wd-button>
          </view>
        </template>
      </uni-card>
      <wd-loadmore custom-class="loadmore" :state="state" @reload="requestTasks" />
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
</style>
