<script setup lang="ts">
import { RouterLink, RouterView, useRoute } from 'vue-router'
import { useMessageStore } from '@/stores/message'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'
import { SpeedInsights } from '@vercel/speed-insights/vue';

const store = useMessageStore()

const { message } = storeToRefs(store)

const pageSize = ref<number>(2) // Default page size

</script>

<template>
  <SpeedInsights />
  <div class="text-center font-sans text-gray-700 antialias">
    <header>
      <div id="flashMessage" class="animate-fade" v-if="message">
        <h4>{{ message }}</h4>
      </div>
      <h1>Deploy with Vercel</h1>
      <div class="wrapper">
        <nav class="py-6">
          <RouterLink class="font-bold text-gray-700" exact-active-class="text-green-500"
            :to="{ name: 'event-list-view', query: { page: 1, size: pageSize } }">Event</RouterLink>
          | <RouterLink class="font-bold text-gray-700" exact-active-class="text-green-500" :to="{ name: 'about' }">
            About</RouterLink>
        </nav>
      </div>
    </header>
    <RouterView />
  </div>
</template>
