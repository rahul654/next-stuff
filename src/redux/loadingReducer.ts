import { LOADING } from "./loadingAction";

const reducer = (state = false, action: any): boolean => {
    switch (action?.type) {
        case LOADING:
            return action.payload;
        default:
            return state
    }
}

export default reducer;