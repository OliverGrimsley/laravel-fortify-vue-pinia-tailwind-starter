<template>
  <div class="ml-2 flex items-center space-x-2">
    <RouterLink :to="{ name: 'home' }" class="text-2xl font-semibold text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
      Home
    </RouterLink>
    <div
      v-if="authStore.loggedIn && !authStore.user?.email_verified_at"
      @click="authStore.resendVerificationEmail()"
      class="cursor-pointer rounded-md border bg-cyan-400 px-2 font-semibold text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
    >
      Resend email verification
    </div>
  </div>
  <div class="mr-10">
    <div v-if="authStore.loggedIn" class="flex items-center space-x-4">
      <div
        @click="authStore.logout()"
        class="cursor-pointer rounded-md border bg-blue-500 px-1 font-semibold text-white hover:bg-blue-700 hover:text-gray-300 dark:text-gray-400 dark:hover:text-white"
      >
        Log Out
      </div>
    </div>

    <div v-else class="flex items-center space-x-2">
      <RouterLink
        :to="'login'"
        class="rounded-md border bg-blue-500 px-2 font-semibold text-gray-200 hover:bg-blue-700 hover:text-gray-300 dark:text-gray-400 dark:hover:text-white"
        >Log in
      </RouterLink>
      <RouterLink
        :to="'register'"
        v-if="canRegister"
        class="rounded-md border bg-blue-500 px-2 font-semibold text-gray-200 hover:bg-blue-700 hover:text-gray-300 dark:text-gray-400 dark:hover:text-white"
        >Register
      </RouterLink>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useAuth } from '@/stores/auth'
import { ref } from 'vue'
const authStore = useAuth()
const canRegister = ref(true)
</script>
