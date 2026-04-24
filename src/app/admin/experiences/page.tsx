import { ExperiencesEditor } from '@/components/admin/AdminEditors';
import { getExperiencesContent } from '@/lib/content';

export default async function AdminExperiencesPage() {
  const experiences = await getExperiencesContent();
  return <ExperiencesEditor initialData={experiences} />;
}
