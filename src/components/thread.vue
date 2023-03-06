<template>
  <view class="thread" @tap="handleNavigate">
    <view class="info">
      <view>
        <image :src="props.member.avatar_large" class="avatar"></image>
      </view>
      <view class="middle">
        <view :class="userNameCls"> {{ props.member.username }}</view>
        <view class="replies">
          <text class="mr10"> {{ time }} </text>
          <text>评论 {{ props.replies }}</text>
        </view>
      </view>
      <view class="node" v-if="props.node">
        <text class="tag"> {{ props.node.title }} </text>
      </view>
    </view>
    <text class="title"> {{ props.title }} </text>
  </view>
</template>

<script>
import {computed} from 'vue'
import Taro from '@tarojs/taro'
import {timeagoInst} from "../utils"
import './thread.css'

const props = defineProps(
    ['title', 'member', 'last_modified', 'replies', 'node', 'not_navi', 'tid']
)

const time = computed(() => timeagoInst.format(props.last_modified * 1000, 'zh'))
const userNameCls = computed(() => `author ${props.not_navi ? 'bold': ''}`)

const handleNavigate = () => {
  console.log("Handle navigate: ", props.tid)
  if (props.not_navi) {
    return
  }
  // 跳转到帖子详情
  Taro.navigateTo({
    url: `/pages/thread_detail/thread_detail?id=${props.tid}`,
  })
}
// filters: {  todo: 怎么办
//   url(val) {
//     return 'https:' + val
//   }
// },
</script>

<style scoped>

</style>
