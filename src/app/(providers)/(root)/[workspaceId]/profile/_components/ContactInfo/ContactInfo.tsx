import useWorkspaceUser from '@/hooks/useWorkspaceUser';
import BriefcaseIcon from '@/icons/Briefcase.svg';
import LockIcon from '@/icons/Lock.svg';
import MailIcon from '@/icons/Mail.svg';
import PhoneIcon from '@/icons/Phone.svg';
import { useParams } from 'next/navigation';
import InfoForm from '../InfoForm';

interface ContactInfoProps {
  isMyPage: boolean;
}

const ContactInfo = ({ isMyPage }: ContactInfoProps) => {
  const params = useParams();
  const workspaceId = params.workspaceId as string;
  const { workspaceUser } = useWorkspaceUser(workspaceId);
  const isOpen = workspaceUser && workspaceUser.is_open;
  const state = workspaceUser && workspaceUser.state;
  const email = workspaceUser && workspaceUser.email;
  const phoneNum = workspaceUser && workspaceUser.phone;

  if (!(state && email && phoneNum)) return;

  return (
    <div className="flex flex-col gap-[20px] mt-[42px]">
      <InfoForm title="활동 상태" content={state}>
        <BriefcaseIcon className="w-[20px] h-[20px]" />
      </InfoForm>
      <InfoForm title="이메일 주소" content={isOpen ? email : '-'}>
        <MailIcon />
      </InfoForm>
      <InfoForm title="휴대폰 번호" content={isOpen ? phoneNum : '-'}>
        <PhoneIcon />
      </InfoForm>

      {isMyPage && (
        <InfoForm title="내 정보" content={isOpen ? '공개' : '비공개'}>
          <LockIcon />
        </InfoForm>
      )}
    </div>
  );
};

export default ContactInfo;