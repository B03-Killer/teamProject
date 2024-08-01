// 임시 파일

'use client';
import useChannel from '@/hooks/useChannel';
import useChannelUser from '@/hooks/useChannelUser';
import useWorkspaceUserList from '@/hooks/useWorkspaceUserList';
import useEnterdChannelStore from '@/store/enteredChannelStore';
import { ChannelInsertType } from '@/types/channel';
import { Tables } from '@/types/supabase';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import UserItem from './_components/UserItem';

const FAKE_WORKSPACE_ID = 2;
const FAKE_WORKSPACE_USER_ID = '7ca87acc-b8a8-4518-9628-4c8a18196e5d';

type WorkspaceUserType = Tables<'workspace_user'>;

const CreateChannelPage = () => {
  const userName = 'minkon';
  const router = useRouter();

  const [selectedUserList, setSelectedUserList] = useState<WorkspaceUserType[]>([]);
  const [roomName, setRoomName] = useState<string>();
  const [workspaceUserIds, setWorkspaceUserIds] = useState<string[]>([]);

  const { workspaceUserList } = useWorkspaceUserList(FAKE_WORKSPACE_ID);
  const { createChannel } = useChannel({ type: 'video', workspace_id: FAKE_WORKSPACE_ID }); // workspace_id 안에 video 채널
  const { enterChannel } = useChannelUser({ workspaceUserIds });
  const { setEnteredChannelId } = useEnterdChannelStore();

  useEffect(() => {
    const temp = selectedUserList.map((user) => user.name).join(',');
    setRoomName(temp);
    setWorkspaceUserIds(selectedUserList.map((user) => user.id));
  }, [selectedUserList]);

  const handleSelectUser = (selectedUser: WorkspaceUserType) => {
    setSelectedUserList((prev) => {
      if (prev.some((user) => user.user_id === selectedUser.user_id)) {
        return prev.filter((user) => user.user_id !== selectedUser.user_id); // 선택 해제
      }
      return [...prev, selectedUser];
    });
  };

  const handleSubmit = async () => {
    if (!roomName) {
      return alert('사용자를 선택해주세요.');
    }

    const newChannel: ChannelInsertType = {
      name: roomName as string,
      type: 'video',
      workspace_id: FAKE_WORKSPACE_ID,
      host_id: FAKE_WORKSPACE_USER_ID
    };

    const channelId = await createChannel(newChannel); // 채널 아이디 반환
    setEnteredChannelId(channelId.id);
    enterChannel(channelId.id);

    router.push(`/video-channel/${roomName}?username=${userName}`);
  };

  return (
    <div>
      <div className="flex gap-5 p-5">
        <button onClick={handleSubmit} className="border hover:brightness-90">
          확인
        </button>
      </div>
      {roomName && roomName.length > 0 && <p>{roomName}</p>}
      {workspaceUserList &&
        workspaceUserList.map((workspaceUser) => (
          <div key={workspaceUser.id} onClick={() => handleSelectUser(workspaceUser)}>
            <UserItem
              {...workspaceUser}
              isSelected={selectedUserList.some((user) => user.user_id === workspaceUser.user_id)}
            />
          </div>
        ))}
    </div>
  );
};

export default CreateChannelPage;
