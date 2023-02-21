export type UserType = {
    userId: string | null,
    phone: string | null,
    email: string | null,
    firstName: string | null,
    lastName: string | null,
}
export type UpdateProfileDto ={
    phone?: string
    email?: string
    firstName?: string
    lastName?: string
}