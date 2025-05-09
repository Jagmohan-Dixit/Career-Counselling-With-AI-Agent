import { toast } from "react-hot-toast";
import { setCapturePayment, setLoading, setError, setVerifyPayment, setSendVerifyEmail } from "../../store/slices/paymentSlice";
import { apiConnector } from "../apiConnector";
import { paymentEndpoints } from "../apis"

const {
    CAPTURE_PAYMENT_API,
    VERIFY_PAYMENT_API,
    SEND_VERIFY_EMAIL_API
} = paymentEndpoints

export function capturePayment(token, paymentDetails) {
  return async (dispatch) => {
    const toastId = toast.loading("Capturing Payment...");
    dispatch(setLoading(true));
    console.log("Capturing Payment...")
    let result = null;
    try {
      const response = await apiConnector("POST", CAPTURE_PAYMENT_API, paymentDetails, {
        Authorization: `Bearer ${token}`,
      });
      console.log("Response 1 : ", response)
      if (!response.success) {
        toast.error(response.message);
        return;
      }
      result = response;
      dispatch(setCapturePayment(response.data));
      toast.success("Payment Captured Successfully");
    } catch (error) {
      console.error("CAPTURE PAYMENT ERROR:", error);
      dispatch(setError(error.message));
      toast.error("Capture Payment Failed");
      result = error
    } finally {
      dispatch(setLoading(false));
      toast.dismiss(toastId);
    }
    return result;
  };
}


export function verifyPayment(token, verificationData) {
  return async (dispatch) => {
    const toastId = toast.loading("Verifying Payment...");
    dispatch(setLoading(true));
    let result = null;
    try {
      const response = await apiConnector("POST", VERIFY_PAYMENT_API, verificationData, {
        Authorization: `Bearer ${token}`,
      });
      console.log("Response verify : ", response)
      if (!response.success) {
        toast.error(response.message);
        return;
      }
      result = response;
      dispatch(setVerifyPayment(response.data));
      toast.success("Payment Verified Successfully");
    } catch (error) {
      console.error("VERIFY PAYMENT ERROR:", error);
      dispatch(setError(error.message));
      toast.error("Payment Verification Failed");
    } finally {
      dispatch(setLoading(false));
      toast.dismiss(toastId);
    }
    return result;
  };
}


export function sendVerifyEmail(token, emailData) {
    return async (dispatch) => {
      const toastId = toast.loading("Sending Verification Email...");
      dispatch(setLoading(true));
      let result = null;
      try {
        const response = await apiConnector("POST", SEND_VERIFY_EMAIL_API, emailData,  {
            Authorization: `Bearer ${token}`,
        });
  
        if (!response.success) {
          toast.error(response.message);
          return;
        }
        console.log("Response email : ", response)
        result = response;
        dispatch(setSendVerifyEmail(response.data));
        toast.success("Verification Email Sent");
      } catch (error) {
        console.error("SEND EMAIL ERROR:", error);
        dispatch(setError(error.message));
        toast.error("Failed to Send Email");
      } finally {
        dispatch(setLoading(false));
        toast.dismiss(toastId);
      }
      return result;
    };
  }
  