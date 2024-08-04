<script setup lang="ts">
import { toRefs, onMounted } from 'vue'
import { type Event } from '@/types'
import { useRouter } from 'vue-router'
import { useMessageStore } from '@/stores/message'

const props = defineProps<{
  event: Event
  id: String
}>()
const store = useMessageStore()
const router = useRouter()
const edit = () => {
  store.updateMessage('The data has been updated for ' + props.event.title)
  setTimeout(() => {
    store.resetMessage()
  }, 3000)
  router.push({ name: 'event-detail-view', params: { id: props.event.id } })
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { event } = toRefs(props)
</script>
<template>
  <p>Edit event here</p>
  <button @click="edit">Edit</button>
</template>
