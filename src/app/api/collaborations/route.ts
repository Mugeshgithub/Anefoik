import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// In-memory store for production (Vercel serverless functions)
let collaborationsStore = {
  isActive: true,
  collaborations: []
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
