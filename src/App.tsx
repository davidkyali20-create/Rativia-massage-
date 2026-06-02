import { useState, useEffect } from 'react';
import { CustomerDetails, Booking } from './types';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ServicesList from './components/ServicesList';
import BookingForm from './components/BookingForm';
import BookingDashboard from './components/BookingDashboard';
import ConciergeChat from './components/ConciergeChat';
import Footer from './components/Footer';
import { Home, Car, Shield, Leaf, Heart } from 'lucide-react';

const CUSTOMER_STORAGE_KEY = 'ritavia_customer_profile';
const BOOKINGS_STORAGE_KEY = 'ritavia_bookings_records';

export default function App() {
  const [customer, setCustomer] = useState<CustomerDetails | null>(null);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [selectedServiceId, setSelectedServiceId] = useState<string>('heals-wellness');
  const [activeSection, setActiveSection] = useState<string>('intro');

  // Load profile / bookings from localStorage on mount
  useEffect(() => {
    const cachedCustomer = localStorage.getItem(CUSTOMER_STORAGE_KEY);
    if (cachedCustomer) {
      try {
        setCustomer(JSON.parse(cachedCustomer));
      } catch (e) {
        console.error('Failed to parse customer cache', e);
      }
    }

    const cachedBookings = localStorage.getItem(BOOKINGS_STORAGE_KEY);
    if (cachedBookings) {
      try {
        setBookings(JSON.parse(cachedBookings));
      } catch (e) {
        console.error('Failed to parse bookings cache', e);
      }
    }
  }, []);

  // Update navbar section based on scroll heights
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['intro', 'treatments', 'booking', 'bookings-dashboard', 'support'];
      const scrollPosition = window.scrollY + 180;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSaveCustomer = (details: CustomerDetails) => {
    setCustomer(details);
    localStorage.setItem(CUSTOMER_STORAGE_KEY, JSON.stringify(details));
  };

  const handleClearCustomer = () => {
    setCustomer(null);
    localStorage.removeItem(CUSTOMER_STORAGE_KEY);
  };

  const handleAddBooking = (newBooking: Booking) => {
    const updatedBookings = [newBooking, ...bookings];
    setBookings(updatedBookings);
    localStorage.setItem(BOOKINGS_STORAGE_KEY, JSON.stringify(updatedBookings));

    // Scroll to dashboard tracking after booking is placed
    setTimeout(() => {
      const el = document.getElementById('bookings-dashboard');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 400);
  };

  const handleCancelBooking = (bookingId: string) => {
    const updated = bookings.map((b) => 
      b.id === bookingId ? { ...b, status: 'cancelled' as const } : b
    );
    setBookings(updated);
    localStorage.setItem(BOOKINGS_STORAGE_KEY, JSON.stringify(updated));
  };

  const handleUpdateBookingStatus = (bookingId: string, nextStatus: Booking['status']) => {
    const updated = bookings.map((b) => 
      b.id === bookingId ? { ...b, status: nextStatus } : b
    );
    setBookings(updated);
    localStorage.setItem(BOOKINGS_STORAGE_KEY, JSON.stringify(updated));
  };

  const handleSelectService = (serviceId: string) => {
    setSelectedServiceId(serviceId);
    
    // Smooth scroll down to the scheduler section upon treatment select
    const targetElement = document.getElementById('booking');
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleBeginBookingScroll = () => {
    const el = document.getElementById('booking');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-bg-black text-white selection:bg-gold-main/20 selection:text-gold-light">
      
      {/* Exquisite Top Announcement Line */}
      <div className="bg-gradient-to-r from-neutral-950 via-[#1e170c] to-neutral-950 text-center py-2 px-4 border-b border-bronze/10 text-[10px] uppercase font-semibold tracking-[0.25em] text-gold-light select-none">
        🌿 Bespoke Whole-Body Restoration Delivered directly to your sanctuary &bull; Transport Included
      </div>

      {/* Luxury Navigation Header */}
      <Navbar 
        customer={customer}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        onClearCustomer={handleClearCustomer}
      />

      {/* Royal Headline Hero Cover */}
      <Hero onBeginBooking={handleBeginBookingScroll} />

      {/* Treatments Display list */}
      <ServicesList 
        onSelectService={handleSelectService}
        selectedServiceId={selectedServiceId}
      />

      {/* Special Price Badge - Fully matches original requested photo badge */}
      <div className="my-16 flex flex-col justify-center items-center">
        <div className="border-[3px] border-gold-main w-[190px] h-[190px] rounded-full flex flex-col justify-center items-center backdrop-blur-md bg-gradient-to-b from-[#1c1c1c] to-[#040404] shadow-[0_0_35px_rgba(197,160,89,0.25)] hover:scale-105 transition-all duration-300 group select-none">
          <span className="text-[10px] uppercase tracking-[0.2em] text-neutral-400 font-medium font-sans">Special Price</span>
          <span className="font-serif text-5xl text-gold-main font-bold my-1 tracking-tight group-hover:text-gold-light transition-colors">1000</span>
          <span className="text-[9px] uppercase tracking-[0.15em] text-neutral-400 font-sans">Per Session KES</span>
        </div>
        
        {/* Supporting subline */}
        <p className="text-xs text-neutral-500 tracking-wider uppercase mt-4 font-light text-center flex items-center justify-center gap-2 select-none">
          <span className="h-1.5 w-1.5 bg-gold-main rounded-full animate-pulse" />
          Full-bodied healing &middot; Transport fully catered
        </p>
      </div>

      {/* Interactive Schedular & Customer identity panel */}
      <div className="px-6 md:px-12">
        <BookingForm 
          customer={customer}
          onSaveCustomer={handleSaveCustomer}
          selectedServiceId={selectedServiceId}
          onSelectServiceId={setSelectedServiceId}
          onAddBooking={handleAddBooking}
        />
      </div>

      {/* Scheduler Live status tracking dashboard */}
      <BookingDashboard 
        bookings={bookings}
        onCancelBooking={handleCancelBooking}
        onUpdateStatus={handleUpdateBookingStatus}
      />

      {/* Info Bullet Grid Section - Matches Door to Door layout */}
      <div className="max-w-4xl mx-auto px-6 mb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex items-center space-x-5 p-6 bg-gradient-to-br from-card-grey to-neutral-950 border border-bronze/10 rounded-xl group hover:border-bronze/30 transition-all">
            <div className="h-12 w-12 rounded-full border border-bronze/45 bg-black flex items-center justify-center shrink-0 group-hover:border-gold-main/70 transition-colors">
              <Home className="h-5.5 w-5.5 text-gold-main" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-gold-main uppercase tracking-wider">Door to Door</h4>
              <p className="text-xs text-neutral-400 mt-1 leading-relaxed font-light">
                Our licensed therapeutic specialists travel with pre-sanitized mobile spa gear, setting up absolute tranquillity in your home.
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-5 p-6 bg-gradient-to-br from-card-grey to-neutral-950 border border-bronze/10 rounded-xl group hover:border-bronze/30 transition-all">
            <div className="h-12 w-12 rounded-full border border-bronze/45 bg-black flex items-center justify-center shrink-0 group-hover:border-gold-main/70 transition-colors">
              <Car className="h-5.5 w-5.5 text-gold-main" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-gold-main uppercase tracking-wider">Transport Provided</h4>
              <p className="text-xs text-neutral-400 mt-1 leading-relaxed font-light">
                Transit limits are factored natively—we deliver wellness to your suite, cottage, or residence with zero extra freight fees.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Concierge Desk chat interface and FAQ shortcuts */}
      <div id="support" className="border-t border-white/[0.03] pt-12 pb-8 bg-neutral-950/20">
        <div className="text-center mb-10 select-none">
          <span className="text-gold-main text-[11px] uppercase tracking-[0.3em] font-medium">Bespoke Guidance</span>
          <h3 className="font-serif text-3xl font-bold mt-1.5 text-white">Concierge Support Desk</h3>
          <div className="w-16 h-0.5 bg-gold-main/30 mx-auto mt-3" />
        </div>
        
        <ConciergeChat />
      </div>

      {/* Royal footer with trademark brand slogans */}
      <Footer />

    </div>
  );
}
