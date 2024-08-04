<script setup lang="ts">
import EventCard from '@/components/EventCard.vue'
import { type Event } from '@/types'
import { ref, onMounted, computed, watchEffect, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import EventService from '@/services/EventService'

const events = ref<Event[] | null>(null)
const totalEvents = ref(0)
const route = useRoute()
const router = useRouter()

const page = ref<number>(parseInt(route.query.page?.toString() || '1'))
const pageSize = ref<number>(parseInt(route.query.size?.toString() || '2'))

const hasNextPage = computed(() => {
  const totalPages = Math.ceil(totalEvents.value / pageSize.value)
  return page.value < totalPages
})

watchEffect(() => {
  events.value = null
  EventService.getEvents(pageSize.value, page.value)
    .then((response) => {
      events.value = response.data
      totalEvents.value = parseInt(response.headers['x-total-count'])
    })
    .catch((error) => {
      console.error('There was an error!', error)
    })
})

watch(route, (newRoute) => {
  page.value = parseInt(newRoute.query.page?.toString() || '1')
  pageSize.value = parseInt(newRoute.query.size?.toString() || '2')
})

function updatePageSize(newSize: number) {
  pageSize.value = newSize
  router.replace({ name: route.name as string, query: { ...route.query, size: newSize, page: 1 } })
}
</script>

<template>
  <h1>Events For Good</h1>
  <div>
    Page size:
    <input type="number" v-model.number="pageSize" @change="updatePageSize(pageSize)" />
  </div>
  <div class="events">
    <EventCard v-for="event in events" :key="event.id" :event="event" />
    <div class="pagination">
      <RouterLink
        id="page-prev"
        :to="{ name: 'event-list-view', query: { page: page - 1, size: pageSize } }"
        rel="prev"
        v-if="page != 1"
        >&#60; Prev Page</RouterLink
      >
      <RouterLink
        id="page-next"
        :to="{ name: 'event-list-view', query: { page: page + 1, size: pageSize } }"
        rel="next"
        v-if="hasNextPage"
        >Next Page &#62;</RouterLink
      >
    </div>
  </div>
</template>

<style scoped>
.events {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.pagination {
  display: flex;
  width: 290px;
}

.pagination a {
  flex: 1;
  text-decoration: none;
  color: #2c3e50;
}

#page-prev {
  text-align: left;
}

#page-next {
  text-align: right;
}
</style>
