import { getEventInquiries } from '@/lib/content';

export default async function AdminEventInquiriesPage() {
  const inquiries = await getEventInquiries();

  return (
    <div className="p-6 md:p-8">
      <div className="mb-8 flex flex-col gap-3">
        <div className="text-xs uppercase tracking-[0.28em] text-[#ffb300]">Admin inquiries</div>
        <h1 className="font-display text-5xl uppercase tracking-[0.1em] text-white">Event Inquiries</h1>
        <div className="rounded-[1.5rem] border border-[#ffb300]/30 bg-[#ffb300]/10 px-4 py-4 text-sm text-white/72">
          Full list of event requests received from the public inquiry form.
        </div>
      </div>

      <div className="grid gap-4">
        {inquiries.length === 0 ? (
          <div className="rounded-[1.75rem] border border-white/8 bg-white/[0.03] p-6 text-white/55">
            No event inquiries yet.
          </div>
        ) : (
          inquiries.map((item) => (
            <article key={item.id} className="rounded-[1.75rem] border border-white/8 bg-white/[0.03] p-6">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                <div>
                  <div className="text-2xl text-white">{item.fullName}</div>
                  <div className="mt-2 text-xs uppercase tracking-[0.2em] text-[#ffb300]">
                    {item.inquiryType} | {item.status}
                  </div>
                </div>
                <div className="text-sm text-white/55">
                  {new Date(item.createdAt).toLocaleString('en-MU', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </div>
              </div>

              <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                <div className="rounded-[1.25rem] border border-white/8 bg-black/25 p-4">
                  <div className="text-xs uppercase tracking-[0.18em] text-white/40">Email</div>
                  <div className="mt-2 text-white">{item.email}</div>
                </div>
                <div className="rounded-[1.25rem] border border-white/8 bg-black/25 p-4">
                  <div className="text-xs uppercase tracking-[0.18em] text-white/40">Phone</div>
                  <div className="mt-2 text-white">{item.phone || 'Not provided'}</div>
                </div>
                <div className="rounded-[1.25rem] border border-white/8 bg-black/25 p-4">
                  <div className="text-xs uppercase tracking-[0.18em] text-white/40">Company</div>
                  <div className="mt-2 text-white">{item.companyName || 'Not provided'}</div>
                </div>
                <div className="rounded-[1.25rem] border border-white/8 bg-black/25 p-4">
                  <div className="text-xs uppercase tracking-[0.18em] text-white/40">Preferred date</div>
                  <div className="mt-2 text-white">{item.preferredDate || 'Not provided'}</div>
                </div>
                <div className="rounded-[1.25rem] border border-white/8 bg-black/25 p-4">
                  <div className="text-xs uppercase tracking-[0.18em] text-white/40">Expected guests</div>
                  <div className="mt-2 text-white">{item.expectedGuests || 'Not provided'}</div>
                </div>
              </div>

              <div className="mt-5 rounded-[1.25rem] border border-white/8 bg-black/25 p-4">
                <div className="text-xs uppercase tracking-[0.18em] text-white/40">Message</div>
                <p className="mt-3 whitespace-pre-wrap leading-8 text-white/82">{item.message}</p>
              </div>
            </article>
          ))
        )}
      </div>
    </div>
  );
}
