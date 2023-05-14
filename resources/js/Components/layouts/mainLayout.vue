<template>
  <div class="localcontainer min-h-screen rounded-sm bg-blue-100 p-2">
    <div class="sidebar rounded-sm bg-blue-400 pl-4 pt-4">
      <Sidebar />
    </div>
    <div v-if="t" class="top flex items-center justify-between rounded-sm bg-blue-200">
      <Header />
    </div>
    <div class="footer flex items-center rounded-sm bg-blue-300">
      <Footer />
    </div>
    <div class="main grid place-items-center rounded-sm bg-blue-500 p-4">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import Header from '@/Components/layouts/header.vue'
import Footer from '@/Components/layouts/footer.vue'
import Sidebar from '@/Components/layouts/sidebar.vue'
const t = ref(true)
</script>
<style scoped>
.localcontainer {
  display: grid;
  grid-template-columns: 12rem 1fr 1fr 1fr;
  grid-template-rows: 4rem 1fr 4rem;
  grid-template-areas:
    'header header header header'
    'sidebar content content content'
    'footer footer footer footer';
  row-gap: 0.2rem;
  column-gap: 0.2rem;
}
.top {
  grid-area: header;
}

.sidebar {
  grid-area: sidebar;
}

.main {
  grid-area: content;
}
.footer {
  grid-area: footer;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
