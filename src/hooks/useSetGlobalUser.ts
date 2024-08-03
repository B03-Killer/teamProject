import useUserStore from '@/store/userStore';
import { setWorkspaceId, setWorkspaceUserId } from '@/utils/workspaceCookie';

type SetGlobalUserProps = { userId: string; workspaceId: number; workspaceUserId?: string };

const useSetGlobalUser = () => {
  const setUserData = useUserStore((state) => state.setUserData);

  const handleSetGlobalUser = ({ userId, workspaceId, workspaceUserId }: SetGlobalUserProps) => {
    setUserData(userId, workspaceId);
    setWorkspaceId(workspaceId);

    if (workspaceUserId) {
      setWorkspaceUserId(workspaceUserId);
    }
  };

  return { handleSetGlobalUser };
};

export default useSetGlobalUser;
