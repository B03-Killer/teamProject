'use client';
import useUserStore from '@/store/userStore';
import { supabase } from '@/utils/supabase/supabaseClient';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useSnackBar } from '@/providers/SnackBarContext';
import { setWorkspaceIdCookie, setWorkspaceUserIdCookie } from '@/utils/workspaceCookie';
import { TopBar } from '@/components/TopBar';

const LoginPage = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const setUserData = useUserStore((state) => state.setUserData);
  const route = useRouter();
  const { openSnackBar } = useSnackBar();

  // TODO : 리팩터링 예정
  const loginMutation = useMutation({
    mutationFn: async () => {
      const {
        data: { session },
        error
      } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (!session) return openSnackBar({ message: '로그인에 실패했어요' });

      if (error) return openSnackBar({ message: '정보가 일치하지 않아요' });

      const { data: workspaceUserData, error: workspaceUserError } = await supabase
        .from('workspace_user')
        .select('workspace_id')
        .eq('user_id', session.user.id)
        .order('created_at', { ascending: false })
        .limit(1)
        .single();

      if (workspaceUserError) return openSnackBar({ message: '존재하지 않는 유저에요' });

      if (workspaceUserData.workspace_id === null) {
        route.push(`/workspace/landing`);
        return;
      }

      setWorkspaceIdCookie(workspaceUserData.workspace_id);
      setWorkspaceUserIdCookie(session.user.id);
      setUserData(session.user.id, workspaceUserData.workspace_id);
      route.replace(`/${workspaceUserData.workspace_id}`); // TODO : 메인 홈 으로 이동
    }
  });

  const { mutate: emailLoginMutate } = loginMutation;

  return (
    <main className="flex justify-center items-center">
      <div className="flex flex-col w-[375px] h-dvh px-4">
        <TopBar title="" style={{ padding: '0px' }} />
        <h1 className="text-[20px] text-[#2E2E2E] font-semibold pt-[42px] pb-[28px] flex items-center">
          이메일로 로그인
        </h1>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            emailLoginMutate();
          }}
        >
          <div className="flex flex-col gap-[24px]">
            <div className="flex flex-col">
              <label className="text-[14px] text-[#2F323C] pl-[6px] pb-2" htmlFor="email">
                이메일주소
              </label>
              <input
                className="py-[12px] px-[16px] rounded-lg border border-[#C7C7C7] shadow-md focus:outline-none"
                type="email"
                id="email"
                placeholder="이메일을 입력해주세요."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required={true}
              />
            </div>
            <div className="flex flex-col ">
              <label className="text-[14px] text-[#2F323C] pl-[6px] pb-2" htmlFor="password">
                비밀번호
              </label>
              <input
                className="py-[12px] px-[16px] rounded-lg border border-[#C7C7C7] shadow-md focus:outline-none"
                type="password"
                id="password"
                placeholder="비밀번호를 입력해주세요."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required={true}
              />
            </div>
          </div>
          <div className="flex justify-center mt-[40px]">
            <button
              className="w-full text-lg py-[12px] px-[22px] bg-[#7173FA] text-white rounded-lg shadow-md"
              disabled={loginMutation.isPending ? true : false}
            >
              {loginMutation.isPending ? '로그인 중입니다...' : '로그인'}
            </button>
          </div>
        </form>
        {/* // TODO: MVP이후 비밀번호 찾기 구현  */}
        {/* <button className="text-[#333] text-center text-[12px] font-normal underline">비밀번호를 잊으셨나요?</button> */}
      </div>
    </main>
  );
};

export default LoginPage;
