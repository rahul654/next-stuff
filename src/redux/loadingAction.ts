export const LOADING = "LOADING";

export const loadingAction = (payload: boolean) => ({
    type: LOADING,
    payload
})