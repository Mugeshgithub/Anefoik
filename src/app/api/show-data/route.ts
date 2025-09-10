import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { getShowData, saveShowData } from '@/lib/kv-storage';

const SHOW_DATA_FILE = path.join(process.cwd(), 'data/show.json');
const isProduction = process.env.NODE_ENV === 'production';

// GET - Load current show data
export async function GET() {
  try {
    if (isProduction) {
      // In production, use Vercel KV storage
      const showData = await getShowData();
      return NextResponse.json(showData);
    } else {
      // In development, read from file
      const fileContent = fs.readFileSync(SHOW_DATA_FILE, 'utf8');
      const showData = JSON.parse(fileContent);
      return NextResponse.json(showData);
    }
  } catch (error) {
    console.error('Error loading show data:', error);
    // Fallback to default data
    const showData = await getShowData();
    return NextResponse.json(showData);
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
      // In production, save to Vercel KV
      const success = await saveShowData(showData);
      if (success) {
        return NextResponse.json({ success: true, message: 'Show data updated successfully' });
      } else {
        return NextResponse.json({ error: 'Failed to save show data' }, { status: 500 });
      }
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
