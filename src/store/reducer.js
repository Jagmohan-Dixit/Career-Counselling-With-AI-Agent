import { combineReducers } from "@reduxjs/toolkit";

import authReducer from "./slices/authSlice";
import profileReducer from "./slices/profileSlice";
import modeReducer from "./slices/modeSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  profile: profileReducer,
  mode: modeReducer,
})

export default rootReducer;
