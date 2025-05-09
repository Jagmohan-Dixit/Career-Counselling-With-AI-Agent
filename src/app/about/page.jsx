'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Section } from '../components/Section';


// Reusable Section Component
// const Section = ({ title, description, imageSrc, imageAlt, reverse }: SectionProps) => {
//   return (
//     <section className="mb-8">
//       <div className={`grid grid-cols-1 md:grid-cols-2 gap-8 items-center ${reverse ? 'md:flex-row-reverse' : ''}`}>
//         <div>
//           <h2 className="text-2xl font-semibold mb-4">{title}</h2>
//           <p className="text-lg text-muted-foreground">{description}</p>
//         </div>
//         <div>
//           <Image
//             src={imageSrc}
//             alt={imageAlt}
//             width={400}
//             height={300}
//             className="rounded-lg shadow-md"
//           />
//         </div>
//       </div>
//     </section>
//   );
// };

// Reusable Milestones Component
const Milestones = ({ milestones }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {milestones.map((milestone, index) => (
        <div key={index} className="mb-4">
          <h3 className="text-xl font-semibold">{milestone.year}</h3>
          <p className="text-muted-foreground">{milestone.description}</p>
        </div>
      ))}
    </div>
  );
};

// Reusable Achievements Component
const Achievements = ({ achievements }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      {achievements.map((achievement, index) => (
        <div key={index}>
          <h3 className="text-xl font-semibold">{achievement.title}</h3>
          <p className="text-lg text-muted-foreground">{achievement.value}</p>
        </div>
      ))}
    </div>
  );
};

const AboutPage = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div className="mx-auto p-10 max-w-full sm:max-w-3xl md:max-w-6xl lg:max-w-7xl rounded-lg overflow-hidden animate-fade-in">
      <div className="container relative mx-auto max-w-full sm:max-w-2xl md:max-w-4xl lg:max-w-7xl rounded-lg overflow-hidden"></div>
          <Section
            title="About Us"
            description="India's largest mentorship platform. Mentoring | Exam Prep. We understand that every aspirant faces a unique set of challenges in their NEET/JEE preparation journey. CareerCompass connects NEET/JEE aspirants to IIT/AIIMS mentors to guide them through every stage of preparation, including one-on-one mentorship, daily motivation, memory retention skills, study plans, and more."
            imageSrc="/images/student1.png"
            imageAlt="About Us Illustration"
          />

          {/* Who Are We Section */}
          <Section
            title="Who Are We?"
            description="CareerCompass is a mentorship-as-a-service platform, which connects the toppers of IIT JEE & NEET exams with the aspirants so that students can mentor, learn, take right decisions and excel well in their exams."
            imageSrc="/images/student2.png"
            imageAlt="Who Are We Illustration"
            reverse
          />

          {/* How We Help Section */}
          <Section
            title="How do we help NEET/JEE Aspirants?"
            description="We understand that every aspirant faces a unique set of challenges in their NEET/JEE preparation journey. CareerCompass connects NEET/JEE aspirants to IIT/AIIMS mentors to guide them through every stage of preparation, including one-on-one mentorship, daily motivation, memory retention skills, study plans, and more."
            imageSrc="/images/student1.png"
            imageAlt="How We Help Illustration"
          />

          {/* Behind the Scenes Section */}
          <Section
            title="Behind the Scenes"
            description="Starting up Exprto has been a result of our Founder’s aspirations to mentor students and work towards easier exam preparations. With over 7 years of mentoring experience, we have trained over 5500+ students through various virtual and one-on-one personal mentoring."
            imageSrc="/images/student2.png"
            imageAlt="Behind The Scenes Illustration"
            reverse
          />

          {/* Our Mission Section */}
          <Section
            title="Our Mission"
            description="The mission of CareerCompass is to transform mentorship and make it accessible to every student and aspirant across the world. We ensure that every student gets the correct motivation and the right mentors to clear their exams."
            imageSrc="/images/student1.png"
            imageAlt="Our Mission Illustration"
          />

          {/* Our Vision Section */}
          <Section
            title="Our Vision"
            description="The foundation of our success is based on the legacy and mentor guidance. At Exprto, we ensure that every member of the family is involved in the process. Our vision is to help every aspirant in their exam preparation journey and growth."
            imageSrc="/images/student2.png"
            imageAlt="Our Vision Illustration"
            reverse
          />

          {/* Achievements Section */}
          <section className="bg-sky-100 mt-20 p-6 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">CareerCompass's Achievements</h2>
            <Achievements
              achievements={[
                { title: 'Daily Sessions', value: '300' },
                { title: 'Mentors', value: '1100' },
                { title: 'Students Impacted', value: '35000' },
                { title: 'Total Sessions', value: '452300' },
              ]}
            />
          </section>
    </div>
  );
};

export default AboutPage;