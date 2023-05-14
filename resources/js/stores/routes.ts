import { defineStore } from 'pinia'
import { Routes } from '@/stores/interfaces'


interface State {
    routes: Partial<Routes>
}

export const useRoutes = defineStore('routes', {
    state: (): State => ({
        routes: {}
    }),
})