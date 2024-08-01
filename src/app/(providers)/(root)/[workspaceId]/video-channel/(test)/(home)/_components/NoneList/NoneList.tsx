'use client';

import Button from '@/components/Button';
import Typography from '@/components/Typography';
import { useParams, useRouter } from 'next/navigation';

const NoneList = () => {
  const router = useRouter();
  const params = useParams();
  return (
    <div className="flex flex-col h-[100vh] items-center gap-4 justify-center ">
      <div className="w-[140px] h-[146px] bg-[#D9D9D9] rounded-[6px]" />
      <Typography as="p" variant="Subtitle18px" color="grey700Black" className="font-semibold p-[3px] mb-4">
        추가 유도 워딩
      </Typography>
      <Button
        theme="primary"
        onClick={() => router.push(`/${params.workspaceId}/video-channel/create`)}
        className="w-[231px] px-5 py-3 hover:bg-slate-200 mt-4"
      >
        채팅방 만들기
      </Button>
    </div>
  );
};

export default NoneList;
