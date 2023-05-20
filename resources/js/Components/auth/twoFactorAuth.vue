<template>
  <div v-if="authStore.loggedIn">
    <div v-if="!twoFactorEnabled">
      <div v-if="!authStore.passwordNeedsConfirm && !authStore.qrcode">
        <div class="mb-4">
          You have not enabled two factor authentication, did you want to? <br />
          You will need to have a 2FA application available on a mobile device that can scan a QR code. We recommend
          <a class="text-blue-500 underline" href="https://authy.com/guides/twilio/" target="_blank">Authy</a>.<br />
          You will also be requried to confirm your password when you click on the Enable 2FA link below
        </div>
        <div>
          <button class="rounded-md border border-blue-600 bg-blue-600 px-2 text-white" @click="authStore.enableTwoFactor()">Enable 2FA</button>
        </div>
      </div>
      <div v-if="authStore.qrcode">
        Please complete the following steps to finish 2FA - use your 2FA app, scan the below QR code, and enter the code it gives you:
        <div class="mt-4" v-html="authStore.qrcode" />
        <form @submit.prevent="authStore.confirmTwoFactor(qrcodenum)">
          Enter code: <text-input v-model="qrcodenum" label="Enter passcode from your 2FA App" type="text" />
          <button class="rounded-md border border-blue-600 bg-blue-600 px-2 text-white">Confirm code</button>
        </form>
        <div v-if="authStore.recoverycodes">
          <div>Please copy your recovery codes in case you lose access to your 2FA app:</div>
          <div v-for="(code, index) in authStore.recoverycodes">
            {{ index + 1 }}. <span class="font-mono">{{ code }}</span>
          </div>
        </div>
      </div>
      <div
        v-if="authStore.user?.two_factor_confirmed_at"
        @click="authStore.get2FARecoveryCodes()"
        class="rounded-md border bg-blue-500 px-2 text-white"
      >
        Show recovery codes?
      </div>
    </div>
    <div v-if="authStore.passwordNeedsConfirm" class="mb-4">
      Please confirm your password:
      <form @submit.prevent="authStore.confirmPassword(password, 'show2FARecoveryCodes')">
        <text-input v-model="password" type="password" label="Confirm Password" />
        <button class="rounded-md border border-blue-600 bg-blue-600 px-2 text-white">Confirm Password</button>
      </form>
    </div>
    <div v-if="authStore.user?.two_factor_confirmed_at">
      <div
        v-if="authStore.recoverycodes && authStore.recoverycodes.length === 0"
        @click="authStore.get2FARecoveryCodes()"
        class="mb-4 w-1/2 cursor-pointer rounded-md border bg-slate-500 px-2 text-white"
      >
        Regenerate recovery codes?
      </div>
      <div v-if="authStore.recoverycodes && authStore.recoverycodes?.length > 0">
        <div>Recovery codes:</div>
        <div v-for="(code, index) in authStore.recoverycodes">
          {{ index + 1 }}. <span class="font-mono">{{ code }}</span>
        </div>
      </div>
    </div>
    <div v-if="twoFactorEnabled" class="mt-4">
      <div class="mb-4">You have enabled two factor authentication, did you want to disable it?</div>
      <div>
        <button class="rounded-md border border-blue-600 bg-blue-600 px-2 text-white" @click="authStore.disableTwoFactor()">Disable 2FA</button>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed, ref } from 'vue'
import { useAuth } from '@/stores/auth'
import textInput from '@comp/formelements/textInput.vue'

const authStore = useAuth()
const password = ref('')
const qrcodenum = ref('')

const twoFactorEnabled = computed(() => !!authStore.user?.two_factor_confirmed_at)
</script>
