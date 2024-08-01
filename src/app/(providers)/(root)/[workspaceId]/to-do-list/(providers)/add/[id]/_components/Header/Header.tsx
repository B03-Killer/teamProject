'use client';
import Button from '@/components/Button';
import Modal from '@/components/Modal';
import Typography from '@/components/Typography';
import useTodoList from '@/hooks/useTodo';
import useWorkspaceId from '@/hooks/useWorkspaceId';
import useUserStore from '@/store/userStore';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import BackButton from '../BackButton';
import DeleteButton from '../DeleteButton';

const Header = () => {
  const params = useParams();
  const router = useRouter();
  const workspaceId = useWorkspaceId();
  const todoId = params.id as string;
  const workspaceUserId = useUserStore((state) => state.workspaceUserId);
  const { delTodo } = useTodoList(workspaceUserId);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const isExist = params.id !== 'new';

  const handleIsOpen = () => {
    setIsOpen((prev) => !prev);
  };

  const handleDelelteClick = async () => {
    await delTodo(todoId);
    router.push(`/${workspaceId}/to-do-list`);
  };

  return (
    <header>
      <div
        className="flex flex-row justify-between
        items-center px-[16px] pt-[14px] pb-[12px] w-full"
      >
        <BackButton />
        <Typography
          variant="Title20px"
          color="grey700Black"
          className="text-center text-ellipsis whitespace-nowrap overflow-hidden"
        >
          일정상세
        </Typography>
        {isExist ? <DeleteButton onClick={handleIsOpen} /> : <div />}

        <Modal isOpen={isOpen} onClose={handleIsOpen} isModal={false}>
          <div className="flex flex-col justify-center w-[335px] py-[10px]">
            <div className="mt-[20px] mb-[10px] text-center">일정을 삭제하시나요?</div>
            <div className="flex flex-row px-[16px] gap-[8px] mt-[10px] mb-[20px]">
              <Button theme="grey" isFullWidth onClick={handleIsOpen}>
                취소
              </Button>
              <Button theme="primary" isFullWidth onClick={handleDelelteClick}>
                삭제
              </Button>
            </div>
          </div>
        </Modal>
      </div>
    </header>
  );
};

export default Header;
