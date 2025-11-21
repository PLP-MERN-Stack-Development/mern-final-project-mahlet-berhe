const categories = [
  { id: 1, key: 'cleaning', icon: '🧹', workers: 234, color: 'blue' },
  { id: 2, key: 'plumbing', icon: '🔧', workers: 156, color: 'indigo' },
  { id: 3, key: 'carpentry', icon: '🔨', workers: 189, color: 'orange' },
  { id: 4, key: 'electrical', icon: '⚡', workers: 142, color: 'yellow' },
  { id: 5, key: 'tailoring', icon: '✂️', workers: 198, color: 'pink' },
  { id: 6, key: 'delivery', icon: '🛵', workers: 312, color: 'green' },
  { id: 7, key: 'painting', icon: '🎨', workers: 167, color: 'purple' },
  { id: 8, key: 'gardening', icon: '🌱', workers: 134, color: 'emerald' }
];

const workers = [
  {
    id: 1,
    name: 'Abebe Kebede',
    categoryKey: 'plumbing',
    rating: 4.8,
    jobs: 127,
    hourlyRate: '150',
    available: true,
    verified: true,
    distance: '1.2 km',
    responseTime: '10 min',
    yearsExperience: 5,
    completionRate: 98,
    phone: '+251911234567',
    skills: {
      en: ['Pipe repair', 'Installation', 'Emergency', 'Drain cleaning'],
      am: ['የቧንቧ ጥገና', 'መተከል', 'አስቸኳይ', 'የፍሳሽ ማፅዳት']
    },
    bio: {
      en: 'Professional plumber with 5+ years of experience. Specialized in emergency repairs and installations. Available 24/7 for urgent jobs.',
      am: 'ባለሙያ የቧንቧ ሰራተኛ ከ5+ ዓመት ልምድ ጋር። በአደጋ ጊዜ ጥገናዎች እና መተከያዎች ላይ ልዩ። ለአስቸኳይ ስራዎች 24/7 ዝግጁ።'
    },
    reviews: [
      {
        id: 1,
        user: 'Meron T.',
        rating: 5,
        date: '2 days ago',
        helpful: 12,
        text: {
          en: 'Excellent service! Very professional and completed the work on time.',
          am: 'ጥሩ አገልግሎት! በጣም ባለሙያ እና ስራውን በጊዜው አጠናቋል።'
        }
      },
      {
        id: 2,
        user: 'Daniel K.',
        rating: 5,
        date: '1 week ago',
        helpful: 8,
        text: {
          en: 'Fixed my kitchen pipe leak quickly. Highly recommended!',
          am: 'የኩሽናዬን ቧንቧ ፍሳሽ በፍጥነት አስተካክሏል። በጣም ይመከራል!'
        }
      }
    ]
  },
  {
    id: 2,
    name: 'Tigist Haile',
    categoryKey: 'cleaning',
    rating: 4.9,
    jobs: 203,
    hourlyRate: '120',
    available: true,
    verified: true,
    distance: '0.8 km',
    responseTime: '5 min',
    yearsExperience: 8,
    completionRate: 99,
    phone: '+251922345678',
    skills: {
      en: ['Home cleaning', 'Office cleaning', 'Deep clean', 'Eco-friendly'],
      am: ['የቤት ጽዳት', 'የቢሮ ጽዳት', 'ጥልቅ ጽዳት', 'ለአካባቢ ምቹ']
    },
    bio: {
      en: 'Experienced cleaner with attention to detail. Eco-friendly products available. Flexible scheduling for homes and offices.',
      am: 'ለዝርዝር ትኩረት ከሚሰጥ ልምድ ያለው ጽዳት ሰራተኛ። ለአካባቢ ምቹ ምርቶች ይገኛሉ። ለቤቶች እና ቢሮዎች ተለዋዋጭ የጊዜ ሰሌዳ።'
    },
    reviews: [
      {
        id: 1,
        user: 'Sara M.',
        rating: 5,
        date: '3 days ago',
        helpful: 15,
        text: {
          en: 'Amazing! My house has never been this clean. Very thorough.',
          am: 'አስደናቂ! ቤቴ ከዚህ በፊት እንደዚህ ንፁህ አልነበረም። በጣም ጥልቅ።'
        }
      }
    ]
  }
];

const bookings = [
  {
    id: 1,
    workerId: 1,
    date: '2024-11-20',
    time: '10:00 AM',
    status: 'confirmed',
    location: 'Bole, Addis Ababa',
    description: 'Kitchen sink repair - leaking pipe under the sink',
    price: '450 ETB',
    notes: 'Please bring necessary tools'
  }
];

const urgentJobs = [
  {
    id: 1,
    categoryKey: 'plumbing',
    budget: '300-500 ETB',
    location: 'Bole, Addis Ababa',
    timePosted: '10 min ago',
    title: {
      en: 'Kitchen pipe leak repair',
      am: 'የኩሽና ቧንቧ ፍሳሽ ጥገና'
    }
  },
  {
    id: 2,
    categoryKey: 'electrical',
    budget: '400-600 ETB',
    location: 'CMC, Addis Ababa',
    timePosted: '25 min ago',
    title: {
      en: 'Emergency electrical repair',
      am: 'አስቸኳይ ኤሌክትሪክ ጥገና'
    }
  }
];

const chatMessages = [
  { id: 1, text: 'Hello! I need help with plumbing', sender: 'me', time: '10:30 AM', read: true },
  { id: 2, text: "Hi! I'd be happy to help. What's the issue?", sender: 'worker', time: '10:31 AM', read: true }
];

export { categories, workers, bookings, urgentJobs, chatMessages };
export const notifications = [
  {
    id: 1,
    type: 'booking',
    title: 'Booking Confirmed',
    message: 'Your booking with Abebe is confirmed.',
    time: '2 hours ago',
    read: false
  },
  {
    id: 2,
    type: 'message',
    title: 'New Message',
    message: 'Abebe sent you a message.',
    time: '1 hour ago',
    read: false
  },
  {
    id: 3,
    type: 'payment',
    title: 'Payment Received',
    message: 'You received 500 ETB from Abebe.',
    time: '30 minutes ago',
    read: true
  }
];