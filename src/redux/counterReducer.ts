import { DECREMENT, INCREMENT } from "./counterAction";

const reducer = (state = 0, action: any) => {
    switch (action?.type) {
        case INCREMENT:
            return state + action.payload;
        case DECREMENT:
            return state - action.payload;
        default:
            return state
    }
}

export default reducer;