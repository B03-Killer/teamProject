'use client';

import useShallowSelector from '@/hooks/useShallowSelector';
import { useAuthStore } from '@/providers/AuthStoreProvider';
import { AuthStoreTypes } from '@/store/authStore';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useSnackBar } from '@/providers/SnackBarContext';
import WorkConnectLogoIcon from '@/icons/WorkConnectLogo.svg';
import Link from 'next/link';
import Typography from '@/components/Typography';
import Button from '@/components/Button';
import { useGetWorkspaceIdWithInviteCode, useUpdateWorkspaceUser } from './_hooks/useInvite';
import { INVITE_ERROR_CODE } from './constants';
import useSetGlobalUser from '@/hooks/useSetGlobalUser';

type UserType = {
  user: AuthStoreTypes['user'];
};

const InviteCodePage = () => {
  const [inviteCode, setInviteCode] = useState<string | ''>('');
  const route = useRouter();
  const { user } = useShallowSelector<AuthStoreTypes, UserType>(useAuthStore, ({ user }) => ({ user }));
  const { openSnackBar } = useSnackBar();
  const { handleSetGlobalUser } = useSetGlobalUser();

  const { mutateAsync: getWorkspaceIdMutation, isPending: getWorkspaceIdPending } = useGetWorkspaceIdWithInviteCode({
    onError: (error: any) => {
      const notFoundInviteCodeForType = error.code === INVITE_ERROR_CODE.INVALID_TYPE;
      const notFoundInviteCodeForValue = error.code === INVITE_ERROR_CODE.INVALID_VALUE;

      if (notFoundInviteCodeForType || notFoundInviteCodeForValue) {
        openSnackBar({ message: '초대코드가 존재하지 않아요' });
        return;
      }

      openSnackBar({ message: `알 수 없는 에러가 발생했어요 (E-${error.code})` });
      return;
    }
  });

  const { mutateAsync: updateWorkspaceUserMutation, isPending: updateWorkspaceUserPending } = useUpdateWorkspaceUser({
    onError: () => {
      openSnackBar({ message: '에러가 발생했어요' });
      return;
    }
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!user) {
      route.replace('/');
      return;
    }

    const workspaceId = await getWorkspaceIdMutation(inviteCode);
    await updateWorkspaceUserMutation({ workspaceId, userId: user.id });

    if (!workspaceId) {
      openSnackBar({ message: '알 수 없는 에러가 발생했어요' });
      return;
    }

    handleSetGlobalUser({ userId: user.id, workspaceId });

    route.replace('/welcome');
  };

  /** 로그인을 하지 않은 경우 초기 페이지로 이동합니다 */
  useEffect(() => {
    if (user?.id) return;

    route.replace('/');
  }, []);

  return (
    <>
      <form onSubmit={handleSubmit} className="grow flex flex-col justify-center pb-4 px-4">
        <div className="flex flex-col items-center">
          <WorkConnectLogoIcon className="w-[105px]" />
          <div className="mt-8 mb-7 flex flex-col items-center gap-3">
            <Typography as="strong" variant="Title20px" color="grey700Black">
              협업의 새로운 연결, 워크커넥트
            </Typography>
            <Typography as="span" variant="Subtitle16px" color="grey500">
              전달 받은 초대 코드를 입력해주세요
            </Typography>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col">
            <input
              className="py-[12px] px-[16px] rounded-lg border border-[#C7C7C7] shadow-md focus:outline-none"
              type="text"
              placeholder="초대 코드를 입력해주세요"
              value={inviteCode}
              onChange={(e) => setInviteCode(e.target.value)}
              maxLength={6}
              required
            />
          </div>
        </div>
        <div className="flex justify-center mt-4">
          <Button
            theme="primary"
            type="submit"
            isDisabled={getWorkspaceIdPending || updateWorkspaceUserPending}
            isFullWidth
          >
            확인
          </Button>
        </div>
      </form>
      <div className="flex justify-center items-center gap-[10px] h-[45px]">
        <button type="button">
          <Typography as="span" variant="Body14px" color="grey700Black">
            도움말
          </Typography>
        </button>
        <span className="text-[12px]">|</span>
        <Link href="/workspace/new">
          <Typography as="span" variant="Body14px" color="grey700Black">
            워크스페이스 만들기
          </Typography>
        </Link>
      </div>
    </>
  );
};

export default InviteCodePage;
