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

      <div className="flex items-center justify-center gap-10 bg-[#222222] rounded-xl p-10">
        {/* left side (form) */}
        <div>
          <LogoForm setImageUrl={setImageUrl} setIsLoading={setIsLoading} isLoading={isLoading} imageUrl={imageUrl}/>
        </div>

        {/* right side (output) */}
        <div className="flex flex-col items-center justify-center max-w-xl min-w-sm md:w-md p-6 bg-[#181818] rounded-xl shadow-lg p-6 space-y-2">
          {isLoading ? (
            <div className="flex flex-col items-center gap-4">
              <div className="w-8 h-8 border-4 border-t-transparent border-white rounded-full animate-spin" />
              <p className="text-white">Generating Logo...</p>
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
                className="mt-4 px-4 py-2 rounded-lg w-full bg-blue-500 text-white hover:bg-[#306bd0] transition text-center font-semibold text-sm"
              >
                Download Logo
              </a>
            </>
          ) : (
            <p className="text-muted-foreground">Your logo will appear here</p>
          )}
        </div>
      </div>

    </main>
  );
}
