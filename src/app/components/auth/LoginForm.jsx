"use-client"

import { useState } from "react"
import { toast } from "react-hot-toast"
import { useDispatch } from "react-redux"
import {Card, CardContent} from "@/components/ui/card";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {Mail, Lock, User, Facebook, Twitter} from 'lucide-react';


import { sendOtp } from "../../../services/operations/authAPI"
import { setSignupData } from "@/store/slices/authSlice"
// import { ACCOUNT_TYPE } from "../../../utils/constants"
// import google from "/images/assets/Logo/gogole.png"



function LoginForm({name}) {
  const navigate = useRouter();
  const dispatch = useDispatch();
  
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { firstName, lastName, email, password, confirmPassword } = formData;

  // Password regex
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

  // Handle input fields, when some value changes
  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  // Handle Form Submission
  const handleOnSubmit = (e) => {
    e.preventDefault();

    // Password Validation
    if (!passwordRegex.test(password)) {
      toast.error("Password must be at least 6 characters long and include Number, lowercase letter, uppercase letter, and special character.");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    const signupData = {
      ...formData,
      accountType,
    };

    // Setting signup data to state
    dispatch(setSignupData(signupData));
    // Send OTP to user for verification
    dispatch(sendOtp(formData.email, navigate));

    // Reset form
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
    // setAccountType(ACCOUNT_TYPE.STUDENT);
  };

  return (
    <Card className="bg-white shadow-[rgba(0,0,0,0.24)_0px_3px_8px] w-full max-w-md m-2">
    <CardContent className="p-8">
      <h2 className="text-2xl font-semibold text-center mb-6">{name == "signup" ? "Create Account" : "Welcome"}</h2>
      <div className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
          <div className="relative">
            <Input
              id="name"
              placeholder="Enter your name"
              type="text"
              className="pl-10"
            />
            <User className="absolute left-3 top-3.5 h-5 w-5 text-gray-500"/>
          </div>
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
          <div className="relative">
            <Input
              id="email"
              placeholder="Enter your email"
              type="email"
              className="pl-10"
            />
            <Mail className="absolute left-3 top-3.5 h-5 w-5 text-gray-500"/>
          </div>
        </div>
        {name == "signup" && 
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <div className="relative">
              <Input
                id="password"
                placeholder="Enter your password"
                type="password"
                className="pl-10"
              />
              <Lock className="absolute left-3 top-3.5 h-5 w-5 text-gray-500"/>
            </div>
          </div>
        }

        <Button className="block mx-auto w-[80%] text-white font-bold">{name == "signup" ? "Signup" : "Login"}</Button>
        <div className="text-center text-gray-500">OR</div>
        <div className="flex justify-center space-x-4">
          <Link href="#" className="text-blue-500 hover:text-blue-700"><Facebook className="h-6 w-6"/></Link>
          <Link href="#" className="text-red-500 hover:text-red-700"><Mail className="h-6 w-6"/></Link>
          <Link href="#" className="text-blue-400 hover:text-blue-600"><Twitter className="h-6 w-6"/></Link>
        </div>
        <p className="text-sm text-center">
          {name == "signup" ? "Already have an account?" : "Don't have an account?"} <Link href={name == "login" ? "/signup" : "/login"} className="text-primary">{name == "signup" ? "Login" : "Signup"}</Link>
        </p>
      </div>
    </CardContent>
  </Card>
  )
}


export default LoginForm;