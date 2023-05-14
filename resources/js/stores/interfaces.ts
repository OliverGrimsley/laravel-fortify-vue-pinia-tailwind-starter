export type User {
    created_at:  Date
    email: string
    email_verified_at: Date
    id: number
    name: string
    two_factor_confirmed_at: Date
    two_factor_recovery_codes: string
    two_factor_secret: string
    updated_at: Date
}

export type Routes {
    uri: string,
    methods: string[]
}