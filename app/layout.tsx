import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Car Rental Dashboard',
  description: 'Day-wise car rental bookings with next-day reminders',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="container">
          <header className="header">
            <h1>Car Rental Dashboard</h1>
            <p className="subtitle">Day-wise bookings and next-day reminders</p>
          </header>
          <main>{children}</main>
          <footer className="footer">? {new Date().getFullYear()} Car Rentals</footer>
        </div>
      </body>
    </html>
  );
}
