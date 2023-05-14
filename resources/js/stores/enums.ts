export enum msg {
  GENERIC_ERROR = 'Something went wrong',
  LOGGED_IN = 'You are now logged in',
  EMAIL_PASSWORD = 'You will receive an email with a link to reset your password',
  RESET_PASSWORD = 'You have reset your password',
  PASSWORD_CONFIRMED = 'You have confirmed your password',
  CONFIRMED_EMAIL = 'You have confirmed your email address',
  SENT_VERIFICATION_EMAIL = 'You have been sent a new verification email',
  REGISTERED = 'You have registered succesfully thank you',
  TWO_FACTOR_STARTED = 'Two factor authentication process started',
  TWO_FACTOR_ENABLED = 'Two factor authentication has been enabled',
  TWO_FACTOR_DISABLED = 'Two factor authentication has been disabled'
}

export enum serverMessages {
  CONFIRM_PASSWORD = 'Password confirmation required.'
}
