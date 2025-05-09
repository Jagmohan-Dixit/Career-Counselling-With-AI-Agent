'use client';

import {useEffect, useState} from "react";
import {Facebook, Instagram, Linkedin, Twitter, Youtube} from "lucide-react";

const Footer = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <footer className="bg-primary text-white py-6">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div>
            <h6 className="font-semibold text-md mb-4">About CareerCompass</h6>
            <p className="text-sm">
              A student-driven mentorship platform. Our vision is to make actionable guidance and mentorship
              accessible to every student in the world.
            </p>
          </div>

          <div>
            <h6 className="font-semibold text-md mb-4">Top Exams</h6>
            <ul className="text-sm">
              <li><a href="#" className="hover:underline">JEE Main 2024</a></li>
              <li><a href="#" className="hover:underline">JEE Main 2025</a></li>
              <li><a href="#" className="hover:underline">JEE Advanced 2024</a></li>
              <li><a href="#" className="hover:underline">JEE Advanced 2025</a></li>
              <li><a href="#" className="hover:underline">NEET UG 2024-2025</a></li>
              <li><a href="#" className="hover:underline">NEET PG 2024-2025</a></li>
              <li><a href="#" className="hover:underline">SAT | GRE | GMAT | TOEFL | IELTS</a></li>
              <li><a href="#" className="hover:underline">JEE | NEET Study Abroad</a></li>
              <li><a href="#" className="hover:underline">Board Exam</a></li>
            </ul>
          </div>

          <div>
            <h6 className="font-semibold text-md mb-4">Important Links</h6>
            <ul className="text-sm">
              <li><a href="#" className="hover:underline">Mentorship For JEE Main</a></li>
              <li><a href="#" className="hover:underline">Mentorship For JEE Advance</a></li>
              <li><a href="#" className="hover:underline">Mentorship For NEET UG</a></li>
              <li><a href="#" className="hover:underline">Mentorship For NEET PG</a></li>
              <li><a href="#" className="hover:underline">Mentorship for SAT | GRE | GMAT</a></li>
              <li><a href="#" className="hover:underline">Mentorship For TOEFL | IELTS</a></li>
              <li><a href="#" className="hover:underline">Mentorship For JEE | NEET Abroad</a></li>
            </ul>
          </div>

          <div>
            <h6 className="font-semibold text-md mb-4">Other Links</h6>
            <ul className="text-sm">
              <li><a href="#" className="hover:underline">Mentorship Plan</a></li>
              {/* <li><a href="#" className="hover:underline">Our Mentor</a></li> */}
              <li><a href="#" className="hover:underline">JEE Mentor</a></li>
              <li><a href="#" className="hover:underline">NEET Mentor</a></li>
              <li><a href="#" className="hover:underline">Become Mentor</a></li>
              {/* <li><a href="#" className="hover:underline">Take a Trial Session</a></li> */}
              {/* <li><a href="#" className="hover:underline">Toppers &amp; Student Community</a></li> */}
              <li><a href="/about" className="hover:underline">About Us</a></li>
              <li><a href="/blogs" className="hover:underline">Blogs</a></li>
              <li><a href="/our-team" className="hover:underline">Our Team</a></li>
              <li><a href="/faq" className="hover:underline">FAQs</a></li>
              {/* <li><a href="#" className="hover:underline">Future Nurture</a></li> */}
              <li><a href="/contact" className="hover:underline">Contact Us</a></li>
              <li><a href="/t&c" className="hover:underline">Terms and Conditions</a></li>
              <li><a href="/privacy-policy" className="hover:underline">Privacy Policy</a></li>
            </ul>
          </div>
        </div>
{/* 
        <div className="mt-6">
          <h6 className="font-semibold text-md mb-4">Follow Us:</h6>
          <div className="flex space-x-4">
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

        <hr className="my-4 border-border"/>
        <div className="text-center text-sm">
          &copy; {new Date().getFullYear()} CareerCompass by <a href="#" className="underline">EXPRTO TECHNOLOGIES PRIVATE LIMITED</a>. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
