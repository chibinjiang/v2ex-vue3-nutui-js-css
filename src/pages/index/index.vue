<template>
  <nut-image-preview :show="showPreview" :images="imgData" @close="hideFn"/>
  <nut-cell isLink title="展示图片预览" :showIcon="true" @click="showFn"></nut-cell>
  <video
      id="video"
      src="https://wxsnsdy.tc.qq.com/105/20210/snsdyvideodownload?filekey=30280201010421301f0201690402534804102ca905ce620b1241b726bc41dcff44e00204012882540400&bizid=1023&hy=SH&fileparam=302c020101042530230204136ffd93020457e3c4ff02024ef202031e8d7f02030f42400204045a320a0201000400"
      poster="https://img10.360buyimg.com/ling/jfs/t1/181258/24/10385/53029/60d04978Ef21f2d42/92baeb21f907cd24.jpg"
      initial-time="0"
      :controls="true"
      :autoplay="false"
      :loop="false"
      :muted="false"
  />
  <view>
    <AtButton>按钮文案</AtButton>
    <AtButton type='primary'>按钮文案</AtButton>
    <AtButton type='secondary'>按钮文案</AtButton>
    <AtInput
        name='value1'
        title='标准五个字'
        type='text'
        placeholder='使用 onConfirm 更新 value 值'
        :value="inputValue"
        @confirm="handleInput"
    />
  </view>
  <!--  <nut-image src="//img10.360buyimg.com/ling/jfs/t1/181258/24/10385/53029/60d04978Ef21f2d42/92baeb21f907cd24.jpg" width="100" height="100"></nut-image>-->
<!--  <nut-video-->
<!--      :source="videoSource"-->
<!--      :options="videoOptions"-->
<!--  >-->
<!--  </nut-video>-->
  <view class="index">
    <ThreadList :threads="threads" :loading="loading" />
  </view>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import Taro from '@tarojs/taro'

import {usePullDownRefresh} from '@tarojs/taro'
import api from '../../utils/apis'
import ThreadList from '../../components/thread_list.vue'
import './index.css'

const threads = ref([])
const inputValue = ref('')
const loading = ref(true)
const videoSource = ref({
    src: "https://storage.360buyimg.com/nutui/video/video_NutUI.mp4",
    type: "video/mp4",
  }
)
const showPreview = ref(false)
const imgData = ref([
  {
    src: 'https://m.360buyimg.com/mobilecms/s750x366_jfs/t1/18629/34/3378/144318/5c263f64Ef0e2bff0/0d650e0aa2e852ee.jpg',
  },
  {
    src: 'https://m.360buyimg.com/mobilecms/s750x366_jfs/t1/26597/30/4870/174583/5c35c5d2Ed55eedc6/50e27870c25e7a82.png',
  },
  {
    src: 'https://m.360buyimg.com/mobilecms/s750x366_jfs/t1/9542/17/12873/201687/5c3c4362Ea9eb757d/60026b40a9d60d85.jpg',
  },
  {
    src: 'https://m.360buyimg.com/mobilecms/s750x366_jfs/t1/30042/36/427/82951/5c3bfdabE3faf2f66/9adca782661c988c.jpg',
  },
])

const showFn = () => {
  showPreview.value = true;
}

const hideFn = () => {
  showPreview.value = false;
}

const handleInput = (val)=> {
  console.log("Input value: ", val)
  inputValue.value = val
}

const videoOptions = ref({
  controls: true,
  // autoplay: true,  autoplay 属性设置视频自动播放
  // muted: true,
})
const play = (ele) => console.log('play', ele);
const pauseVideo = (ele) => console.log('pauseVideo', ele);
const playEnd = (ele) => console.log('playEnd', ele);


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

usePullDownRefresh(() => {
  console.log("usePullDownRefresh.")
  fetchLatestTopic()
})
</script>
<style scoped>

</style>

