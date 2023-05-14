<template>
    <div v-if="authStore.recoverycodes && !authStore.passwordNeedsConfirm">
        <div>Recovery codes:</div>
        <div v-for="(code,index) in authStore.recoverycodes">{{index+1}}. <span class=" font-mono">{{ code }}</span></div>
    </div>
    <div v-if="authStore.passwordNeedsConfirm">
        Please confirm your password:
        <form @submit.prevent="authStore.confirmPassword(password,'show2FARecoveryCodes')">
            <text-input v-model="password" type="password" label="Confirm Password" />
            <button class="mt-4 bg-blue-600 border-blue-600 border rounded-md px-2 text-white">Confirm</button>
        </form>
    </div>
</template>
<script setup lang="ts">
    import { useAuth } from '@/stores/auth'
    import TextInput from '@/Components/formelements/textInput.vue'
    import { onMounted, ref } from 'vue'
    const authStore = useAuth()
    const password = ref('')

    onMounted(async () => {
        await authStore.get2FARecoveryCodes()
    })
</script>