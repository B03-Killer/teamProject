'use client';

import { useEffect, useMemo, useRef } from 'react';
import Chats from '../Chats';
import { useParams } from 'next/navigation';
import { useGetChatMessages } from '../../../_hooks/useQueryChat';
import { handleSubscribeToChat } from '../../../_utils/subscribe';
import { MessagesWrapper } from '../MessagesContainer';
import { useChatHandlers } from '../../_hook/useChatHandlers';
import { useQueryClient } from '@tanstack/react-query';
import { QUERY_KEYS } from '../../../_constants/constants';
import { GetUsersInChannelResponse } from '@/types/channel';

const Messages = () => {
  const { id } = useParams();
  const queryClient = useQueryClient();

  const channelId = Array.isArray(id) ? id[0] : id;
  const containerRef = useRef<HTMLDivElement>(null);

  const { data: chatMessages = [], isPending } = useGetChatMessages({
    channel_id: Number(channelId)
  });

  const { payloadMessages, handleMessagesUpdates, handleUserUpdates } = useChatHandlers();

  const usersInChannel =
    queryClient.getQueryData<GetUsersInChannelResponse>(QUERY_KEYS.USERS_IN_CHANNEL(Number(channelId))) || {};

  const userIds = useMemo(() => {
    return Object.keys(usersInChannel).join(',');
  }, [usersInChannel]);

  useEffect(() => {
    if (!containerRef.current) return;

    containerRef.current.scrollIntoView({ block: 'end' });
  }, [isPending, payloadMessages]);

  useEffect(() => {
    if (!userIds || !channelId) return;

    handleSubscribeToChat({
      handleMessagesUpdates: handleMessagesUpdates({ channelId }),
      handleUserUpdates: handleUserUpdates({ channelId }),
      id: channelId,
      userIds
    });
  }, [userIds, channelId]);

  return (
    <MessagesWrapper ref={containerRef}>
      <Chats data={chatMessages} usersInChannel={usersInChannel} />
      <Chats data={payloadMessages} usersInChannel={usersInChannel} />
    </MessagesWrapper>
  );
};

export default Messages;
