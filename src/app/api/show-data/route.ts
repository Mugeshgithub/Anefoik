import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const SHOW_DATA_FILE = path.join(process.cwd(), 'data/show.json');

// GET - Load current show data
export async function GET() {
  try {
    // Read the JSON file
    const fileContent = fs.readFileSync(SHOW_DATA_FILE, 'utf8');
    const showData = JSON.parse(fileContent);
    
    return NextResponse.json(showData);
  } catch (error) {
    console.error('Error loading show data:', error);
    return NextResponse.json({ error: 'Failed to load show data' }, { status: 500 });
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

    // Write the updated data to the JSON file
    fs.writeFileSync(SHOW_DATA_FILE, JSON.stringify(showData, null, 2), 'utf8');
    
    return NextResponse.json({ success: true, message: 'Show data updated successfully' });
  } catch (error) {
    console.error('Error updating show data:', error);
    return NextResponse.json({ error: 'Failed to update show data' }, { status: 500 });
  }
}
