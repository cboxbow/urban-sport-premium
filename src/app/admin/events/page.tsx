import { EventsEditor } from '@/components/admin/AdminEditors';
import { getEventsContent } from '@/lib/content';

export default async function AdminEventsPage() {
  const events = await getEventsContent();
  return <EventsEditor initialData={events} />;
}
