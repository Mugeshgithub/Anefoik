import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { getShowData, saveShowData } from '@/lib/redis-cloud-storage';

const SHOW_DATA_FILE = path.join(process.cwd(), 'data/show.json');
const isProduction = process.env.NODE_ENV === 'production';

// Default show data
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

// GET - Load current show data
export async function GET() {
  try {
    // Always use simple storage (works in both production and development)
    const showData = await getShowData();
    return NextResponse.json(showData);
  } catch (error) {
    console.error('Error loading show data:', error);
    return NextResponse.json(defaultShowData);
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

    // Always use simple storage (works in both production and development)
    console.log('Saving show data:', showData);
    const success = await saveShowData(showData);
    console.log('Save result:', success);
    if (success) {
      return NextResponse.json({ success: true, message: 'Show data updated successfully' });
    } else {
      console.error('Failed to save show data');
      return NextResponse.json({ error: 'Failed to save show data' }, { status: 500 });
    }
  } catch (error) {
    console.error('Error updating show data:', error);
    return NextResponse.json({ error: 'Failed to update show data' }, { status: 500 });
  }
}
