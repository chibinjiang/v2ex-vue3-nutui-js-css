<template>
  <view class="detail">
    <Thread
      :node="state.topic.node"
      :title="state.topic.title"
      :last_modified="state.topic.last_modified"
      :replies="state.topic.replies"
      :tid="state.topic.id"
      :member="state.topic.member"
      :not_navi="true"
    />
    <Loading v-if="state.loading"/>
    <view v-else>
      <view class="main-content">
        <rich-text :nodes="state.content | formattedHTML"></rich-text>
      </view>
      <view class="replies">
        <view v-for="(reply, ind) in state.replies" class="reply" :key="reply.id">
          <image :src="reply.member.avatar_large" class="avatar"/>
          <view class="main">
            <view class="author"> {{ reply.member.username }} </view>
            <view class="time"> {{ formattedTime(reply.last_modified) }} </view>
            <rich-text :nodes="formattedHTML(reply.content_rendered)" class="content"></rich-text>
            <view class="floor">{{ ind + 1 }} 楼</view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import {onMounted, reactive, computed} from 'vue'
import Taro from '@tarojs/taro'
import {usePullDownRefresh} from '@tarojs/taro'
import api from '../../utils/apis'
import {timeagoInst, GlobalState, prettyHTML} from "../../utils";
import Thread from '../../components/thread'
import Loading from '../../components/loading'
import './index.css'

// const loading = ref(true)
// const replies = ref([])
// const content = ref('')
const state = reactive({
  thread_id: Taro.getCurrentInstance().router?.params.id,
  loading: true,
  topic: GlobalState.thread,
  replies: [],
  content: ''
})

const fetchData = async () => {
  try {
    const [{data}, {data: [{content_rendered}]}] = await Promise.all([
      Taro.request({url: api.getReplies(state.thread_id)}),
      Taro.request({url: api.getTopics(state.thread_id)})
    ])
    state.loading = false;
    state.replies = data
    state.content = content_rendered
  } catch (error) {
    state.loading = false;
    await Taro.showToast({title: 'Load thread data failed'})
  }
}

const formattedTime = computed( () => {
  return function (val) {
    return timeagoInst.format(val * 1000)
  }
})

const formattedHTML = computed( () => {
  return function (val) {
    return prettyHTML(val)
  }
})

onMounted(() => {
  console.log("onMounted()注册一个回调函数，在ThreadDetail组件挂载完成后执行.")
  fetchData()
})

usePullDownRefresh(() => {
  console.log("usePullDownRefresh.")
  fetchData()
})
</script>

<style scoped>

</style>
