import { motion } from 'motion/react';
import { Service } from '../types';
import { SERVICES } from '../data';
import { Sparkles, Activity, Heart, Sun, Clock, Check } from 'lucide-react';

interface ServicesListProps {
  onSelectService: (serviceId: string) => void;
  selectedServiceId?: string;
}

export default function ServicesList({ onSelectService, selectedServiceId }: ServicesListProps) {
  // Map icons dynamically
  const getIcon = (iconName: string, className: string) => {
    switch (iconName) {
      case 'Sparkles': return <Sparkles className={className} />;
      case 'Activity': return <Activity className={className} />;
      case 'Heart': return <Heart className={className} />;
      case 'Sun': return <Sun className={className} />;
      default: return <Sparkles className={className} />;
    }
  };

  return (
    <section id="treatments" className="py-24 px-6 md:px-12 max-w-7xl mx-auto relative">
      {/* Background Decorative Elements */}
      <div className="absolute top-1/2 right-0 w-[400px] h-[400px] bg-[#8e6d2f]/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="text-center mb-16">
        <span className="text-gold-main text-xs uppercase tracking-[0.3em] font-semibold">Exquisite Collection</span>
        <h2 className="font-serif text-3xl md:text-5xl font-bold mt-2 text-white">Our Therapeutic Treatments</h2>
        <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-gold-main to-transparent mx-auto mt-4" />
        <p className="text-neutral-400 max-w-xl mx-auto text-sm mt-4 font-light">
          Each treatment is custom-tailored to your physiological state, delivered directly to your doorstep with meticulous professional equipment.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
        {SERVICES.map((service: Service, index: number) => {
          const isSelected = selectedServiceId === service.id;
          const isSignature = service.id === 'heals-wellness';

          return (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              onClick={() => onSelectService(service.id)}
              className={`relative bg-[#151515] border rounded-xl p-6 md:p-8 flex flex-col justify-between cursor-pointer group transition-all duration-300 transform select-none hover:shadow-[0_20px_45px_rgba(0,0,0,0.8)] ${
                isSelected 
                  ? 'border-gold-main shadow-[0_0_25px_rgba(197,160,89,0.2)] ring-1 ring-gold-main/30' 
                  : isSignature 
                    ? 'border-[#8e6d2f] hover:border-gold-main' 
                    : 'border-white/10 hover:border-[#8e6d2f]/60'
              }`}
            >
              {isSignature && (
                <div className="absolute -top-3 right-6 bg-gradient-to-r from-[#8e6d2f] to-[#c5a059] text-black text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full">
                  Special Signature Offer
                </div>
              )}

              <div>
                <div className="flex justify-between items-start mb-6">
                  <div className="p-3.5 bg-neutral-900/60 border border-[#8e6d2f]/30 rounded-xl group-hover:border-gold-main/40 transition-colors duration-300">
                    {getIcon(service.icon, "h-6 w-6 text-gold-main")}
                  </div>
                  <div className="text-right">
                    <span className="text-3xl font-serif text-gold-light font-bold">
                      {service.price}
                    </span>
                    <span className="text-[10px] text-neutral-400 block tracking-wider uppercase mt-1">
                      KES / Session
                    </span>
                  </div>
                </div>

                <h3 className="font-serif text-xl md:text-2xl font-semibold text-white group-hover:text-gold-main transition-colors duration-200">
                  {service.name}
                </h3>

                <div className="flex items-center space-x-2 text-neutral-500 text-xs mt-2 uppercase tracking-widest font-medium">
                  <Clock className="h-3.5 w-3.5 text-[#8e6d2f]" />
                  <span>{service.duration} Minutes duration</span>
                </div>

                <p className="text-neutral-400 text-sm mt-4 font-light leading-relaxed">
                  {service.description}
                </p>

                {/* Benefits checklist */}
                <ul className="mt-6 space-y-2 border-t border-white/5 pt-5">
                  {service.benefits.map((benefit, bIndex) => (
                    <li key={bIndex} className="flex items-center space-x-2.5 text-xs text-neutral-300">
                      <Check className="h-3 w-3 text-gold-main flex-shrink-0" />
                      <span className="font-light">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8 pt-4">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectService(service.id);
                  }}
                  className={`w-full py-4 rounded-lg text-xs uppercase tracking-widest font-bold transition-all duration-300 cursor-pointer ${
                    isSelected 
                      ? 'bg-gradient-to-r from-[#8e6d2f] to-[#c5a059] text-black shadow-[0_4px_15px_rgba(197,160,89,0.35)]' 
                      : 'bg-neutral-900 border border-[#8e6d2f]/40 text-white hover:bg-gradient-to-r hover:from-[#8e6d2f] hover:to-[#c5a059] hover:text-black hover:border-transparent'
                  }`}
                >
                  {isSelected ? 'Treatment Selected' : 'Book This Treatment'}
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
