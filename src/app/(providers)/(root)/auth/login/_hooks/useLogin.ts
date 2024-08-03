import { supabase } from '@/utils/supabase/supabaseClient';
import { useMutation } from '@tanstack/react-query';

type SignInMutationProps = { email: string; password: string };

export const useSignInMutation = ({ ...options }) => {
  return useMutation({
    mutationFn: async ({ email, password }: SignInMutationProps) => {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error || !data.user) throw error;
      return data.user;
    },
    ...options
  });
};

export const useGetWorkspaceIdMutation = ({ ...options }) => {
  return useMutation({
    mutationFn: async (userId: string) => {
      const { data, error } = await supabase
        .from('workspace_user')
        .select('workspace_id')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
        .limit(1)
        .single();

      if (error) throw error;
      return data.workspace_id;
    },
    ...options
  });
};
