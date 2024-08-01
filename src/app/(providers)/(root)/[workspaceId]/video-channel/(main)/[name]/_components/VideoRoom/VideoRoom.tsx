'use client';

import useWorkspaceId from '@/hooks/useWorkspaceId';
import useEnterdChannelStore from '@/store/enteredChannelStore';
import useStreamSetStore from '@/store/streamSetStore';
import useUserStore from '@/store/userStore';
import { LiveKitRoom, RoomAudioRenderer } from '@livekit/components-react';
import { RoomConnectOptions } from 'livekit-client';
import { redirect, useSearchParams } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import Loading from '../../../_components/Loading';
import CustomVideoConference from '../VideoConference/CustomVideoConference';

type videoRoomProps = {
  name: string;
};

const VideoRoom = ({ name }: videoRoomProps) => {
  const workspaceId = useWorkspaceId();
  const params = useSearchParams();
  const [token, setToken] = useState('');

  const { preJoinChoices, isSettingOk } = useStreamSetStore();
  const { enteredChannelId } = useEnterdChannelStore();
  const { workspaceUserId } = useUserStore();

  useEffect(() => {
    if (!params.get('username') || !isSettingOk) {
      redirect(`/${workspaceId}/video-channel/prejoin?room=${name}`);
      return;
    }
    (async () => {
      try {
        const resp = await fetch(`/api/get-participant-token?room=${name}&username=${workspaceUserId}`);
        const data = await resp.json();
        setToken(data.token);
      } catch (e) {
        console.error(e);
      }
    })();
  }, []);

  const connectOptions = useMemo((): RoomConnectOptions => {
    return {
      autoSubscribe: true
    };
  }, []);

  if (token === '') {
    return <Loading />;
  }
  if (typeof token !== 'string') {
    return <h2>Missing LiveKit token</h2>;
  }

  return (
    <LiveKitRoom
      video={preJoinChoices.videoEnabled}
      audio={preJoinChoices.audioEnabled}
      token={token}
      serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_URL}
      style={{ height: '100vh' }}
      connectOptions={connectOptions}
      onDisconnected={() => console.log('연결 해제')}
    >
      <CustomVideoConference />
      <RoomAudioRenderer />
    </LiveKitRoom>
  );
};

export default VideoRoom;
