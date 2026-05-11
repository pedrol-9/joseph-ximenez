import { list } from '@vercel/blob';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const { blobs } = await list({ prefix: 'sr_rodriguez/' });
    return NextResponse.json({ blobs });
  } catch (error) {
    console.error("Error fetching blobs:", error);
    return NextResponse.json(
      { error: 'Failed to load images from Vercel Blob' },
      { status: 500 }
    );
  }
}
