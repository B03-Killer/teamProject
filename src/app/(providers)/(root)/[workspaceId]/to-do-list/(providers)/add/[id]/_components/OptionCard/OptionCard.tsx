import CheckCircleIcon from '@/icons/CheckCircle.svg';
import LoaderIcon from '@/icons/Loader.svg';
import MinusCircleIcon from '@/icons/MinusCircle.svg';
import { cva } from 'class-variance-authority';

interface OptionCardProps {
  option: string;
  selectedOption: string;
  handleChange: (option: string) => void;
}

const OptionCard = ({ option, selectedOption, handleChange }: OptionCardProps) => {
  return (
    <label key={option} className={labelState({ isSelected: option === selectedOption })}>
      {option === '진행 전' ? (
        <MinusCircleIcon className="w-[16px] h-[16px] stroke-[#737B91]" />
      ) : option === '진행 중' ? (
        <LoaderIcon className="w-[16px] h-[16px] stroke-[#737B91]" />
      ) : option === '완료' ? (
        <CheckCircleIcon className="w-[16px] h-[16px] stroke-[#737B91]" />
      ) : option === 'high' ? (
        <div className="w-[16px] h-[16px] rounded-full bg-[#D3D3FD]" />
      ) : option === 'medium' ? (
        <div className="w-[16px] h-[16px] rounded-full bg-[#DBEDDB]" />
      ) : option === 'low' ? (
        <div className="w-[16px] h-[16px] rounded-full bg-[#E5E7EB]" />
      ) : (
        <></>
      )}
      <div className="text-sm">{option}</div>
      <input
        value={option}
        type="checkbox"
        name="priority"
        checked={option === selectedOption}
        onChange={() => handleChange(option)}
        className="invisible"
      />
    </label>
  );
};

export default OptionCard;

const labelState = cva('flex flex-row items-center px-[18px] py-[16px] gap-[12px] rounded-[6px] hover:cursor-pointer', {
  variants: {
    isSelected: {
      true: 'bg-[#EBECFE]',
      false: 'bg-[#FAFAFA]'
    }
  },
  defaultVariants: {
    isSelected: false
  }
});
