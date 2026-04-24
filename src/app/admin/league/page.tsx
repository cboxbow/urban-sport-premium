import { LeagueEditor } from '@/components/admin/AdminEditors';
import { getLeagueContent } from '@/lib/content';

export default async function AdminLeaguePage() {
  const league = await getLeagueContent();
  return <LeagueEditor initialData={league} />;
}
