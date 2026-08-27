export interface PortfolioItem {
  id: string;
  title: string;
  category: 'Black & Grey' | 'Tribal' | 'Custom' | 'Cover-Up';
  description: string;
  size: string;
  duration: string;
  label: string;
  dimension: string;
  aspectRatio: string;
  rating: number;
}

export const PORTFOLIO_ITEMS: PortfolioItem[] = [
  {
    id: 'p1',
    title: 'Hyper-Realistic Lion Portrait',
    category: 'Black & Grey',
    description: 'Intricate black & grey realism featuring high-contrast shading and fine hair textures on forearm.',
    size: '8x5 inches',
    duration: '6 Hours',
    label: 'TATTOO 1',
    dimension: '280px × 350px',
    aspectRatio: 'aspect-[3/4]',
    rating: 5.0,
  },
  {
    id: 'p2',
    title: 'Polynesian Warrior Sleeve',
    category: 'Tribal',
    description: 'Symmetrical tribal geometric flow wrapping across shoulder and upper arm with ancient symbolic motifs.',
    size: '12x6 inches',
    duration: '8 Hours',
    label: 'TATTOO 2',
    dimension: '240px × 300px',
    aspectRatio: 'aspect-[3/4]',
    rating: 5.0,
  },
  {
    id: 'p3',
    title: 'Custom Celestial Phoenix',
    category: 'Custom',
    description: 'Custom mythic artwork designed exclusively for client featuring delicate feather lines and cosmic glow accents.',
    size: '10x6 inches',
    duration: '7 Hours',
    label: 'TATTOO 3',
    dimension: '200px × 250px',
    aspectRatio: 'aspect-[3/4]',
    rating: 5.0,
  },
  {
    id: 'p4',
    title: 'Full Back Floral Cover-Up',
    category: 'Cover-Up',
    description: 'Masterful cover-up masking faded ink into a lush gothic rose garden and skull composition.',
    size: '14x10 inches',
    duration: '12 Hours (2 Sessions)',
    label: 'TATTOO 4',
    dimension: '280px × 350px',
    aspectRatio: 'aspect-[3/4]',
    rating: 5.0,
  },
  {
    id: 'p5',
    title: 'Mechanical Cybernetic Forearm',
    category: 'Black & Grey',
    description: '3D bio-mechanical sleeve simulation blending human anatomy with high-precision steel mechanics.',
    size: '9x5 inches',
    duration: '6.5 Hours',
    label: 'TATTOO 5',
    dimension: '240px × 300px',
    aspectRatio: 'aspect-[3/4]',
    rating: 5.0,
  },
  {
    id: 'p6',
    title: 'Sacred Mandala Chest Piece',
    category: 'Custom',
    description: 'Centroid dotwork mandala surrounded by razor-sharp sacred geometry spanning sternum and chest.',
    size: '11x8 inches',
    duration: '9 Hours',
    label: 'TATTOO 6',
    dimension: '200px × 250px',
    aspectRatio: 'aspect-[3/4]',
    rating: 5.0,
  },
  {
    id: 'p7',
    title: 'Maori Heritage Calf Band',
    category: 'Tribal',
    description: 'Deep black solid fills and intricate negative space carving honoring South Pacific tribal art traditions.',
    size: '7x4 inches',
    duration: '5 Hours',
    label: 'TATTOO 7',
    dimension: '280px × 350px',
    aspectRatio: 'aspect-[3/4]',
    rating: 5.0,
  },
  {
    id: 'p8',
    title: 'Vedic Shiva Portrait Realism',
    category: 'Black & Grey',
    description: 'Detailed Lord Shiva portrait with misty clouds, trishul fine lines, and soft gradient background shading.',
    size: '12x8 inches',
    duration: '10 Hours',
    label: 'TATTOO 8',
    dimension: '240px × 300px',
    aspectRatio: 'aspect-[3/4]',
    rating: 5.0,
  },
  {
    id: 'p9',
    title: 'Minimalist Serpent Cover-Up',
    category: 'Cover-Up',
    description: 'Transformed blurred initials into an elegant coiled serpent wrapping around a midnight dark rose.',
    size: '6x4 inches',
    duration: '4.5 Hours',
    label: 'TATTOO 9',
    dimension: '200px × 250px',
    aspectRatio: 'aspect-[3/4]',
    rating: 5.0,
  },
  {
    id: 'p10',
    title: 'Geometric Wolf Head',
    category: 'Black & Grey',
    description: 'Split portrait combining realistic wolf fur texture with intricate low-poly geometric lines.',
    size: '8x5 inches',
    duration: '5.5 Hours',
    label: 'TATTOO 10',
    dimension: '280px × 350px',
    aspectRatio: 'aspect-[3/4]',
    rating: 5.0,
  },
  {
    id: 'p11',
    title: 'Traditional Polynesian Shoulder Armor',
    category: 'Tribal',
    description: 'Bold shoulder cap armor pattern representing protection, strength, and ancestral pride.',
    size: '10x7 inches',
    duration: '7.5 Hours',
    label: 'TATTOO 11',
    dimension: '240px × 300px',
    aspectRatio: 'aspect-[3/4]',
    rating: 5.0,
  },
  {
    id: 'p12',
    title: 'Bespoke Astronomical Compass',
    category: 'Custom',
    description: 'Fine needle arm piece blending vintage nautical compass dial with constellation maps.',
    size: '7x5 inches',
    duration: '5 Hours',
    label: 'TATTOO 12',
    dimension: '200px × 250px',
    aspectRatio: 'aspect-[3/4]',
    rating: 5.0,
  }
];

