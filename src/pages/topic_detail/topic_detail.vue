<template>
  <view>
    <loading v-if="state.loading" />
    <view v-else>
      <view class="info">
        <view>
          <image :src="state.topicInfo.avatar_large" class="avatar"></image>
        </view>
        <view class="middle">
          <view class="bold"> {{ state.topicInfo.title }}</view>
          <view class="numbers">
            <text class="mr10"> 主题: {{ state.topicInfo.topics }} </text>
            <text>Stars: {{ state.topicInfo.stars }}</text>
          </view>
        </view>
      </view>
      <text class="title"> {{ state.topicInfo.header || '-' }} </text>
    </view>
    <thread-list :threads="state.threads" :loading="state.loading" style="margin-left: 20px"/>
  </view>
</template>

<script setup>
import { onMounted, reactive } from 'vue'
import Taro from '@tarojs/taro'
import api from '../../utils/apis'
import Loading from '../../components/loading.vue'
import ThreadList from '../../components/thread_list'
import './index.css'

const state = reactive({
  topicIno: null, loading: true, threads: []
})

const fetchData = async ()=>{
  try {
    const node_id = Taro.getCurrentInstance().router?.params.id
    console.log("Created Node detail: ", node_id)
    const [node_res, threads_res] = await Promise.all([
      Taro.request({url: api.getNodeInfo(node_id)}),
      Taro.request({url: api.getNodeTopics(node_id)})
    ])
    state.topicInfo = node_res.data
    state.threads = threads_res.data
    state.loading = false
  } catch (error) {
    state.loading = false
    await Taro.showToast({title: '载入Single Node远程数据错误'})
  }
}

onMounted( ()=>{
  console.log("onMounted()注册一个回调函数，在topic detail组件挂载完成后执行.")
  fetchData()
})

</script>

<style scoped>

</style>