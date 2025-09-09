import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// In-memory store for production (Vercel serverless functions)
let showDataStore: any = {
  isActive: true,
  title: "Live Performance at Blue Note Paris",
  date: "January 15, 2025",
  time: "8:00 PM",
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
    },
    {
      name: "Marcus Williams",
      role: "Saxophonist",
      social: "@marcuswilliams"
    }
  ]
};

const SHOW_DATA_FILE = path.join(process.cwd(), 'data/show.json');
const isProduction = process.env.NODE_ENV === 'production';

// GET - Load current show data
export async function GET() {
  try {
    if (isProduction) {
      // Try to load from file first, fallback to in-memory store
      try {
        if (fs.existsSync(SHOW_DATA_FILE)) {
          const fileContent = fs.readFileSync(SHOW_DATA_FILE, 'utf8');
          const showData = JSON.parse(fileContent);
          if (showData && showData.title !== undefined) {
            // Update in-memory store with file data
            showDataStore = showData;
            return NextResponse.json(showData);
          }
        }
      } catch (fileError) {
        console.error('Error loading show data from file:', fileError);
      }
      // Fallback to in-memory store
      return NextResponse.json(showDataStore);
    } else {
      // In development, read from file
      const fileContent = fs.readFileSync(SHOW_DATA_FILE, 'utf8');
      const showData = JSON.parse(fileContent);
      return NextResponse.json(showData);
    }
  } catch (error) {
    console.error('Error loading show data:', error);
    // Fallback to default data
    return NextResponse.json(showDataStore);
  }
}

// POST - Update show data
export async function POST(request: NextRequest) {
  try {
    const showData = await request.json();
    
    // Validate required fields
    if (typeof showData.isActive !== 'boolean') {
      return NextResponse.json({ error: 'isActive must be a boolean' }, { status: 400 });
    }

    if (isProduction) {
      // In production, update memory store
      showDataStore = { ...showData };
      // Also save to file for persistence
      try {
        fs.writeFileSync(SHOW_DATA_FILE, JSON.stringify(showData, null, 2), 'utf8');
      } catch (fileError) {
        console.error('Error saving show data to file:', fileError);
      }
      return NextResponse.json({ success: true, message: 'Show data updated successfully' });
    } else {
      // In development, write to file
      fs.writeFileSync(SHOW_DATA_FILE, JSON.stringify(showData, null, 2), 'utf8');
      return NextResponse.json({ success: true, message: 'Show data updated successfully' });
    }
  } catch (error) {
    console.error('Error updating show data:', error);
    return NextResponse.json({ error: 'Failed to update show data' }, { status: 500 });
  }
}
