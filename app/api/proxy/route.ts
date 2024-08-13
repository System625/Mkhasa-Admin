import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const path = searchParams.get('path');
  const adminId = searchParams.get('adminId');

  if (!process.env.BASE_URL) {
    return NextResponse.json({ error: 'BASE_URL is not defined' }, { status: 500 });
  }

  try {
    const response = await fetch(`${process.env.BASE_URL}/${path}/${adminId}`);
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json({ error: 'An error occurred while fetching data' }, { status: 500 });
  }
}