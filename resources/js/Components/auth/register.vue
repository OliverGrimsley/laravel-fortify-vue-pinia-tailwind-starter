<template>
  <div class="flex self-center w-1/2 rounded border bg-slate-300 border-slate-400">
    <form @submit.prevent="submit" class="flex w-full flex-col justify-items-center">
      <div class="text-center text-3xl text-slate-500 mt-4">Register</div>
      <div class="mb-4">
        <text-input v-model="form.name" label="Name" />
      </div>
      <div class="mb-4">
        <text-input v-model="form.email" label="Email" />
      </div>
      <div class="mb-4">
        <text-input v-model="form.password" label="Password" type="password" />
      </div>
      <div class="mb-4">
        <text-input v-model="form.password_confirmation" label="Confirm Password" type="password" />
      </div>
      <div class="mb-4">
        <text-input v-model="form.regkey" label="Registration Key" />
      </div>
      <div class="mb-4 flex justify-end">
        <button type="submit" class="mx-4 rounded bg-blue-500 px-4 py-2 font-medium text-white">Register</button>
      </div>
      <div v-if="authStore.errorMSG" class="text-red-500 text-center">{{ authStore.errorMSG }}</div>
    </form>
  </div>
</template>
<script setup lang="ts">
import textInput from '@comp/formelements/textInput.vue'
import { reactive } from 'vue'
import { useAuth } from '@/stores/auth'

const authStore = useAuth()

const form = reactive({
  name: '',
  email: '',
  password: '',
  password_confirmation: '',
  regkey: ''
})

const submit = async () => {
  await authStore.register(form)
}
</script>
