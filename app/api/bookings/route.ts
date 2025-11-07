import { NextResponse } from 'next/server';
import { getAllBookings } from '../../../lib/bookings';

export const dynamic = 'force-dynamic';

export async function GET() {
  const bookings = getAllBookings();
  return NextResponse.json(bookings);
}
