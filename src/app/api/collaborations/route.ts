import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// In-memory store for production (Vercel serverless functions)
let collaborationsStore = {
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

const dataFilePath = path.join(process.cwd(), 'data', 'collaborations.json');

// Load data from file (for local development)
function loadCollaborations() {
  try {
    if (fs.existsSync(dataFilePath)) {
      const fileData = fs.readFileSync(dataFilePath, 'utf8');
      return JSON.parse(fileData);
    }
  } catch (error) {
    console.error('Error loading collaborations:', error);
  }
  return collaborationsStore;
}

// Save data to file (for local development)
function saveCollaborations(data: any) {
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

export async function GET() {
  try {
    let collaborations;
    
    if (process.env.NODE_ENV === 'production') {
      // Use in-memory store for production
      collaborations = collaborationsStore;
    } else {
      // Use file system for local development
      collaborations = loadCollaborations();
    }
    
    return NextResponse.json(collaborations);
  } catch (error) {
    console.error('Error fetching collaborations:', error);
    return NextResponse.json(
      { error: 'Failed to fetch collaborations' },
      { status: 500 }
    );
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
    
    if (process.env.NODE_ENV === 'production') {
      // Update in-memory store for production
      collaborationsStore = data;
    } else {
      // Save to file for local development
      saveCollaborations(data);
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
