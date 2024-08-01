import { ReactNode } from 'react';
import Typography from '../Typography';

export type ChatStatus = '미팅・회의' | '재택 근무 중' | '휴가' | '병가・연차' | '출장' | '자리 비움';
export interface ChatCardProps {
  icon?: ReactNode;
  name: string;
  status?: ChatStatus;
  date: string;
  message: string;
  unreadCount?: number | undefined;
  pin?: boolean;
}

const ChatCard = ({ icon, name, status, date, message, unreadCount, pin, ...props }: ChatCardProps) => {
  return (
    <div className="flex items-start justify-between p-4 border-b border-white bg-transparent w-full" {...props}>
      <div className="flex flex-row w-full">
        <div className="flex items-center justify-center mr-[12px] ">{icon}</div>
        <div className="flex flex-col">
          <div className="flex flex-row mb-[8px]">
            <Typography variant="Title18px" color="grey700Black" className="mr-2">
              {name}
            </Typography>
            <Typography
              variant="Subtitle14px"
              color="grey200"
              className="flex flex-row gap-1 items-center justify-center"
            >
              <span>- {status}</span>
              {pin ? (
                <svg
                  className="mt-1"
                  width="9"
                  height="15"
                  viewBox="0 0 9 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4.46092 9.92254V13.46M2.33971 1.55615V5.76742L1 8.51878V9.86639H7.86603L7.86603 8.51878L6.52631 5.76742V1.55615M1.55821 1.5L7.36363 1.5"
                    stroke="#ACB1BE"
                    stroke-width="1.6"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              ) : (
                ''
              )}
            </Typography>
          </div>
          <Typography variant="Subtitle16px" color="grey400">
            {message}
          </Typography>
        </div>
        <div className="flex ml-auto">
          <div className="flex flex-col ml-auto">
            <Typography variant="Body12px" color="grey300" className="mb-[14px]">
              {date}
            </Typography>
            <div className="ml-auto">
              {unreadCount !== undefined && unreadCount > 0 && (
                <div className="flex items-center justify-center w-6 h-6 bg-primary200Main text-white rounded-full">
                  {unreadCount}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatCard;
