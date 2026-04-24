import { SponsorsEditor } from '@/components/admin/AdminEditors';
import { getSponsors } from '@/lib/content';

export default async function AdminSponsorsPage() {
  const sponsors = await getSponsors();
  return <SponsorsEditor initialData={sponsors} />;
}
