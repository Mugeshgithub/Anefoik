import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { getCollaborations, saveCollaborations } from '@/lib/redis-storage';

const dataFilePath = path.join(process.cwd(), 'data', 'collaborations.json');

// Load data from file (for local development)
function loadCollaborationsFromFile() {
  try {
    if (fs.existsSync(dataFilePath)) {
      const fileData = fs.readFileSync(dataFilePath, 'utf8');
      return JSON.parse(fileData);
    }
  } catch (error) {
    console.error('Error loading collaborations:', error);
  }
  return defaultCollaborations;
}

// Save data to file (for local development)
function saveCollaborationsToFile(data: any) {
  try {
    const dataDir = path.dirname(dataFilePath);
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }
    fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error('Error saving collaborations:', error);
  }
}

// Default collaborations data
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

export async function GET() {
  try {
    // Always use Redis storage (both production and development)
    const collaborations = await getCollaborations();
    console.log('API returning collaborations:', collaborations.collaborations?.length || 0, 'items');
    return NextResponse.json(collaborations);
  } catch (error) {
    console.error('Error fetching collaborations:', error);
    // Return default data even if there's an error
    console.log('Returning default collaborations due to error');
    return NextResponse.json(defaultCollaborations);
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    
    if (!data.collaborations || !Array.isArray(data.collaborations)) {
      return NextResponse.json(
        { error: 'Collaborations must be an array' },
        { status: 400 }
      );
    }
    
    // Always use Redis storage (both production and development)
    const success = await saveCollaborations(data);
    if (!success) {
      return NextResponse.json({ error: 'Failed to save collaborations' }, { status: 500 });
    }
    
    return NextResponse.json({ 
      success: true, 
      message: 'Collaborations updated successfully',
      ...data
    });
  } catch (error) {
    console.error('Error updating collaborations:', error);
    return NextResponse.json(
      { error: 'Failed to update collaborations' },
      { status: 500 }
    );
  }
}
