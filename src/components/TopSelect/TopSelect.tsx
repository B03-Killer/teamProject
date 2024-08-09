import useUserStore from '@/store/userStore';
import { TWorkspaceInfo } from '@/types/workspace';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Typography from '../Typography';
import { setWorkspaceIdCookie } from '@/utils/workspaceCookie';

interface TopSelectProps {
  workspaceList: TWorkspaceInfo[];
  isOpen: boolean;
  onClick: () => void;
}

const TopSelect = ({ workspaceList, isOpen, onClick }: TopSelectProps) => {
  const pathUrl = usePathname();
  const paths = pathUrl.split('/');
  const setWorkspaceUserIdData = useUserStore((state) => state.setWorkspaceUserIdData);

  const setUrl = (workspaceId: number) => {
    const newUrl = paths.map((path, index) => (index === 1 ? workspaceId : path)).join('/');
    return newUrl;
  };

  const handleClick = ({ id, workspace_user_id }: { id: number; workspace_user_id: string }) => {
    setWorkspaceIdCookie(id);
    setWorkspaceUserIdData(workspace_user_id);
  };

  return (
    <div className={`fixed top-[50px] z-10 inset-0 ${isOpen ? 'h-full' : 'h-0'}`}>
      {isOpen && (
        <>
          <div className="fixed top-[52px] inset-0 bg-black opacity-40 sm:opacity-0" onClick={onClick} />{' '}
          <div
            className={`fixed flex flex-col top-[52px] left-0 right-0 bg-white scrollbar-hide max-h-calc(100vh - 200px) 
          rounded-b-[6px] overflow-y-scroll snap-none gap-[16px] px-[16px] py-[16px] sm:px-[16px] sm:py-[6px] sm:max-w-[343px] sm:translate-x-[56px] sm:shadow-lg`}
          >
            {workspaceList.map(({ id, workspace_user_id, name }) => (
              <Link
                key={id}
                href={setUrl(id)}
                onClick={() => handleClick({ id, workspace_user_id })}
                className="flex flex-row justify-between px-[8px] sm:py-[8px]"
              >
                <Typography
                  variant="Subtitle16px"
                  color="grey500"
                  className="max-w-[299px] text-ellipsis overflow-hidden"
                >
                  {name}
                </Typography>
              </Link>
            ))}
            <Link
              href="/workspace/landing"
              className="px-[8px] pt-[22px] pb-[6px] sm:pt-[22px] sm:pb-[8px] block border-t border-[#C9CCD4]"
            >
              <Typography variant="Subtitle16px" color="primary200Main">
                + 다른 워크스페이스 로그인
              </Typography>
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default TopSelect;
