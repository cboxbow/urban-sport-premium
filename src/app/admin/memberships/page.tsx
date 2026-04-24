import { MembershipsEditor } from '@/components/admin/AdminEditors';
import { getMemberships } from '@/lib/content';

export default async function AdminMembershipsPage() {
  const memberships = await getMemberships();
  return <MembershipsEditor initialData={memberships} />;
}
