import { ShopEditor } from '@/components/admin/AdminEditors';
import { getShopContent } from '@/lib/content';

export default async function AdminShopPage() {
  const shop = await getShopContent();
  return <ShopEditor initialData={shop} />;
}
