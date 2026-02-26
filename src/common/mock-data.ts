export const users = [
  {
    id: 'user1',
    name: '张三',
    avatar: 'https://avatars.githubusercontent.com/u/1?v=4',
    times: 12,
  },
  {
    id: 'user2',
    name: '李四',
    avatar: undefined,
    times: 2,
  },
  {
    id: 'user3',
    name: '王五',
    avatar: 'https://avatars.githubusercontent.com/u/3?v=4',
    times: 13,
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
]

export interface TTask {
  id: string
  title: string
  status: '执行中' | '已结束'
  startTime: string
  endTime: string
  isExpired: boolean
  creator: typeof users[0]
  joiners: typeof users[0][]
}
