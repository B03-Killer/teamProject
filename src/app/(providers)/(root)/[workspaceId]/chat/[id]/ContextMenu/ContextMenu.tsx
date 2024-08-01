import Typography from '@/components/Typography';
import { useDropdown } from '../_provider/DropdownProvider';
import CopyIcon from '@/icons/Copy.svg';
import HashIcon from '@/icons/Hash.svg';
import TrashIcon from '@/icons/Trash.svg';
import EditIcon from '@/icons/Edit.svg';
import { useEffect } from 'react';
import { supabase } from '@/utils/supabase/supabaseClient';

const DropdownMenu = () => {
  const { isDropdownOpen, dropdownPosition, closeDropdown, dropdownId } = useDropdown();

  const deleteChat = async () => {
    if (!dropdownId) return;

    await supabase.from('chat').delete().eq('id', dropdownId);
    closeDropdown();
  };

  if (!isDropdownOpen) return null;

  return (
    <ul
      style={{ bottom: dropdownPosition }}
      className="fixed right-[16px] rounded-[6px] bg-bgBackground1 box-shadow-[0px_1px_8px_0px_rgba(0,0,0,0.15)] z-50 w-[154px] flex p-4 gap-[20px] flex-col"
      onMouseLeave={closeDropdown}
    >
      <li
        className="flex items-center justify-between"
        onClick={() => {
          console.log('복사 클릭됨', dropdownId);
          closeDropdown();
        }}
      >
        <Typography variant="Subtitle16px">복사</Typography>
        <CopyIcon />
      </li>
      <li
        className="flex items-center justify-between"
        onClick={() => {
          console.log('공지 클릭됨', dropdownId);
          closeDropdown();
        }}
      >
        <Typography variant="Subtitle16px">공지</Typography>
        <HashIcon />
      </li>
      <li className="flex items-center justify-between" onClick={deleteChat}>
        <Typography variant="Subtitle16px">삭제</Typography>
        <TrashIcon />
      </li>
      <li
        className="flex items-center justify-between"
        onClick={() => {
          console.log('수정 클릭됨', dropdownId);
          closeDropdown();
        }}
      >
        <Typography variant="Subtitle16px">수정</Typography>
        <EditIcon />
      </li>
    </ul>
  );
};

export default DropdownMenu;
