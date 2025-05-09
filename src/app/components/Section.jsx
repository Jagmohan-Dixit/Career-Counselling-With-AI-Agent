'use client';
import React from 'react';
import Image from 'next/image';


export const Section = ({ id, title, lastWord, description, imageSrc, imageAlt, reverse }) => {
  return (
    <section className="p-2 mb-4">
      <div className={`flex flex-col md:flex-row ${reverse ? 'md:flex-row-reverse' : ''} gap-4 items-center`}>
        <div className='flex-1 px-2'>
          <h1 className="text-3xl sm:text-3xl md:text-3xl lg:text-4xl'} font-semibold mb-4">
            {title} <span className="text-green-600">{lastWord}</span>
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-black">{description}</p>
        </div>
        <div className='flex-2 flex justify-center sm:px-4 md:px-2 lg:px-0 sm:w-90 md:w-1/2 lg:w-100'>
          <Image
            src={imageSrc}
            alt={imageAlt}
            width={425}
            height={425}
            className={`${reverse ? 'rounded-full' : 'rounded-full'}`}
          />
        </div>
      </div>
    </section>

  );
};
