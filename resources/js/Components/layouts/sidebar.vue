<template>
    <div class="grid grid-flow-row gap-2 mx-2" v-if="authStore.loggedIn">
        <RouterLink v-if="authStore.two_factor_confirmed_at" :to="{name: 'show2FARecoveryCodes'}" class=" border rounded-md px-2 bg-blue-500 text-white text-sm">Show recovery codes?</RouterLink>
        <RouterLink  :to="{ name: 'twofactor'}" class=" border rounded-md px-2 bg-blue-500 text-white text-sm">Manage 2FA</RouterLink>
    </div>
</template>
<script setup lang="ts">
import { useAuth } from '@/stores/auth'

const authStore = useAuth()
</script>
