<template>
  <view class="thread-list">
    <Loading v-if="loading" />
    <Thread
      v-else
      v-for="t in threads"
      :key="t.id"
      :node="showNode ? t.node : null"
      :title="t.title"
      :last_modified="t.last_modified"
      :replies="t.replies"
      :tid="t.id"
      :member="t.member"
    />
  </view>
</template>

<script setup>
import Loading from './loading'
import Thread from './thread'

const props = defineProps({
  threads: {type: Array, default: []},
  loading: {type: Boolean, default: true},
  showNode: {type: Boolean, default: true}
})

</script>
