import { Product, PromoCode } from '@/types/ecommerce';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    name: 'AeroTune Pro Wireless ANC Headphones',
    slug: 'aerotune-pro-wireless-anc-headphones',
    description: 'Immerse yourself in high-fidelity sound with industry-leading Active Noise Cancellation, 40-hour battery life, and ultra-soft memory foam ear cushions.',
    price: 14999,
    originalPrice: 19999,
    category: 'Audio',
    rating: 4.8,
    reviewsCount: 142,
    stock: 25,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
    badge: 'Best Seller',
    specs: {
      'Driver Size': '40mm Neodymium',
      'Battery Life': '40 Hours (ANC On)',
      'Bluetooth Version': '5.3',
      'Weight': '250g'
    },
    features: [
      'Active Noise Cancellation with Transparency Mode',
      'Multipoint Bluetooth Pairing',
      'Custom EQ via Companion App',
      'Fast Charge: 10 mins gives 4 hours playback'
    ]
  },
  {
    id: 'prod-2',
    name: 'UltraVision 34" Curved Gaming Monitor',
    slug: 'ultravision-34-curved-gaming-monitor',
    description: 'Experience stunning ultra-wide visuals with 165Hz refresh rate, 1ms response time, and HDR400 support designed for immersive gaming and productivity.',
    price: 45999,
    originalPrice: 54999,
    category: 'Displays',
    rating: 4.9,
    reviewsCount: 89,
    stock: 12,
    image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=800&q=80',
    badge: 'Sale',
    specs: {
      'Resolution': '3440 x 1440 WQHD',
      'Refresh Rate': '165Hz',
      'Curvature': '1500R',
      'Panel Type': 'VA Fast Response'
    },
    features: [
      'AMD FreeSync Premium Pro',
      'Built-in Dual 5W Speakers',
      'Ergonomic Height & Tilt Adjustable Stand',
      'USB-C 65W Power Delivery Hub'
    ]
  },
  {
    id: 'prod-3',
    name: 'ApexPulse Smart Fitness Watch Pro',
    slug: 'apexpulse-smart-fitness-watch-pro',
    description: 'Track your health metrics with continuous heart rate monitoring, GPS route mapping, sleep analysis, and over 100 sports modes.',
    price: 9999,
    originalPrice: 12999,
    category: 'Wearables',
    rating: 4.6,
    reviewsCount: 210,
    stock: 40,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80',
    badge: 'New',
    specs: {
      'Display': '1.4" AMOLED Sapphire Glass',
      'Water Resistance': '5 ATM (50m)',
      'Battery Life': 'Up to 12 Days',
      'Sensors': 'Optical HR, SpO2, Accelerometer, GPS'
    },
    features: [
      'Built-in Dual-Frequency GPS',
      'Continuous SpO2 & Stress Tracking',
      'Waterproof for Swimming & Diving',
      'Customizable Watch Faces'
    ]
  },
  {
    id: 'prod-4',
    name: 'KeyCraft K8 RGB Mechanical Keyboard',
    slug: 'keycraft-k8-rgb-mechanical-keyboard',
    description: 'Hot-swappable mechanical switches, gasket-mounted acoustic dampening, per-key RGB backlighting, and CNC aluminum chassis.',
    price: 7499,
    originalPrice: 9999,
    category: 'Peripherals',
    rating: 4.7,
    reviewsCount: 76,
    stock: 18,
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=800&q=80',
    badge: 'Featured',
    specs: {
      'Switch Type': 'Gateron Pro Yellow (Pre-lubed)',
      'Layout': '75% Compact',
      'Connectivity': 'Tri-mode (2.4GHz / BT 5.1 / Type-C)',
      'Keycaps': 'Double-shot PBT Cherry Profile'
    },
    features: [
      'Gasket Mount Design for Soft Flex Typing',
      'Hot-Swappable 3/5-pin Switch Sockets',
      'South-facing RGB Illumination',
      '4000mAh Battery for up to 200 Hours'
    ]
  },
  {
    id: 'prod-5',
    name: 'ErgoStride Lumbar Mesh Office Chair',
    slug: 'ergostride-lumbar-mesh-office-chair',
    description: 'Engineered for all-day posture support featuring dynamic lumbar adjustment, 4D armrests, breathable Korean mesh, and recline lock.',
    price: 19999,
    originalPrice: 24999,
    category: 'Furniture',
    rating: 4.8,
    reviewsCount: 54,
    stock: 8,
    image: 'https://images.unsplash.com/photo-1580481072645-022f9a6d8310?auto=format&fit=crop&w=800&q=80',
    badge: 'Sale',
    specs: {
      'Weight Capacity': '330 lbs / 150 kg',
      'Recline Angle': '90° - 135°',
      'Frame Material': 'Aluminum Alloy & Polymer',
      'Warranty': '5 Years'
    },
    features: [
      'Self-Adjusting Dynamic Lumbar Support',
      '4D Multi-directional Armrests',
      'Breathable High-Tension Mesh',
      'Silent PU Caster Wheels'
    ]
  },
  {
    id: 'prod-6',
    name: 'SoundWave Go Waterproof Speaker',
    slug: 'soundwave-go-waterproof-speaker',
    description: 'Compact 360-degree room-filling audio speaker with punchy bass, IP67 dust/water resistance, and built-in party sync link.',
    price: 4499,
    originalPrice: 5999,
    category: 'Audio',
    rating: 4.5,
    reviewsCount: 118,
    stock: 32,
    image: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=800&q=80',
    badge: 'Best Seller',
    specs: {
      'Output Power': '25W RMS',
      'Playtime': '16 Hours',
      'Waterproof Standard': 'IP67 Submersible',
      'Wireless Range': '30m / 100ft'
    },
    features: [
      'Deep Bass Radiators',
      'PartyConnect to pair up to 100 speakers',
      'Durable Fabric Exterior',
      'Built-in Speakerphone for calls'
    ]
  },
  {
    id: 'prod-7',
    name: 'UrbanCommute Waterproof Tech Backpack',
    slug: 'urbancommute-waterproof-tech-backpack',
    description: 'Sleek, minimalist 25L backpack with padded 16" laptop sleeve, TSA-approved lay-flat opening, hidden passport pocket, and USB pass-through.',
    price: 3999,
    originalPrice: 4999,
    category: 'Accessories',
    rating: 4.7,
    reviewsCount: 95,
    stock: 22,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80',
    badge: 'Featured',
    specs: {
      'Capacity': '25 Liters',
      'Laptop Fitting': 'Up to 16-inch MacBook / PC',
      'Material': '900D Cordura Waterproof Polyester',
      'Weight': '0.95 kg'
    },
    features: [
      'TSA Lay-flat Laptop Compartment',
      'Luggage Pass-through Strap',
      'RFID-Blocking Anti-Theft Pocket',
      'Integrated USB Charging Port'
    ]
  },
  {
    id: 'prod-8',
    name: 'VoltCharge 3-in-1 MagSafe Stand',
    slug: 'voltcharge-3-in-1-magsafe-stand',
    description: 'Simultaneously charge your iPhone, Apple Watch, and AirPods with 15W fast wireless magnetic alignment and weighted aluminum base.',
    price: 3499,
    originalPrice: 4299,
    category: 'Accessories',
    rating: 4.6,
    reviewsCount: 167,
    stock: 50,
    image: 'https://images.unsplash.com/photo-1622445268465-843816584286?auto=format&fit=crop&w=800&q=80',
    badge: 'Sale',
    specs: {
      'Phone Output': '15W Fast Wireless',
      'Watch Output': '5W Fast Charge',
      'AirPods Output': '5W Qi Wireless',
      'Power Adapter': '30W USB-C PD Included'
    },
    features: [
      'Official MagSafe Compatible Magnetic Lock',
      'Portrait & Landscape Viewing Angles',
      'LED Charging Indicator light',
      'Over-heat & Foreign Object Protection'
    ]
  },
  {
    id: 'prod-9',
    name: 'PrecisionGlide Wireless Ergonomic Mouse',
    slug: 'precisionglide-wireless-ergonomic-mouse',
    description: 'Designed to reduce wrist strain with 57° vertical angle, 4000 DPI precision optical sensor, quiet click switches, and dual wireless modes.',
    price: 3299,
    originalPrice: 4499,
    category: 'Peripherals',
    rating: 4.8,
    reviewsCount: 134,
    stock: 28,
    image: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=800&q=80',
    badge: 'Best Seller',
    specs: {
      'DPI Sensor': '4000 DPI Darkfield Precision',
      'Connectivity': 'Bluetooth Low Energy & 2.4GHz USB',
      'Battery': 'Rechargeable 500mAh (70 Days)',
      'Buttons': '6 Programmable Custom Buttons'
    },
    features: [
      'Natural Handshake Position Reduces Muscle Strain',
      'Flow Cross-Computer Control across 3 Devices',
      'Ultra-quiet Click Switches',
      'Fast Charging USB-C'
    ]
  },
  {
    id: 'prod-10',
    name: 'AeroTune Buds Studio ANC Earbuds',
    slug: 'aerotune-buds-studio-anc-earbuds',
    description: 'Compact wireless earbuds with active hybrid noise canceling, spatial audio head tracking, and IPX5 sweat resistance.',
    price: 6999,
    originalPrice: 8999,
    category: 'Audio',
    rating: 4.7,
    reviewsCount: 98,
    stock: 35,
    image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=800&q=80',
    badge: 'New',
    specs: {
      'Driver': '11mm Dynamic Titanium',
      'Battery': '32 Hours with Qi Wireless Charging Case',
      'Noise Canceling': '-42dB Active Hybrid ANC',
      'Waterproof': 'IPX5 Sweat & Water Resistant'
    },
    features: [
      'Adaptive Transparency & Voice Isolation',
      'Spatial 3D Audio Processing',
      'Touch Gesture Controls',
      'Wireless Qi Charging Case'
    ]
  },
  {
    id: 'prod-11',
    name: 'FlexiDesk Motorized Dual-Motor Standing Desk',
    slug: 'flexidesk-motorized-dual-motor-standing-desk',
    description: 'Heavy-duty motorized height-adjustable standing desk with walnut finish tabletop, memory presets, and anti-collision technology.',
    price: 29999,
    originalPrice: 37999,
    category: 'Furniture',
    rating: 4.9,
    reviewsCount: 62,
    stock: 6,
    image: 'https://images.unsplash.com/photo-1595515106969-1ce29566ff1c?auto=format&fit=crop&w=800&q=80',
    badge: 'Featured',
    specs: {
      'Tabletop Dimensions': '55" x 28" Solid Walnut Finish',
      'Height Range': '69cm - 118cm (Electric Dual Motor)',
      'Weight Capacity': '125 kg / 275 lbs',
      'Controls': '4 Memory Presets with LED Display'
    },
    features: [
      'Dual Quiet Electric Motors (<45dB)',
      'Built-in Anti-Collision Sensor',
      'Integrated Cable Management Tray',
      '10-Year Frame Warranty'
    ]
  },
  {
    id: 'prod-12',
    name: 'StudioVocal XLR Condenser Microphone Kit',
    slug: 'studiovocal-xlr-condenser-microphone-kit',
    description: 'Broadcast-grade cardioid condenser microphone with heavy boom arm, pop filter, shock mount, and low-noise audio circuit.',
    price: 8499,
    originalPrice: 10999,
    category: 'Audio',
    rating: 4.8,
    reviewsCount: 88,
    stock: 19,
    image: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=800&q=80',
    badge: 'Sale',
    specs: {
      'Capsule': '16mm Large Diaphragm Condenser',
      'Polar Pattern': 'Cardioid',
      'Frequency Response': '20Hz - 20kHz',
      'Output': '3-pin XLR Standard'
    },
    features: [
      'Crisp Vocal Clarity for Podcast & Streaming',
      'Full Metal Adjustable Suspension Boom Arm',
      'Dual-Layer Pop Filter Included',
      'Low Self-Noise Architecture'
    ]
  },
  {
    id: 'prod-13',
    name: 'UltraVision 27" 4K IPS Color-Accurate Monitor',
    slug: 'ultravision-27-4k-ips-color-accurate-monitor',
    description: 'Designed for video editors and digital creators with 99% DCI-P3 color gamut, Factory Calibrated Delta E < 2, and Type-C 90W PD.',
    price: 32999,
    originalPrice: 39999,
    category: 'Displays',
    rating: 4.9,
    reviewsCount: 71,
    stock: 10,
    image: 'https://images.unsplash.com/photo-1547082299-de196ea013d6?auto=format&fit=crop&w=800&q=80',
    badge: 'New',
    specs: {
      'Resolution': '3840 x 2160 4K UHD',
      'Color Gamut': '99% DCI-P3, 100% sRGB',
      'HDR Standard': 'VESA DisplayHDR 400',
      'Ports': 'USB-C 90W, HDMI 2.1, DisplayPort 1.4, USB Hub'
    },
    features: [
      'Factory Color Calibrated with Individual Report',
      '90W USB-C Single Cable Laptop Connection',
      'Hardware Pivot, Swivel & Tilt Ergonomics',
      'TÜV Certified Flicker-Free & Low Blue Light'
    ]
  },
  {
    id: 'prod-14',
    name: 'LeatherCraft Premium XL Desk Mat Pad',
    slug: 'leathercraft-premium-xl-desk-mat-pad',
    description: 'Handcrafted waterproof vegan leather desk blotter pad with non-slip suede backing, stitched edges, and smooth mouse tracking surface.',
    price: 1899,
    originalPrice: 2499,
    category: 'Accessories',
    rating: 4.7,
    reviewsCount: 156,
    stock: 45,
    image: 'https://images.unsplash.com/photo-1616440342855-46c59b6714a6?auto=format&fit=crop&w=800&q=80',
    badge: 'Best Seller',
    specs: {
      'Dimensions': '90cm x 40cm (35.4" x 15.7")',
      'Thickness': '2.5mm Dual Layer',
      'Material': 'PU Leather & Organic Suede Back',
      'Waterproof': 'Spill-resistant wipe clean'
    },
    features: [
      'Protects Desk from Scratches & Liquid Spills',
      'Precision Smooth Tracking for Optical Mice',
      'Reinforced Anti-Fray Stitched Border',
      'Includes Roll-up Leather Strap'
    ]
  },
  {
    id: 'prod-15',
    name: 'ApexPulse Band 7 Fitness & Sleep Tracker',
    slug: 'apexpulse-band-7-fitness-sleep-tracker',
    description: 'Ultra-lightweight fitness smartband featuring 24/7 SpO2 tracking, 2-week battery life, 1.47" AMOLED screen, and female health tracking.',
    price: 2999,
    originalPrice: 3999,
    category: 'Wearables',
    rating: 4.6,
    reviewsCount: 240,
    stock: 60,
    image: 'https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?auto=format&fit=crop&w=800&q=80',
    badge: 'Sale',
    specs: {
      'Display': '1.47" AMOLED Touch Screen',
      'Weight': '16g Ultra Light',
      'Battery Life': '14 Days Regular Usage',
      'Waterproof': '5 ATM (50 Meters)'
    },
    features: [
      'Continuous All-Day Blood Oxygen Monitoring',
      'Scientific Sleep Stage Analysis',
      '96 Professional Workout Modes',
      'Fast Charge: 5 mins gives 2 days use'
    ]
  },
  {
    id: 'prod-16',
    name: 'KeyCraft CNC Ergonomic Wooden Wrist Rest',
    slug: 'keycraft-cnc-ergonomic-wooden-wrist-rest',
    description: 'Solid natural American Walnut wood wrist rest ergonomically shaped to provide wrist elevation for mechanical keyboards.',
    price: 1499,
    originalPrice: 1999,
    category: 'Peripherals',
    rating: 4.8,
    reviewsCount: 82,
    stock: 30,
    image: 'https://images.unsplash.com/photo-1626218174358-7769486c4b79?auto=format&fit=crop&w=800&q=80',
    badge: 'New',
    specs: {
      'Material': '100% Solid Natural Walnut Wood',
      'Compatibility': '75% / TKL Mechanical Keyboards',
      'Dimensions': '317mm x 80mm x 19mm',
      'Feet': 'Non-slip Rubber Base Pads'
    },
    features: [
      'Hand-polished Eco-friendly Oil Coating',
      'Prevents Wrist Strain During Long Sessions',
      'Heavy Natural Wood Density Won\'t Slide',
      'Perfect Match for KeyCraft K8 Keyboard'
    ]
  }
];

export const CATEGORIES = [
  'All',
  'Audio',
  'Displays',
  'Wearables',
  'Peripherals',
  'Furniture',
  'Accessories'
];

export const VALID_PROMO_CODES: PromoCode[] = [
  { code: 'SAVE10', discountPercent: 10, description: '10% off your order' },
  { code: 'WELCOME20', discountPercent: 20, minSpend: 2500, description: '20% off orders over ₹2,500' },
  { code: 'FREESHIP', discountPercent: 0, description: 'Free shipping on any order' }
];

export const formatINR = (amount: number): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(amount);
};
