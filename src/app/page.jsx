'use client';

import {Button} from '@/components/ui/button';
import {useEffect, useRef, useState} from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";



const featuredServices = [
  {
    title: 'Personalized Mentorship',
    description: 'Connect with top mentors for personalized guidance and support.',
    image: '/images/student2.png',
    link: '/questionnaire',
  },
  {
    title: 'College Prediction',
    description: 'Predict potential college admissions based on your ranks.',
    image: '/images/student1.png',
    link: '/college-prediction',
  },
  {
    title: 'Smart Study Schedule',
    description: 'Generate a personalized study schedule based on your learning style.',
    image: '/images/student2.png',
    link: '/study-schedule',
  },
  {
    title: 'Performance Analysis',
    description: 'Analyze your performance on practice tests and identify areas of weakness.',
    image: '/images/student2.png',
    link: '/performance-analysis',
  },
  {
    title: 'Subscription Plans',
    description: 'Explore our subscription plans for JEE/NEET counseling.',
    image: '/images/student1.png',
    link: '/subscription',
  },
  {
    title: 'Profile Page',
    description: 'View and manage your personal information and preferences.',
    image: '/images/student2.png',
    link: '/profile',
  },
];

const testimonials = [
  {
    text: "CareerCompass helped me find the perfect career path. The mentorship program is outstanding!",
    name: "Jane Smith",
    title: "JEE Aspirant",
    image: "/images/student2.png",
  },
  {
    text: "The study materials and practice tests were invaluable in my NEET preparation. Highly recommend!",
    name: "Mike Johnson",
    title: "NEET Aspirant",
    image: "/images/student1.png",
  },
  {
    text: "I was lost before I found CareerCompass. Now I have a clear direction and the support I need.",
    name: "Emily Brown",
    title: "SAT Aspirant",
    image: "/images/student2.png",
  },
  {
    text: "The personalized study schedule was a game-changer for me. I was able to manage my time effectively and improve my scores.",
    name: "David Lee",
    title: "GRE Aspirant",
    image: "/images/student1.png",
  },
];

const HomePage = () => {
  const [isMounted, setIsMounted] = useState(false);
  const sliderRef = useRef(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);
  const { token } = useSelector((state) => state.auth);
  const navigate = useRouter();


  useEffect(() => {
    setIsMounted(true);
    checkSliderPosition();
  }, []);

  useEffect(() => {
    if (isMounted) {
      checkSliderPosition();
    }
  }, [isMounted]);

  const checkSliderPosition = () => {
    if (sliderRef.current) {
      const slider = sliderRef.current;
      setIsBeginning(slider.scrollLeft === 0);
      setIsEnd(slider.scrollLeft + slider.offsetWidth >= slider.scrollWidth);
    }
  };

  const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollLeft -= 400;
      checkSliderPosition();
    }
  };

  const scrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollLeft += 400;
      checkSliderPosition();
    }
  };

  if (!isMounted) {
    return null;
  }

  return (
    <div className='bg-white'>
      <div className="relative container mx-auto mt-12 max-w-7xl p-8">
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="text-left">
            <h1 className="text-5xl font-bold mb-4">
              Unlock Your Potential with <span className="text-teal-500">Career Compass</span>
            </h1>
            <p className="text-lg text-gray-600 mb-6">
              Your personalized guide to academic success and career exploration.
            </p>
            <Button onClick={() => navigate.push("/services")} className="bg-gradient-to-r from-yellow-500 to-orange-500 text-black font-bold py-3 px-8 rounded-full shadow-lg hover:shadow-xl transition-shadow">
              Explore Services
            </Button>
          </div>

          <div className="relative flex justify-center">
            <Image
              src="/images/student.png"
              alt="Student Learning"
              width={600}
              height={500}
              className="rounded-lg shadow-xl"
              // style={{objectFit: 'cover'}}
            />
            {/* <div className="absolute top-8 bg-white rounded-xl p-4 shadow-md flex items-center space-x-2">
              <GraduationCap className="text-orange-500"/>
              <div>
                <p className="font-semibold">Expert Mentors</p>
              </div>
            </div>

            <div className="absolute bottom-16 left-4 bg-white rounded-xl p-4 shadow-md flex items-center space-x-2">
              <Users className="text-orange-500"/>
              <div>
                <p className="font-semibold">Vibrant Community</p>
              </div>
            </div>

            <div className="absolute bottom-4 right-0 bg-white rounded-xl p-4 shadow-md flex items-center space-x-2">
              <Book className="text-orange-500"/>
              <div>
                <p className="font-semibold">Extensive Resources</p>
              </div>
            </div> */}
          </div>
        </section>

        <section className="mt-16">
          <h2 className="text-4xl font-bold mb-8 text-center">Featured Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredServices.map((feature, index) => (
              <Card key={index} className="bg-sky-50 shadow-[rgba(0,0,0,0.24)_0px_3px_8px] rounded-lg overflow-hidden p-2 border-none">
                <CardHeader className="">
                  <CardTitle className="text-2xl font-semibold">{feature.title}</CardTitle>
                  <p className="text-gray-600">{feature.description}</p>
                </CardHeader>
                <CardContent className="">
                  {feature.image && (
                    <div className='flex justify-center'>
                    <Image
                      src={feature.image}
                      alt={feature.title}
                      width={200}
                      height={200}
                      className="rounded-full mb-4 "
                    />
                    </div>
                  )}
                  <Link href={feature.link}>
                    <Button className="block mx-auto w-[70%] bg-primary text-white font-bold py-2 px-4 rounded">
                      Learn More
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="mt-16">
          <h2 className="text-3xl font-bold mb-8 text-center">What Our Students Say</h2>
          <div className="relative">
            <div
              ref={sliderRef}
              className="flex overflow-x-auto scroll-smooth snap-x snap-mandatory"
              style={{scrollSnapType: 'x mandatory', overflowX: 'auto', scrollbarWidth: 'none'}}
              onScroll={checkSliderPosition}
            >
              {testimonials.map((testimonial, index) => (
                <Card key={index} className="bg-sky-50 shadow-md rounded-lg snap-start w-[80%] md:w-[50%] lg:w-[40%] shrink-0 mx-4">
                  <CardContent className="p-6">
                    <p className="text-gray-700 italic mb-4">
                      "{testimonial.text}"
                    </p>
                    <div className="flex items-center">
                      <Image
                        src={testimonial.image}
                        alt={testimonial.name}
                        width={50}
                        height={50}
                        className="rounded-full mr-4"
                      />
                      <div>
                        <p className="font-semibold">{testimonial.name}</p>
                        <p className="text-sm text-gray-500">{testimonial.title}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            {!isBeginning && (
              <button
                onClick={scrollLeft}
                className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-75 hover:bg-opacity-100 rounded-full p-2"
              >
                &lt;
              </button>
            )}
            {!isEnd && (
              <button
                onClick={scrollRight}
                className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-75 hover:bg-opacity-100 rounded-full p-2"
              >
                &gt;
              </button>
            )}
          </div>
        </section>

        <section className="mt-20 py-12 bg-sky-100 rounded-lg text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-lg text-gray-600 mb-6">
            Join CareerCompass today and take the first step towards your dream career.
          </p>
          <Button onClick={() => navigate.push((token ? "/services" : "/signup"))} className="bg-gradient-to-r from-green-400 to-blue-500 text-white font-bold py-3 px-8 rounded-full shadow-lg hover:shadow-xl transition-shadow">
            {token ? "Explore Our Services" : "Sign Up Now"}
          </Button>
        </section>
      </div>
    </div>
  );
};

export default HomePage;

