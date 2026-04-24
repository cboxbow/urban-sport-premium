import { TournamentsEditor } from '@/components/admin/AdminEditors';
import { getClubs, getTournaments } from '@/lib/content';

export default async function AdminTournamentsPage() {
  const [tournaments, clubs] = await Promise.all([getTournaments(), getClubs()]);
  return <TournamentsEditor initialData={tournaments} clubs={clubs} />;
}
