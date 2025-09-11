import { promises as fs } from 'fs';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), 'data');
const SHOW_DATA_FILE = path.join(DATA_DIR, 'show-data.json');
const COLLABORATIONS_FILE = path.join(DATA_DIR, 'collaborations.json');

// Ensure data directory exists
async function ensureDataDir() {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
  } catch (error) {
    console.error('Error creating data directory:', error);
  }
}

// Default data
const defaultShowData = {
  isActive: false,
  title: '',
  date: '',
  time: '',
  venue: '',
  location: '',
  link: '',
  linkText: '',
  type: 'live' as const,
  description: '',
  email: '',
  collaborators: []
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
      "genre": "Jazz",
      "image": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face&auto=format&q=80",
      "social": "@davidchen"
    },
    {
      "name": "Sarah Johnson",
      "role": "Vocalist",
      "project": "Midnight Sessions",
      "year": "2024",
      "genre": "R&B",
      "image": "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face&auto=format&q=80",
      "social": "@sarahjazz"
    },
    {
      "name": "Michael Torres",
      "role": "Guitarist",
      "project": "Electric Dreams",
      "year": "2023",
      "genre": "Rock",
      "image": "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face&auto=format&q=80",
      "social": "@michaeltorres"
    },
    {
      "name": "Sophie Martinez",
      "role": "Drummer",
      "project": "Rhythm & Blues",
      "year": "2024",
      "genre": "Blues",
      "image": "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face&auto=format&q=80",
      "social": "@sophiemartinez"
    },
    {
      "name": "Ryan O'Connor",
      "role": "Bassist",
      "project": "Deep Grooves",
      "year": "2023",
      "genre": "Funk",
      "image": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face&auto=format&q=80",
      "social": "@ryanoconnor"
    },
    {
      "name": "Isabella Kim",
      "role": "Violinist",
      "project": "Classical Fusion",
      "year": "2024",
      "genre": "Classical",
      "image": "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face&auto=format&q=80",
      "social": "@isabellakim"
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

// Show Data Functions
export async function getShowData() {
  try {
    await ensureDataDir();
    const data = await fs.readFile(SHOW_DATA_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.log('No show data file found, returning default data');
    return defaultShowData;
  }
}

export async function saveShowData(data: any) {
  try {
    await ensureDataDir();
    await fs.writeFile(SHOW_DATA_FILE, JSON.stringify(data, null, 2));
    console.log('Show data saved successfully');
    return true;
  } catch (error) {
    console.error('Error saving show data:', error);
    return false;
  }
}

// Collaborations Functions
export async function getCollaborations() {
  try {
    await ensureDataDir();
    const data = await fs.readFile(COLLABORATIONS_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.log('No collaborations file found, returning default data');
    return defaultCollaborations;
  }
}

export async function saveCollaborations(data: any) {
  try {
    await ensureDataDir();
    await fs.writeFile(COLLABORATIONS_FILE, JSON.stringify(data, null, 2));
    console.log('Collaborations data saved successfully');
    return true;
  } catch (error) {
    console.error('Error saving collaborations data:', error);
    return false;
  }
}
