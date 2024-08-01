import { StoryFn } from '@storybook/react';
import ChatCard, { ChatCardProps } from './ChatCard';

export default {
  title: 'Components/ChatCard',
  component: ChatCard,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs']
};

const Template: StoryFn<ChatCardProps> = (args) => <ChatCard {...args} />;

export const Default = Template.bind({});
Default.args = {
  icon: <div className="flex w-10 h-10 bg-gray-400 rounded-full items-center justify-center" />,
  name: '이름',
  status: '미팅・회의',
  date: '2024-07-31',
  message: '메시지 미리보기',
  unreadCount: 1,
  pin: true
};

export const Vacation = Template.bind({});
Vacation.args = {
  icon: <div className="flex w-10 h-10 bg-blue-400 rounded-full items-center justify-center" />,
  name: '이름',
  status: '휴가',
  date: '2024-07-31',
  message: '휴가 중입니다. 답변이 늦어질 수 있습니다.',
  unreadCount: 0,
  pin: false
};

export const WFH = Template.bind({});
WFH.args = {
  icon: <div className="flex w-10 h-10 bg-green-400 rounded-full items-center justify-center" />,
  name: '이름',
  status: '재택 근무 중',
  date: '2024-07-31',
  message: '재택 근무 중입니다.',
  unreadCount: 2,
  pin: true
};

export const SickLeave = Template.bind({});
SickLeave.args = {
  icon: <div className="flex w-10 h-10 bg-red-400 rounded-full items-center justify-center" />,
  name: '이름',
  status: '병가・연차',
  date: '2024-07-31',
  message: '병가로 인해 연락이 어려울 수 있습니다.',
  unreadCount: 3,
  pin: false
};

export const OutOfOffice = Template.bind({});
OutOfOffice.args = {
  icon: <div className="flex w-10 h-10 bg-yellow-400 rounded-full items-center justify-center" />,
  name: '이름',
  status: '자리 비움',
  date: '2024-07-31',
  message: '자리에 없습니다. 긴급한 경우 다른 분에게 문의해주세요.',
  unreadCount: 5,
  pin: true
};
