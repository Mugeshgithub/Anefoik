import { kv } from '@vercel/kv';

// Storage keys
const SHOW_DATA_KEY = 'show_data';
const COLLABORATIONS_KEY = 'collaborations_data';

// Check if KV is available
const isKvAvailable = () => {
  try {
    return process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN;
  } catch {
    return false;
  }
};

// Default data
const defaultShowData = {
  isActive: true,
  title: "Live Performance at Blue Note Paris",
  date: "2025-01-20",
  time: "9:00 PM",
  venue: "Blue Note Paris",
  location: "Paris, France",
  link: "https://bluenoteparis.com/events/aniefiok-asuquo",
  linkText: "Book Tickets",
  type: "live",
  description: "An intimate evening of jazz and contemporary music",
  collaborators: [
    {
      name: "Sarah Johnson",
      role: "Vocalist",
      social: "@sarahjazz"
    }
  ]
};

const defaultCollaborations = {
  isActive: true,
  collaborations: [
    {
      "name": "Marcus Williams",
      "role": "Saxophonist",
      "project": "Urban Jazz",
      "year": "2023",
      "genre": "Fusion",
      "image": "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=150&h=150&fit=crop&crop=face&auto=format&q=80",
      "social": "@marcuswilliams"
    },
    {
      "name": "Elena Rodriguez",
      "role": "Producer",
      "project": "Crossroads",
      "year": "2024",
      "genre": "Pop",
      "image": "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=150&h=150&fit=crop&crop=face&auto=format&q=80",
      "social": "@elenarodriguez"
    },
    {
      "name": "David Chen",
      "role": "Pianist",
      "project": "Sunday Morning",
      "year": "2023",
      "genre": "Gospel",
      "image": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face&auto=format&q=80",
      "social": "@davidchenmusic"
    },
    {
      "name": "Lisa Thompson",
      "role": "Songwriter",
      "project": "City Lights",
      "year": "2024",
      "genre": "R&B",
      "image": "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face&auto=format&q=80",
      "social": "@lisathompson"
    },
    {
      "name": "James Wilson",
      "role": "Drummer",
      "project": "Rhythm & Soul",
      "year": "2023",
      "genre": "Soul",
      "image": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face&auto=format&q=80",
      "social": "@jameswilson"
    },
    {
      "name": "Maria Garcia",
      "role": "Bassist",
      "project": "Deep Grooves",
      "year": "2024",
      "genre": "Funk",
      "image": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face&auto=format&q=80",
      "social": "@mariagarcia"
    },
    {
      "name": "Alex Brown",
      "role": "Guitarist",
      "project": "Acoustic Sessions",
      "year": "2023",
      "genre": "Folk",
      "image": "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face&auto=format&q=80",
      "social": "@alexbrown"
    }
  ]
};

// Show data functions
export async function getShowData() {
  try {
    if (!isKvAvailable()) {
      console.log('KV not available, returning default data');
      return defaultShowData;
    }
    const data = await kv.get(SHOW_DATA_KEY);
    return data || defaultShowData;
  } catch (error) {
    console.error('Error getting show data from KV:', error);
    return defaultShowData;
  }
}

export async function saveShowData(data: any) {
  try {
    if (!isKvAvailable()) {
      console.log('KV not available, cannot save data');
      return false;
    }
    await kv.set(SHOW_DATA_KEY, data);
    return true;
  } catch (error) {
    console.error('Error saving show data to KV:', error);
    return false;
  }
}

// Collaborations functions
export async function getCollaborations() {
  try {
    if (!isKvAvailable()) {
      console.log('KV not available, returning default data');
      return defaultCollaborations;
    }
    const data = await kv.get(COLLABORATIONS_KEY);
    return data || defaultCollaborations;
  } catch (error) {
    console.error('Error getting collaborations from KV:', error);
    return defaultCollaborations;
  }
}

export async function saveCollaborations(data: any) {
  try {
    if (!isKvAvailable()) {
      console.log('KV not available, cannot save data');
      return false;
    }
    await kv.set(COLLABORATIONS_KEY, data);
    return true;
  } catch (error) {
    console.error('Error saving collaborations to KV:', error);
    return false;
  }
}
