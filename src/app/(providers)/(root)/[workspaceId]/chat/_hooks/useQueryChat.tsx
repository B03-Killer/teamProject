import api from '@/api';
import type { GetChatMessagesProps } from '@/types/chat';
import { useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from '../_constants/constants';
import type { GetSearchWorkspaceUsersProps } from '@/types/workspaceUser';
import type { GetChatChannelsProps, GetUsersInChannelRequestProps } from '@/types/channel';
import { getGroupChannelName, getLatestNotice, getUsersInChannel } from '../_utils/getQueryOptions';

export const useGetChatChannels = ({ workspace_id, workspace_user_id }: GetChatChannelsProps) => {
  return useQuery({
    queryKey: QUERY_KEYS.CHAT_CHANNELS({ workspaceId: workspace_id, workspaceUserId: workspace_user_id }),
    queryFn: () => api.channel.getChatChannels({ workspace_id, workspace_user_id }),
    refetchOnWindowFocus: false
  });
};

export const useGetChatMessages = ({ channel_id }: GetChatMessagesProps) => {
  return useQuery({
    queryKey: QUERY_KEYS.CHAT_MESSAGES(channel_id),
    queryFn: () => api.chat.getChatMessages({ channel_id }),
    refetchOnWindowFocus: false
  });
};

export const useGetSearchWorkspaceUsers = ({ workspace_id, term, workspace_user_id }: GetSearchWorkspaceUsersProps) => {
  return useQuery({
    queryKey: QUERY_KEYS.SEARCH_WORKSPACE_USERS(workspace_id, term),
    queryFn: () => api.workspace.getSearchWorkspaceUsers({ workspace_id, term, workspace_user_id }),
    refetchOnWindowFocus: false
  });
};

export const useGetUsersInChannel = ({ channel_id, workspace_user_id }: GetUsersInChannelRequestProps) => {
  return useQuery(getUsersInChannel({ channelId: channel_id, workspaceUserId: workspace_user_id }));
};

export const useGetGroupChannelName = ({ id }: { id: number }) => {
  return useQuery(getGroupChannelName(id));
};

export const useGetLatestNotice = ({ id }: { id: string }) => {
  return useQuery(getLatestNotice(id));
};
