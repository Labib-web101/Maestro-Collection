
export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  category: 'T-Shirts' | 'Shirts' | 'Formal Pants' | 'Jeans' | 'Panjabi' | 'Blazer' | 'Accessories';
  images: string[];
  description: string;
  sizes: string[];
  inStock: number;
  soldToday: number;
  reviews: { id: string; user: string; rating: number; comment: string; date: string }[];
}

export const PRODUCTS: Product[] = [
  // --- T-SHIRTS ---
  {
    id: '1',
    name: 'Midnight Black Premium T-Shirt',
    price: 1250,
    originalPrice: 1500,
    category: 'T-Shirts',
    images: [
      'https://picsum.photos/seed/maestro-tshirt-1/800/1000',
      'https://picsum.photos/seed/maestro-tshirt-1-back/800/1000'
    ],
    description: 'Elevate your everyday style with our signature Midnight Black T-Shirt. Crafted from 100% long-staple cotton for unmatched comfort.',
    sizes: ['S', 'M', 'L', 'XL'],
    inStock: 5,
    soldToday: 54,
    reviews: [
      { id: '1', user: 'Rahat', rating: 5, comment: 'Best fit I have ever bought in BD. Truly premium.', date: '2024-03-12' },
      { id: '2', user: 'Zubair', rating: 4, comment: 'The fabric quality is amazing.', date: '2024-03-10' }
    ]
  },
  {
    id: '101',
    name: 'Oasis White Classic Tee',
    price: 1250,
    originalPrice: 1500,
    category: 'T-Shirts',
    images: ['https://picsum.photos/seed/maestro-tshirt-wh/800/1000'],
    description: 'The quintessential crisp white t-shirt. Breathable, durable, and tailored for a flawless fit.',
    sizes: ['S', 'M', 'L', 'XL'],
    inStock: 15,
    soldToday: 32,
    reviews: []
  },
  {
    id: '102',
    name: 'Olive Drab Utility T-Shirt',
    price: 1350,
    category: 'T-Shirts',
    images: ['https://picsum.photos/seed/maestro-tshirt-ol/800/1000'],
    description: 'Earthy olive tones meet premium cotton construction. Perfect for a rugged yet refined look.',
    sizes: ['M', 'L', 'XL'],
    inStock: 8,
    soldToday: 12,
    reviews: []
  },
  {
    id: '103',
    name: 'Navy Blue Essential Striped Tee',
    price: 1450,
    originalPrice: 1700,
    category: 'T-Shirts',
    images: ['https://picsum.photos/seed/maestro-tshirt-nv/800/1000'],
    description: 'A nautical-inspired navy and white striped shirt that transitions effortlessly from day to night.',
    sizes: ['S', 'M', 'L'],
    inStock: 12,
    soldToday: 21,
    reviews: []
  },

  // --- SHIRTS ---
  {
    id: '7',
    name: 'Ivory White Oxford Shirt',
    price: 2450,
    originalPrice: 2950,
    category: 'Shirts',
    images: ['https://picsum.photos/seed/maestro-shirt-1/800/1000'],
    description: 'The epitome of classic style. Our Ivory White Oxford Shirt is versatile enough for the boardroom or a causal evening.',
    sizes: ['M', 'L', 'XL'],
    inStock: 10,
    soldToday: 22,
    reviews: []
  },
  {
    id: '201',
    name: 'Oxford Blue Dress Shirt',
    price: 2600,
    category: 'Shirts',
    images: ['https://picsum.photos/seed/maestro-shirt-bu/800/1000'],
    description: 'A sharp, structured light blue shirt perfect for high-stakes meetings or elegant dinners.',
    sizes: ['S', 'M', 'L', 'XL'],
    inStock: 7,
    soldToday: 16,
    reviews: []
  },
  {
    id: '202',
    name: 'Charcoal Linen Summer Shirt',
    price: 2800,
    originalPrice: 3200,
    category: 'Shirts',
    images: ['https://picsum.photos/seed/maestro-shirt-ch/800/1000'],
    description: 'Breathable European linen in a sophisticated charcoal hue. Unstructured and incredibly comfortable.',
    sizes: ['M', 'L', 'XL'],
    inStock: 14,
    soldToday: 9,
    reviews: []
  },
  {
    id: '203',
    name: 'Crimson Check Casual Flannel',
    price: 2200,
    category: 'Shirts',
    images: ['https://picsum.photos/seed/maestro-shirt-fl/800/1000'],
    description: 'A soft, brushed flannel shirt featuring a refined crimson and black check pattern.',
    sizes: ['S', 'M', 'L', 'XL'],
    inStock: 20,
    soldToday: 28,
    reviews: []
  },

  // --- FORMAL PANTS ---
  {
    id: '2',
    name: 'Charcoal Grey Formal Trousers',
    price: 2850,
    originalPrice: 3200,
    category: 'Formal Pants',
    images: [
      'https://picsum.photos/seed/maestro-pants-1/800/1000'
    ],
    description: 'Precision-tailored formal trousers designed for the modern professional. Featuring a slight stretch for all-day comfort.',
    sizes: ['30', '32', '34', '36'],
    inStock: 12,
    soldToday: 18,
    reviews: []
  },
  {
    id: '301',
    name: 'Midnight Black Dress Pants',
    price: 2850,
    category: 'Formal Pants',
    images: ['https://picsum.photos/seed/maestro-pants-dk/800/1000'],
    description: 'Sleek black trousers crafted from a wrinkle-resistant wool blend fabric.',
    sizes: ['28', '30', '32', '34', '36'],
    inStock: 15,
    soldToday: 23,
    reviews: []
  },
  {
    id: '302',
    name: 'Navy Blue Tailored Chinos',
    price: 2450,
    category: 'Formal Pants',
    images: ['https://picsum.photos/seed/maestro-pants-nv/800/1000'],
    description: 'A perfect middle ground between formal and casual. Classic navy tailored chinos.',
    sizes: ['30', '32', '34', '36'],
    inStock: 25,
    soldToday: 19,
    reviews: []
  },
  {
    id: '303',
    name: 'Khaki Beige Smart Trousers',
    price: 2600,
    originalPrice: 2900,
    category: 'Formal Pants',
    images: ['https://picsum.photos/seed/maestro-pants-kh/800/1000'],
    description: 'Lightweight khaki trousers ideal for smart-casual summer affairs.',
    sizes: ['32', '34', '36'],
    inStock: 9,
    soldToday: 14,
    reviews: []
  },

  // --- JEANS ---
  {
    id: '3',
    name: 'Indigo Raw Selvedge Jeans',
    price: 3500,
    originalPrice: 4200,
    category: 'Jeans',
    images: [
      'https://picsum.photos/seed/maestro-jeans-1/800/1000'
    ],
    description: 'Heavyweight raw indigo denim that develops a unique character over time. The ultimate wardrobe staple.',
    sizes: ['30', '32', '34', '36'],
    inStock: 8,
    soldToday: 25,
    reviews: []
  },
  {
    id: '401',
    name: 'Jet Black Slim Denim',
    price: 3200,
    category: 'Jeans',
    images: ['https://picsum.photos/seed/maestro-jeans-bl/800/1000'],
    description: 'Onyx black denim with a modern slim cut and 2% elastane for seamless mobility.',
    sizes: ['28', '30', '32', '34', '36'],
    inStock: 12,
    soldToday: 30,
    reviews: []
  },
  {
    id: '402',
    name: 'Vintage Wash Light Blue Jeans',
    price: 3400,
    originalPrice: 3800,
    category: 'Jeans',
    images: ['https://picsum.photos/seed/maestro-jeans-lt/800/1000'],
    description: 'Expertly washed for a worn-in vintage look from day one. Super soft premium denim.',
    sizes: ['30', '32', '34', '36'],
    inStock: 18,
    soldToday: 15,
    reviews: []
  },
  {
    id: '403',
    name: 'Charcoal Grey Tapered Jeans',
    price: 3300,
    category: 'Jeans',
    images: ['https://picsum.photos/seed/maestro-jeans-gy/800/1000'],
    description: 'A sleek, versatile grey wash in a flattering tapered fit structure.',
    sizes: ['32', '34', '36'],
    inStock: 22,
    soldToday: 11,
    reviews: []
  },

  // --- PANJABI ---
  {
    id: '4',
    name: 'Sovereign Gold Embroidered Panjabi',
    price: 4500,
    originalPrice: 5200,
    category: 'Panjabi',
    images: [
      'https://picsum.photos/seed/maestro-panjabi-1/800/1000'
    ],
    description: 'The ultimate formal wear for traditional occasions. Featuring subtle gold embroidery on luxury silk-blend fabric.',
    sizes: ['S', 'M', 'L', 'XL'],
    inStock: 8,
    soldToday: 21,
    reviews: []
  },
  {
    id: '501',
    name: 'Royal Black Linen Panjabi',
    price: 3800,
    category: 'Panjabi',
    images: ['https://picsum.photos/seed/maestro-panjabi-bk/800/1000'],
    description: 'A masterful black linen Panjabi with minimalist detailing and a sharp mandarin collar.',
    sizes: ['M', 'L', 'XL'],
    inStock: 15,
    soldToday: 35,
    reviews: []
  },
  {
    id: '502',
    name: 'Crimson Red Festive Panjabi',
    price: 4200,
    originalPrice: 4800,
    category: 'Panjabi',
    images: ['https://picsum.photos/seed/maestro-panjabi-rd/800/1000'],
    description: 'A deep crimson jacquard Panjabi crafted for evening celebrations and weddings.',
    sizes: ['S', 'M', 'L', 'XL'],
    inStock: 10,
    soldToday: 12,
    reviews: []
  },
  {
    id: '503',
    name: 'Pearl White Premium Cotton Panjabi',
    price: 3200,
    category: 'Panjabi',
    images: ['https://picsum.photos/seed/maestro-panjabi-wh/800/1000'],
    description: 'Everyday elegance meets comfort. A crisp white Panjabi perfect for Jummah or casual gatherings.',
    sizes: ['M', 'L', 'XL'],
    inStock: 25,
    soldToday: 40,
    reviews: []
  },

  // --- BLAZER ---
  {
    id: '5',
    name: 'Midnight Navy Slim-Fit Blazer',
    price: 8500,
    originalPrice: 9500,
    category: 'Blazer',
    images: ['https://picsum.photos/seed/maestro-blazer-1/800/1000'],
    description: 'A sharp, slim-fit blazer that works perfectly for both formal events and upscale casual outings.',
    sizes: ['M', 'L', 'XL'],
    inStock: 5,
    soldToday: 8,
    reviews: []
  },
  {
    id: '601',
    name: 'Graphite Grey Wool Blazer',
    price: 9200,
    category: 'Blazer',
    images: ['https://picsum.photos/seed/maestro-blazer-gy/800/1000'],
    description: 'Textured wool-blend blazer featuring a classic notch lapel and dual vents.',
    sizes: ['S', 'M', 'L', 'XL'],
    inStock: 4,
    soldToday: 3,
    reviews: []
  },
  {
    id: '602',
    name: 'Onyx Black Tuxedo Jacket',
    price: 12500,
    originalPrice: 15000,
    category: 'Blazer',
    images: ['https://picsum.photos/seed/maestro-blazer-tx/800/1000'],
    description: 'When the occasion demands absolute perfection. Features satin peak lapels and a tailored fit.',
    sizes: ['M', 'L', 'XL'],
    inStock: 2,
    soldToday: 1,
    reviews: []
  },
  {
    id: '603',
    name: 'Camel Brown Suede Sportscoat',
    price: 10500,
    category: 'Blazer',
    images: ['https://picsum.photos/seed/maestro-blazer-br/800/1000'],
    description: 'A luxurious suede finish sportscoat that instantly elevates a pair of jeans or chinos.',
    sizes: ['M', 'L', 'XL'],
    inStock: 6,
    soldToday: 4,
    reviews: []
  },

  // --- ACCESSORIES ---
  {
    id: '6',
    name: 'Classic Tan Leather Belt',
    price: 1850,
    originalPrice: 2200,
    category: 'Accessories',
    images: ['https://picsum.photos/seed/maestro-belt-1/800/1000'],
    description: 'Genuine full-grain leather belt with a brushed nickel buckle. The perfect finishing touch.',
    sizes: ['One Size'],
    inStock: 20,
    soldToday: 15,
    reviews: []
  },
  {
    id: '701',
    name: 'Onyx Black Leather Wallet',
    price: 2450,
    category: 'Accessories',
    images: ['https://picsum.photos/seed/maestro-wallet-bk/800/1000'],
    description: 'A slim, minimalist bifold wallet crafted from premium calfskin leather and featuring RFID protection.',
    sizes: ['One Size'],
    inStock: 30,
    soldToday: 22,
    reviews: []
  },
  {
    id: '702',
    name: 'Silver Onyx Cufflinks',
    price: 1400,
    originalPrice: 1800,
    category: 'Accessories',
    images: ['https://picsum.photos/seed/maestro-cufflinks-sv/800/1000'],
    description: 'Refined sterling silver plated cufflinks inlaid with genuine black onyx stones.',
    sizes: ['One Size'],
    inStock: 12,
    soldToday: 5,
    reviews: []
  },
  {
    id: '703',
    name: 'Silk Pocket Square - Burgundy Paisley',
    price: 950,
    category: 'Accessories',
    images: ['https://picsum.photos/seed/maestro-pocketsquare/800/1000'],
    description: '100% pure silk pocket square with a hand-rolled edge, featuring a classic burgundy paisley print.',
    sizes: ['One Size'],
    inStock: 40,
    soldToday: 14,
    reviews: []
  }
];
