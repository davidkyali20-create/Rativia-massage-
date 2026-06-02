import { useState } from 'react';
import { CustomerDetails } from '../types';
import { Sparkles, Calendar, MessageSquare, Menu, X, User } from 'lucide-react';
import LotusLogo from './LotusLogo';

interface NavbarProps {
  customer: CustomerDetails | null;
  activeSection: string;
  setActiveSection: (section: string) => void;
  onClearCustomer: () => void;
}

export default function Navbar({ customer, activeSection, setActiveSection, onClearCustomer }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { label: 'Exquisite Care', id: 'intro' },
    { label: 'Treatments', id: 'treatments' },
    { label: 'Booking', id: 'booking' },
  ];

  const handleNavClick = (id: string) => {
    setActiveSection(id);
    setIsOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-black/50 backdrop-blur-md border-b border-[#8e6d2f]/30 px-6 md:px-12 h-20 flex justify-between items-center transition-all duration-300">
      {/* Brand Logo with Custom Lotus Crest */}
      <div 
        onClick={() => handleNavClick('intro')} 
        className="flex items-center gap-2 cursor-pointer group select-none"
      >
        <LotusLogo size={36} className="text-gold-main group-hover:rotate-12 transition-transform duration-300" />
        <span className="font-serif text-2xl tracking-widest text-gold-main font-medium uppercase">
          Ritavia
        </span>
      </div>

      {/* Desktop Items */}
      <div className="hidden md:flex items-center space-x-8">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => handleNavClick(item.id)}
            className={`text-[11px] uppercase tracking-[0.2em] transition-colors duration-200 cursor-pointer hover:text-gold-main ${
              activeSection === item.id ? 'text-gold-main font-semibold' : 'text-white/60'
            }`}
          >
            {item.label}
          </button>
        ))}

        {customer ? (
          <div className="flex items-center space-x-3 bg-white/5 border border-[#8e6d2f]/30 px-4 py-1.5 rounded-full">
            <User className="h-3.5 w-3.5 text-gold-main" />
            <span className="text-[10px] tracking-wider text-white/70 font-medium">
              <strong className="text-gold-light">{customer.fullName.split(' ')[0]}</strong>
            </span>
            <button
              onClick={onClearCustomer}
              className="text-[9px] uppercase tracking-wider text-red-400 hover:text-red-300 ml-2 transition-colors cursor-pointer font-semibold"
              title="Change Account Profile"
            >
              Sign Out
            </button>
          </div>
        ) : (
          <button
            onClick={() => handleNavClick('booking')}
            className="px-6 py-2 rounded-full border border-gold-main text-[#c5a059] text-xs uppercase tracking-wider hover:bg-gold-main hover:text-black transition-all duration-300 cursor-pointer"
          >
            Login / Book
          </button>
        )}
      </div>

      {/* Hamburger Menu Mobile */}
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className="md:hidden text-gold-main hover:text-gold-light focus:outline-none cursor-pointer"
        aria-label="Toggle navigation menu"
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="absolute top-[100%] left-0 w-full bg-black/95 border-b border-[#8e6d2f]/30 p-6 flex flex-col space-y-5 md:hidden transition-all duration-300 animate-fadeIn">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`text-left text-xs tracking-widest uppercase py-2 border-b border-white/5 ${
                activeSection === item.id ? 'text-gold-main font-semibold' : 'text-white/60'
              }`}
            >
              {item.label}
            </button>
          ))}

          {customer ? (
            <div className="flex flex-col space-y-3 pt-3">
              <div className="flex items-center space-x-3 bg-white/5 border border-[#8e6d2f]/20 px-4 py-2.5 rounded-lg">
                <User className="h-4 w-4 text-gold-main" />
                <span className="text-xs text-neutral-300">
                  Signed in as <strong className="text-gold-light">{customer.fullName}</strong>
                </span>
              </div>
              <button
                onClick={() => {
                  onClearCustomer();
                  setIsOpen(false);
                }}
                className="text-left text-xs uppercase tracking-widest text-[#c5a059] py-1"
              >
                Sign Out Customer File
              </button>
            </div>
          ) : (
            <button
              onClick={() => handleNavClick('booking')}
              className="w-full text-center border border-gold-main hover:bg-gold-main hover:text-black text-gold-main font-semibold text-xs py-3 rounded-full uppercase tracking-widest transition-all duration-300"
            >
              Access System / Book Now
            </button>
          )}
        </div>
      )}
    </nav>
  );
}
