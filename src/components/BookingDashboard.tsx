import { Booking, Service, Therapist } from '../types';
import { SERVICES, THERAPISTS } from '../data';
import { Clock, MapPin, Trash2, Milestone, PhoneCall, Award, Shuffle } from 'lucide-react';

interface BookingDashboardProps {
  bookings: Booking[];
  onCancelBooking: (id: string) => void;
  onUpdateStatus: (id: string, nextStatus: Booking['status']) => void;
}

export default function BookingDashboard({ bookings, onCancelBooking, onUpdateStatus }: BookingDashboardProps) {
  // Helpers
  const getService = (id: string): Service => {
    return SERVICES.find(s => s.id === id) || SERVICES[0];
  };

  const getTherapist = (id: string): Therapist => {
    return THERAPISTS.find(t => t.id === id) || THERAPISTS[0];
  };

  const getStatusStyle = (status: Booking['status']) => {
    switch (status) {
      case 'pending': return 'bg-amber-400/10 text-amber-400 border-amber-400/20';
      case 'confirmed': return 'bg-blue-400/10 text-blue-400 border-blue-400/20';
      case 'dispatched': return 'bg-purple-400/10 text-purple-400 border-purple-400/25 animate-pulse';
      case 'completed': return 'bg-green-400/10 text-green-400 border-green-400/20';
      case 'cancelled': return 'bg-red-400/10 text-red-500 border-red-500/20';
      default: return 'bg-neutral-500/10 text-neutral-400 border-neutral-500/20';
    }
  };

  const cycleStatus = (id: string, current: Booking['status']) => {
    const sequence: Booking['status'][] = ['pending', 'confirmed', 'dispatched', 'completed'];
    const idx = sequence.indexOf(current);
    if (idx !== -1 && idx < sequence.length - 1) {
      onUpdateStatus(id, sequence[idx + 1]);
    } else {
      onUpdateStatus(id, 'pending');
    }
  };

  if (bookings.length === 0) {
    return null; // Don't show if empty to save visual noise
  }

  return (
    <section id="bookings-dashboard" className="py-12 max-w-5xl mx-auto px-6 animate-fadeIn font-sans">
      <div className="border border-[#8e6d2f]/20 bg-[#0d0d0d] rounded-2xl p-6 md:p-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 pb-4 border-b border-white/5 space-y-4 md:space-y-0">
          <div>
            <span className="text-gold-main text-[10px] uppercase tracking-[0.3em] font-semibold block">Live Scheduling</span>
            <h3 className="font-serif text-2xl font-bold text-white mt-1">Your Scheduled Sanctuary Sessions</h3>
          </div>
          <div className="flex items-center space-x-2 text-[10px] text-neutral-400 bg-black/40 border border-[#8e6d2f]/30 px-3 py-1.5 rounded-full uppercase tracking-wider">
            <Shuffle className="h-3 w-3 text-gold-main" />
            <span>Interactive Simulator</span>
          </div>
        </div>

        <div className="space-y-6">
          {bookings.map((booking) => {
            const service = getService(booking.serviceId);
            const therapist = getTherapist(booking.therapistId);

            return (
              <div 
                key={booking.id}
                className="bg-[#151515] border border-white/10 rounded-xl p-5 md:p-6 transition-all duration-300 hover:border-[#8e6d2f]/30 hover:shadow-[0_8px_30px_rgba(0,0,0,0.6)]"
              >
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center space-y-4 lg:space-y-0 pb-4 border-b border-white/5">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <span className="font-mono text-[10px] text-gold-light font-bold bg-[#8e6d2f]/10 px-2.5 py-1 rounded border border-[#8e6d2f]/30 tracking-widest uppercase">
                      {booking.id}
                    </span>
                    <span className="text-sm font-semibold text-white">
                      {service.name}
                    </span>
                    <span className="text-xs text-neutral-400">
                      via {therapist.name}
                    </span>
                  </div>

                  <div className="flex items-center space-x-3 w-full lg:w-auto justify-between lg:justify-end">
                    <div className={`px-3 py-1 text-[10px] uppercase font-bold tracking-widest border rounded-full ${getStatusStyle(booking.status)}`}>
                      {booking.status}
                    </div>

                    {booking.status !== 'cancelled' && booking.status !== 'completed' && (
                      <button
                        onClick={() => cycleStatus(booking.id, booking.status)}
                        className="text-[9px] uppercase font-bold tracking-widest bg-black/40 text-gold-main hover:bg-[#c5a059] hover:text-black border border-[#8e6d2f]/30 px-3 py-1.5 rounded transition-colors flex items-center gap-1 cursor-pointer"
                        title="Simulate the next step of transportation Dispatch"
                      >
                        <Milestone className="h-3.5 w-3.5" />
                        <span>Advance State</span>
                      </button>
                    )}
                  </div>
                </div>

                {/* Dashboard Meta Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-4 text-xs">
                  <div className="flex items-center space-x-2.5 text-neutral-400">
                    <Clock className="h-4 w-4 text-[#8e6d2f] shrink-0" />
                    <div>
                      <span className="text-[9px] text-[#c5a059] uppercase block font-semibold tracking-wider">Scheduled Appointment</span>
                      <strong className="text-neutral-300 font-medium">{booking.date} at {booking.time}</strong>
                    </div>
                  </div>

                  <div className="flex items-start space-x-2.5 text-neutral-400 sm:col-span-2">
                    <MapPin className="h-4 w-4 text-[#8e6d2f] shrink-0 mt-0.5" />
                    <div>
                      <span className="text-[9px] text-[#c5a059] uppercase block font-semibold tracking-wider">Transit Destination</span>
                      <span className="text-neutral-300 font-light line-clamp-2 leading-relaxed">{booking.customerAddress}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-end sm:col-span-1 border-t sm:border-t-0 pt-3 sm:pt-0 border-white/5">
                    <div className="text-right">
                      <span className="text-[9px] text-[#c5a059] uppercase block font-semibold tracking-wider text-right">Pre-Paid Package</span>
                      <strong className="text-base text-gold-main font-serif font-bold">{booking.totalPrice} KES</strong>
                    </div>
                  </div>
                </div>

                {/* Timeline status explanations context block */}
                {booking.status !== 'cancelled' && (
                  <div className="mt-4 p-3 bg-black/30 border border-white/5 rounded-lg flex items-center justify-between">
                    <span className="text-[10px] text-neutral-400 italic font-light">
                      {booking.status === 'pending' && "🛋️ Your request is pending confirmation. All systems go."}
                      {booking.status === 'confirmed' && "⭐ Appointment Confirmed! Therapist has booked travel."}
                      {booking.status === 'dispatched' && "🚗 Dispatch Active! Dedicated transport vehicles are in route."}
                      {booking.status === 'completed' && "🌿 Journey Completed. May the serenity guide your week."}
                    </span>

                    {booking.status !== 'completed' && (
                      <button
                        onClick={() => onCancelBooking(booking.id)}
                        className="text-[10px] text-red-400 hover:text-red-300 font-semibold uppercase tracking-widest flex items-center gap-1 cursor-pointer ml-3 shrink-0"
                        title="Cancel Sanctuary Session"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                        <span>Cancel Booking</span>
                      </button>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
