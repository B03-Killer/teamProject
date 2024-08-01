import { Tables } from '@/types/supabase';

type UserItemProps = Tables<'workspace_user'> & { isSelected: boolean };

const UserItem = ({ isSelected, ...workespaceUser }: UserItemProps) => {
  return (
    <div
      className={`bg-slate-50 flex hover:brightness-90 p-5 active:brightness-75 ${isSelected ? 'border-2 border-green-500' : ''}`}
    >
      <div
        className={`rounded-full w-[49px] h-[49px] ${isSelected ? 'bg-green-500' : 'bg-[#B1B1B1]'} flex justify-center items-center`}
      >
        profile
      </div>
      <p className="flex items-center ml-3">{workespaceUser.name}</p>
    </div>
  );
};

export default UserItem;
