import { render } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ModalProvider } from '@/context/ModalContext';
import { SnackbarProvider } from '@/context/SnackbarContext';
import NewContactModal from './NewEditContactModal';

const queryClient = new QueryClient();

describe('NewContactModal', () => {
  it('matches snapshot', () => {
    const { asFragment } = render(
      <QueryClientProvider client={queryClient}>
        <ModalProvider>
          <SnackbarProvider>
            <NewContactModal />
          </SnackbarProvider>
        </ModalProvider>
      </QueryClientProvider>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders without crashing', () => {
    const { container } = render(
      <QueryClientProvider client={queryClient}>
        <ModalProvider>
          <SnackbarProvider>
            <NewContactModal />
          </SnackbarProvider>
        </ModalProvider>
      </QueryClientProvider>,
    );
    expect(container).toBeTruthy();
  });
});
