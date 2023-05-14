<template>
  <div class="flex self-center rounded border border-slate-400 bg-slate-300 sm:w-full md:w-1/2 lg:w-1/3 xl:w-1/4">
    <form v-if="!authStore.show2FACodeInput" @submit.prevent="submit" class="flex w-full flex-col justify-items-center">
      <div class="mt-4 text-center text-3xl text-slate-500">Login</div>
      <div class="mb-4">
        <text-input v-model="form.email" label="Email" />
      </div>
      <div class="mb-4">
        <text-input v-model="form.password" label="Password" type="password" />
      </div>
      <router-link to="/reset-password" class="text-center text-blue-500">Forgot Password?</router-link>
      <div class="mb-4 flex justify-end">
        <button type="submit" class="mx-4 rounded bg-blue-500 px-4 py-2 font-medium text-white">Login</button>
      </div>
      <div v-if="authStore.errorMSG" class="text-center text-red-500">{{ authStore.errorMSG }}</div>
    </form>

    <transition>
      <form v-if="authStore.show2FACodeInput" @submit.prevent="submitCode">
        <div class="p-4">
          <div>Please enter your 2FA code from your app:</div>
          <text-input v-model="twofactorcode" label="2FA Code" />
          <div class="mt-4 text-xs">Can't access your 2FA provider? Login with a recovery code:</div>
          <text-input v-model="twofactorrecoverycode" label="2FA Recovery Code" />
          <button type="submit" class="mx-4 mt-4 rounded bg-blue-500 px-4 py-2 font-medium text-white">Confirm 2FA Code</button>
        </div>
      </form>
    </transition>
  </div>
</template>
<script setup lang="ts">
import textInput from '@comp/formelements/textInput.vue'
import { reactive, ref } from 'vue'
import { useAuth } from '@/stores/auth'

const authStore = useAuth()
const twofactorcode = ref('')
const twofactorrecoverycode = ref('')

const form = reactive({
  email: '',
  password: ''
})

const submit = async () => {
  await authStore.login(form)
}

const submitCode = async () => {
  !twofactorrecoverycode.value
    ? await authStore.submit2FACodeforLogin(twofactorcode.value, false)
    : await authStore.submit2FACodeforLogin(twofactorrecoverycode.value, true)
}
</script>
<style scoped>
.v-enter-active {
  transition: all 0.3s ease-out;
}
.v-leave-active {
  /* transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1); */
}

.v-enter-from,
.v-leave-to {
  /* opacity: 0; */
  /* transform: translate(20px); */
  opacity: 0;
}
</style>
```
