import AppHeader from '@/components/Header/Header';
import styles from './page.module.css';
import SearchInput from '@/components/SearchInput/SearchInput';
import ToggleFavorite from '@/components/ToggleFavorite/ToggleFavorite';
import SortOrderSelect from '@/components/SortOrderSelect/SortOrderSelect';
import NewEditContactModal from '@/components/NewEditContactModal/NewEditContactModal';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { getContacts } from '@/api';
import CardsLayout from '@/client-side-components/CardsLayout';

export default async function Home() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['contacts'],
    queryFn: getContacts,
  });

  return (
    <main className={styles.main}>
      <AppHeader text="Contact List" />
      <SearchInput />
      <div className={styles.sortingWrapper}>
        <ToggleFavorite />
        <SortOrderSelect />
      </div>
      <div className={styles['cards-wrapper']}>
        <NewEditContactModal />
        <HydrationBoundary state={dehydrate(queryClient)}>
          <CardsLayout />
        </HydrationBoundary>
      </div>
    </main>
  );
}
