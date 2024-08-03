import { AuthStoreProvider } from '@/providers/AuthStoreProvider';
import QueryProvider from '@/providers/QueryProvider';
import { SnackBarContextProvider } from '@/providers/SnackBarContext';
import SupabaseProvider from '@/providers/SupabaseProvider';
import type { StrictPropsWithChildren } from '@/types/common';

const ProvidersLayout = async ({ children }: StrictPropsWithChildren) => {
  return (
    <QueryProvider>
      <SupabaseProvider>
        <AuthStoreProvider>
          <SnackBarContextProvider>{children}</SnackBarContextProvider>
        </AuthStoreProvider>
      </SupabaseProvider>
    </QueryProvider>
  );
};

export default ProvidersLayout;
