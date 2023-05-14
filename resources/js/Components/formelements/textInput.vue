<template>
  <div class="grid">
    <label class="mb-1 ml-4 mt-2 block text-sm font-medium text-gray-700">{{ label }}
      <div class="ml-1 mt-1 mx-4 rounded border px-2 border-slate-500 relative">
        <input v-model="value" :type="fieldType" class="border-none bg-slate-300 w-full" />
        <template v-if="type == 'password'">
          <EyeIcon @click="showPassword = !showPassword" v-if="!showPassword" class="absolute top-3 right-4 h-5 text-green-600"></EyeIcon>
          <EyeSlashIcon v-else @click="showPassword = !showPassword" class="absolute top-3 right-4 h-5 text-green-600"></EyeSlashIcon>
        </template>
    </div>
    </label>
  </div>
</template>
<script setup lang="ts">
import { computed, ref } from 'vue'
import { EyeIcon, EyeSlashIcon } from '@heroicons/vue/20/solid' 

const props = defineProps({
  modelValue: { type: String, required: true },
  label: { type: String, required: true },
  type: { type: String, default: 'text' }
})
const showPassword = ref(false)
const emit = defineEmits(['update:modelValue'])

const fieldType = computed({
  get() {
    if (props.type == 'password' && showPassword.value) {
      return 'text'
    } else {
      return props.type
    }
  },
  set(_value) {
    return
  }

}) 

const value = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emit('update:modelValue', value)
  }
})
</script>
