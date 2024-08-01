'use client';

import useChannel from '@/hooks/useChannel';
import NoneList from './_components/NoneList';
import VideoList from './_components/VideoList';

type VideoCallRoomParams = {
  params: {
    workspaceId: string;
  };
};

const MakeVideoCallRoom = ({ params }: VideoCallRoomParams) => {
  const workspaceId = params.workspaceId;
  const { channelList } = useChannel({ type: 'video', workspace_id: Number(workspaceId) });

  return <div>{channelList?.length !== 0 ? <VideoList channelList={channelList!} /> : <NoneList />}</div>;
};

export default MakeVideoCallRoom;
