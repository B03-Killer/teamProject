'use client';
import useShallowSelector from '@/hooks/useShallowSelector';
import { useAuthStore } from '@/providers/AuthStoreProvider';
import { AuthStoreTypes } from '@/store/authStore';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useSnackBar } from '@/providers/SnackBarContext';
import { setWorkspaceId, setWorkspaceUserId } from '@/utils/workspaceCookie';
import { TopBar } from '@/components/TopBar';
import useSetGlobalUser from '@/hooks/useSetGlobalUser';
import Button from '@/components/Button';
import { getWorkspaceUserId, useCreateWorkspace, useUpdateWorkspaceId } from './_hooks/useNewWorkspace';

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
  const { user } = useShallowSelector<AuthStoreTypes, UserType>(useAuthStore, ({ user }) => ({ user }));
  const { handleSetGlobalUser } = useSetGlobalUser();
  const { openSnackBar } = useSnackBar();

  const { mutateAsync: updateWorkspaceIdMutation } = useUpdateWorkspaceId();

  const { data: workspaceUserId, isError } = getWorkspaceUserId({
    userId: user?.id || '',
    enabled: !!user
  });

  const { mutateAsync: createWorkspaceMutation, isPending: createWorkspacePending } = useCreateWorkspace({
    onError: () => {
      openSnackBar({ message: '워크스페이스 생성에 실패했어요 다시 시도해주세요' });
      return;
    }
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!workspaceUserId || !user) {
      route.replace('/');
      return;
    }

    if (!orgName) {
      openSnackBar({ message: '조직 이름을 입력해주세요!' });
      return;
    }

    const randomNumbers = getRandomNumbers(6, 1, 9);
    const combinedNumber = Number(randomNumbers.join(''));

    const workspaceId = await createWorkspaceMutation({
      orgName,
      inviteCode: combinedNumber,
      workspaceUserId
    });

    await updateWorkspaceIdMutation({ workspaceId, userId: user.id });

    handleSetGlobalUser({ userId: user.id, workspaceId: workspaceId });

    route.replace('/welcome');
  };

  /** 로그인을 하지 않은 경우 초기 페이지로 이동합니다 */
  useEffect(() => {
    if (user?.id) return;

    route.replace('/');
  }, []);

  if (isError) {
    route.replace('/');
    return;
  }

  return (
    <main className="flex justify-center items-center">
      <div className="flex flex-col w-[375px] h-dvh px-4">
        <TopBar title="워크스페이스 만들기" style={{ padding: '0px' }} />
        <strong className="text-[20px] text-[#2E2E2E] font-semibold mt-[42px] mb-[28px] flex items-center">
          계정 정보 입력
        </strong>
        <form onSubmit={handleSubmit}>
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
            <Button theme="primary" type="submit" isDisabled={createWorkspacePending} isFullWidth>
              가입하기
            </Button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default NewWorkSpacePage;
