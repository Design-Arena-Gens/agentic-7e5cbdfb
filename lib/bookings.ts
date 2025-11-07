import { addDays, addHours, formatISO, setHours, setMinutes, startOfDay } from 'date-fns';

export type Booking = {
  id: string;
  customerName: string;
  carModel: string;
  pickupDate: string; // ISO
  returnDate: string; // ISO
  pickupLocation: string;
  status: 'confirmed' | 'pending' | 'cancelled';
};

const customers = ['Alice Johnson', 'Bob Smith', 'Carlos Diaz', 'Dana Lee', 'Evan Patel', 'Fatima Noor', 'Grace Kim', 'Henry Zhao'];
const cars = ['Toyota Corolla', 'Honda Civic', 'Ford Focus', 'Tesla Model 3', 'BMW 3 Series', 'Audi A4', 'Hyundai Elantra', 'Kia Optima'];
const locations = ['Downtown', 'Airport', 'City Center', 'West Branch'];
const statuses: Booking['status'][] = ['confirmed', 'pending', 'confirmed', 'confirmed', 'pending', 'cancelled'];

function slot(dayOffset: number, hour: number) {
  const base = startOfDay(new Date());
  const d = addDays(base, dayOffset);
  const h = setHours(d, hour);
  const m = setMinutes(h, 0);
  return m;
}

function makeBooking(i: number, dayOffset: number, startHour: number, durationHours: number): Booking {
  const pickup = slot(dayOffset, startHour);
  const ret = addHours(pickup, durationHours);
  return {
    id: `BK-${String(1000 + i)}`,
    customerName: customers[i % customers.length],
    carModel: cars[(i * 3) % cars.length],
    pickupDate: formatISO(pickup),
    returnDate: formatISO(ret),
    pickupLocation: locations[(i * 2) % locations.length],
    status: statuses[i % statuses.length],
  };
}

export function getAllBookings(): Booking[] {
  // A curated set across yesterday..next 6 days
  const items: Booking[] = [];
  let i = 0;
  const plan: Array<[number, number, number]> = [
    [-1, 9, 6], [-1, 14, 4],
    [0, 8, 5], [0, 10, 8], [0, 16, 3],
    [1, 9, 6], [1, 11, 4], [1, 15, 5],
    [2, 10, 6], [2, 13, 3],
    [3, 9, 4],
    [4, 12, 6], [4, 17, 2],
    [5, 8, 5],
    [6, 14, 4],
  ];
  for (const [d, h, dur] of plan) items.push(makeBooking(i++, d, h, dur));
  return items.sort((a, b) => a.pickupDate.localeCompare(b.pickupDate));
}
