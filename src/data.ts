import { Service, Therapist } from './types';

export const SERVICES: Service[] = [
  {
    id: 'heals-wellness',
    name: 'Heals & Wellness Massage',
    price: 1000,
    duration: 60,
    description: 'Our signature whole-body therapeutic massage designed to release deep physical tension, anxiety, and optimize systemic recovery.',
    benefits: ['Full body rebalancing', 'Enhanced circulation', 'Stiffness release', 'Deep neural calming'],
    icon: 'Sparkles',
  },
  {
    id: 'deep-tissue',
    name: 'Deep Tissue & Muscle Release',
    price: 1200,
    duration: 75,
    description: 'Concentrated pressure focusing on deep athletic re-tuning, relieving chronic muscle congestion and correcting posture fatigue.',
    benefits: ['Myofascial decompression', 'Postural alignment', 'Pain relief', 'Targeted muscle recovery'],
    icon: 'Activity',
  },
  {
    id: 'aromatherapy-rebalance',
    name: 'Aromatherapy Rebalance',
    price: 1100,
    duration: 60,
    description: 'Synergistic infusion of organic botanical elixirs tailored to stimulate sensory healing, relieve stress, and boost immune response.',
    benefits: ['Botanical essential oils', 'Lymphatic stimulation', 'Stress hormone reduction', 'Sensory upliftment'],
    icon: 'Heart',
  },
  {
    id: 'royal-hot-stone',
    name: 'Royal Hot Stone Ritual',
    price: 1500,
    duration: 90,
    description: 'Smooth basalt river stones are warmed and carefully guided along key energy points, utilizing radiant thermodynamic heat to dissolve state-level fatigue.',
    benefits: ['Radiant thermal depth', 'Maximum stress relief', 'Deeper soft tissue access', 'Deep energetic flow'],
    icon: 'Sun',
  }
];

export const THERAPISTS: Therapist[] = [
  {
    id: 'seraphina',
    name: 'Seraphina Kaelen',
    specialty: 'Ritavia Signature Practitioner',
    rating: 5.0,
    avatar: 'https://images.unsplash.com/photo-1594744803329-e58b31de215f?auto=format&fit=crop&q=80&w=300',
    bio: 'Ritavia master therapist specializing in the signature Heals & Wellness door-to-door therapeutic treatments shown on our flyer.',
  }
];

export const INITIAL_FAQS = [
  {
    question: 'How does the Door to Door service work?',
    answer: 'Ritavia brings the luxury spa experience directly to your door—our certified master specialist handles all travel to your location, carrying a premium folding table, organic heated botanicals, ambient music, and fresh linens.'
  },
  {
    question: 'How will I know when my booking is approved?',
    answer: 'Once you request an appointment, you are registered instantly. Our dispatch coordinator reviews the specialist schedule and contacts you directly on your workspace phone (0742678523) or via email to confirm coordinates. You can also view real-time status shifts right here in your live Interactive Scheduling Dashboard.'
  },
  {
    question: 'Are transportation logistics included in the price?',
    answer: 'Yes, absolutely. As printed on our flyer, we fully cater for the transport to and fro within our metropolitan Hub boundary. The KES 1000 price for our signature session is completely all-inclusive.'
  },
  {
    question: 'How should I prepare for my door-to-door session?',
    answer: 'Choose a quiet area with enough floor space (approx 3x2 meters) for us to set up. We bring the massage bed, luxury oils, and music. All you need is a comfortable, warm environment to relax.'
  }
];
