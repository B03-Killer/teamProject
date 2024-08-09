import { useGetUsersInChannel, useGetGroupChannelName } from '../../_hooks/useQueryChat';
import { useWorkspaceUserId } from '@/hooks/useWorkspaceUserId';
import { getDmChannelName } from '../../_utils/getChannelName';
import { getChannelId } from '../../_utils/getChannelId';

export const useGetChannelName = () => {
  const channelId = getChannelId();
  const workspaceUserId = useWorkspaceUserId();

  const { data: groupChannelName, isPending: isPendingGroupChannelName } = useGetGroupChannelName({ id: channelId });

  const { data: usersInChannel = {}, isPending: isPendingUsersInChannel } = useGetUsersInChannel({
    channel_id: channelId,
    workspace_user_id: workspaceUserId
  });

  if (isPendingGroupChannelName || isPendingUsersInChannel) return '';
  const dmChannelName = getDmChannelName(usersInChannel);

  return dmChannelName ?? groupChannelName ?? '';
};
