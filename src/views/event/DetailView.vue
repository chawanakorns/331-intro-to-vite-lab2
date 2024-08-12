<script setup lang="ts">
import { toRefs, defineProps } from 'vue'
import { type Event } from '@/types'

const props = defineProps<{
  event: Event
  id: String
}>()
const { event } = toRefs(props)
</script>
<template>
  <div class="flex flex-col m-4 gap-3">
    <p>{{ event.time }} on {{ event.date }} @ {{ event.location }}</p>
    <p>{{ event.description }}</p>
  </div>
</template>
