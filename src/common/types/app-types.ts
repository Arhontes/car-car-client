export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

export type AppStateType = {
    status: RequestStatusType
    error: string | null
    isInitialize: boolean
}