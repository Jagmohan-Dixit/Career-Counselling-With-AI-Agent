'use client';

import React from 'react';
import Image from 'next/image';
import SignupForm from "./auth/SignupForm" 


const LoginSignupTemplate = ({title, name, imgurl}) => {
  return (
    <div className='min-h-screen flex items-center justify-center max-w-full'>
      <div className="flex items-center grid grid-cols-1 md:grid-cols-2 w-full h-full p-2">
        <div className="hidden md:flex flex-col justify-center items-center p-8">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">{title}</h2>
          <Image
            src={imgurl}
            alt="Signup Illustration"
            width={600}
            height={600}
          />
        </div>
        <div className='flex-col w-full lg:max-w-lg sm:max-w-full p-2 sm:p-2 md:p-10 lg:p-6'>
          <SignupForm name={name} />
        </div>
      </div>
    </div>
  )
}

export default LoginSignupTemplate;