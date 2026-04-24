import Link from 'next/link';
import { getDashboardSummary } from '@/lib/content';

export default async function AdminDashboard() {
  const summary = await getDashboardSummary();

  return (
    <div className="p-6 md:p-8">
      <div className="mb-8 flex flex-col gap-3">
        <div className="text-xs uppercase tracking-[0.28em] text-[#ffb300]">Admin overview</div>
        <h1 className="font-display text-5xl uppercase tracking-[0.1em] text-white">Dashboard</h1>
        <div className="rounded-[1.5rem] border border-[#ffb300]/30 bg-[#ffb300]/10 px-4 py-4 text-sm text-white/72">
          Protected local admin for content, media, tournaments, memberships, sponsors, and booking requests.
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        {[
          ['Clubs', String(summary.counts.clubs)],
          ['Tournaments', String(summary.counts.tournaments)],
          ['Gallery items', String(summary.counts.gallery)],
          ['Booking requests', String(summary.counts.bookingRequests)],
        ].map(([label, value]) => (
          <div key={label} className="rounded-[1.75rem] border border-white/8 bg-white/[0.03] p-5">
            <div className="font-display text-5xl uppercase tracking-[0.12em] text-[#ffb300]">{value}</div>
            <div className="mt-2 text-xs uppercase tracking-[0.2em] text-white/42">{label}</div>
          </div>
        ))}
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {[
          ['/admin/homepage', 'Edit homepage'],
          ['/admin/clubs', 'Manage clubs'],
          ['/admin/coaching', 'Manage coaching'],
          ['/admin/experiences', 'Manage experiences'],
          ['/admin/tournaments', 'Manage tournaments'],
          ['/admin/event-inquiries', 'View event inquiries'],
          ['/admin/shop', 'Manage shop'],
          ['/admin/league', 'Manage league'],
          ['/admin/settings', 'Update settings'],
        ].map(([href, label]) => (
          <Link key={href} href={href} className="surface-panel p-5 text-sm uppercase tracking-[0.18em] text-white/72 transition-colors hover:border-[#ffb300]/30 hover:text-white">
            {label}
          </Link>
        ))}
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <div className="rounded-[2rem] border border-white/8 bg-white/[0.03] p-6">
          <div className="text-xs uppercase tracking-[0.24em] text-[#ffb300]">Recent booking requests</div>
          <div className="mt-5 grid gap-3">
            {summary.recentBookingRequests.map((booking) => (
              <div key={booking.id} className="rounded-[1.25rem] border border-white/8 p-4">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <div className="text-white">{booking.name}</div>
                    <div className="mt-1 text-xs uppercase tracking-[0.18em] text-white/40">
                      {booking.clubSlug} | {booking.preferredSlot}
                    </div>
                  </div>
                  <div className="text-right text-sm text-[#ffb300]">{booking.date}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[2rem] border border-white/8 bg-white/[0.03] p-6">
          <div className="text-xs uppercase tracking-[0.24em] text-[#ffb300]">Recent inquiries</div>
          <div className="mt-5 grid gap-3">
            {summary.recentEventInquiries.map((item) => (
              <div key={item.id} className="rounded-[1.25rem] border border-white/8 p-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="text-white">{item.fullName}</div>
                    <div className="mt-1 text-xs uppercase tracking-[0.18em] text-white/40">
                      {item.inquiryType} | {item.expectedGuests || 'Guests TBD'}
                    </div>
                  </div>
                  <div className="text-right text-xs uppercase tracking-[0.18em] text-[#ffb300]">
                    {item.preferredDate || 'Date TBD'}
                  </div>
                </div>
                <div className="mt-3 grid gap-1 text-sm text-white/68">
                  <div>{item.email}</div>
                  <div>{item.phone || 'Phone not provided'}</div>
                  {item.companyName && <div>{item.companyName}</div>}
                  <div className="line-clamp-2 text-white/52">{item.message}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
