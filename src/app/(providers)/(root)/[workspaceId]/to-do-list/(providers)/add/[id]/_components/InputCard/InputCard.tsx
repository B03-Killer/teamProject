interface InputCardProps {
  children: React.ReactNode;
}

const InputCard = ({ children }: InputCardProps) => {
  return (
    <div
      className="flex flex-row items-center w-full gap-[12px] px-[18px] py-[12px] 
    self-stretch rounded-[4px] border-[1px] border-[#E5E7EB] "
    >
      {children}
    </div>
  );
};

export default InputCard;
