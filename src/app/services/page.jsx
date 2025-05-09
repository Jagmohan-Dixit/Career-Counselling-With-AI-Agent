'use client';

import React from 'react';
import Image from 'next/image';
import Script from 'next/script';
import { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import { Section } from '../components/Section';
import { Button } from '@/components/ui/button';
import PaymentButton from "./PaymentButton";



const mentorship_data = [
  {
    title: "Personal Mentorship",
    description: "With 1:1 Mentorship, avail personalized attention and get your doubts cleared.",
    imageSrc: "/images/student1.png",
  },
  {
    title: "Live Sessions",
    description: "Attend Live interactive sessions with IIT | AIIMS mentors & get your doubts solved.",
    imageSrc: "/images/student2.png",
  },
  {
    title: "Group Sessions",
    description: "Get tailor-made study planners to prepare with balance for IIT JEE | NEET exams.",
    imageSrc: "/images/student1.png",
  },
  {
    title: "AI Talk",
    description: "With 1:1 Mentorship, avail personalized attention and get your doubts cleared.",
    imageSrc: "/images/student2.png",
  },
  {
    title: "Test Series",
    description: "Attend Live interactive sessions with IIT | AIIMS mentors & get your doubts solved.",
    imageSrc: "/images/student1.png",
  },
  {
    title: "Topper's Notes",
    description: "Get tailor-made study planners to prepare with balance for IIT JEE | NEET exams.",
    imageSrc: "/images/student2.png",
  },
  
  // Add more features here...
]

const plans = [
  {
    id : 1,
    key: 'beginner',
    title: `Beginner's Plan`,
    highlights: [
      '12 1-1 Mentorship sessions',
      '6 Group sessions',
      `24*7 AI Topper's Talk`,
      'Test Series Evaluation with Mentors',
      'Personalised Study Plan',
      'Toppers Hand Written Notes',
      'Validity 3 Months',
    ],
    mrp: 4499,
    deal: 2999,
    bg: 'bg-amber-100',
    ribbon: null,
  },
  {
    id : 2,
    key: 'pro',
    title: `Pro Pack`,
    highlights: [
      '24 1-1 Mentorship sessions',
      '12 Group sessions',
      `24*7 AI Topper's Talk`,
      'Test Series Evaluation with Mentors',
      'Personalised Study Plan',
      'Toppers Hand Written Notes',
      'Validity 6 Months',
    ],
    mrp: 7599,
    deal: 4999,
    bg: 'bg-amber-100',
    ribbon: null,
  },
  {
    id : 3,
    key: 'premium',
    title: `Premium Pack`,
    highlights: [
      '48 1-1 Mentorship sessions',
      '24 Group sessions',
      `24*7 AI Topper's Talk`,
      'Test Series Evaluation with Mentors',
      'Personalised Study Plan',
      'Toppers Hand Written Notes',
      'Validity 12 Months',
    ],
    mrp: 11999,
    deal: 7999,
    bg: 'bg-green-200',
    ribbon: 'Most Popular',
  },
];


const ServicesPage = () => {
  const [isMounted, setIsMounted] = useState(false);
  const { token } = useSelector((state) => state.auth)
  const user  = useSelector((state) => state?.profile?.user);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    
    <div className="mx-auto px-6 py-4 pt-16 max-w-full sm:max-w-4xl md:max-w-5xl lg:max-w-7xl rounded-lg overflow-hidden animate-fade-in">
      <div className="container relative mx-auto max-w-full sm:max-w-5xl md:max-w-4xl lg:max-w-6xl rounded-lg overflow-hidden">
        {/* <Section
          id={1}
          title="Mentorship"
          lastWord= "Plans"
          description="Choose the plan that suits your preparation journey in the best possible way!"
          imageSrc="/images/student1.png"
          imageAlt="Mentorship Plans Illustration"
        /> */}
        <Section
          id={2}
          title="About"
          lastWord= "Mentorship"
          description="At CareerCompass, we are committed to providing you with the best mentorship experience. Our mentors give you well-researched study material to clear your NEET | IIT JEE exam, where you may get in touch with mentors and clear your issues. Our mentors will be your companions on your pressure for your exams."
          imageSrc="/images/student1.png"
          imageAlt="About Mentorship Illustration"
        />
        <Section
          id={3}
          title="Crack NEET | IIT JEE with guidance from"
          lastWord='Mentors'
          description="Every aspirant of NEET | IIT JEE seeks guidance to ace their preparation journey. At CareerCompass, we provide you thing advice directly from recent toppers with new ideas in your areas and know the hurdles that come your way. You get the opportunity to connect and interact with them to gain the confidence, learn techniques to solve baffling and stay ahead of competition."
          imageSrc="/images/student2.png"
          imageAlt="Crack NEET IIT JEE Illustration"
          reverse
        />
        <Section
          id={4}
          title="Benefits of CareerCompass's Mentorship"
          lastWord='Program'
          description="Proper mentorship is the key to success in NEET | IIT JEE exams. With CareerCompass, you unlock access to the right guidance from IIT | AIIMS mentors who can teach you the best question-solving journey, learn time management skills, memory retention skills, handstar written notes to study, doubt clearing and much more. We make you view your steps to become a topper, too!"
          imageSrc="/images/student1.png"
          imageAlt="Benefits of CareerCompass Mentorship Program Illustration"
        />

        {/* Other Sections */}
        <section className='mt-8 lg:mt-14 md:mt-14'>
          <h2 className="text-3xl lg:text-5xl font-bold text-center mb-8"><span className="text-green-600">Mentorship</span> Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Feature Cards */}
            {mentorship_data.map((feature, index) => (
              <div key={index} className="flex flex-col items-center p-4 bg-sky-50 shadow-[rgba(0,0,0,0.24)_0px_3px_8px] rounded-lg border ">
                <Image
                  src={feature.imageSrc}
                  alt={feature.title}
                  width={80}
                  height={80}
                  className="mb-2 rounded-full object-cover"
                />
                <h1 className="text-2xl font-semibold text-center">{feature.title}</h1>
                <p className="text-gray-700 text-center my-2">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>
      </div>


      {/* Other sections like FAQ, Newsletter, etc., remain unchanged */}
      <div className=' mt-8 lg:mt-14 md:mt-14'>
        <div className='flex justify-center pt-4'>
          <h1 className="text-3xl lg:text-5xl font-bold mb-6">
            Mentorship <span className="text-green-600">Plans</span>
          </h1>
        </div>
        <div className="grid grid-cols-1 sm:p-10 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {plans.map((plan, id) => (
            <div className='' key={id}>
              <div
                className={`relative rounded-2xl ${plan.bg} p-6 shadow-lg flex flex-col`}
              >
                {/* Ribbon */}
                {plan.ribbon && (
                  <div className="absolute top-0 right-0">
                    <span className="bg-green-500 text-white uppercase text-xs font-bold px-3 py-1 rounded-bl-lg">
                      {plan.ribbon}
                    </span>
                  </div>
                )}

                {/* Title */}
                <h3 className="text-xl font-bold text-gray-800 mb-4">{plan.title}</h3>

                {/* Features */}
                <ul className="flex-1 space-y-2 mb-6">
                  {plan.highlights.map((feat, i) => (
                    <li key={i} className="flex items-start">
                      <svg
                        className="w-5 h-5 text-green-600 flex-shrink-0 mr-2 mt-1"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414L8.414 15l-4.707-4.707a1 1 0 011.414-1.414L8.414 12.586l7.879-7.879a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="text-gray-700">{feat}</span>
                    </li>
                  ))}
                </ul>

                {/* Pricing */}
                <div className="mb-6">
                  <div className="text-gray-500 line-through text-sm">
                    MRP ₹ {plan.mrp.toLocaleString()}
                  </div>
                  <div className="text-gray-900 font-bold text-2xl">
                    Today's Deal ₹ {plan.deal.toLocaleString()}/-
                  </div>
                </div>

                {/* Action Button */}
                {/* <Button variant="outline" className={`mt-auto bg-primary font-bold border-none ${plan.key == "mega" ? "bg-gradient-to-r from-yellow-500 to-orange-500 text-black" : "text-white"}`} 
                  onClick={() => {

                  }}>
                  Choose Plan
                </Button> */}

                <PaymentButton
                  id={plan?.id}
                  user={user}
                  token={token}
                  amount={plan?.deal}
                  item_key={plan.key}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <Script
        id="razorpay-checkout-js"
        src="https://checkout.razorpay.com/v1/checkout.js"
      />

    </div>
  );
};

export default ServicesPage;