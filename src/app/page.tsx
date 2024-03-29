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
import { ModalProvider } from '@/context/ModalContext';
import { SnackbarProvider } from '@/context/SnackbarContext';
import { FavoritesProvider } from '@/context/FavoritesContext';
import { SortingProvider } from '@/context/SortingContext';
import { SearchProvider } from '@/context/SearchContext';

export default async function Home() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['contacts'],
    queryFn: getContacts,
  });

  return (
    <main className={styles.main}>
      <AppHeader text="Contact List" />
      <SearchProvider>
        <SearchInput />
        <FavoritesProvider>
          <SortingProvider>
            <div className={styles.sortingWrapper}>
              <ToggleFavorite />
              <SortOrderSelect />
            </div>
            <div className={styles['cards-wrapper']}>
              <HydrationBoundary state={dehydrate(queryClient)}>
                <ModalProvider>
                  {/* MUI Provider*/}
                  <SnackbarProvider>
                    {/* MUI Provider*/}
                    <NewEditContactModal />
                    <CardsLayout />
                  </SnackbarProvider>
                </ModalProvider>
              </HydrationBoundary>
            </div>
          </SortingProvider>
        </FavoritesProvider>
      </SearchProvider>
    </main>
  );
}
