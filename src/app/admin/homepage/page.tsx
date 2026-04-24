import { HomepageEditor } from '@/components/admin/AdminEditors';
import { getHomepageContent } from '@/lib/content';

export default async function AdminHomepagePage() {
  const homepage = await getHomepageContent();
  return <HomepageEditor initialData={homepage} />;
}
