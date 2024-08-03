'use client';

import useSetGlobalUser from '@/hooks/useSetGlobalUser';
import useShallowSelector from '@/hooks/useShallowSelector';
import { useAuthStore } from '@/providers/AuthStoreProvider';
import { AuthStoreTypes } from '@/store/authStore';
import { useRouter } from 'next/router';
import { useLayoutEffect } from 'react';
import { useGetWorkspaceId } from '../../workspace/landing/_hooks/useInvite';

type UserType = {
  user: AuthStoreTypes['user'];
};

/**
 * 카카오 인증 페이지 컴포넌트입니다.
 * 카카오 로그인 시도시 항상 해당 페이지를 통과합니다.
 * case)
 * 사용자가 로그인 후, 해당 사용자의 워크스페이스 ID를 확인하고 해당 워크스페이스 메인 페이지로 리다이렉션합니다.
 * 사용자 정보가 없거나 워크스페이스 ID를 가져오는 과정에서 에러가 발생하면 홈으로 리다이렉트합니다.
 * 워크스페이스 ID가 없다면 워크스페이스 추가 페이지로, 있으면 초기 페이지로 이동합니다.
 */
const KakaoAuthPage = () => {
  const { handleSetGlobalUser } = useSetGlobalUser();
  const { user } = useShallowSelector<AuthStoreTypes, UserType>(useAuthStore, ({ user }) => ({ user }));
  const router = useRouter();

  const handleRedirectHome = () => {
    router.replace('/');
    return;
  };

  const { mutateAsync: getWorkspaceIdMutation, isPending: getWorkspaceIdPending } = useGetWorkspaceId({
    onError: handleRedirectHome
  });

  useLayoutEffect(() => {
    if (!user) {
      handleRedirectHome();
      return;
    }

    const getSession = async () => {
      const { workspaceId, workspaceUserId } = await getWorkspaceIdMutation({ userId: user.id });

      if (workspaceId === null) {
        router.replace('/workspace/landing');
        return;
      }

      handleSetGlobalUser({ userId: user.id, workspaceId, workspaceUserId });
      router.replace(`/${workspaceId}`);
    };

    getSession();
  }, []);

  return null;
};

export default KakaoAuthPage;
