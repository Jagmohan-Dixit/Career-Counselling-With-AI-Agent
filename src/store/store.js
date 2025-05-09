import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import profileReducer from "./slices/profileSlice";
import modeReducer from "./slices/modeSlice";
import rootReducer from './reducer';

const store = configureStore({
  reducer: rootReducer,
});

export default store;