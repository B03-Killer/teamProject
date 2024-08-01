'use client';
import useEnterdChannelStore from '@/store/enteredChannelStore';
import { useParams, useRouter } from 'next/navigation';

type VieoListItemType = {
  id: number;
  name: string;
  type: string;
};
const VideoListItem = ({ id, name, type }: VieoListItemType) => {
  const userName = 'minkon'; // 전역 관리 되야 하는 유저 정보.
  const router = useRouter();
  const params = useParams();
  const { setEnteredChannelId } = useEnterdChannelStore();

  const handleClick = () => {
    if (name && userName) {
      setEnteredChannelId(id);
      router.push(`/${params.workspaceId}/video-channel/${name}?username=${userName}`);
    } else {
      alert('잘못된 접근 입니다.');
    }
  };

  return (
    <li onClick={handleClick} className="border border-1 flex flex-col gap-3 hover:bg-slate-500">
      <span>{name}</span>
    </li>
  );
};

export default VideoListItem;
