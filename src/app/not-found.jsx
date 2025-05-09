'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect } from "react";
import { useRouter } from 'next/navigation';
import {Button} from '@/components/ui/button';


const Error = ()=>{
    const navigate = useRouter();

    useEffect(() => {
      setTimeout(() => {
        navigate.push('/');
      }, 6000)
    }, [])

    return (
    <div>
        <div className="min-h-screen display-block flex items-center justify-center p-6">
            <div>
                <Image src="/images/not-found.svg"
                  width={500}
                  height={500}
                  alt='not found'
                />
                <h2 className='my-4 flex justify-center'>Ohh! page not found</h2>
                <p className='mb-4 text-[var(--grey-500)] flex justify-center'>We can't seem to find the page you're looking for</p>
                <div className='flex justify-center'>
                  <Button className='bg-primary'>
                    <Link href='/' className='text-xl text-white font-bold'>Back Home</Link>
                  </Button>
                </div>
            </div>
        </div>
    </div>
    )
}

export default Error;