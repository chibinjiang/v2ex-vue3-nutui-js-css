import { createApp } from 'vue'
// import { Image, Video } from '@nutui/nutui';
// import NutUI from "@nutui/nutui";
import { Avatar, Divider, Button, Tag, ImagePreview } from '@nutui/nutui-taro'
// import { Add } from '@nutui/icons-vue';
// nutui4.0 文档: https://nutui.jd.com/h5/vue/4x/#/zh-CN/guide/intro
import '@nutui/nutui-taro/dist/style.css'
// import '@nutui/nutui-taro/dist/packages/button/index.scss'
// import '@nutui/nutui-taro/dist/packages/avatar/index.scss'
// import '@nutui/nutui-taro/dist/packages/divider/index.scss'
// import '@nutui/nutui-taro/dist/packages/tag/index.scss'
// import '@nutui/nutui-taro/dist/packages/imagepreview/index.scss'
import { createUI } from 'taro-ui-vue3'
import { AtButton, AtInput, AtTabs} from 'taro-ui-vue3/lib'
import 'taro-ui-vue3/dist/style/components/button.scss'
import 'taro-ui-vue3/dist/style/components/input.scss'
import 'taro-ui-vue3/dist/style/components/tabs.scss'

import './app.css'

const App = createApp({
  onShow (options) {},
  // 入口组件不需要实现 render 方法，即使实现了也会被 taro 所覆盖
})
const tuv3 = createUI({AtButton, AtInput, AtTabs})
App.use(tuv3)

App.use(Tag)
App.use(ImagePreview)
// App.use(Video)
App.use(Avatar)
App.use(Button)
App.use(Divider)
// App.use(NutUI)  // .mount('#app')

export default App
