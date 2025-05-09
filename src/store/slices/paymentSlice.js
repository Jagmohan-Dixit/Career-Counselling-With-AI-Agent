import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  paymentCaptured: null,
  paymentVerified: null,
  emailSent: null,
  loading: false,
  error: null,
};

const razorpaySlice = createSlice({
  name: "razorpay",
  initialState,
  reducers: {
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setCapturePayment(state, action) {
      state.paymentCaptured = action.payload;
    },
    setVerifyPayment(state, action) {
      state.paymentVerified = action.payload;
    },
    setSendVerifyEmail(state, action) {
      state.emailSent = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
    clearRazorpayState(state) {
      state.paymentCaptured = null;
      state.paymentVerified = null;
      state.emailSent = null;
      state.loading = false;
      state.error = null;
    }
  },
});

export const {
  setLoading,
  setCapturePayment,
  setVerifyPayment,
  setSendVerifyEmail,
  setError,
  clearRazorpayState,
} = razorpaySlice.actions;

export default razorpaySlice.reducer;
