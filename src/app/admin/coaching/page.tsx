import { CoachingEditor } from '@/components/admin/AdminEditors';
import { getCoachingContent } from '@/lib/content';

export default async function AdminCoachingPage() {
  const coaching = await getCoachingContent();
  return <CoachingEditor initialData={coaching} />;
}
