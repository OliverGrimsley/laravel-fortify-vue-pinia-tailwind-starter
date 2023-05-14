import { createRouter, createWebHistory } from 'vue-router'
import mainLayout from '@comp/layouts/mainLayout.vue'

const routes = [
    {
        path: '/',
        name: 'home',
        component: mainLayout,
        children: [
            {
                path: 'login',
                name: 'login',
                component: () => import('@comp/auth/login.vue'),
            },
            {
                path: 'register',
                name: 'register',
                component: () => import('@comp/auth/register.vue'),
            },
            {
                path: 'reset-password',
                name: 'resetpassword',
                component: () => import('@comp/auth/resetPassword.vue'),
            },
            {
                path: 'email/verify/:id/:hash',
                name: 'verifyemail',
                component: () => import('@comp/auth/verifyemail.vue')
            },
            {
                path: 'twofactor',
                name: 'twofactor',
                component: () => import('@comp/auth/twoFactorAuth.vue')
            },
            {
                path: 'show2FARecoveryCodes',
                name: 'show2FARecoveryCodes',
                component: () => import('@comp/auth/showRecoveryCodes.vue')   
            }
        ]
    },
]

export const router = createRouter({
    history: createWebHistory(),
    scrollBehavior(_to, _from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        } else {
            return { top: 0 }
        }
    },
    routes,
    // linkExactActiveClass: 'exactRoute'
})
