<template>
  <view class="index">
    <ThreadList :threads="threads" :loading="loading" />
  </view>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import Taro from '@tarojs/taro'
import api from '../../utils/apis'
import ThreadList from '../../components/thread_list.vue'
import './index.css'

const threads = ref([])
const loading = ref(true)

const fetchLatestTopic = async () => {
  // Fetch Remote API
  // const id = Taro.getCurrentInstance().router?.params.id
  try {
    const res = await Taro.request({
      url: api.getLatestTopic(),
    })
    loading.value = false
    threads.value = res.data
  } catch (error) {
    await Taro.showToast({
      title: '载入远程数据错误',
    })
  }
}

onMounted(() => {
  console.log("onMounted()注册一个回调函数，在组件挂载完成后执行.")
  fetchLatestTopic()
})

// usePullDownRefresh(() => {
//   console.log("usePullDownRefresh.")
//   fetchLatestTopic()
// })
</script>
