import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './counterReducer';
import loadingReducer from './loadingReducer';

export interface StateInterface {
  count: number,
  isLoading: boolean,
}

const rootReducer = {
  count: counterReducer,
  isLoading: loadingReducer,
};

const store = configureStore({
  reducer: rootReducer,
});

export default store;
