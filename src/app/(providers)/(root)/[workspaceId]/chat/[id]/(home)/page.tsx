import ChatNotice from '../_components/ChatNotice';
import MessagesContainer from '../_components/MessagesContainer';
import Messages from '../_components/Messages';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import ChatDetailLayout from '../_components/ChatDetailLayout';
import { getGroupChannelName } from '../../_utils/getQueryOptions';
import { StrictPropsWithChildren } from '@/types/common';

const queryClient = new QueryClient();

const ChatDetailPage = async ({ params: { id } }: { params: { id: string } }) => {
  await queryClient.prefetchQuery(getGroupChannelName(Number(id)));

  // TODO : prefetch 할 컴포넌트는 layout 보다.. >> page
  //await queryClient.prefetchQuery(getUsersInChannel({ channelId: Number(id), workspaceUserId: workspaceUserId || '' }));

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ChatDetailLayout>
        <MessagesContainer>
          <ChatNotice />
          <Messages />
        </MessagesContainer>
      </ChatDetailLayout>
    </HydrationBoundary>
  );
};

export default ChatDetailPage;
