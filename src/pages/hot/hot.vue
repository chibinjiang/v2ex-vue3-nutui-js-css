<template>
  <nut-cell-group title="基础用法">
    <nut-cell title="primary 类型">
      <template v-slot:link>
        <nut-tag type="primary">标签</nut-tag>
      </template>
    </nut-cell>
    <nut-cell title="success 类型">
      <template v-slot:link>
        <nut-tag type="success">标签</nut-tag>
      </template>
    </nut-cell>
    <nut-cell title="danger 类型">
      <template v-slot:link>
        <nut-tag type="danger">标签</nut-tag>
      </template>
    </nut-cell>
    <nut-cell title="warning 类型">
      <template v-slot:link>
        <nut-tag type="warning">标签</nut-tag>
      </template>
    </nut-cell>
  </nut-cell-group>
  <nut-button type="primary">主要按钮</nut-button>
  <nut-button type="info">信息按钮</nut-button>
  <nut-button type="default">默认按钮</nut-button>
  <nut-button type="danger">危险按钮</nut-button>
  <nut-button type="warning">警告按钮</nut-button>
  <nut-button type="success">成功按钮</nut-button>
  <nut-button plain type="primary">朴素按钮</nut-button>
  <nut-button plain type="info">朴素按钮</nut-button>
  <Add color="red"></Add>
  <IconFont size="40"  name="https://img11.360buyimg.com/imagetools/jfs/t1/137646/13/7132/1648/5f4c748bE43da8ddd/a3f06d51dcae7b60.png"></IconFont>
  <IconFont name="dongdong"></IconFont>
  <IconFont name="JD"></IconFont>
  <nut-divider/>
  <view class="index">
    <ThreadList :threads="state.threads" :loading="state.loading"/>
  </view>
</template>

<script setup>
import { reactive, onMounted } from 'vue'
import { Add, IconFont } from '@nutui/icons-vue-taro'
import Taro from '@tarojs/taro'
import api from '../../utils/apis'
import ThreadList from '../../components/thread_list'

const state = reactive({
  loading: true,
  threads: []
})

const fetchData = async () => {
  try{
    const {data} = await Taro.request({
      url: api.getHotNodes(),
    })
    state.threads = data
    state.loading = false
  } catch(error) {
    console.log("Error: ", error)
    state.loading = false
    await Taro.showToast({title: 'Loading Hot topics failed'})
  }
}

onMounted(() => {
  console.log("onMounted()注册一个回调函数，在Hot组件挂载完成后执行.")
  fetchData()
})

</script>

<style scoped>

</style>