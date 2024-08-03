'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useSnackBar } from '@/providers/SnackBarContext';
import { LOGIN_ERROR_MESSAGE } from './constants';
import { useGetWorkspaceIdMutation, useSignInMutation } from './_hooks/useLogin';
import { setWorkspaceId, setWorkspaceUserId } from '@/utils/workspaceCookie';
import { TopBar } from '@/components/TopBar';
import Button from '@/components/Button';
import useSetGlobalUser from '@/hooks/useSetGlobalUser';

const LoginPage = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const route = useRouter();
  const { openSnackBar } = useSnackBar();
  const { handleSetGlobalUser } = useSetGlobalUser();

  const { mutateAsync: postSignInMutation, isPending: signInPending } = useSignInMutation({
    onError: (error: any) => {
      if (error.message === LOGIN_ERROR_MESSAGE.INVALID_CREDENTIALS) {
        openSnackBar({ message: '이메일 또는 비밀번호가 일치하지 않아요' });
        return;
      }

      openSnackBar({ message: '로그인에 실패했어요' });
      return;
    }
  });

  const { mutateAsync: getWorkspaceIdMutation, isPending: workspaceIdPending } = useGetWorkspaceIdMutation({
    onError: () => {
      openSnackBar({ message: '문제가 발생했어요 (E-PGRST116)' });
      return;
    }
  });

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { id: userId } = await postSignInMutation({ email, password });
    const workspaceId = await getWorkspaceIdMutation(userId);

    if (workspaceId === null) {
      route.replace('/workspace/landing');
      return;
    }

    handleSetGlobalUser({ userId, workspaceId });

    route.replace(`/${workspaceId}`);
  };

  return (
    <main className="flex justify-center items-center">
      <div className="flex flex-col w-[375px] h-dvh px-4">
        <TopBar title="" style={{ padding: '0px' }} />
        <h1 className="text-[20px] text-[#2E2E2E] font-semibold pt-[42px] pb-[28px] flex items-center">
          이메일로 로그인
        </h1>
        <form onSubmit={onSubmit}>
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
            <div className="flex flex-col">
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
            <Button theme="primary" type="submit" isDisabled={signInPending || workspaceIdPending} isFullWidth>
              로그인
            </Button>
          </div>
        </form>
        {/* // TODO: MVP이후 비밀번호 찾기 구현  */}
        {/* <button className="text-[#333] text-center text-[12px] font-normal underline">비밀번호를 잊으셨나요?</button> */}
      </div>
    </main>
  );
};

export default LoginPage;
