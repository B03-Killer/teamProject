import clsx from 'clsx';
import Tag from '../Tag';
import Typography from '../Typography';

export interface TodoCardProps {
  title?: string;
  subtitle?: string;
  tag?: 'high' | 'medium' | 'low';
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  className?: string;
}

const TodoCard = ({ title, subtitle, onClick, tag, className, ...props }: TodoCardProps) => {
  const renderTag = tag ? <Tag theme={tag}>{tag.charAt(0).toUpperCase() + tag.slice(1)}</Tag> : null;
  return (
    <div
      className={clsx(
        `flex justify-between items-start w-full h-[70px] px-[16px] py-[12px] p-3 bg-[#FAFAFA] rounded-lg shadow-md`,
        className
      )}
      onClick={onClick}
      {...props}
    >
      <div className="flex flex-col">
        <Typography variant="Title16px" color="grey700Black">
          {title}
        </Typography>
        {subtitle && (
          <Typography variant="Subtitle14px" color="grey400">
            {subtitle}
          </Typography>
        )}
      </div>
      {renderTag}
    </div>
  );
};

export default TodoCard;
