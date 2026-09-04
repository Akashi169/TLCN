import React from 'react';

export default function SplitScreenLayout({ leftContent, rightContent }) {
  return (
    <main className="h-screen w-screen flex flex-col lg:flex-row relative">
      {/* Left Login Section */}
      <section className="w-full lg:w-[46%] xl:w-[44%] h-full flex flex-col justify-between p-6 sm:p-10 lg:p-12 xl:p-14 overflow-y-auto bg-white/95 relative z-10 shadow-xl border-r border-slate-200/70">
        {leftContent}
      </section>

      {/* Right Visual Section */}
      <section className="hidden lg:flex lg:w-[54%] xl:w-[56%] h-full relative bg-slate-100 dot-pattern items-center justify-center p-8 xl:p-12 overflow-hidden select-none">
        {rightContent}
      </section>
    </main>
  );
}
