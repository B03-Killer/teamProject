'use client';
import BottomSheet from '@/components/BottomSheet';
import Button from '@/components/Button';
import TextField from '@/components/TextField';
import Typography from '@/components/Typography';
import useTodoList from '@/hooks/useTodo';
import useWorkspaceId from '@/hooks/useWorkspaceId';
import CalendarIcon from '@/icons/Calendar.svg';
import ChevronDownIcon from '@/icons/ChevronDownIcon.svg';
import ChevronRightIcon from '@/icons/ChevronRight.svg';
import ChevronUpIcon from '@/icons/ChevronUpIcon.svg';
import ClockIcon from '@/icons/Clock.svg';
import FlagIcon from '@/icons/Flag.svg';
import ListIcon from '@/icons/List.svg';
import MapPinIcon from '@/icons/MapPin.svg';
import useDateStore from '@/store/dateStore';
import useUserStore from '@/store/userStore';
import dayjs, { Dayjs } from 'dayjs';
import { useRouter } from 'next/navigation';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import DateBottom from './_components/DateBottom';
import Header from './_components/Header';
import InputCard from './_components/InputCard';
import OptionCard from './_components/OptionCard';

const priorityList = ['high', 'medium', 'low'];
const statusList = ['진행 전', '진행 중', '완료'];
type ToDoAddPageProps = {
  params: {
    id: string;
  };
};

