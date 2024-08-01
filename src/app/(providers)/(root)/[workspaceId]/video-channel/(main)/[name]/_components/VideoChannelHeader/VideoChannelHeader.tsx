import Typography from '@/components/Typography';
import useChannelUser from '@/hooks/useChannelUser';
import useWorkspaceId from '@/hooks/useWorkspaceId';
import ArrowLeftIcon from '@/icons/ArrowLeft.svg';
import LeaveIcon from '@/icons/LogOut.svg';
import useEnterdChannelStore from '@/store/enteredChannelStore';
import useStreamSetStore from '@/store/streamSetStore';
import useUserStore from '@/store/userStore';
import { useParams, useRouter } from 'next/navigation';
import { useCallback } from 'react';
import DisconnectButton from '../../../_components/DisconnectButton';
import { deleteChannel } from '../../_utils/videoChannelDelete';
const VideoChannelHeader = () => {
  const params = useParams();
  const router = useRouter();
  const name = decodeURIComponent(params.name as string);
  const workspaceId = useWorkspaceId();
  const { enteredChannelId } = useEnterdChannelStore();
  const { workspaceUserId } = useUserStore();
  const { setIsSettingOk } = useStreamSetStore();

  const workpaceUserIds: string[] = [workspaceUserId!];
  const { leaveChannel } = useChannelUser({ workspaceUserIds: workpaceUserIds, channelId: enteredChannelId! });

  const handleLeaveChannel = useCallback(() => {
    if (!workspaceUserId || !enteredChannelId) return;
    leaveChannel(workspaceUserId);
    deleteChannel(enteredChannelId);
    setIsSettingOk(false);
    router.push(`/${workspaceId}/chat`);
  }, [enteredChannelId]);

  return (
    <div className="flex items-center justify-between px-4 py-3 mt-[2px]">
      <ArrowLeftIcon className="size-7" onClick={() => router.back()} />
      <Typography color="grey700Black" variant="Title20px" as="h2">
        {name}
      </Typography>
      <DisconnectButton onClick={handleLeaveChannel}>
        <LeaveIcon />
      </DisconnectButton>
    </div>
  );
};

export default VideoChannelHeader;
