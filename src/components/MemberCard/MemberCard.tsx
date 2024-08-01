import { ReactNode } from 'react';
import Typography from '../Typography';

export interface MemberCardProps {
  name: string;
  position?: string;
  status?: string;
  icon?: ReactNode;
  checked: boolean;
  onToggle?: () => void;
}

export const MemberCard = ({ name, position, status, icon, checked, onToggle }: MemberCardProps) => {
  return (
    <div
      className="flex items-center justify-between p-4 border-b border-white bg-transparent w-full"
      onClick={onToggle}
    >
      <div className="flex items-center">
        <div className="flex items-center justify-center mr-4">{icon}</div>
        <div>
          <Typography variant="Title18px" color="grey700Black">
            {name}
          </Typography>
          <Typography variant="Subtitle12px" color="grey300">
            {position}
          </Typography>
        </div>
      </div>
      <Typography variant="Title14px" color="grey500" className="flex flex-row gap-1">
        {status}
        {checked ? (
          <svg
            width="23"
            height="22"
            viewBox="0 0 23 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="cursor-pointer"
          >
            <rect x="0.5" width="22" height="22" rx="11" fill="#7173FA" />
            <path
              d="M16.8332 8L9.49984 15.3333L6.1665 12"
              stroke="white"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        ) : (
          <svg
            width="23"
            height="22"
            viewBox="0 0 23 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="cursor-pointer"
          >
            <rect x="1.5" y="1" width="20" height="20" rx="10" stroke="#ACB1BE" strokeWidth="2" />
          </svg>
        )}
      </Typography>
    </div>
  );
};

export default MemberCard;