export interface ServiceItem {
  id: string;
  tag: string;
  title: string;
  description: string;
  meta: string;
  price: string;
  ratePerInch: number;
  minPrice: number;
  features: string[];
}

export const SERVICES: ServiceItem[] = [
  {
    id: 's1',
    tag: 'CUSTOM ART',
    title: 'Custom Tattoo Design',
    description: 'Bring your vision to life with a one-of-a-kind design. We work with you to create something truly unique and meaningful.',
    meta: 'Free consultation • Multiple revisions',
    price: '₹300/inch',
    ratePerInch: 300,
    minPrice: 1500,
    features: [
      'Personalized 1-on-1 design consultation',
      'Digital stencil mockup preview before inking',
      'Unlimited minor sketch refinements',
      'Medical-grade sterile needle & premium imported ink'
    ]
  },
  {
    id: 's2',
    tag: 'REALISM',
    title: 'Black & Grey Realism',
    description: 'Photorealistic portraits, animals and scenes with masterful shading for stunning detail and depth.',
    meta: 'Fine detail work • Premium ink',
    price: '₹350/inch',
    ratePerInch: 350,
    minPrice: 2000,
    features: [
      'High-precision micro-shading technique',
      'Smooth gradient depth & photographic contrast',
      'Ideal for portraits, wildlife, and mythic figures',
      'Includes complimentary 30-day touch-up session'
    ]
  },
  {
    id: 's3',
    tag: 'TRIBAL',
    title: 'Tribal & Traditional',
    description: 'Bold tribal patterns and traditional styles with cultural significance and powerful symbolism.',
    meta: 'Bold lines • Timeless designs',
    price: '₹300/inch',
    ratePerInch: 300,
    minPrice: 1500,
    features: [
      'Deep jet-black pigment saturation',
      'Sharp line definition & anatomical body fitting',
      'Polynesian, Maori, Viking & Vedic pattern choices',
      'Long-term fade-resistant ink formula'
    ]
  },
  {
    id: 's4',
    tag: 'COVER-UP',
    title: 'Cover-Up & Rework',
    description: 'Transform old or unwanted tattoos into beautiful new artwork with expert cover-up techniques.',
    meta: 'Free consultation • Design preview',
    price: 'From ₹300/inch',
    ratePerInch: 300,
    minPrice: 1800,
    features: [
      'Comprehensive scar and old ink analysis',
      'Custom opacity layering to completely hide old ink',
      'No laser removal required for most designs',
      'Guaranteed invisible outcome with strategic shading'
    ]
  }
];

