import { createClient } from 'redis';

// Singleton Redis client to avoid multiple connections
let redis: any = null;

async function getRedisClient() {
  if (!redis) {
    // Only try to connect to Redis if REDIS_URL is available
    if (!process.env.REDIS_URL) {
      console.log('No REDIS_URL found, skipping Redis connection');
      return null;
    }
    
    redis = createClient({
      url: process.env.REDIS_URL
    });
    
    redis.on('error', (err) => {
      console.log('Redis Client Error', err);
      // Don't throw error, just log it
    });
    
    try {
      await redis.connect();
    } catch (error) {
      console.log('Failed to connect to Redis:', error);
      redis = null;
      return null;
    }
  }
  return redis;
}

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
      "social": "@davidchen"
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
    },
    {
      "name": "Sophie Martinez",
      "role": "Vocalist",
      "project": "Midnight Melodies",
      "year": "2024",
      "genre": "Jazz",
      "image": "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face&auto=format&q=80",
      "social": "@sophiemartinez"
    },
    {
      "name": "Ryan O'Connor",
      "role": "Trumpet Player",
      "project": "Brass & Soul",
      "year": "2023",
      "genre": "Blues",
      "image": "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face&auto=format&q=80",
      "social": "@ryanoconnor"
    },
    {
      "name": "Isabella Kim",
      "role": "Violinist",
      "project": "Strings of Emotion",
      "year": "2024",
      "genre": "Classical Fusion",
      "image": "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face&auto=format&q=80",
      "social": "@isabellakim"
    },
    {
      "name": "Michael Torres",
      "role": "Keyboardist",
      "project": "Digital Dreams",
      "year": "2023",
      "genre": "Electronic",
      "image": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face&auto=format&q=80",
      "social": "@michaeltorres"
    },
    {
      "name": "Aisha Johnson",
      "role": "Percussionist",
      "project": "Rhythmic Roots",
      "year": "2024",
      "genre": "World Music",
      "image": "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=150&h=150&fit=crop&crop=face&auto=format&q=80",
      "social": "@aishajohnson"
    }
  ]
};

// Show data functions
export async function getShowData() {
  try {
    const client = await getRedisClient();
    if (!client) {
      console.log('No Redis client, returning default show data');
      return defaultShowData;
    }
    const data = await client.get('show_data');
    if (data) {
      return JSON.parse(data);
    }
    return defaultShowData;
  } catch (error) {
    console.error('Error getting show data:', error);
    return defaultShowData;
  }
}

export async function saveShowData(data: any) {
  try {
    const client = await getRedisClient();
    if (!client) {
      console.log('No Redis client, cannot save show data');
      return false;
    }
    await client.set('show_data', JSON.stringify(data));
    return true;
  } catch (error) {
    console.error('Error saving show data:', error);
    return false;
  }
}

// Collaborations functions
export async function getCollaborations() {
  try {
    const client = await getRedisClient();
    if (!client) {
      console.log('No Redis client, returning default collaborations with images');
      return defaultCollaborations;
    }
    const data = await client.get('collaborations_data');
    console.log('Redis get collaborations_data:', data ? 'found data' : 'no data found');
    if (data) {
      return JSON.parse(data);
    }
    console.log('No Redis data, returning default collaborations with images');
    return defaultCollaborations;
  } catch (error) {
    console.error('Redis connection failed, returning default collaborations with images:', error);
    return defaultCollaborations;
  }
}

export async function saveCollaborations(data: any) {
  try {
    const client = await getRedisClient();
    if (!client) {
      console.log('No Redis client, cannot save collaborations');
      return false;
    }
    await client.set('collaborations_data', JSON.stringify(data));
    console.log('Successfully saved collaborations to Redis');
    return true;
  } catch (error) {
    console.error('Error saving collaborations:', error);
    return false;
  }
}
