
export interface Product {
  id: number;
  name: string;
  provider: string;
  durations: Array<{
    duration: string;
    price: string;
  }>;
  description: string;
  features: string[];
  image: string;
  category?: string;
}

export const products: Product[] = [
  {
    id: 1,
    name: "Netflix Premium",
    provider: "Netflix",
    durations: [
      { duration: "3 Months", price: "120 MAD" },
      { duration: "6 Months", price: "200 MAD" },
      { duration: "12 Months", price: "300 MAD" }
    ],
    description: "Ad-free movies, TV shows, and mobile games. Watch in Ultra HD.",
    features: [
      "Ad-free streaming",
      "4K Ultra HD quality",
      "Download for offline viewing",
      "Access to all Netflix content"
    ],
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/960px-Netflix_2015_logo.svg.png?20190206123158",
    category: "streaming"
  },
  {
    id: 2,
    name: "Spotify Premium",
    provider: "Spotify",
    durations: [
      { duration: "1 Months", price: "20 MAD" },
      { duration: "3 Months", price: "40 MAD" },
      { duration: "6 Months", price: "60 MAD" },
      { duration: "12 Months", price: "100 MAD" }
    ],
    description: "Ad-free music, offline playback, and unlimited skips.",
    features: [
      "Ad-free music",
      "Offline playback",
      "High-quality audio",
      "Unlimited skips",
      "On-demand playback"
    ],
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/26/Spotify_logo_with_text.svg/1200px-Spotify_logo_with_text.svg.png",
    category: "music"
  },
  {
    id: 3,
    name: "Shahid VIP",
    provider: "Shahid",
    durations: [
      { duration: "3 Months", price: "80 MAD" },
      { duration: "6 Months", price: "150 MAD" },
      { duration: "12 Months", price: "200 MAD" }
    ],
    description: "Exclusive Arabic and international content. Ad-free with live TV access.",
    features: [
      "Arabic & international shows",
      "Ad-free streaming",
      "Live TV access",
      "Multi-device support",
      "Download for offline viewing"
    ],
    image: "https://upload.wikimedia.org/wikipedia/commons/1/1e/Mbc_Shahid_logo.svg",
    category: "streaming"
  },
  {
    id: 4,
    name: "Amazon Prime Video",
    provider: "Amazon",
    durations: [
      { duration: "3 Months", price: "60 MAD" },
      { duration: "6 Months", price: "100 MAD" },
      { duration: "12 Months", price: "150 MAD" }
    ],
    description: "Movies, TV shows, Prime Music, and exclusive shopping deals.",
    features: [
      "Prime Video streaming",
      "Prime Music access",
      "Exclusive shopping deals",
      "Free shipping",
      "Prime Reading"
    ],
    image: "https://upload.wikimedia.org/wikipedia/commons/1/11/Amazon_Prime_Video_logo.svg",
    category: "streaming"
  }
];
