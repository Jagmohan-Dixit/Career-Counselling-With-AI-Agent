import { toast } from "react-hot-toast"

import { setLoading, setToken } from "@/store/slices/authSlice"
// import { resetCart } from "@/store/slices/cartSlice"
import { setUser } from "@/store/slices/profileSlice"
import { apiConnector } from "../apiConnector"
import { endpoints } from "../apis"

const {
  SENDOTP_API,
  SIGNUP_API,
  LOGIN_API,
  RESETPASSTOKEN_API,
  RESETPASSWORD_API,
} = endpoints

export function sendOtp(email, navigate) {
  return async (dispatch) => {
    console.log("Inside sendOtp")
    const toastId = toast.loading("Loading...")
    dispatch(setLoading(true))
    try {
      console.log('Before going to apiCaller --', SENDOTP_API)
      const response = await apiConnector("POST", SENDOTP_API, {
        email,
        // checkUserPresent: true,
      })
      console.log("SENDOTP API RESPONSE............", response)

      if (!response.success) {
        toast.error(response.message)
        return;
      }
      console.log(("OTP Sent Successfully"))
      toast.success("OTP Sent Successfully")
      navigate.push("/verify-email")
    } catch (error) {
      console.log("SENDOTP API ERROR............", error)
      toast.error("Could Not Send OTP")
    } finally {
      dispatch(setLoading(false));
      toast.dismiss(toastId);
    }
  }
}

export function signUp(
  accountType,
  firstName,
  lastName,
  email,
  password,
  confirmPassword,
  otp,
  navigate
) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...")
    dispatch(setLoading(true))
    try {
      const response = await apiConnector("POST", SIGNUP_API, {
        accountType,
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        otp,
      })

      // console.log("SIGNUP API RESPONSE............", response)

      if (!response.success) {
        toast.error(response.message);
        navigate.push("/signup")
        return;
      }
      toast.success("Signup Successful")
      dispatch(login(email, password, navigate))
    } catch (error) {
      console.log("SIGNUP API ERROR............", error)
      toast.error("Signup Failed")
      navigate.push("/signup")
    } finally {
      dispatch(setLoading(false))
      toast.dismiss(toastId)
    }
  }
}

export function login(
  email, 
  password, 
  navigate
) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...")
    dispatch(setLoading(true))
    try {
      const response = await apiConnector("POST", LOGIN_API, {
        email,
        password,
      })

      // console.log("LOGIN API RESPONSE............", response)

      if (!response.success) {
        toast.error(response.message);
        return;
      }

      toast.success("Login Successful")
      dispatch(setToken(response.token))
      const userImage = response?.user?.image
        ? response.user.image
        : `https://api.dicebear.com/5.x/initials/svg?seed=${response.user.firstName} ${response.user.lastName}`
      
      dispatch(setUser({ ...response.user, image: userImage }))
      console.log("User Data", response.user)
      localStorage.setItem("token", JSON.stringify(response.token))
      navigate.push("/dashboard/profile")
    } catch (error) {
      console.log("LOGIN API ERROR............", error)
      toast.error("Login Failed")
    } finally {
      dispatch(setLoading(false))
      toast.dismiss(toastId)
    }
  }
}

export function getPasswordResetToken(
  email, 
  setEmailSent
) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...")
    dispatch(setLoading(true))
    try {
      const response = await apiConnector("POST", RESETPASSTOKEN_API, {
        email,
      })

      // console.log("RESETPASSTOKEN RESPONSE............", response)

      if (!response.success) {
        toast.error(response.message);
        return;
      }

      toast.success("Reset Email Sent")
      setEmailSent(true)
    } catch (error) {
      console.log("RESETPASSTOKEN ERROR............", error)
      toast.error("Failed To Send Reset Email")
    } finally {
      toast.dismiss(toastId)
      dispatch(setLoading(false))
    }
  }
}

export function resetPassword(
  password, 
  confirmPassword, 
  token, 
  navigate
) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...")
    dispatch(setLoading(true))
    try {
      const response = await apiConnector("POST", RESETPASSWORD_API, {
        password,
        confirmPassword,
        token,
      })

      // console.log("RESETPASSWORD RESPONSE............", response)

      if (!response.success) {
        toast.error(response.message);
        return;
      }

      toast.success("Password Reset Successfully")
      navigate.push("/login")
    } catch (error) {
      console.log("RESETPASSWORD ERROR............", error)
      toast.error("Failed To Reset Password")
    } finally {
      toast.dismiss(toastId)
      dispatch(setLoading(false))
    }
  }
}

export function logout(navigate) {
  return (dispatch) => {
    dispatch(setToken(null))
    dispatch(setUser(null))
    // dispatch(resetCart())
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    toast.success("Logged Out")
    console.log("Logged Out Successfully")
    navigate.push("/")
  }
}
