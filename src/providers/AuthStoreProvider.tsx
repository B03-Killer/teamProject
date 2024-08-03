'use client';

import { createContext, useRef, useContext, useEffect } from 'react';
import { useStore } from 'zustand';
import { type AuthStoreTypes, createAuthStore } from '@/store/authStore';
import { createClient } from '@/utils/supabase/supabaseClient';
import type { StrictPropsWithChildren } from '@/types/common';

export type AuthStoreApi = ReturnType<typeof createAuthStore>;
export const AuthStoreContext = createContext<AuthStoreApi | undefined>(undefined);

export const AuthStoreProvider = ({ children }: StrictPropsWithChildren) => {
  const storeRef = useRef<AuthStoreApi>();
  const supabase = createClient();

  if (!storeRef.current) {
    storeRef.current = createAuthStore();
  }

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange((_, session) => {
      if (!session || !storeRef.current) return;

      storeRef.current.getState().login(session.user);
    });

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, [supabase.auth]);

  return <AuthStoreContext.Provider value={storeRef.current}>{children}</AuthStoreContext.Provider>;
};

export const useAuthStore = <T,>(selector: (store: AuthStoreTypes) => T): T => {
  const authStoreContext = useContext(AuthStoreContext);

  if (!authStoreContext) {
    throw new Error(`useAuthStore must be used within AuthStoreProvider`);
  }

  return useStore(authStoreContext, selector);
};
