'use client';
import useShallowSelector from '@/hooks/useShallowSelector';
import { useAuthStore } from '@/providers/AuthStoreProvider';
import { AuthStoreTypes } from '@/store/authStore';
import useUserStore from '@/store/userStore';
import { supabase } from '@/utils/supabase/supabaseClient';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useLayoutEffect, useState } from 'react';
import { setCookie } from '../../auth/_utils/cookieUtils';

type UserType = {
  user: AuthStoreTypes['user'];
};

const InviteCodePage = () => {
  const [inviteCode, setInviteCode] = useState<string | ''>('');
  const setUserData = useUserStore((state) => state.setUserData);
  const route = useRouter();
  const { user } = useShallowSelector<AuthStoreTypes, UserType>(useAuthStore, ({ user }) => ({ user }));

  // TODO : 리팩터링 예정
  const handleSubmit = useMutation({
    mutationFn: async () => {
      if (!user) {
        alert('로그인이 필요합니다. 로그인 페이지로 이동합니다.');
        route.push('/');
        return;
      }

      if (!inviteCode) return alert('초대 코드를 입력해주세요.');

      const { data: workspaceData, error: workspaceError } = await supabase
        .from('workspace')
        .select('id')
        .eq('invite_code', Number(inviteCode))
        .single();

      if (workspaceError) return alert(`존재하지 않는 초대코드 입니다. ${workspaceError.message}`);

      const { error: workspaceUserError } = await supabase
        .from('workspace_user')
        .update({ workspace_id: workspaceData.id })
        .eq('user_id', user.id);

      if (workspaceUserError) {
        alert(`워크스페이스 업데이트 오류. ${workspaceUserError.message}`);
        return;
      }

      setCookie('userToken', String(workspaceData.id), 1);
      setUserData(user.id, workspaceData.id);

      // TODO : 초대코드 입력 성공 시 메인페이지 이동처리하기
      setInviteCode('');
      alert('초대코드 입력이 완료되었습니다.');
      route.replace(`/${workspaceData.id}`);
    }
  });

  const { mutate: handleSubmitMutate } = handleSubmit;

  useLayoutEffect(() => {
    const getSession = async () => {
      const {
        data: { session }
      } = await supabase.auth.getSession();

      if (session?.user.app_metadata.provider !== 'kakao') return;

      const { data: workspaceUser, error: workspaceUserError } = await supabase
        .from('workspace_user')
        .select('workspace_id')
        .eq('user_id', session.user.id)
        .single();

      if (workspaceUserError) {
        alert(`워크스페이스 유저 조회 에러: ${workspaceUserError.message}`);
        return;
      }

      if (workspaceUser.workspace_id !== null) {
        setCookie('userToken', String(workspaceUser.workspace_id), 1);
        setUserData(session.user.id, workspaceUser.workspace_id);
        route.replace(`/${workspaceUser.workspace_id}`); // TODO: 홈 화면이동 처리
      }
      return;
    };

    getSession();
  }, []);

  return (
    <main className="flex justify-center items-center">
      <div className="flex flex-col w-[375px] h-dvh px-4">
        <div className="flex flex-col items-center mt-[109px] mb-[38px] gap-[12px]">
          <div className="w-[166px] h-[166px] bg-black"></div>
          <strong className="text-[20px] text-[#2E2E2E]">슬로건, 프로덕트명</strong>
          <p className="text-[14px] text-[rgb(46,46,46)] opacity-60 pl-[6px] pb-2">
            전달 받은 초대 코드를 입력해주세요
          </p>
        </div>
        <div className="flex flex-col gap-[24px]">
          <div className="flex flex-col">
            <input
              className="py-[12px] px-[16px] rounded-lg border border-[#C7C7C7] shadow-md focus:outline-none"
              type="text"
              placeholder="초대 코드를 입력해주세요"
              value={inviteCode}
              onChange={(e) => setInviteCode(e.target.value)}
              maxLength={6}
            />
          </div>
        </div>
        <div className="flex justify-center mt-4 mb-[167px]">
          <button
            onClick={() => handleSubmitMutate()}
            className="w-full text-lg py-[12px] px-[22px] bg-[#7173FA] text-white rounded-lg shadow-md"
            disabled={handleSubmit.isPending}
          >
            {handleSubmit.isPending ? '초대코드 확인 중...' : '확인'}
          </button>
        </div>
        <div className="flex justify-center items-center py-2 px-4 gap-[10px]">
          <button className="text-[#333] text-center text-[14px] font-normal">도움말</button>
          <span className="text-[12px]">|</span>
          <button
            onClick={() => route.push('/workspace/new')}
            className="text-[#333] text-center text-[14px] font-normal"
          >
            워크스페이스 만들기
          </button>
        </div>
      </div>
    </main>
  );
};

export default InviteCodePage;
