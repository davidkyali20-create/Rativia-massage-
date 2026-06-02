import React, { useState, useEffect } from 'react';
import { CustomerDetails, Service, Therapist, Booking } from '../types';
import { SERVICES, THERAPISTS } from '../data';
import { Calendar, Clock, User, Phone, Mail, MapPin, Sparkles, Star, ChevronRight, CheckCircle, PenTool } from 'lucide-react';

interface BookingFormProps {
  customer: CustomerDetails | null;
  onSaveCustomer: (details: CustomerDetails) => void;
  selectedServiceId: string;
  onSelectServiceId: (serviceId: string) => void;
  onAddBooking: (booking: Booking) => void;
}

export default function BookingForm({
  customer,
  onSaveCustomer,
  selectedServiceId,
  onSelectServiceId,
  onAddBooking
}: BookingFormProps) {
  // Step 1 Form state
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [isEditingCustomer, setIsEditingCustomer] = useState(false);

  // Step 2 Form state
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [selectedTherapistId, setSelectedTherapistId] = useState(THERAPISTS[0].id);
  const [notes, setNotes] = useState('');

  // Success screen state
  const [latestBooking, setLatestBooking] = useState<Booking | null>(null);

  // Populate form if customer exists
  useEffect(() => {
    if (customer) {
      setFullName(customer.fullName);
      setEmail(customer.email);
      setPhone(customer.phone);
      setAddress(customer.address || '');
      setIsEditingCustomer(false);
    } else {
      setIsEditingCustomer(true);
    }
  }, [customer]);

  const handleSaveCustomer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !phone) return;
    onSaveCustomer({
      fullName,
      email,
      phone,
      address
    });
    setIsEditingCustomer(false);
  };

  const handleBookSession = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customer) return;
    if (!date || !time) return;

    const chosenService = SERVICES.find(s => s.id === selectedServiceId) || SERVICES[0];

    const newBooking: Booking = {
      id: `RIT-${Math.floor(100000 + Math.random() * 900000)}`,
      serviceId: selectedServiceId,
      therapistId: selectedTherapistId,
      date,
      time,
      customerName: customer.fullName,
      customerEmail: customer.email,
      customerPhone: customer.phone,
      customerAddress: address || 'Current Location Specified on Dispatch',
      status: 'pending',
      notes,
      createdAt: new Date().toISOString(),
      totalPrice: chosenService.price
    };

    onAddBooking(newBooking);
    setLatestBooking(newBooking);

    // Reset session elements
    setDate('');
    setTime('');
    setNotes('');
  };

  const currentService = SERVICES.find(s => s.id === selectedServiceId) || SERVICES[0];
  const therapistDetails = THERAPISTS.find(t => t.id === selectedTherapistId) || THERAPISTS[0];

  // Restrict to present date forward
  const todayString = new Date().toISOString().split('T')[0];

  if (latestBooking) {
    return (
      <div className="max-w-2xl mx-auto bg-card-grey border border-gold-main/60 rounded-2xl p-8 text-center shadow-[0_15px_40px_rgba(197,160,89,0.1)] mb-12 animate-fadeIn select-none">
        <div className="w-16 h-16 bg-gold-main/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-gold-main/30">
          <CheckCircle className="h-10 w-10 text-gold-main" />
        </div>
        <h3 className="font-serif text-3xl font-bold text-white mb-2">Appointment Requested</h3>
        <p className="text-neutral-400 text-sm max-w-md mx-auto mb-8 font-light leading-relaxed">
          Your luxury door-to-door therapeutic request has been received. Our concierge will verify therapist travel and contact you shortly.
        </p>

        {/* Invoice Receipt details */}
        <div className="bg-black/50 border border-bronze/20 rounded-xl p-6 text-left mb-8 max-w-md mx-auto">
          <div className="flex justify-between border-b border-white/5 pb-3 mb-4 text-xs tracking-wider uppercase text-neutral-400">
            <span>Ritavia Order ID</span>
            <span className="text-gold-light font-semibold font-mono">{latestBooking.id}</span>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between items-center text-sm">
              <span className="text-neutral-400 font-light">Service Type</span>
              <strong className="text-white font-medium">{currentService.name}</strong>
            </div>

            <div className="flex justify-between items-center text-sm">
              <span className="text-neutral-400 font-light">Therapist</span>
              <span className="text-white font-medium">{therapistDetails.name}</span>
            </div>

            <div className="flex justify-between items-center text-sm">
              <span className="text-neutral-400 font-light">Scheduled Time</span>
              <span className="text-white font-semibold">{latestBooking.date} at {latestBooking.time}</span>
            </div>

            <div className="flex justify-between items-start text-sm">
              <span className="text-neutral-400 font-light">Dispatch Destination</span>
              <span className="text-white text-right max-w-[200px] text-xs font-light truncate">{latestBooking.customerAddress}</span>
            </div>

            <div className="border-t border-white/5 pt-3 mt-4 flex justify-between items-center">
              <span className="text-xs uppercase tracking-wider text-neutral-400">Amount Due (Cathered Transit)</span>
              <span className="text-xl font-serif text-gold-main font-bold">{currentService.price} KES</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 justify-center">
          <button
            onClick={() => setLatestBooking(null)}
            className="px-6 py-3 bg-gradient-to-r from-bronze to-gold-main text-black text-xs font-bold uppercase tracking-wider rounded-lg hover:brightness-110 active:scale-95 transition-all cursor-pointer"
          >
            Book Another Session
          </button>
          <a
            href="#bookings-dashboard"
            className="px-6 py-3 bg-neutral-900 text-white text-xs font-semibold border border-bronze/30 hover:border-gold-main uppercase tracking-wider rounded-lg transition-all text-center"
          >
            Track Status
          </a>
        </div>
      </div>
    );
  }

  return (
    <div id="booking" className="max-w-5xl mx-auto bg-[#151515] border border-[#8e6d2f]/30 rounded-2xl p-6 md:p-10 shadow-[0_25px_60px_rgba(0,0,0,0.8)] mb-20 font-sans">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Customer registration / logging state */}
        <div className="lg:col-span-5 border-b lg:border-b-0 lg:border-r border-white/5 pb-10 lg:pb-0 lg:pr-10">
          <h3 className="font-serif text-2xl font-semibold text-gold-main mb-6 flex items-center space-x-2">
            <span className="font-sans text-lg bg-bronze/15 text-gold-main h-7 w-7 rounded-full inline-flex items-center justify-center font-bold mr-1.5 border border-bronze/30">1</span>
            <span>Customer File</span>
          </h3>

          {customer && !isEditingCustomer ? (
            /* Logged in look */
            <div className="bg-black/40 border border-gold-main/20 hover:border-gold-main/40 rounded-xl p-5 transition-all duration-300">
              <div className="flex items-center space-x-3 mb-4">
                <div className="h-10 w-10 bg-gold-main/15 rounded-full flex items-center justify-center border border-gold-main/30">
                  <User className="h-5 w-5 text-gold-main" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white tracking-wide">{customer.fullName}</h4>
                  <span className="text-[11px] text-green-400 font-medium tracking-wider uppercase flex items-center gap-1 mt-0.5">
                    <span className="h-1.5 w-1.5 bg-green-400 rounded-full animate-ping" /> Active Profile
                  </span>
                </div>
              </div>

              <div className="space-y-2.5 text-xs text-neutral-300">
                <div className="flex items-center space-x-2.5">
                  <Mail className="h-3.5 w-3.5 text-bronze flex-shrink-0" />
                  <span className="truncate">{customer.email}</span>
                </div>
                <div className="flex items-center space-x-2.5">
                  <Phone className="h-3.5 w-3.5 text-bronze flex-shrink-0" />
                  <span>{customer.phone}</span>
                </div>
                {customer.address && (
                  <div className="flex items-start space-x-2.5">
                    <MapPin className="h-3.5 w-3.5 text-bronze flex-shrink-0 mt-0.5" />
                    <span className="line-clamp-2 leading-relaxed">{customer.address}</span>
                  </div>
                )}
              </div>

              <button
                type="button"
                onClick={() => setIsEditingCustomer(true)}
                className="w-full mt-6 py-2.5 border border-bronze/40 hover:border-gold-main/80 text-gold-light bg-transparent font-medium text-[11px] uppercase tracking-wider rounded-lg transition-all duration-300 cursor-pointer"
              >
                Change Personal Profile
              </button>
            </div>
          ) : (
            /* Registration Input */
            <form onSubmit={handleSaveCustomer} className="space-y-4">
              <p className="text-xs text-neutral-400 font-light mb-4">
                Please enter your credentials below. This allows us to track your wellness history and dispatch matching local therapists.
              </p>

              <div>
                <label className="text-[9px] uppercase tracking-widest text-[#c5a059] block mb-2 font-semibold">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#8e6d2f]" />
                  <input
                    type="text"
                    required
                    placeholder="Julian Rivers"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 bg-black/30 border border-white/10 rounded-lg text-sm text-white focus:border-[#c5a059] outline-none placeholder-white/30 transition-all duration-300"
                  />
                </div>
              </div>

              <div>
                <label className="text-[9px] uppercase tracking-widest text-[#c5a059] block mb-2 font-semibold">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#8e6d2f]" />
                  <input
                    type="email"
                    required
                    placeholder="email@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 bg-black/30 border border-white/10 rounded-lg text-sm text-white focus:border-[#c5a059] outline-none placeholder-white/30 transition-all duration-300"
                  />
                </div>
              </div>

              <div>
                <label className="text-[9px] uppercase tracking-widest text-[#c5a059] block mb-2 font-semibold">Phone Number</label>
                <div className="relative">
                  <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#8e6d2f]" />
                  <input
                    type="tel"
                    required
                    placeholder="0742678523"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 bg-black/30 border border-white/10 rounded-lg text-sm text-white focus:border-[#c5a059] outline-none placeholder-white/30 transition-all duration-300"
                  />
                </div>
              </div>

              <div>
                <label className="text-[9px] uppercase tracking-widest text-[#c5a059] block mb-2 font-semibold">Default Dispatch Destination Address</label>
                <div className="relative">
                  <MapPin className="absolute left-3.5 top-3.5 h-4 w-4 text-[#8e6d2f]" />
                  <textarea
                    placeholder="E.g., Apartment 4B, Kilimani Suite Apartments, Nairobi"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    rows={2}
                    className="w-full pl-11 pr-4 py-3 bg-black/30 border border-white/10 rounded-lg text-sm text-white focus:border-[#c5a059] outline-none placeholder-white/30 transition-all duration-300 font-sans resize-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 mt-2 bg-gradient-to-r from-neutral-900 to-neutral-950 hover:from-neutral-800 hover:to-neutral-900 border border-[#8e6d2f]/40 hover:border-[#c5a059] text-[#c5a059] font-bold text-xs uppercase tracking-widest rounded-lg active:scale-[0.98] transition-all duration-300 cursor-pointer"
              >
                Save Details & Proceed
              </button>
            </form>
          )}
        </div>

        {/* Dynamic Booking Scheduler Panel */}
        <div className="lg:col-span-7">
          <h3 className="font-serif text-2xl font-semibold text-gold-main mb-6 flex items-center space-x-2">
            <span className="font-sans text-lg bg-bronze/15 text-gold-main h-7 w-7 rounded-full inline-flex items-center justify-center font-bold mr-1.5 border border-bronze/30">2</span>
            <span>Book Your Session</span>
          </h3>

          {!customer ? (
            <div className="h-[400px] bg-black/20 border border-dashed border-neutral-800 rounded-xl flex flex-col items-center justify-center p-6 text-center select-none">
              <LockOverlayIcon />
              <h4 className="font-serif text-lg text-neutral-300 mt-4 font-semibold">Booking Schedular Suspended</h4>
              <p className="text-neutral-500 text-xs max-w-xs mt-1 font-light leading-relaxed">
                Please register your Customer Details on the left panel first to authorize therapeutic requests.
              </p>
            </div>
          ) : (
            <form onSubmit={handleBookSession} className="space-y-5 animate-fadeIn">
              
              {/* Service Type (Readonly display, but selectable) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-[9px] uppercase tracking-widest text-[#c5a059] block mb-2 font-semibold">Service Type</label>
                  <select
                    value={selectedServiceId}
                    onChange={(e) => onSelectServiceId(e.target.value)}
                    className="w-full px-4 py-3 bg-black/30 border border-white/10 rounded-lg text-sm text-white focus:border-[#c5a059] outline-none cursor-pointer transition-all duration-300"
                  >
                    {SERVICES.map((s) => (
                      <option key={s.id} value={s.id} className="bg-card-grey">
                        {s.name} ({s.price} KES)
                      </option>
                    ))}
                  </select>
                </div>

                {/* Therapist selector */}
                <div>
                  <label className="text-[9px] uppercase tracking-widest text-[#c5a059] block mb-2 font-semibold">Select Specialist</label>
                  <select
                    value={selectedTherapistId}
                    onChange={(e) => setSelectedTherapistId(e.target.value)}
                    className="w-full px-4 py-3 bg-black/30 border border-white/10 rounded-lg text-sm text-white focus:border-[#c5a059] outline-none cursor-pointer transition-all duration-300"
                  >
                    {THERAPISTS.map((t) => (
                      <option key={t.id} value={t.id} className="bg-card-grey">
                        {t.name} — {t.specialty.split('&')[0]}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Therapist Quick View */}
              <div className="bg-black/20 border border-[#8e6d2f]/20 rounded-xl p-4 flex items-center space-x-4">
                <img
                  src={therapistDetails.avatar}
                  alt={therapistDetails.name}
                  referrerPolicy="no-referrer"
                  className="w-12 h-12 rounded-full object-cover border border-[#8e6d2f]/30 flex-shrink-0"
                />
                <div className="flex-1">
                  <div className="flex justify-between items-center">
                    <h5 className="text-xs font-semibold text-white tracking-wide">{therapistDetails.name}</h5>
                    <div className="flex items-center text-gold-main text-[10px]">
                      <Star className="h-3 w-3 fill-gold-main shrink-0 mr-1" />
                      <span>{therapistDetails.rating.toFixed(1)}</span>
                    </div>
                  </div>
                  <p className="text-[11px] text-neutral-400 font-light mt-0.5 line-clamp-1 italic">
                    &ldquo;{therapistDetails.bio}&rdquo;
                  </p>
                </div>
              </div>

              {/* Date & Time Preferences */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-[9px] uppercase tracking-widest text-[#c5a059] block mb-2 font-semibold">Preferred Date</label>
                  <div className="relative">
                    <Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#8e6d2f] pointer-events-none" />
                    <input
                      type="date"
                      required
                      min={todayString}
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full pl-11 pr-4 py-3 bg-black/30 border border-white/10 rounded-lg text-sm text-white focus:border-[#c5a059] outline-none cursor-pointer text-neutral-300"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[9px] uppercase tracking-widest text-[#c5a059] block mb-2 font-semibold">Preferred Time</label>
                  <div className="relative">
                    <Clock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#8e6d2f] pointer-events-none" />
                    <input
                      type="time"
                      required
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      className="w-full pl-11 pr-4 py-3 bg-black/30 border border-white/10 rounded-lg text-sm text-white focus:border-[#c5a059] outline-none cursor-pointer text-neutral-300"
                    />
                  </div>
                </div>
              </div>

              {/* Special Note / Custom Requests */}
              <div>
                <label className="text-[9px] uppercase tracking-widest text-[#c5a059] block mb-2 font-semibold">Bespoke Custom Notes</label>
                <textarea
                  placeholder="Specify any localized concerns or complex entrance directions for your therapist"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={2}
                  className="w-full px-4 py-3 bg-black/30 border border-white/10 rounded-lg text-sm text-white focus:border-[#c5a059] outline-none placeholder-white/20 transition-all duration-300 font-sans resize-none"
                />
              </div>

              {/* Core booking total info summary button */}
              <div className="border-t border-white/5 pt-4 flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-3 sm:space-y-0">
                <div>
                  <span className="text-[9px] uppercase tracking-widest text-[#c5a059] block font-semibold">Total Package Price</span>
                  <div className="flex items-baseline space-x-1.5 mt-1">
                    <span className="text-2xl font-serif font-bold text-gold-main">{currentService.price}</span>
                    <span className="text-xs text-neutral-400 font-light tracking-wider uppercase">KES</span>
                  </div>
                </div>

                <button
                  type="submit"
                  className="py-4 mt-4 bg-gradient-to-r from-[#8e6d2f] to-[#c5a059] rounded-lg text-black font-bold uppercase tracking-widest text-xs hover:opacity-90 transition-all duration-300 px-8 cursor-pointer"
                >
                  Confirm Booking
                </button>
              </div>

            </form>
          )}

        </div>

      </div>
    </div>
  );
}

// Minimal Lock Icon for form block
function LockOverlayIcon() {
  return (
    <svg className="w-12 h-12 text-bronze/60 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
    </svg>
  );
}
