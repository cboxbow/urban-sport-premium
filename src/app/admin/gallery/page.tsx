import { GalleryEditor } from '@/components/admin/AdminEditors';
import { getGallery } from '@/lib/content';

export default async function AdminGalleryPage() {
  const gallery = await getGallery();
  return <GalleryEditor initialData={gallery} />;
}
