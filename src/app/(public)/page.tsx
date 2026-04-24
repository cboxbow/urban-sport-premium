import { getHomepageViewData } from '@/lib/site-content';
import HomeLanding from '@/components/home/HomeLanding';

export default async function HomePage() {
  const { clubs } = await getHomepageViewData();

  return <HomeLanding clubs={clubs} />;
}
