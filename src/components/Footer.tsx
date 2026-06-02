import { Heart, Phone, ShieldCheck, HeartHandshake } from 'lucide-react';
import LotusLogo from './LotusLogo';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-black select-none font-sans">
      
      {/* 1. Curved Linen Ribbon from Poster */}
      <div className="bg-[#f0ede6] text-neutral-900 pt-16 pb-12 px-6 md:px-12 rounded-t-[3rem] shadow-[0_-12px_35px_rgba(0,0,0,0.4)] relative overflow-hidden border-t-2 border-[#8e6d2f]/40">
        
        {/* Subtle physical texture overlay */}
        <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

        {/* 3 Circular Badges in organic ribbon */}
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 items-center text-center justify-center relative z-10">
          
          {/* Badge 1: Professional Care */}
          <div className="flex flex-col items-center group">
            <div className="w-14 h-14 rounded-full bg-[#8e6d2f]/10 border-2 border-[#8e6d2f] flex items-center justify-center text-[#8e6d2f] mb-3.5 group-hover:scale-105 transition-transform duration-300 shadow-sm">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <span className="text-[11px] uppercase tracking-[0.25em] text-neutral-800 font-bold font-sans">
              Professional Care
            </span>
          </div>

          {/* Badge 2: Your Comfort, Our Priority */}
          <div className="flex flex-col items-center group">
            <div className="w-14 h-14 rounded-full bg-[#8e6d2f]/10 border-2 border-[#8e6d2f] flex items-center justify-center text-[#8e6d2f] mb-3.5 group-hover:scale-105 transition-transform duration-300 shadow-sm">
              <LotusLogo size={28} className="text-[#8e6d2f]" />
            </div>
            <span className="text-[11px] uppercase tracking-[0.25em] text-neutral-800 font-bold font-sans">
              Your Comfort,<br />Our Priority
            </span>
          </div>

          {/* Badge 3: Wellness at Your Door */}
          <div className="flex flex-col items-center group">
            <div className="w-14 h-14 rounded-full bg-[#8e6d2f]/10 border-2 border-[#8e6d2f] flex items-center justify-center text-[#8e6d2f] mb-3.5 group-hover:scale-105 transition-transform duration-300 shadow-sm">
              <Heart className="h-5.5 w-5.5 fill-[#8e6d2f]/30" />
            </div>
            <span className="text-[11px] uppercase tracking-[0.25em] text-neutral-800 font-bold font-sans">
              Wellness at Your Door
            </span>
          </div>

        </div>

        {/* Brand Signature and outline Heart below Ribbon pillars */}
        <div className="mt-14 text-center border-t border-neutral-300/60 pt-8 relative z-10">
          <p className="font-serif italic text-2xl text-[#8e6d2f] font-medium tracking-wide flex items-center justify-center gap-2 select-none">
            <span>Ritavia</span>
            <span className="text-neutral-400 font-sans not-italic text-sm mx-1 font-light">&mdash;</span>
            <span className="font-sans not-italic text-lg text-neutral-700 tracking-wide font-light">Because you matter &hearts;</span>
          </p>
        </div>

      </div>

      {/* 2. Sleek Dark base for formal credits */}
      <div className="bg-black py-12 px-6 text-center text-[#555] relative overflow-hidden">
        <div className="absolute bottom-0 right-[15%] w-[300px] h-[300px] bg-gold-main/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-xl mx-auto relative z-10">
          {/* Dynamic telephone block */}
          <div className="flex items-center justify-center gap-3 bg-white/5 border border-[#8e6d2f]/10 px-6 py-3.5 rounded-full text-xs hover:border-[#c5a059]/40 hover:bg-white/10 transition-all duration-300 inline-flex">
            <Phone className="h-3.5 w-3.5 text-gold-main shrink-0 animate-pulse" />
            <span className="text-neutral-400 tracking-wider font-sans">
              Book Direct: <a href="tel:0742678523" className="text-[#c5a059] font-bold hover:text-gold-light tracking-widest pl-1">0742678523</a>
            </span>
          </div>

          {/* Licensing and guidelines */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[10px] tracking-widest uppercase text-neutral-600 font-medium">
            <span className="hover:text-gold-main transition-colors cursor-pointer">Interactive Sanitization Protocols</span>
            <span>&middot;</span>
            <span className="hover:text-gold-main transition-colors cursor-pointer">Bespoke Therapists</span>
            <span>&middot;</span>
            <span className="hover:text-gold-main transition-colors cursor-pointer">Nairobi Hub Operator</span>
          </div>

          <p className="mt-8 text-[10px] text-neutral-700 font-light font-sans max-w-sm mx-auto leading-relaxed">
            &copy; {currentYear} Ritavia Premium Solutions. All rights reserved. Registered KES door-to-door therapeutic transportation practitioner.
          </p>
        </div>
      </div>

    </footer>
  );
}
