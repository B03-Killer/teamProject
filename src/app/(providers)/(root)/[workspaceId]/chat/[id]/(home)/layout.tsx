import { StrictPropsWithChildren } from '@/types/common';
import { ContextMenuProvider } from '../_provider/ContextMenuProvider';
import ChatDetailLayout from '../_components/ChatDetailLayout';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { getGroupChannelName } from '../../_utils/getQueryOptions';

const ChatDetailHomeLayout = async ({
  children,
  params: { id }
}: StrictPropsWithChildren<{ params: { id: string } }>) => {
  const queryClient = new QueryClient();
  //TODO: workspaceUserId를 서버에서 받아야 SSR을 하던 말던 하..
  //const workspaceUserId = getWorkspaceUserId();

  await queryClient.prefetchQuery(getGroupChannelName(Number(id)));
  //await queryClient.prefetchQuery(getUsersInChannel({ channelId: Number(id), workspaceUserId: workspaceUserId || '' }));

  return (
    <ContextMenuProvider>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <ChatDetailLayout>{children}</ChatDetailLayout>
      </HydrationBoundary>
    </ContextMenuProvider>
  );
};

export default ChatDetailHomeLayout;
