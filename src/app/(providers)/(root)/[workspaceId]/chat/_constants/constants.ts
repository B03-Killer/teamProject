type ChatChannelsProps = {
  workspaceId: number | null;
  workspaceUserId: string | null;
};

export const QUERY_KEYS = {
  CHAT_CHANNELS: ({ workspaceId, workspaceUserId }: ChatChannelsProps) => [
    'chatChannels',
    workspaceId,
    workspaceUserId
  ],
  CHAT_MESSAGES: (channel_id: number) => ['chatMessages', channel_id],
  SEARCH_WORKSPACE_USERS: (workspace_id: number | null, term: string) => ['searchWorkspaceUsers', workspace_id, term],
  USERS_IN_CHANNEL: (channel_id: number) => ['usersInChannel', channel_id],
  EXISTING_CHANNEL_ID: ['existingChannelId'],
  CHANNEL_NAME: (id: number) => ['channelName', id],
  LATEST_NOTICE: (id: string) => ['latestNotice', id]
};

export const REALTIME_CHANNEL_NAME = {
  CHANNEL_LIST: 'channel_list',
  CHAT: 'chat',
  CHAT_FOR_NOTICE: 'chat_for_notice'
};
