'use client';

import { useState } from 'react';
import LogoForm from "@/components/LogoForm";
import Image from 'next/image';

export default function Home() {

  const [imageUrl, setImageUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  return (
    <main className="min-h-screen w-full bg-[#1e1e1e] flex flex-col items-center gap-5 md:gap-10 xl:gap-20">

      <div className="flex items-center justify-center mt-10 xl:mt-20 gap-5">
        <Image 
          src="/bot_yellow.png"
          alt="bot logo"
          width={100}
          height={100} 
          className="h-15 w-auto -mt-3"
        />
        <h1 className="text-3xl font-bold text-white">LogoBuddy</h1>
      </div>

      <div className="flex w-sm md:w-xl lg:w-4xl xl:w-5xl flex-col lg:flex-row items-center justify-center gap-8 xl:gap-32 bg-[#222222] rounded-xl p-8 mb-5">
        {/* left side (form) */}
        <div>
          <LogoForm setImageUrl={setImageUrl} setIsLoading={setIsLoading} isLoading={isLoading} imageUrl={imageUrl}/>
        </div>

        {/* right side (output) */}
        <div className="flex flex-col items-center justify-center w-xs md:w-md bg-[#181818] rounded-xl shadow-lg p-6 space-y-2">
          {isLoading ? (
            <div className="flex flex-col items-center gap-4">
              <div className="w-8 h-8 border-4 border-t-transparent border-white rounded-full animate-spin" />
              <p className="text-white text-sm font-semibold">Generating Logo...</p>
            </div>
          ) : imageUrl ? (
            <>
              <Image 
                src={imageUrl} 
                alt="Generated logo"
                width={100}
                height={100}
                className="w-full h-auto rounded-lg shadow-md" />
              <a
                href={imageUrl}
                download="logo.png"
                className="mt-4 px-4 py-2 rounded-lg w-full h-8 bg-blue-500 text-white hover:bg-[#306bd0] transition text-center font-semibold text-sm"
              >
                Download Logo
              </a>
            </>
          ) : (
            <p className="text-muted-foreground text-sm">Your logo will appear here</p>
          )}
        </div>
      </div>

    </main>
  );
}
