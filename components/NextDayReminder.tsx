import { format, parseISO } from 'date-fns';
import type { Booking } from '../app/page';

export default function NextDayReminder({ dateKey, bookings }: { dateKey: string; bookings: Booking[] }) {
  return (
    <section className="card" aria-live="polite">
      <div className="sectionHeader">
        <h2 className="sectionTitle">Next-Day Reminder</h2>
        <span className="badge green">{bookings.length} due</span>
      </div>
      {bookings.length > 0 ? (
        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: 8 }}>
          {bookings.map(b => (
            <li key={b.id} className="row" style={{ justifyContent: 'space-between' }}>
              <div className="row" style={{ gap: 10 }}>
                <span className="badge">{b.id}</span>
                <div>
                  <div style={{ fontWeight: 600 }}>{b.customerName}</div>
                  <div style={{ color: '#7f8ab0', fontSize: 12 }}>{b.carModel} ? {b.pickupLocation}</div>
                </div>
              </div>
              <div className="row" style={{ gap: 8 }}>
                <span className="badge blue">Pickup {format(parseISO(b.pickupDate), 'MMM d, p')}</span>
                <span className="badge">Return {format(parseISO(b.returnDate), 'MMM d, p')}</span>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div style={{ color: '#7f8ab0' }}>No bookings scheduled for tomorrow.</div>
      )}
    </section>
  );
}
