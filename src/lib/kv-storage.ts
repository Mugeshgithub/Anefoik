import { createClient } from 'redis';

// Singleton Redis client to avoid multiple connections
let redis: any = null;

async function getRedisClient() {
  if (!redis) {
    redis = createClient({
      url: process.env.REDIS_URL
    });
    
    redis.on('error', (err) => console.log('Redis Client Error', err));
    await redis.connect();
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
    const client = await getRedisClient();
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
    const data = await client.get('collaborations_data');
    console.log('Redis get collaborations_data:', data ? 'found data' : 'no data found');
    if (data) {
      return JSON.parse(data);
    }
    console.log('Returning default collaborations');
    return defaultCollaborations;
  } catch (error) {
    console.error('Error getting collaborations:', error);
    return defaultCollaborations;
  }
}

export async function saveCollaborations(data: any) {
  try {
    const client = await getRedisClient();
    await client.set('collaborations_data', JSON.stringify(data));
    console.log('Successfully saved collaborations to Redis');
    return true;
  } catch (error) {
    console.error('Error saving collaborations:', error);
    return false;
  }
}
