import type { Router } from 'vue-router'

export {}

declare global {
  interface Window {
    Laravel: any
    axios: any
    emitter: any
  }
  function route(name: string, params?: any): string

}

module 'pinia' {
  export interface PiniaCustomProperties {
    router: Router
  }
}