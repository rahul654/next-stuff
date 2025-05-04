export const INCREMENT = "INCREMENT";
export const DECREMENT = "DECREMENT";

export const incrementAction = (payload: any) => ({
    type: INCREMENT,
    payload
})
export const decrementAction = (payload: any) => ({
    type: DECREMENT,
    payload
})