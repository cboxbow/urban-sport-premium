import { ClubsEditor } from '@/components/admin/AdminEditors';
import { getClubs } from '@/lib/content';

export default async function AdminClubsPage() {
  const clubs = await getClubs();
  return <ClubsEditor initialData={clubs} />;
}
