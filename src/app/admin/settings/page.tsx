import { SettingsEditor } from '@/components/admin/AdminEditors';
import { getSiteSettings } from '@/lib/content';

export default async function AdminSettingsPage() {
  const settings = await getSiteSettings();
  return <SettingsEditor initialData={settings} />;
}
