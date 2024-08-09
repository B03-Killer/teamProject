'use client';
import useShallowSelector from '@/hooks/useShallowSelector';
import { useAuthStore } from '@/providers/AuthStoreProvider';
import { AuthStoreTypes } from '@/store/authStore';
import useUserStore from '@/store/userStore';
import { supabase } from '@/utils/supabase/supabaseClient';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useSnackBar } from '@/providers/SnackBarContext';
import { getWorkspaceUserIdCookie, setWorkspaceIdCookie, setWorkspaceUserIdCookie } from '@/utils/workspaceCookie';
import { TopBar } from '@/components/TopBar';

const getRandomNumbers = (count: number, min: number, max: number) => {
  const range = Array.from({ length: max - min + 1 }, (_, i) => i + min);
  const shuffled = range.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

type UserType = {
  user: AuthStoreTypes['user'];
};

const NewWorkSpacePage = () => {
  const route = useRouter();
  const [orgName, setOrgName] = useState<string | ''>('');
  const [workUserData, setWorkUserData] = useState<{ id: string } | null>(null);
  const setUserData = useUserStore((state) => state.setUserData);
  const { user } = useShallowSelector<AuthStoreTypes, UserType>(useAuthStore, ({ user }) => ({ user }));
  const { openSnackBar } = useSnackBar();

  // TODO : 리팩터링 예정
  const handleJoin = useMutation({
    mutationFn: async () => {
      const cookieWorkspaceUserId = getWorkspaceUserIdCookie();
      const randomNumbers = getRandomNumbers(6, 1, 9);
      const combinedNumber = Number(randomNumbers.join(''));

      if (!user) {
        openSnackBar({ message: '로그인이 필요해요' });
        route.replace('/');
        return;
      }
      if (!orgName) return openSnackBar({ message: '조직 이름을 입력해주세요!' });

      if (!workUserData) {
        openSnackBar({ message: '워크스페이스에 유저 데이터가 없어요' });
        return;
      }

      //? 로그인 상태일 때, 워크스페이스 생성
      if (cookieWorkspaceUserId) {
        //? 새 워크스페이스 생성
        const { error } = await supabase.from('workspace').insert({
          name: orgName,
          invite_code: combinedNumber,
          admin_user_id: workUserData.id
        });

        if (error) {
          openSnackBar({ message: '오류가 발생했어요' });
          console.log(error);
          return;
        }

        //? 워크스페이스 생성 완료 후, workspace_id 가져옴
        const { data: workspaceData, error: workspaceError } = await supabase
          .from('workspace')
          .select('id')
          .eq('admin_user_id', workUserData.id)
          .single();

        if (workspaceError) {
          openSnackBar({ message: '오류가 발생했어요' });
          return;
        }

        //? 워크스페이스 생성 완료 후, workspace_user 테이블에 workspace_id 추가
        const { error: workspaceUserError } = await supabase.from('workspace_user').insert({
          workspace_id: workspaceData.id,
          user_id: cookieWorkspaceUserId,
          name: user.user_metadata.name,
          email: user.user_metadata.email
        });

        if (workspaceUserError) {
          openSnackBar({ message: '오류가 발생했어요' });
          return;
        }

        setWorkspaceIdCookie(workspaceData.id);
        setWorkspaceUserIdCookie(cookieWorkspaceUserId);
        setUserData(user.id, workspaceData.id);

        // TODO : 생성 완료 후 페이지 이동처리하기
        setOrgName('');
        return route.replace(`/${workspaceData.id}`);
      }

      //? 로그인 안했을때 (회원가입 후 워크스페이스 생성)
      const { error } = await supabase.from('workspace').insert({
        name: orgName,
        invite_code: combinedNumber,
        admin_user_id: workUserData.id
      });

      if (error) {
        openSnackBar({ message: '오류가 발생했어요' });
        return;
      }

      const { data: workspaceData, error: workspaceError } = await supabase
        .from('workspace')
        .select('id')
        .eq('admin_user_id', workUserData.id)
        .order('created_at', { ascending: false })
        .limit(1)
        .single();

      if (workspaceError) {
        openSnackBar({ message: `워크스페이스 생성 중 오류가 발생했습니다. ${workspaceError.message}` });
        return;
      }

      if (!workspaceData) {
        openSnackBar({ message: '워크스페이스 생성 중 오류가 발생했어요' });
        return;
      }

      const { error: workspaceUserError } = await supabase
        .from('workspace_user')
        .update({ workspace_id: workspaceData.id })
        .eq('user_id', user.id);

      if (workspaceUserError) {
        openSnackBar({ message: '오류가 발생했어요' });
        return;
      }

      setWorkspaceIdCookie(workspaceData.id);
      setWorkspaceUserIdCookie(user.id);
      setUserData(user.id, workspaceData.id);

      // TODO : 생성 완료 후 페이지 이동처리하기
      setOrgName('');
      return route.replace('/welcome');
    }
  });

  const { mutate: handleJoinMutate } = handleJoin;

  useEffect(() => {
    const getWorkspaceUser = async () => {
      const {
        data: { user }
      } = await supabase.auth.getUser();

      if (!user) {
        openSnackBar({ message: '로그인이 필요합니다' });
        return;
      }

      //? limit(1)해도 오류
      const { data: workspaceUserData, error: workspaceUserError } = await supabase
        .from('workspace_user')
        .select('id')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(1)
        .single();

      //? 지금 여기서 오류남 이유는 아직 모름
      //? 로그인하고 new 페이지 오면 돌아가짐
      if (workspaceUserError) {
        console.log(workspaceUserError);
        openSnackBar({ message: '오류가 발생했어요ㅇㅇㅇ' });
        route.replace('/');
        return;
      }

      if (!workspaceUserData) {
        openSnackBar({ message: '해당 유저는 워크스페이스에 속해있지 않아요' });
        route.replace('/');
        return;
      }

      setWorkUserData({ id: workspaceUserData.id });
    };

    getWorkspaceUser();
  }, []);

  return (
    <main className="flex justify-center items-center">
      <div className="flex flex-col w-[375px] h-dvh px-4">
        <TopBar title="워크스페이스 만들기" style={{ padding: '0px' }} />
        <strong className="text-[20px] text-[#2E2E2E] font-semibold mt-[42px] mb-[28px] flex items-center">
          계정 정보 입력
        </strong>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleJoinMutate();
          }}
        >
          <div className="flex flex-col">
            <label className="text-[14px] text-[#333] opacity-60 pl-[6px]" htmlFor="email">
              조직이름
            </label>
            <input
              className="py-[12px] px-[16px] mt-2 mb-4 rounded-lg border border-[#C7C7C7] shadow-md focus:outline-none"
              type="text"
              placeholder="회사, 단체, 조직 이름을 입력해 주세요"
              value={orgName}
              onChange={(e) => setOrgName(e.target.value)}
              maxLength={20}
              required={true}
            />
          </div>
          <div className="flex justify-center">
            <button className="w-full text-lg py-[12px] px-[22px] bg-[#7173FA] text-white rounded-lg shadow-md">
              {handleJoin.isPending ? '가입중입니다...' : '가입하기'}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default NewWorkSpacePage;
