import { supabase } from '@/utils/supabase/supabaseClient';
import { useMutation } from '@tanstack/react-query';

export const useGetWorkspaceIdWithInviteCode = ({ ...options }) => {
  return useMutation({
    mutationFn: async (inviteCode: string) => {
      const { data, error } = await supabase
        .from('workspace')
        .select('id')
        .eq('invite_code', Number(inviteCode))
        .single();

      if (error) throw error;
      return data.id;
    },
    ...options
  });
};

type UpdateWorkspaceUserProps = { workspaceId: number; userId: string };

export const useUpdateWorkspaceUser = ({ ...options }) => {
  return useMutation({
    mutationFn: async ({ workspaceId, userId }: UpdateWorkspaceUserProps) => {
      const { error } = await supabase
        .from('workspace_user')
        .update({ workspace_id: workspaceId })
        .eq('user_id', userId);

      if (error) throw error;
    },
    ...options
  });
};

type GetWorkspaceIdProps = { userId: string };

export const useGetWorkspaceId = ({ ...options }) => {
  return useMutation({
    mutationFn: async ({ userId }: GetWorkspaceIdProps) => {
      const { data, error } = await supabase
        .from('workspace_user')
        .select('workspace_id, id')
        .eq('user_id', userId)
        .single();

      if (error) throw error;

      return { workspaceId: data.workspace_id, workspaceUserId: data.id };
    },
    ...options
  });
};
