<template>
    <div @click="confirm" class="border rounded-md p-2 bg-red-400 text-white cursor-pointer">Click here to verify your email address</div>
    <div @click="authStore.resendVerificationEmail()" class=" border rounded-md bg-green-400 cursor-pointer text-slate-300">Resend verification email?</div>

</template>
<script setup lang="ts">
import { useRoute } from 'vue-router'
import { useAuth } from '@/stores/auth'
const authStore = useAuth()
const route = useRoute()
console.log(route)

const confirm = async () => {
    await authStore.confirmemail({id: route.params.id, hash: route.params.hash})
}
</script>