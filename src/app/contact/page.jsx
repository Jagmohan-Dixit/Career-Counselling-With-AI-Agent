'use client';

import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {Textarea} from '@/components/ui/textarea';
import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from "@/components/ui/accordion";
import {useEffect, useState} from 'react';
import {Facebook, Instagram, Linkedin, Twitter, Youtube} from "lucide-react";
import Image from 'next/image';
import Map from '../components/Map';
import ContactusForm from '../components/Forms/ContactusForm';


const faq_data = [
    {
      question: "How can I register for CareerCompass's Mentorship Program?",
      answer: "You can register by visiting our website and filling out the registration form."
    },
    {
      question: "What benefits will I get as a member of CareerCompass's Mentorship Program?",
      answer: "You will get personalized mentorship from IIT/AIIMS toppers, access to study materials, and more."
    },
    {
      question: "What is the official website of CareerCompass?",
      answer: "The official website is www.careercompass.com."
    },
    {
      question: "What is the customer support number of CareerCompass?",
      answer: "You can reach us at 08069458324."
    },
    {
      question: "What is CareerCompass's office address?",
      answer: "620/5, 2nd floor, Udyog Vihar Phase V, Sector 19, Gurugram, Haryana 122008."
    }
]

const card_data = [
  {
    src: "/images/student2.png",
    alt: "A-Z support and guidance",
    text: "A-Z support and guidance for you in your NEET | IIT JEE preparation journey."
  },
  {
    src: "/images/student.png",
    alt: "Round the clock student service support",
    text: "Round the clock student service support to handle and resolve all your queries."
  },
  {
    src: "/images/student2.png",
    alt: "Assists you in your preparation journey",
    text: "Assists you in your preparation journey with guidance from recent exam toppers."
  }
]

export default function ContactPage() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div className="relative mx-auto mt-10 max-w-7xl p-8 rounded-lg overflow-hidden animate-fade-in">
      <div className="container relative mx-auto max-w-7xl rounded-lg overflow-hidden">
        <div className='flex justify-around'>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl p-0 flex justify-between items-center">
            <div className="p-2 rounded-lg">
              <h2 className="text-3xl font-bold mb-4">We love to hear from you</h2>
              <p className="text-lg text-gray-600 mb-6">Share your feedback, ask a question, or just drop a Hi! We are here for you.</p>
              <Image
                src="/images/student.png"
                alt="Contact Illustration"
                width={500}
                height={300}
                className="rounded-lg"
              />
            </div>
            <ContactusForm />
          </div>
        </div>

        <section className="p-8">
          <h2 className="text-3xl font-bold text-center mb-8">How <span className="text-green-600">CareerCompass</span> Supports You</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {card_data.map((item, index) => (
              <div key={index} className="flex items-center p-4 rounded-lg bg-white shadow-[rgba(0,0,0,0.24)_0px_3px_8px] border">
                <Image
                  src={item.src}
                  alt={item.alt}
                  width={50}
                  height={50}
                  className="mr-4"
                />
                <p className="text-gray-700">{item.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="p-8">
          <h2 className="text-3xl font-bold mb-2">Office location</h2>
          <div className="text-lg text-gray-600">
            <p>
              <strong>CareerCompass Technologies Private Limited</strong>
              <br/>
              620/5, 2nd floor, Udyog Vihar Phase V, Sector 19, Gurugram, Haryana 122008
            </p>
            <p>
              <strong>Email:</strong> <a href="mailto:info@careercompass.com">info@careercompass.com</a>
              <br/>
              <strong>Phone:</strong> 08069458324
            </p>
          </div>
          <div className="mt-6">
            <Map address="620/5, 2nd floor, Udyog Vihar Phase V, Sector 19, Gurugram, Haryana 122008" />
          </div>
        </section>

        <section className="py-8">
          <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
          <Accordion type="single" collapsible>
            {faq_data.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index + 1}`}>
          <AccordionTrigger>{faq.question}</AccordionTrigger>
          <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>

        <section className="max-w-7xl p-8 bg-sky-100 rounded-lg">
          <div className="container mx-auto text-center">
            <h2 className="text-2xl font-semibold mb-4">Newsletter</h2>
            <p className="text-gray-700 mb-4">Subscribe and get notification from us</p>
            <div className="flex justify-center">
              <Input
                type="email"
                placeholder="Enter Email Address*"
                className="w-full md:w-auto rounded-md px-4 py-2 mr-2 focus:outline-none focus:ring-2 focus:ring-blue-500"/>
              <Button className="bg-primary text-white font-bold py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500">
                Subscribe
              </Button>
            </div>
          </div>
        </section>

        {/* <div className="mt-6 text-center">
          <h6 className="font-semibold text-md mb-4">Follow Us:</h6>
          <div className="flex justify-center space-x-4">
            <a href="#" className="hover:opacity-70">
              <Facebook className="h-6 w-6"/>
            </a>
            <a href="#" className="hover:opacity-70">
              <Twitter className="h-6 w-6"/>
            </a>
            <a href="#" className="hover:opacity-70">
              <Youtube className="h-6 w-6"/>
            </a>
            <a href="#" className="hover:opacity-70">
              <Instagram className="h-6 w-6"/>
            </a>
            <a href="#" className="hover:opacity-70">
              <Linkedin className="h-6 w-6"/>
            </a>
          </div>
        </div> */}
      </div>
    </div>
  );
}