export interface TestimonialItem {
  id: string;
  quote: string;
  author: string;
  location: string;
  rating: number;
  tattooType: string;
}

export const TESTIMONIALS: TestimonialItem[] = [
  {
    id: 't1',
    quote: 'Vishal bhai ne meri tattoo itni perfectly banai ki main shabd nahi dhundh pa raha. Best artist in Jharkhand!',
    author: 'Rahul M.',
    location: 'Dhanbad',
    rating: 5,
    tattooType: 'Black & Grey Realism'
  },
  {
    id: 't2',
    quote: 'Amazing attention to detail. My black and grey portrait looks absolutely real. Highly recommended!',
    author: 'Priya S.',
    location: 'Ranchi',
    rating: 5,
    tattooType: 'Portrait Tattoo'
  },
  {
    id: 't3',
    quote: 'Got a tribal tattoo done. The design was exactly what I wanted. Very professional and clean studio.',
    author: 'Amit K.',
    location: 'Bokaro',
    rating: 5,
    tattooType: 'Tribal Sleeve'
  },
  {
    id: 't4',
    quote: 'I was nervous about my first tattoo but Vishal made me feel comfortable. Result exceeded expectations.',
    author: 'Sneha R.',
    location: 'Dhanbad',
    rating: 5,
    tattooType: 'Custom Floral'
  },
  {
    id: 't5',
    quote: "Got a cover-up done and you can't tell there was an old tattoo. Master at his craft!",
    author: 'Vikram P.',
    location: 'Jamshedpur',
    rating: 5,
    tattooType: 'Cover-Up Artwork'
  }
];

export const HERO_FLOATING_PLACEHOLDERS = [
  {
    id: 'hero-1',
    width: '280px',
    height: '350px',
    rotation: 'rotate(3deg)',
    zIndex: 3,
    label: 'TATTOO 1',
    title: 'Black & Grey Realism',
    positionClass: 'top-[5%] right-[5%]',
  },
  {
    id: 'hero-2',
    width: '200px',
    height: '250px',
    rotation: 'rotate(-2deg)',
    zIndex: 4,
    label: 'TATTOO 2',
    title: 'Tribal Arm Band',
    positionClass: 'top-[35%] right-[2%]',
  },
  {
    id: 'hero-3',
    width: '240px',
    height: '300px',
    rotation: 'rotate(-4deg)',
    zIndex: 2,
    label: 'TATTOO 3',
    title: 'Custom Compass',
    positionClass: 'top-[20%] left-[5%]',
  },
  {
    id: 'hero-4',
    width: '180px',
    height: '225px',
    rotation: 'rotate(5deg)',
    zIndex: 5,
    label: 'TATTOO 4',
    title: 'Vedic Trishul',
    positionClass: 'bottom-[5%] left-[35%]',
  },
  {
    id: 'hero-5',
    width: '160px',
    height: '200px',
    rotation: 'rotate(-3deg)',
    zIndex: 1,
    label: 'TATTOO 5',
    title: 'Geometric Skull',
    positionClass: 'top-[2%] left-[30%]',
  },
  {
    id: 'hero-6',
    width: '200px',
    height: '250px',
    rotation: 'rotate(2deg)',
    zIndex: 4,
    label: 'TATTOO 6',
    title: 'Cover-Up Rose',
    positionClass: 'bottom-[12%] right-[12%]',
  },
  {
    id: 'hero-7',
    width: '150px',
    height: '190px',
    rotation: 'rotate(6deg)',
    zIndex: 2,
    label: 'TATTOO 7',
    title: 'Blackwork Serpent',
    positionClass: 'top-[0%] right-[38%]',
  },
  {
    id: 'hero-8',
    width: '170px',
    height: '210px',
    rotation: 'rotate(-5deg)',
    zIndex: 3,
    label: 'TATTOO 8',
    title: 'Phoenix Wings',
    positionClass: 'bottom-[15%] left-[8%]',
  },
];
