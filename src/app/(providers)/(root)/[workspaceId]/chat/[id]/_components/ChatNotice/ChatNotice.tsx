'use client';

import { useParams } from 'next/navigation';
import { BellIcon, ChevronDownIcon } from '@/icons';
import Typography from '@/components/Typography';
import Link from 'next/link';
import useWorkspaceId from '@/hooks/useWorkspaceId';
import { useChatHandlers } from '../../_hook/useChatHandlers';
import { useGetLatestNotice } from '../../../_hooks/useQueryChat';
import { isEmpty } from '@/utils/isEmpty';
import { useEffect } from 'react';
import { handleSubscribeToNotice } from '../../../_utils/subscribe';

const ChatNotice = () => {
  const { id } = useParams();
  const workspaceId = useWorkspaceId();
  const channelId = Array.isArray(id) ? id[0] : id;

  const { data: latestNotice } = useGetLatestNotice({ id: channelId });
  const { handleNoticeUpdates: handleUpdates } = useChatHandlers();

  useEffect(() => {
    if (!channelId) return;

    handleSubscribeToNotice({
      handler: handleUpdates({ latestNoticeId: latestNotice?.id, channelId }),
      id: channelId
    });
  }, [channelId, latestNotice?.id]);

  const isEmptyLatestNotice = isEmpty(latestNotice);
  if (isEmptyLatestNotice) return null;

  return (
    <>
      <Link
        href={`/${workspaceId}/chat/${channelId}/notice`}
        className="fixed top-0 left-0 right-0 mx-4 h-[34px] shadow-2xl rounded-[4px] flex items-center gap-1 bg-[#F7F7F7] py-2 px-3 z-30"
      >
        <BellIcon className="shrink-0" />
        <Typography
          variant="Body12px"
          color="grey500"
          className="flex-grow text-ellipsis whitespace-nowrap overflow-hidden"
        >
          {latestNotice.content}
        </Typography>
        <ChevronDownIcon className="w-4 h-4 stroke-grey500" />
      </Link>
      <div className="h-[34px] flex-shrink-0" />
    </>
  );
};

export default ChatNotice;
