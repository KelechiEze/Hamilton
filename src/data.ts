import { Room, Review } from './types';

export const HERO_SLIDES = [
  {
    id: 'slide-1',
    image: '/first.png', // beautiful hotel exterior/room vibe
    title: 'Welcome to Hamilton Inn Hotel Bessemer',
    subtitle: 'Bessemer, Alabama',
    description: 'Hamilton Inn Bessemer offers affordable comfort, modern amenities, and a convenient location off Highway 11 with easy access to downtown Birmingham.',
  },
  {
    id: 'slide-2',
    image: '/eight.png', // bright breakfast/dinning room vibe
    title: 'Complimentary Hot Breakfast Buffet',
    subtitle: 'Sausage, Waffles & Eggs',
    description: 'Start your morning with our delicious and free breakfast including sausage, eggs, muffins, breads, and golden waffles cooked fresh daily.',
  },
  {
    id: 'slide-3',
    image: '/sixth.png', // comfortable beds layout
    title: 'Well-Appointed Rooms & Cozy Suites',
    subtitle: 'King & Double Queen Layouts',
    description: 'Relax and unwind in rooms equipped with free high-speed WiFi, 32-inch flat-screen TVs, microwaves, mini-fridges, and on-site coffee makers.',
  },
  {
    id: 'slide-4',
    image: '/third.png', // refreshing pool focus
    title: 'Convenient Travel Amenities',
    subtitle: 'Pool, Gym & Free Parking',
    description: 'Enjoy access to our seasonal outdoor swimming pool, fully-equipped fitness gym, functional business center, and complimentary guest parking.',
  }
];

export const HOTEL_SERVICES = [
  'Complimentary Hot Breakfast Buffet',
  'Free High-Speed WiFi Internet',
  'Seasonal Outdoor Swimming Pool',
  'Fully-Equipped Fitness Gym',
  'In-Room Microwave & Mini-Fridge',
  'Free Spindle & On-Site Safe Parking',
  'Business Center with Print Care',
  'Flat-Screen TV with Premium Channels',
  'Two-Room & Whirlpool Suites',
  'In-Room Premium Coffee Makers'
];

export const ROOMS_DATA: Room[] = [
  {
    id: 'room-king-grand',
    name: 'Executive King Room',
    type: 'Guest Room',
    pricePerNight: 95,
    description: 'Relax and unwind in our spacious King Room. Perfectly designed with comfortable pillowtop mattress, a spacious writingdesk, and loaded with essential utilities.',
    size: 34,
    capacity: 2,
    bedType: '1 King Bed',
    features: ['Plush Pillowtop King', 'Complimentary WiFi', 'Microwave & Mini-Fridge', '32" HD Cable TV', 'In-Room Coffee Maker'],
    rating: 4.85,
    reviewCount: 162,
    images: [
      'https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=1200&auto=format&fit=crop'
    ],
    available: true,
  },
  {
    id: 'room-double-queen',
    name: 'Standard Double Queen Room',
    type: 'Family Room',
    pricePerNight: 115,
    description: 'The premier choice for families or travel groups. Features two cozy queen-size beds, complete digital connectivity, microwave, refrigerator, and plenty of space for everyone.',
    size: 42,
    capacity: 4,
    bedType: '2 Queen Beds',
    features: ['Two Plush Queen Beds', 'Complimentary WiFi', 'Microwave & Mini-Fridge', '32" Cable HD TV', 'Spacious Bath Area'],
    rating: 4.9,
    reviewCount: 204,
    images: [
      'https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1439066615861-d1af74d74000?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?q=80&w=1200&auto=format&fit=crop'
    ],
    available: true,
  },
  {
    id: 'room-deluxe-whirlpool',
    name: 'Whirlpool Luxury King Suite',
    type: 'Luxury Suite',
    pricePerNight: 145,
    description: 'Elevate your Alabama stay in our beautifully spacious Whirlpool Suite. Perfect for couples or extended stays, featuring our private therapeutic heart whirlpool bath.',
    size: 58,
    capacity: 2,
    bedType: '1 King Bed + Sofa Bed',
    features: ['Bespoke Whirlpool Bath', 'Spacious Seating Area', 'Complimentary WiFi', 'Refrigerator & Microwave', 'Dedicated Workspace'],
    rating: 4.95,
    reviewCount: 76,
    images: [
      'https://images.unsplash.com/photo-1618773928121-c32242e63f39?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1591088398332-8a7791972843?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?q=80&w=1200&auto=format&fit=crop'
    ],
    available: true,
  },
  {
    id: 'room-accessible-king',
    name: 'Accessible King Room',
    type: 'Accessible Room',
    pricePerNight: 105,
    description: 'Thoughtfully planned accessible room featuring wide pathways, low grab bars, roll-in shower system, alongside standard high-tier amenities like free WiFi, microwave, and fridge.',
    size: 38,
    capacity: 2,
    bedType: '1 King Bed Accessibility',
    features: ['Roll-in Shower / Rails', 'ADA Compliant Design', 'Complimentary WiFi', 'Microwave & Mini-Fridge', '32" HD Screen with Subtitles'],
    rating: 4.88,
    reviewCount: 52,
    images: [
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1200&auto=format&fit=crop'
    ],
    available: true,
  }
];

export const REVIEWS_DATA: Review[] = [
  {
    id: 'r1',
    author: 'Mark Daniels',
    rating: 5,
    text: 'Such a clean and convenient hotel! The complimentary hot breakfast buffet had amazing golden waffles, premium sausage, and scrambled eggs. Placed right next to the Bessemer Civic Center, which was perfect for our trade show.',
    date: 'May 18, 2026',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&auto=format&fit=crop'
  },
  {
    id: 'r2',
    author: 'Sarah Jenkins',
    rating: 5,
    text: 'We booked here for our family visit to Alabama Splash Adventure. Kids loved being just 5 minutes away from the water slides! The double queen room was spotless, the outdoor pool was very clean, and the staff was extremely friendly.',
    date: 'April 30, 2026',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100&auto=format&fit=crop'
  },
  {
    id: 'r3',
    author: 'Robert Taylor',
    rating: 5,
    text: 'The King room bed was incredibly comfortable and the high-speed WiFi worked flawlessly for my video calls. Easy freeway access to I-20/I-59 makes getting into downtown Birmingham super fast. High recommended!',
    date: 'March 14, 2026',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=100&auto=format&fit=crop'
  }
];
