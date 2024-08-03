import { supabase } from '@/utils/supabase/supabaseClient';
import { useMutation, UseMutationOptions, useQuery, UseQueryOptions } from '@tanstack/react-query';

type GetWorkspaceUserIdOptions = {
  userId: string;
} & Omit<UseQueryOptions<string>, 'queryKey' | 'queryFn'>;

export const getWorkspaceUserId = ({ userId, ...options }: GetWorkspaceUserIdOptions) => {
  return useQuery({
    queryKey: ['getWorkspaceUserId'],
    queryFn: async () => {
      const { data, error } = await supabase.from('workspace_user').select('id').eq('user_id', userId).single();

      if (error) {
        throw error;
      }

      return data.id;
    },
    ...options
  });
};

type CreateWorkspaceOptions = {
  orgName: string;
  workspaceUserId: string;
  inviteCode: number;
};

type CreateWorkspaceProps = Omit<UseMutationOptions<number, Error, CreateWorkspaceOptions>, 'mutationFn'>;

export const useCreateWorkspace = ({ ...options }: CreateWorkspaceProps) => {
  return useMutation<number, Error, CreateWorkspaceOptions>({
    mutationFn: async ({ orgName, inviteCode, workspaceUserId }: CreateWorkspaceOptions) => {
      const { data, error } = await supabase
        .from('workspace')
        .insert({
          name: orgName,
          invite_code: inviteCode,
          admin_user_id: workspaceUserId
        })
        .select('id')
        .single();

      if (error) {
        throw error;
      }

      return data.id;
    },
    ...options
  });
};

type UpdateWorkspaceIdOptions = { workspaceId: number; userId: string };

export const useUpdateWorkspaceId = () => {
  return useMutation({
    mutationFn: async ({ workspaceId, userId }: UpdateWorkspaceIdOptions) => {
      const { error } = await supabase
        .from('workspace_user')
        .update({ workspace_id: workspaceId })
        .eq('user_id', userId);

      if (error) {
        throw error;
      }
    }
  });
};