const ToDoAddPage = ({ params }: ToDoAddPageProps) => {
  const { workspaceUserId } = useUserStore();
  const workspaceId = useWorkspaceId();
  // const { startTime, endTime, setTimeModalOpen, setStartTime, setEndTime, setStart, setEnd } = useTimeModalStore();
  const { todoList, addTodo, updateTodo } = useTodoList(workspaceUserId);
  const selectedTodo = todoList && todoList.filter((todo) => todo.id == params.id)[0];
  const { selectedDate } = useDateStore();
  const [title, setTitle] = useState<string>('');
  const [selectedPriority, setSelectedPriority] = useState<string>('');
  const [selectedStatus, setSelectedStatus] = useState<string>('');
  const [isPriorityOpen, setIsPriorityOpen] = useState<boolean>(false);
  const [isStatusOpen, setIsStatusOpen] = useState<boolean>(false);
  const [isStartTime, setIsStartTime] = useState<boolean>(true);
  const initTime = dayjs().set('hour', 9).set('minute', 0);
  const [startTime, setStartTime] = useState<Dayjs>(initTime);
  const [endTime, setEndTime] = useState<Dayjs>(initTime);
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState<boolean>(false);
  const titleRef = useRef<HTMLInputElement>(null);
  const placeRef = useRef<HTMLInputElement>(null);
  const existTitle = selectedTodo && selectedTodo.title;
  const existStatus = selectedTodo && selectedTodo.status;
  const existPriority = selectedTodo && selectedTodo.priority;
  const existStartTime = selectedTodo && dayjs(selectedTodo.start_date);
  const existEndTime = selectedTodo && dayjs(selectedTodo.end_date);
  const place = selectedTodo && selectedTodo.place;
  const date = dayjs(selectedDate).format('YYYY.MM.DD');
  const startTimeFormat = dayjs(startTime).format('a hh:mm');
  const endTimeFormat = dayjs(endTime).format('a hh:mm');
  const router = useRouter();

  useEffect(() => {
    existStartTime ? setStartTime(existStartTime) : setStartTime(initTime);
    existEndTime ? setEndTime(existEndTime) : setEndTime(initTime);
    if (!(existPriority && existStatus && existTitle)) return;

    setSelectedStatus(existStatus);
    setSelectedPriority(existPriority);
    setTitle(existTitle);
  }, [existStatus, existPriority, existTitle]);

  const handleChangePriority = (priority: string) => {
    setSelectedPriority(priority);
  };

  const handleChangeStatus = (status: string) => {
    setSelectedStatus(status);
  };

  const handlePriorityClick = () => {
    setIsPriorityOpen((prev) => !prev);
  };
  const handleStatusClick = () => {
    setIsStatusOpen((prev) => !prev);
  };

  const handleSetStartTime = (startTime: Dayjs) => {
    setStartTime(endTime);
  };
  const handleSetEndTime = (endTime: Dayjs) => {
    setEndTime(endTime);
  };

  const handleTimeClick = (isStart: boolean) => {
    setIsStartTime(isStart);
    isStart ? setStartTime(dayjs(startTime)) : setEndTime(dayjs(endTime));
    setIsBottomSheetOpen((prev) => !prev);
  };

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };
  const handleTimeClick2 = () => {
    setIsBottomSheetOpen((prev) => !prev);
  };

  const handleAdd = async () => {
    if (!title || !placeRef.current || !workspaceUserId) return;
    const startDate = selectedDate
      .set('hour', dayjs(startTime).hour())
      .set('minute', dayjs(startTime).minute())
      .toISOString();
    const endDate = selectedDate
      .set('hour', dayjs(endTime).hour())
      .set('minute', dayjs(endTime).minute())
      .toISOString();
    if (params.id === 'new') {
      const todo = {
        id: crypto.randomUUID(),
        title: title,
        place: placeRef.current.value,
        workspace_user_id: workspaceUserId,
        start_date: startDate,
        end_date: endDate,
        priority: selectedPriority,
        status: selectedStatus
      };
      await addTodo(todo);
    } else {
      const id = params.id;
      const todo = {
        title: title,
        place: placeRef.current.value,
        workspace_user_id: workspaceUserId,
        start_date: startDate,
        end_date: endDate,
        priority: selectedPriority,
        status: selectedStatus
      };
      await updateTodo({ todo, id });
    }
    router.push(`/${workspaceId}/to-do-list`);
  };

  return (
    <>
      <header>
        <Header />
      </header>
      <div className="flex flex-col gap-[20px] mt-[24px] px-[16px]">
        <TextField
          id="1"
          label="일정 이름"
          value={title}
          placeholder="일정 이름을 입력해주세요."
          LabelColor="grey700Black"
          children=""
          onChange={handleTitleChange}
        />
        <div className="flex flex-col gap-[6px]">
          <Typography variant="Body14px" color="grey700Black" className="px-[6px] mb-[2px]">
            기본 설정
          </Typography>
          <InputCard>
            <CalendarIcon className="w-[20px] h-[20px] stroke-[#2F323C]" />
            <Typography variant="Subtitle16px" color="grey700Black">
              {date}
            </Typography>
          </InputCard>
          <InputCard>
            <ClockIcon className="w-[20px] h-[20px] stroke-[#2F323C]" />
            <div className="flex flex-row items-center gap-[4px]">
              <button onClick={() => handleTimeClick(true)}>{startTimeFormat}</button>
              <ChevronRightIcon className="w-[16px] h-[16px] stroke-[#9096A7]" />
              <button onClick={() => handleTimeClick(false)}>{endTimeFormat}</button>
            </div>
          </InputCard>
          <InputCard>
            <button className="flex flex-row w-full justify-between" onClick={handleStatusClick}>
              <div className="flex flex-row items-center gap-[12px]">
                <ListIcon className="w-[20px] h-[20px] stroke-[#2F323C]" />
                <Typography variant="Subtitle16px" color="grey700Black">
                  진행 상태
                </Typography>
              </div>
              <div>
                {isStatusOpen ? (
                  <ChevronUpIcon className="w-[20px] h-[20px] stroke-[#9096A7]" />
                ) : (
                  <ChevronDownIcon className="w-[20px] h-[20px] stroke-[#9096A7]" />
                )}
              </div>
            </button>
          </InputCard>
          <div className="flex flex-col mt-[6px] gap-[4px]">
            {isStatusOpen &&
              statusList.map((status) => (
                <OptionCard
                  key={status}
                  option={status}
                  selectedOption={selectedStatus}
                  handleChange={handleChangeStatus}
                />
              ))}
          </div>
        </div>
        <div className="flex flex-col gap-[6px]">
          <Typography variant="Body14px" color="grey700Black" className="px-[6px] mb-[2px]">
            추가 설정
          </Typography>
          <InputCard>
            <MapPinIcon className="w-[20px] h-[20px] stroke-[#2F323C]" />
            <Typography variant="Subtitle16px" color="grey700Black">
              <input
                defaultValue={place ? place : ''}
                placeholder="장소를 입력해주세요."
                className="focus:outline-none"
                ref={placeRef}
              />
            </Typography>
          </InputCard>
          <InputCard>
            <button className="flex flex-row w-full justify-between gap-[12px]" onClick={handlePriorityClick}>
              <div className="flex flex-row items-center gap-[12px]">
                <FlagIcon className="w-[20px] h-[20px] stroke-[#2F323C]" />
                <Typography variant="Subtitle16px" color="grey700Black">
                  진행 상태
                </Typography>
              </div>

              {isPriorityOpen ? (
                <ChevronUpIcon className="w-[20px] h-[20px] stroke-[#9096A7]" />
              ) : (
                <ChevronDownIcon className="w-[20px] h-[20px] stroke-[#9096A7]" />
              )}
            </button>
          </InputCard>

          <div className="flex flex-col mt-[6px] gap-[4px]">
            {isPriorityOpen &&
              priorityList.map((priority) => (
                <OptionCard
                  key={priority}
                  option={priority}
                  selectedOption={selectedPriority}
                  handleChange={handleChangePriority}
                />
              ))}
          </div>
        </div>

        <Button theme="primary" isFullWidth={true} className="mt-[65px] mb-[20px]" onClick={handleAdd}>
          {params.id === 'new' ? '작성 완료' : '수정 완료'}
        </Button>
      </div>

      <BottomSheet isOpen={isBottomSheetOpen} onClose={handleTimeClick2}>
        <DateBottom
          isStartTime={isStartTime}
          handleClose={handleTimeClick2}
          startTime={startTime}
          endTime={endTime}
          handleSetStartTime={handleSetStartTime}
          handleSetEndTime={handleSetEndTime}
        />
      </BottomSheet>
    </>
  );
};

export default ToDoAddPage;
