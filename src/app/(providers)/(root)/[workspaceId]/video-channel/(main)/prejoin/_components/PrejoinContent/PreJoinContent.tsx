'use client';
import useWorkspaceId from '@/hooks/useWorkspaceId';
import useEnterdChannelStore from '@/store/enteredChannelStore';
import useStreamSetStore from '@/store/streamSetStore';
import { LocalUserChoices, usePersistentUserChoices } from '@livekit/components-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect } from 'react';
import CustomPrejoin from '../CustomPrejoin';
import PrejoinHeader from '../PrejoinHeader';

const PreJoinContent = () => {
  const workspaceId = useWorkspaceId();
  const searchParams = useSearchParams();
  const room = searchParams.get('room');

  const router = useRouter();
  const { setIsSettingOk } = useStreamSetStore();
  const { userChoices } = usePersistentUserChoices();
  const { setEnteredChannelId } = useEnterdChannelStore();

  useEffect(() => {
    setIsSettingOk(true);
  }, []);

  const handlePreJoinSubmit = useCallback((values: LocalUserChoices) => {
    if (!userChoices.username) return alert('유저 이름을 입력해주세요.');
    router.push(`/${workspaceId}/video-channel/${room}?username=${userChoices.username}`);
  }, []);

  return (
    <>
      <PrejoinHeader />
      <div className="h-[100vh] bg-[#fff] flex flex-col  items-center justify-center ">
        <CustomPrejoin
          joinLabel={'입장하기'}
          userLabel={userChoices.username}
          defaults={userChoices}
          onSubmit={handlePreJoinSubmit}
          onValidate={(values) => {
            return true;
          }}
        />
      </div>
    </>
  );
};

export default PreJoinContent;
