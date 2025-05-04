import { LOADING } from "./loadingAction";

export const INCREMENT = "INCREMENT";
export const DECREMENT = "DECREMENT";

const timeout = (time: number) => new Promise(res => setTimeout(() => res(1), time));

export const incrementAsyncAction = (payload: any, dispatch: any) => async () => {
  try {
    dispatch({
      type: LOADING,
      payload: true
    })
    await timeout(3000);
    
    dispatch({
      type: INCREMENT,
      payload
    })
    
  } catch (error) {
    console.log('error::: ', error);
  }finally{
    dispatch({
      type: LOADING,
      payload: false
    })
  }
  
};

export const decrementAsyncAction = (payload: any, dispatch: any) => async () => {
  await timeout(3000);

  dispatch({
    type: DECREMENT,
    payload
  })
};