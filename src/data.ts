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
    id: 'elena',
    name: 'Dr. Elena Vance',
    specialty: 'Aromatherapy & Holistic Healing',
    rating: 4.9,
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=300',
    bio: 'Over 8 years of luxury spa leadership, specializing in bespoke essential oil blends and dynamic therapeutic massage.',
  },
  {
    id: 'marcus',
    name: 'Marcus Thorne',
    specialty: 'Deep Tissue & Sports Recovery',
    rating: 4.8,
    avatar: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=300',
    bio: 'Dedicated physical practitioner skilled in structural restoration, deep muscle decompression, and athletic re-tuning.',
  },
  {
    id: 'seraphina',
    name: 'Seraphina Kaelen',
    specialty: 'Ritavia Signature & Soft Touch',
    rating: 5.0,
    avatar: 'https://images.unsplash.com/photo-1594744803329-e58b31de215f?auto=format&fit=crop&q=80&w=300',
    bio: 'Devoted to deep neural calming and whole-body harmony utilizing proprietary fluid relaxation techniques.',
  }
];

export const INITIAL_FAQS = [
  {
    question: 'How does the Door to Door service work?',
    answer: 'Our professional therapists bring everything needed—including luxury portable tables, premium linen sheets, heated organic massage oils, and ambient wellness soundtracks—directly to your home or hotel suite.'
  },
  {
    question: 'Are transportation costs included in the price?',
    answer: 'Absolutely. Transportation within our service bounds is fully catered and included in your booking price. There are no hidden fees or extra surcharges.'
  },
  {
    question: 'How should I prepare for my therapist’s arrival?',
    answer: 'We recommend choosing a quiet, warm room with enough space (about 3x2 meters) for our premium massage table to stand comfortably. Please have 2 fresh towels available if you prefer using your own linens.'
  },
  {
    question: 'Can I choose my favorite therapist?',
    answer: 'Yes! Our booking form allows you to select a specific specialist based on their therapeutic styles, or select "First Available" for quickest scheduling.'
  }
];
