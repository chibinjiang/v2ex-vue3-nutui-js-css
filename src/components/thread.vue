<template>
  <view class="thread" @tap="handleNavigate">
    <view class="info">
      <view>
        <nut-avatar size="small">
          <img :src="member.avatar_large" />
        </nut-avatar>
<!--        <image :src="member.avatar_large" class="avatar"></image>-->
<!--        <nut-avatar size="small" :icon="member.avatar_large"></nut-avatar>-->
<!--        <nut-icon class="icon" name="right" size="12"></nut-icon>-->
      </view>
      <view class="middle">
        <view :class="userNameCls"> {{ member.username }}</view>
        <view class="replies">
          <text class="mr10"> {{ formattedTime }} </text>
          <text>评论 {{ replies }}</text>
        </view>
      </view>
      <view class="node" v-if="node">
        <text class="tag"> {{ node.title }} </text>
      </view>
    </view>
    <text class="title"> {{ title }} </text>
  </view>
</template>

<script>
import {computed} from 'vue'
import Taro from '@tarojs/taro'
import {eventCenter} from '@tarojs/taro'
import {timeagoInst, Thread_DETAIL_NAVIGATE} from "../utils"
import './thread.css'

export default {
  name: "thread",
  props: ['title', 'member', 'last_modified', 'replies', 'node', 'not_navi', 'tid'],
  setup(props){
    const formattedTime = computed(() => timeagoInst.format(props.last_modified * 1000, 'zh'))
    const userNameCls = computed(() => `author ${props.not_navi ? 'bold': ''}`)
    const handleNavigate = () => {
      console.log("Handle navigate: ", props.tid)
      if (props.not_navi) {
        return
      }
      // 设置当前的帖子
      eventCenter.trigger(Thread_DETAIL_NAVIGATE, props)
      // 跳转到帖子详情
      Taro.navigateTo({
        url: `/pages/thread_detail/thread_detail?id=${props.tid}`,
      })
    }
    return {
      formattedTime,
      userNameCls,
      handleNavigate
    }
  }
}

// filters: {  todo: 怎么办
//   url(val) {
//     return 'https:' + val
//   }
// },
</script>
<style scoped>

</style>

