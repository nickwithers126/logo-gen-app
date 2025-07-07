'use client';

import { useState } from 'react';
import LogoForm from "@/components/LogoForm";
import Image from 'next/image';

export default function Home() {

  const [imageUrl, setImageUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  return (
    <main className="min-h-screen bg-[#1e1e1e] flex flex-col items-center gap-20">

      <div className="flex items-center justify-center mt-20 gap-5">
        <Image 
          src="/bot_yellow.png"
          alt="bot logo"
          width={100}
          height={100} 
          className="h-15 w-auto -mt-3"
        />
        <h1 className="text-3xl font-bold text-white">LogoBuddy</h1>
      </div>

      <div className="flex items-center justify-center gap-20">
        {/* left side (form) */}
        <div>
          <LogoForm setImageUrl={setImageUrl} setIsLoading={setIsLoading}/>
        </div>

        {/* right side (output) */}
        <div className="w-full md:w-1/2 flex flex-col items-center justify-center">
          {isLoading ? (
            <div className="flex flex-col items-center gap-4">
              <div className="w-8 h-8 border-4 border-t-transparent border-white rounded-full animate-spin" />
              <p className="text-white">Generating logo...</p>
            </div>
          ) : imageUrl ? (
            <>
              <img src={imageUrl} alt="Generated logo" className="w-auto h-64 rounded shadow-md" />
              <a
                href={imageUrl}
                download="logo.png"
                className="mt-4 bg-white text-black px-4 py-2 rounded hover:bg-gray-200 transition"
              >
                Download Logo
              </a>
            </>
          ) : (
            <p className="text-gray-400">Your logo will appear here</p>
          )}
        </div>
      </div>

    </main>
  );
}
