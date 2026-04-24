import { getBookingRequests, getEventInquiries } from '@/lib/content';

export default async function AdminBookingRequestsPage() {
  const [bookingRequests, eventInquiries] = await Promise.all([getBookingRequests(), getEventInquiries()]);

  return (
    <div className="admin-page grid gap-6">
      <section className="surface-panel p-6">
        <div className="text-xs uppercase tracking-[0.24em] text-[#d4af37]">Booking requests</div>
        <div className="mt-5 overflow-hidden rounded-[1.5rem] border border-white/8">
          <table className="data-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Club</th>
                <th>Date</th>
                <th>Slot</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {bookingRequests.map((item) => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>{item.clubSlug}</td>
                  <td>{item.date}</td>
                  <td>{item.preferredSlot}</td>
                  <td>{item.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="surface-panel p-6">
        <div className="text-xs uppercase tracking-[0.24em] text-[#d4af37]">Event inquiries</div>
        <div className="mt-5 overflow-hidden rounded-[1.5rem] border border-white/8">
          <table className="data-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Type</th>
                <th>Email</th>
                <th>Guests</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {eventInquiries.map((item) => (
                <tr key={item.id}>
                  <td>{item.fullName}</td>
                  <td>{item.inquiryType}</td>
                  <td>{item.email}</td>
                  <td>{item.expectedGuests}</td>
                  <td>{item.preferredDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
