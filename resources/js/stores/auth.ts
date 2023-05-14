import axios from 'axios'
import { defineStore } from 'pinia'
import { User } from '@/stores/interfaces'
import { msg, serverMessages } from '@/stores/enums'
import { RegisterDTO, ResetPasswordDTO, LoginDTO, VerifyEmailDTO, UpdatePasswordDTO } from '@/stores/dto'

interface State {
  email: string
  token: string
  errorMSG: string
  user?: Partial<User>
  loggedIn: boolean
  passwordNeedsConfirm: boolean
  qrcode?: string
  qrURL?: string
  recoverycodes?: Array<string>
  show2FACodeInput?: boolean
}

export const useAuth = defineStore('auth', {
  state: (): State => ({
    email: '',
    token: '',
    errorMSG: '',
    user: {},
    loggedIn: false,
    passwordNeedsConfirm: false,
    qrcode: '',
    qrURL: '',
    recoverycodes: [],
    show2FACodeInput: false
  }),
  actions: {
    async login(form: LoginDTO) {
      try {
        const { data } = await axios.post('login', {
          email: form.email,
          password: form.password
        })
        if (data.two_factor) {
          this.show2FACodeInput = true
        } else {
          this.getUser()
          window.emitter.emit('flash', { type: 'success', msg: msg.LOGGED_IN })
          this.router.push({ name: 'home' })
        }
      } catch (error: any) {
        error.response.data.message ? (this.errorMSG = error.response.data.message) : (this.errorMSG = msg.GENERIC_ERROR)
        window.emitter.emit('flash', { type: 'error', msg: error.response.data.message })
      }
    },

    async emailresetpassword(email: ResetPasswordDTO) {
      try {
        await axios.post(route('password.email'), email)
        window.emitter.emit('flash', { type: 'success', msg: msg.EMAIL_PASSWORD })
        this.router.push({ name: 'home' })
      } catch (error: any) {
        error.response.data.message ? (this.errorMSG = error.response.data.message) : (this.errorMSG = msg.GENERIC_ERROR)
        window.emitter.emit('flash', { type: 'error', msg: error.response.data.message })
      }
    },

    async resetpassword(data: UpdatePasswordDTO) {
      try {
        await axios.post(route('password.update'), data)
        window.emitter.emit('flash', { type: 'success', msg: msg.RESET_PASSWORD })
        this.router.push({ name: 'home' })
      } catch (error: any) {
        error.response.data.message ? (this.errorMSG = error.response.data.message) : (this.errorMSG = msg.GENERIC_ERROR)
        window.emitter.emit('flash', { type: 'error', msg: error.response.data.message })
      }
    },

    async logout() {
      await axios.post('logout')
      this.user = {}
      this.loggedIn = false
      this.show2FACodeInput = false
      this.qrcode = ''
      this.qrURL = ''
      this.errorMSG = ''
    },

    async confirmemail(data: VerifyEmailDTO) {
      try {
        await axios.post(route('verify.email', { hash: data.hash, id: data.id }))
        window.emitter.emit('flash', { type: 'success', msg: msg.CONFIRMED_EMAIL })
        this.router.push({ name: 'home' })
      } catch (error: any) {
        error.response.data.message ? (this.errorMSG = error.response.data.message) : (this.errorMSG = msg.GENERIC_ERROR)
        window.emitter.emit('flash', { type: 'error', msg: error.response.data.message })
      }
    },

    async resendVerificationEmail() {
      try {
        await axios.post(route('verification.send'))
        window.emitter.emit('flash', { type: 'success', msg: msg.SENT_VERIFICATION_EMAIL })
      } catch (error: any) {
        error.response.data.message ? (this.errorMSG = error.response.data.message) : (this.errorMSG = msg.GENERIC_ERROR)
        window.emitter.emit('flash', { type: 'error', msg: error.response.data.message })
      }
    },

    async register(form: RegisterDTO) {
      try {
        await axios.post(route('register'), {
          name: form.name,
          email: form.email,
          password: form.password,
          regkey: form.regkey,
          password_confirmation: form.password_confirmation
        })
        await this.getUser()
        window.emitter.emit('flash', { type: 'success', msg: msg.REGISTERED })
        this.router.push({ name: 'home' })
      } catch (error: any) {
        error.response.data.message ? (this.errorMSG = error.response.data.message) : (this.errorMSG = msg.GENERIC_ERROR)
      }
    },

    async enableTwoFactor() {
      try {
        await axios.post(route('two-factor.enable'))
        await this.get2FACode()
        window.emitter.emit('flash', { type: 'success', msg: msg.TWO_FACTOR_STARTED })
      } catch (error: any) {
        if (error.response.data.message === serverMessages.CONFIRM_PASSWORD) {
          this.passwordNeedsConfirm = true
          this.errorMSG = error.response.data.message
        }
      }
    },

    async get2FACode() {
      try {
        const { data } = await axios.get(route('two-factor.qr-code'))
        console.log('data', data)
        this.qrcode = data.svg
        this.qrURL = data.url
      } catch (error: any) {
        this.errorMSG = error.response.data.message
        window.emitter.emit('flash', { type: 'error', msg: this.errorMSG })
      }
    },

    async confirmTwoFactor(code: string) {
      try {
        await axios.post(route('two-factor.confirm'), { code })
        this.qrcode = ''
        window.emitter.emit('flash', { type: 'success', msg: msg.TWO_FACTOR_ENABLED })
        await this.getUser()
        await this.get2FARecoveryCodes()
      } catch (error: any) {
        this.errorMSG = error.response.data.message
      }
    },

    async get2FARecoveryCodes() {
      try {
        const { data } = await axios.get(route('two-factor.recovery-codes'))
        this.recoverycodes = data
      } catch (error: any) {
        if (error.response.data.message === serverMessages.CONFIRM_PASSWORD) {
          this.passwordNeedsConfirm = true
          this.errorMSG = error.response.data.message
        }
      }
    },

    async submit2FACodeforLogin(code: string, recovery: boolean) {
      console.log('submit2FACodeforLogin', code, recovery)

      try {
        !recovery ? await axios.post('/two-factor-challenge', { code }) : await axios.post('/two-factor-challenge', { recovery_code: code })
        this.getUser()
        window.emitter.emit('flash', { type: 'success', msg: msg.LOGGED_IN })
        this.router.push({ name: 'home' })
      } catch (error: any) {
        this.errorMSG = error.response.data.message
        window.emitter.emit('flash', { type: 'error', msg: this.errorMSG })
      }
    },

    async disableTwoFactor() {
      try {
        await axios.delete(route('two-factor.disable'))
        this.recoverycodes = []
        this.qrcode = ''
        this.qrURL = ''
        window.emitter.emit('flash', { type: 'success', msg: msg.TWO_FACTOR_DISABLED })
        this.getUser()
      } catch (error: any) {
        this.errorMSG = error.response.data.message
        window.emitter.emit('flash', { type: 'error', msg: this.errorMSG })
      }
    },

    async confirmPassword(password: string, fromroute: string) {
      try {
        await axios.post(route('password.confirm'), { password })
        this.passwordNeedsConfirm = false
        this.getUser()
        if (fromroute === 'show2FARecoveryCodes') {
          await this.get2FARecoveryCodes()
          await this.get2FACode()
        }
        window.emitter.emit('flash', { type: 'success', msg: msg.PASSWORD_CONFIRMED })
      } catch (error: any) {
        this.errorMSG = error.response.data.message
      }
    },

    async getUser() {
      try {
        const { data } = await axios.get('api/user')
        this.user = data
        if (this.user?.email) {
          this.loggedIn = true
        }
      } catch (_error: any) {}
    }
  }
})
