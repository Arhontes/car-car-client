export type AppStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

export type AppStateType = {
    status: AppStatusType
    error: string | null
    isInitialize: boolean
}