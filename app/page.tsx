import { addDays, format, isSameDay, parseISO } from 'date-fns';
import NextDayReminder from '../components/NextDayReminder';
import BookingsTable from '../components/BookingsTable';

export type Booking = {
  id: string;
  customerName: string;
  carModel: string;
  pickupDate: string; // ISO string
  returnDate: string; // ISO string
  pickupLocation: string;
  status: 'confirmed' | 'pending' | 'cancelled';
};

async function fetchBookings(): Promise<Booking[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL ?? ''}/api/bookings`, { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed to fetch bookings');
  return res.json();
}

function groupByPickupDate(bookings: Booking[]) {
  const groups = new Map<string, Booking[]>();
  for (const b of bookings) {
    const key = format(parseISO(b.pickupDate), 'yyyy-MM-dd');
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key)!.push(b);
  }
  return groups;
}

function sortDateKeysAsc(keys: string[]) {
  return keys.sort((a, b) => (a < b ? -1 : a > b ? 1 : 0));
}

export default async function Page() {
  const bookings = await fetchBookings();
  const groups = groupByPickupDate(bookings);
  const keys = sortDateKeysAsc(Array.from(groups.keys()));

  const today = new Date();
  const tomorrowKey = format(addDays(today, 1), 'yyyy-MM-dd');
  const tomorrowBookings = groups.get(tomorrowKey) ?? [];

  const totalToday = bookings.filter(b => isSameDay(parseISO(b.pickupDate), today)).length;
  const totalWeek = bookings.filter(b => parseISO(b.pickupDate) >= addDays(today, -3) && parseISO(b.pickupDate) <= addDays(today, 3)).length;
  const pending = bookings.filter(b => b.status === 'pending').length;
  const confirmed = bookings.filter(b => b.status === 'confirmed').length;

  return (
    <div className="stack">
      <NextDayReminder dateKey={tomorrowKey} bookings={tomorrowBookings} />

      <section className="kpis">
        <div className="kpi"><div className="label">Today Pickups</div><div className="value">{totalToday}</div></div>
        <div className="kpi"><div className="label">This Week (?3d)</div><div className="value">{totalWeek}</div></div>
        <div className="kpi"><div className="label">Confirmed</div><div className="value">{confirmed}</div></div>
        <div className="kpi"><div className="label">Pending</div><div className="value">{pending}</div></div>
      </section>

      {keys.map(key => (
        <section key={key} className="card">
          <div className="sectionHeader">
            <h2 className="sectionTitle">{format(parseISO(key), 'EEEE, MMM d')}</h2>
            <span className="badge blue">{groups.get(key)?.length ?? 0} bookings</span>
          </div>
          <BookingsTable bookings={groups.get(key) ?? []} />
        </section>
      ))}
    </div>
  );
}
