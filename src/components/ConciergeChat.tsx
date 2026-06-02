import { useState, useRef, useEffect } from 'react';
import { Sparkles, Send, User, ChevronRight, HelpCircle } from 'lucide-react';
import { INITIAL_FAQS } from '../data';

interface Message {
  id: string;
  sender: 'concierge' | 'user';
  text: string;
  timestamp: string;
}

export default function ConciergeChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      sender: 'concierge',
      text: 'Good day. Welcome to Ritavia Sanctuary Concierge. I am available to guide your in-home wellness bookings. How may I serve your comfort today?',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [input, setInput] = useState('');
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Auto scroll to chat bottom
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = (textToSend: string) => {
    if (!textToSend.trim()) return;

    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const userMsg: Message = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: textToSend,
      timestamp
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');

    // Generate response after a slight delay
    setTimeout(() => {
      const responseText = getConciergeResponse(textToSend);
      const hostMsg: Message = {
        id: `con-${Date.now()}`,
        sender: 'concierge',
        text: responseText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, hostMsg]);
    }, 700);
  };

  const getConciergeResponse = (userInput: string): string => {
    const text = userInput.toLowerCase();
    
    if (text.includes('price') || text.includes('cost') || text.includes('amount') || text.includes('surcharge')) {
      return 'The Special Signature Wellness Massage is currently structured at KES 1,000 per session. There are zero extra travel cost surcharges within our service zone. Other custom treatments vary from 1,100 KES to 1,500 KES.';
    }
    if (text.includes('transport') || text.includes('door') || text.includes('car') || text.includes('travel')) {
      return 'Transportation to and fro is fully catered by Ritavia. We dispatch our therapists with vehicles pre-loaded with portable heated therapy tables, fresh sanitized linens, and selected aromatic botanical elixirs.';
    }
    if (text.includes('phone') || text.includes('contact') || text.includes('call')) {
      return 'To contact the management directly for rapid manual bookings or schedule adjustments, please call our 24/7 dedicated telephone desk at +254 742 678 523.';
    }
    if (text.includes('therapist') || text.includes('expert') || text.includes('dr.')) {
      return 'All active Ritavia therapists are fully certified practitioners with a minimum of 4 years in luxury clinical service. Every package allows choosing your preferred specialist, like Dr. Elena Vance or Marcus Thorne.';
    }
    if (text.includes('oil') || text.includes('allerg') || text.includes('skin')) {
      return 'We use hypoallergenic organic botanical oils (sweet almond, jojoba, and cold-pressed coconut). Please specify any seed or skin sensitivities in the special notes input during scheduling so we prepare matching alternatives.';
    }
    
    return 'Thank you. I have logged that inquiry. You are welcome to complete the Customer File check-in above, pick your preferred date & time, and we will confirm all transit details directly via SMS / Phone near dispatch.';
  };

  return (
    <section id="support" className="py-12 max-w-5xl mx-auto px-6 animate-fadeIn">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* Instant Question chips */}
        <div className="lg:col-span-5 flex flex-col justify-between bg-[#151515] border border-[#8e6d2f]/30 rounded-2xl p-6 font-sans">
          <div>
            <span className="text-gold-main text-[10px] uppercase tracking-[0.3em] font-semibold block">Concierge Desk</span>
            <h3 className="font-serif text-xl font-bold text-white mb-2 mt-1">Instant Schedular Inquiries</h3>
            <p className="text-neutral-400 text-xs font-light leading-relaxed mb-6">
              Click any of our frequent inquiry headers to receive bespoke, instantaneous information relative to your door-to-door comfort:
            </p>

            <div className="space-y-3">
              {INITIAL_FAQS.map((faq, index) => (
                <button
                  key={index}
                  onClick={() => handleSend(faq.question)}
                  className="w-full text-left bg-black/30 border border-white/10 hover:border-gold-main p-4 rounded-xl flex items-start space-x-3 transition-all duration-300 group cursor-pointer"
                >
                  <HelpCircle className="h-4.5 w-4.5 text-gold-main shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <h4 className="text-xs font-semibold text-neutral-200 group-hover:text-white transition-colors">
                      {faq.question}
                    </h4>
                    <span className="text-[10px] text-neutral-500 uppercase tracking-wider block mt-1 group-hover:text-gold-light transition-colors">
                      Request Consultation Answer &rarr;
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-white/5 text-[11px] text-neutral-500 font-light flex items-center justify-between">
            <span>Direct phone desk:</span>
            <strong className="text-gold-main font-semibold">+254 742 678 523</strong>
          </div>
        </div>

        {/* Live Active Chat Simulation box */}
        <div className="lg:col-span-7 flex flex-col justify-between bg-[#151515] border border-[#8e6d2f]/30 rounded-2xl overflow-hidden min-h-[450px] font-sans">
          {/* Header */}
          <div className="bg-neutral-950 border-b border-white/5 p-4 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="h-9 w-9 bg-gold-main/15 rounded-full border border-gold-main/20 flex items-center justify-center">
                <Sparkles className="h-4.5 w-4.5 text-gold-main animate-pulse" />
              </div>
              <div>
                <h4 className="text-xs font-semibold text-white tracking-wide">Concierge Desk</h4>
                <div className="flex items-center space-x-1.5 mt-0.5">
                  <span className="h-1.5 w-1.5 bg-green-400 rounded-full animate-ping" />
                  <span className="text-[10px] text-neutral-400 tracking-wider font-light">Available</span>
                </div>
              </div>
            </div>
            <span className="text-[9px] uppercase tracking-widest text-[#aaa] bg-white/5 px-2 py-1 rounded">
              Verified Care
            </span>
          </div>

          {/* Messages Queue */}
          <div className="flex-1 p-5 overflow-y-auto space-y-4 max-h-[350px]">
            {messages.map((m) => {
              const isUser = m.sender === 'user';
              return (
                <div key={m.id} className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] rounded-xl p-4 text-xs leading-relaxed ${
                    isUser 
                      ? 'bg-gradient-to-r from-[#8e6d2f] to-[#c5a059] text-black font-semibold rounded-tr-none' 
                      : 'bg-black/40 border border-white/10 text-neutral-200 rounded-tl-none'
                  }`}>
                    <p className="whitespace-pre-wrap">{m.text}</p>
                    <span className={`block text-[9px] mt-1.5 text-right ${isUser ? 'text-black/60' : 'text-neutral-500'}`}>
                      {m.timestamp}
                    </span>
                  </div>
                </div>
              );
            })}
            <div ref={chatEndRef} />
          </div>

          {/* Input control form */}
          <form 
            onSubmit={(e) => { e.preventDefault(); handleSend(input); }} 
            className="p-3 bg-neutral-950/80 border-t border-white/5 flex items-center space-x-2"
          >
            <input
              type="text"
              placeholder="Ask about oils, appointment changes, or transit..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 bg-black/30 border border-white/10 focus:outline-none focus:border-[#c5a059] text-xs text-white rounded-lg px-3.5 py-3 placeholder-white/20"
            />
            <button
              type="submit"
              disabled={!input.trim()}
              className="p-3 bg-gradient-to-r from-[#8e6d2f] to-[#c5a059] text-black font-semibold hover:brightness-110 disabled:opacity-40 rounded-lg transition-all duration-200 cursor-pointer"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>

        </div>

      </div>
    </section>
  );
}
