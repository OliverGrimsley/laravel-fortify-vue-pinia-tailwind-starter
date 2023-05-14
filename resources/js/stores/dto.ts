export type LoginDTO {
    email: string
    password: string
}

export type RegisterDTO {
    name: string
    email: string
    password: string
    regkey: string
    password_confirmation: string
}

export type ResetPasswordDTO {
    email: string
}

export type UpdatePasswordDTO {
    password: string
    password_confirmation: string
    email: string
    token: string
}

export type VerifyEmailDTO {
    id: string
    hash: string
}