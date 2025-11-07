"use client";
import { format, parseISO } from 'date-fns';
import type { Booking } from '../app/page';

function StatusBadge({ status }: { status: Booking['status'] }) {
  const cls = status === 'confirmed' ? 'badge green' : status === 'pending' ? 'badge blue' : 'badge red';
  return <span className={cls}>{status}</span>;
}

export default function BookingsTable({ bookings }: { bookings: Booking[] }) {
  return (
    <div className="tableWrap">
      <table className="table">
        <thead>
          <tr>
            <th>Booking ID</th>
            <th>Customer</th>
            <th>Car</th>
            <th>Pickup</th>
            <th>Return</th>
            <th>Location</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map(b => (
            <tr key={b.id}>
              <td>{b.id}</td>
              <td>{b.customerName}</td>
              <td>{b.carModel}</td>
              <td>{format(parseISO(b.pickupDate), 'MMM d, yyyy p')}</td>
              <td>{format(parseISO(b.returnDate), 'MMM d, yyyy p')}</td>
              <td>{b.pickupLocation}</td>
              <td><StatusBadge status={b.status} /></td>
            </tr>
          ))}
          {bookings.length === 0 && (
            <tr>
              <td colSpan={7} style={{ color: '#7f8ab0', textAlign: 'center', padding: 16 }}>No bookings</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
