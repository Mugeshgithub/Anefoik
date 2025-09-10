import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// Global store that persists across requests
declare global {
  var showDataStore: any;
}

// In-memory store for production (Vercel serverless functions)
if (!global.showDataStore) {
  global.showDataStore = {
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
}

const showDataStore = global.showDataStore;

const SHOW_DATA_FILE = path.join(process.cwd(), 'data/show.json');
const isProduction = process.env.NODE_ENV === 'production';

// GET - Load current show data
export async function GET() {
  try {
    if (isProduction) {
      // In production, use in-memory store
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
      console.log('Show data updated in production:', showData);
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
