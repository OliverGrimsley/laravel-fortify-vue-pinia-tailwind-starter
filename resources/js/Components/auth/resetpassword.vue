<template>
    <form @submit.prevent="submit">
        <div v-if="!hasToken" class="mb-4">
            <div class="mb-4">
                <text-input v-model="email" label="Email" />
            </div>
        </div>
        <div v-else class="text-red-500 text-center">
            <div class="mb-4">
                <text-input v-model="newpassword" label="New Password" type="password" />
            </div>
            <div class="mb-4">
        <text-input v-model="password_confirmation" label="Confirm Password" type="password" />
      </div>
            <router-link to="/reset-password" replace class="text-blue-500 text-center">Send new reset email?</router-link>
        </div>
        <div class="mb-4 flex justify-end">
            <button type="submit" class="mx-4 rounded bg-blue-500 px-4 py-2 font-medium text-white">{{ buttonText }}</button>
        </div>
        <div v-if="authStore.errorMSG" class="text-red-500 text-center">{{ authStore.errorMSG }}</div>
    </form>
</template>
<script setup lang="ts"> 
    import textInput from '@comp/formelements/textInput.vue' 
    import { useAuth } from '@/stores/auth'
    import { computed, ref } from 'vue'
    import { useRoute } from 'vue-router'

    const route = useRoute()
    const hasToken = computed(() => !!route.query.token) 
    const newpassword = ref('')
    const password_confirmation = ref('')

    const buttonText = computed(() => (!!route.query.token) ? 'Reset Password' : 'Send Reset Email')

    const authStore = useAuth()
    const email = ref('')
    const submit = async () => {
        if (!!route.query.token) {
            await authStore.resetpassword({token: route.query.token, password: newpassword.value, email: route.query.email, password_confirmation: password_confirmation.value})
            return
        }
        await authStore.emailresetpassword({email: email.value})
    }

</script>