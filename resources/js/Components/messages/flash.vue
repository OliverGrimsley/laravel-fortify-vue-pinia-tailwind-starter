<template>
  <transition name="fade">
    <div class="z-100" :class="'alert alert-flash alert-' + newclassname" role="alert" v-if="show && body != ''">
      <div v-if="responsestatus == 'success'"><strong>Success!</strong> {{ body }}</div>
      <div v-else><strong>Error!</strong> {{ body }}</div>
    </div>
  </transition>
</template>

<script setup>
import { onMounted, ref } from 'vue'

const props = defineProps({
  message: '',
  time: { default: 3000 },
  classname: { default: 'success' }
})

const body = ref('')
const show = ref(false)
const responsestatus = ref('success')
const newclassname = ref('success')

onMounted(() => {
  window.emitter.on('flash', (d) => {
    flash(d.msg, d.type)
  })
})

const flash = (message, type) => {
  body.value = message
  responsestatus.value = type
  type === 'success' ? (newclassname.value = 'success') : (newclassname.value = 'danger')
  show.value = true
  hide()
}

const hide = () => {
  setTimeout(() => {
    body.value = ''
    show.value = false
  }, props.time)
}
</script>

<style>
.alert {
  padding: 15px;
  margin-bottom: 22px;
  border: 1px solid transparent;
  border-radius: 1px;
}

.alert h4 {
  margin-top: 0;
  color: inherit;
}

.alert .alert-link {
  font-weight: bold;
}

.alert > p,
.alert > ul {
  margin-bottom: 0;
}

.alert > p + p {
  margin-top: 5px;
}

.alert-dismissable,
.alert-dismissible {
  padding-right: 35px;
}

.alert-dismissable .close,
.alert-dismissible .close {
  position: relative;
  top: -2px;
  right: -21px;
  color: inherit;
}

.alert-success {
  background-color: #dff0d8;
  border-color: #d6e9c6;
  color: #3c763d;
}

.alert-success hr {
  border-top-color: #c9e2b3;
}

.alert-success .alert-link {
  color: #2b542c;
}

.alert-info {
  background-color: #d9edf7;
  border-color: #bce8f1;
  color: #31708f;
}

.alert-info hr {
  border-top-color: #a6e1ec;
}

.alert-info .alert-link {
  color: #245269;
}

.alert-warning {
  background-color: #fcf8e3;
  border-color: #faebcc;
  color: #8a6d3b;
}

.alert-warning hr {
  border-top-color: #f7e1b5;
}

.alert-warning .alert-link {
  color: #66512c;
}

.alert-danger {
  background-color: #f2dede;
  border-color: #ebccd1;
  color: #a94442;
}

.alert-danger hr {
  border-top-color: #e4b9c0;
}

.alert-danger .alert-link {
  color: #843534;
}

.alert-flash {
  position: fixed;
  z-index: 10;
  /* center the div */
  right: 0;
  left: 0;
  margin-right: auto;
  margin-left: auto;
  /* give it dimensions */
  min-height: 4em;
  width: 20%;
  /* just for example presentation */
  top: 2em;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
  opacity: 0;
}
</style>
