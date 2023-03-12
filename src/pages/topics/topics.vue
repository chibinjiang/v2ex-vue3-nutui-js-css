<template>
  <view>
    <Loading v-if="state.loading"></Loading>
    <navigator v-else v-for="node in state.nodes" :key="node.id" class="container" :url="gotoTopic(node)">
      <view class="info">
        <view>
          <image :src="node.avatar_large" class="avatar"></image>
        </view>
        <view class="middle">
          <view class="bold"> {{ node.title }}</view>
          <view class="numbers">
            <text class="mr10"> 主题: {{ node.topics }} </text>
            <text>Stars: {{ node.stars }}</text>
          </view>
        </view>
      </view>
      <text class="title"> {{ node.header || '-' }} </text>
    </navigator>
  </view>
</template>

<script setup>
import {reactive, computed, onMounted} from 'vue'
import Taro from "@tarojs/taro";
import api from '../../utils/apis'
import Loading from "../../components/loading";
import './index.css'

const state = reactive({
  loading: true, nodes: []
})

const gotoTopic = computed( () => {
  return function (val) {
    return `/pages/topic_detail/topic_detail${api.queryString(val)}`
  }
})

const fetchData = async ()=>{
  try {
    const {data} = await Taro.request({
      url: api.getAllNode()
    })
    state.loading = false
    state.nodes = data.slice(0, 10)  // data 是 第0层, 如果切换到nutui, 看看怎么翻页
  } catch (error) {
    console.log("Error: ", error)
    state.loading = false
    await Taro.showToast({title: 'Fetch All Topics Failed'})
  }
}

onMounted(() => {
  console.log("onMounted()注册一个回调函数，在topics组件挂载完成后执行.")
  fetchData()
})

</script>

<style scoped>

</style>