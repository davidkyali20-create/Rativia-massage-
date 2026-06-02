import { motion } from 'motion/react';
import { ArrowDown, Home, Car, Phone } from 'lucide-react';
import LotusLogo from './LotusLogo';

interface HeroProps {
  onBeginBooking: () => void;
}

export default function Hero({ onBeginBooking }: HeroProps) {
  return (
    <section 
      id="intro"
      className="relative min-h-[95vh] flex flex-col items-center justify-center text-center px-6 py-20 bg-cover bg-center overflow-hidden"
      style={{
        backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.76), rgba(8, 8, 8, 0.98)), url("https://images.unsplash.com/photo-1600334129128-685c5582fd35?ixlib=rb-1.2.1&auto=format&fit=crop&w=1600&q=80")',
      }}
    >
      {/* Decorative Gold Ambient Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-gold-main/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Hero content utilizing frame-motion */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.0, ease: 'easeOut' }}
        className="relative z-10 max-w-4xl mx-auto flex flex-col items-center"
      >
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="mb-4"
        >
          <LotusLogo size={62} className="text-gold-main drop-shadow-[0_0_15px_rgba(197,160,89,0.3)]" />
        </motion.div>

        <motion.h1 
          initial={{ letterSpacing: '0.1em', opacity: 0 }}
          animate={{ letterSpacing: '0.25em', opacity: 1 }}
          transition={{ delay: 0.4, duration: 1.2 }}
          className="font-serif text-5xl md:text-7xl font-semibold uppercase text-gold-main select-none"
        >
          Ritavia
        </motion.h1>

        {/* Brand visual quote frame precisely matched from flyer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.85 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="flex items-center justify-center w-full my-4 gap-4"
        >
          <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-gold-main/40" />
          <span className="text-[10px] sm:text-[11px] tracking-[0.3em] uppercase text-gold-light select-none font-medium">
            Massage that heals. Wellness that stays.
          </span>
          <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-gold-main/40" />
        </motion.div>

        {/* Centered Small Leaf character decoration beneath the header */}
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 0.8, scale: 1 }}
          transition={{ delay: 0.85, duration: 0.6 }}
          className="mb-8 select-none"
        >
          <LotusLogo size={18} className="text-gold-main/80 rotate-180" />
        </motion.div>

        {/* Big Headline */}
        <motion.h2 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.0, duration: 1.0 }}
          className="font-serif text-6xl md:text-[92px] leading-[0.85] mb-8 font-bold text-white tracking-wide uppercase select-none text-center"
        >
          RELAX.<br />
          RENEW.<br />
          <span className="text-gold-main italic font-normal font-serif lowercase drop-shadow-[0_0_15px_rgba(197,160,89,0.15)]">rebalance.</span>
        </motion.h2>

        {/* Support Quote block precisely aligned with poster */}
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="text-base md:text-lg text-neutral-300 tracking-wider font-light"
        >
          You deserve to feel <span className="text-[#c5a059] font-extrabold uppercase tracking-[0.2em] block sm:inline ml-1">BETTER.</span>
        </motion.p>

        {/* Interactive Conversion Badges from Flyer */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.8 }}
          className="mt-12 w-full max-w-2xl grid grid-cols-1 md:grid-cols-2 gap-4 text-left"
        >
          {/* Door to door service pill */}
          <div className="flex items-center gap-4 bg-gradient-to-r from-neutral-900 to-[#120d04] p-4 rounded-xl border border-[#8e6d2f]/30 hover:border-[#c5a059]/60 transition-all duration-300 shadow-md">
            <div className="w-12 h-12 rounded-full border border-gold-main/40 flex items-center justify-center bg-black/55 text-[#c5a059] shrink-0">
              <Home className="h-5 w-5" />
            </div>
            <div>
              <div className="bg-[#c5a059] text-black text-[9px] font-bold tracking-widest px-2 py-0.5 rounded-sm inline-block uppercase mb-1">
                Door to Door
              </div>
              <p className="font-serif text-[12px] tracking-wider uppercase text-white font-semibold">
                Services directly to you
              </p>
              <p className="text-[10px] text-neutral-400 font-light mt-0.5 font-sans leading-tight">
                Delivering complete physical restoration to your residence
              </p>
            </div>
          </div>

          {/* Catering for transport pill */}
          <div className="flex items-center gap-4 bg-gradient-to-r from-neutral-900 to-[#120d04] p-4 rounded-xl border border-[#8e6d2f]/30 hover:border-[#c5a059]/60 transition-all duration-300 shadow-md">
            <div className="w-12 h-12 rounded-full border border-gold-main/40 flex items-center justify-center bg-black/55 text-[#c5a059] shrink-0">
              <Car className="h-5 w-5" />
            </div>
            <div>
              <div className="bg-transparent text-[#c5a059] border border-[#c5a059]/30 text-[9px] font-bold tracking-widest px-2 py-0.5 rounded-sm inline-block uppercase mb-1">
                CATERING FOR
              </div>
              <p className="font-serif text-[12px] tracking-wider uppercase text-white font-semibold">
                Transport to and fro
              </p>
              <p className="text-[10px] text-neutral-400 font-light mt-0.5 font-sans leading-tight">
                All transport logistics are fully covered by our team
              </p>
            </div>
          </div>

          {/* Call-to-Book hotline */}
          <div className="md:col-span-2 flex flex-col sm:flex-row items-center justify-between gap-4 bg-gradient-to-r from-black via-[#110d06]/60 to-black p-4 rounded-xl border border-[#8e6d2f]/40 text-center sm:text-left shadow-[0_8px_25px_rgba(0,0,0,0.5)]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gold-main/10 flex items-center justify-center text-gold-main shrink-0">
                <Phone className="h-4 w-4 animate-bounce" />
              </div>
              <div>
                <span className="text-[9px] uppercase tracking-widest text-[#c5a059] block font-semibold leading-tight">
                  Book your appointment today
                </span>
                <span className="text-xs text-neutral-400 font-light font-sans mt-0.5 block leading-tight">
                  Instant scheduling and tailored support
                </span>
              </div>
            </div>
            <a 
              href="tel:0742678523" 
              className="text-2xl md:text-3xl font-serif font-extrabold text-[#c5a059] hover:text-gold-light tracking-widest hover:underline transition-colors leading-none"
            >
              0742678523
            </a>
          </div>
        </motion.div>

        {/* Call to action button */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6, duration: 0.8 }}
          className="mt-10"
        >
          <button
            onClick={onBeginBooking}
            className="group flex items-center space-x-3 bg-gradient-to-r from-[#8e6d2f] to-[#c5a059] text-black hover:brightness-110 font-bold px-8 py-4 rounded-full text-xs uppercase tracking-[0.2em] shadow-[0_8px_25px_rgba(142,109,47,0.35)] hover:shadow-[0_8px_30px_rgba(197,160,89,0.5)] transition-all duration-300 scale-100 active:scale-95 cursor-pointer"
          >
            <span>Request In-Home Consultation Now</span>
            <ArrowDown className="h-4 w-4 text-black group-hover:translate-y-1 transition-transform duration-300" />
          </button>
        </motion.div>
      </motion.div>

      {/* Visual Bottom Border Anchor */}
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-bg-black to-transparent pointer-events-none" />
    </section>
  );
}
