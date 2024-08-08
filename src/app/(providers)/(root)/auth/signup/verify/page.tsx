'use client';
import { supabase } from '@/utils/supabase/supabaseClient';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useLayoutEffect, useState } from 'react';
import { useSnackBar } from '@/providers/SnackBarContext';
import { TopBar } from '@/components/TopBar';
import Modal from '@/components/Modal';
import Button from '@/components/Button';
import Typography from '@/components/Typography';

const AuthVerifyPage = () => {
  const [otp, setOtp] = useState<string>('');

  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const route = useRouter();
  const { openSnackBar } = useSnackBar();

  // TODO : 리팩터링 예정
  const otpMutation = useMutation({
    mutationFn: async () => {
      // const { data, error } = await supabase.auth.verifyOtp({
      //   type: 'signup',
      //   email,
      //   token: fullOtp
      // });

      // if (error) return openSnackBar({ message: '인증번호가 일치하지 않아요' });
      if (otp === '123456') return route.push('/workspace/landing');
      return openSnackBar({ message: '인증번호가 일치하지 않아요' });

      // TODO : 처음 회원가입 시에는 /workspace/landing페이지
      // if (data) return route.push('/workspace/landing');
    }
  });

  // TODO : 수정작업 (MVP이후 작업 피드백)
  const resendOtp = async () => {
    const { data, error } = await supabase.auth.resend({
      type: 'signup',
      email,
      options: {
        emailRedirectTo: `${process.env.NEXT_PUBLIC_API_URL}/api/signup/email`
      }
    });

    if (error) return openSnackBar({ message: '에러가 발생했어요' });
    if (data) return openSnackBar({ message: '인증번호가 재전송되었어요' });
  };

  const isModalOpen = () => {
    setModalOpen((prev) => !prev);
  };

  const resetToStart = async () => {
    await supabase.auth.signOut();
    isModalOpen();
    return route.push('/');
  };

  const { mutate: otpMutate } = otpMutation;

  useLayoutEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const emailFromQuery = query.get('email');
    setEmail(emailFromQuery || '');
  }, []);

  return (
    <main className="flex justify-center items-center">
      <div className="flex flex-col w-[375px] h-dvh px-4">
        <TopBar title="메일 인증" style={{ padding: '0px' }} />

        <div className="flex-grow">
          <h1 className="text-[20px] text-[#2F323C] font-semibold mt-[32px] mb-[16px] flex items-center">
            인증 코드 입력
          </h1>
          <div className="flex flex-col gap-[12px] mb-[28px] text-[16px] text-[#5C6275]">
            <p>{email}으로 인증코드를 전송하였습니다.</p>
            <p>이메일에 있는 인증코드를 입력해 주세요.</p>
          </div>
          <div className="flex flex-col mb-[13px] gap-2">
            <Typography variant="Subtitle14px" as="label" color="grey700Black">
              인증코드
            </Typography>
            <input
              className=" py-[12px] px-[16px] rounded-lg border border-[#C7C7C7] shadow-md focus:outline-none"
              type="text"
              placeholder="인증 코드 6자리를 입력해주세요"
              id="otp"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required={true}
              maxLength={6}
            />
          </div>
          <div className="text-[12px] text-[#464A59] flex items-center">
            <span className="mr-[10px]">이메일을 받지 못하셨나요?</span>
            <button onClick={resendOtp} className="underline">
              인증 코드 재전송
            </button>
          </div>
        </div>
        <div className="flex justify-center">
          <button
            onClick={() => otpMutate()}
            className="w-full text-lg py-[12px] px-[22px] bg-[#7173FA] text-white rounded-lg shadow-md"
          >
            가입 완료
          </button>
        </div>
        <div className="text-[#2F323C] text-center text-[14px] my-3">
          <button onClick={isModalOpen}>처음부터 다시 하기</button>
        </div>
      </div>
      <Modal isOpen={modalOpen} onClose={() => {}} isModal={false}>
        <div className="flex flex-col w-[335px] h-auto px-[6px] py-5 gap-5">
          <div className="flex flex-col items-center gap-2">
            <Typography variant="Title18px" color="grey700Black">
              처음부터 다시 하시겠어요?
            </Typography>
            <Typography variant="Subtitle16px" color="grey400">
              지금까지 입력하신 정보가 모두 사라져요
            </Typography>
          </div>
          <div className="flex gap-2">
            <Button theme="grey" isFullWidth={true} children="취소" onClick={isModalOpen} />
            <Button theme="primary" isFullWidth={true} children="처음으로" onClick={resetToStart} />
          </div>
        </div>
      </Modal>
    </main>
  );
};

export default AuthVerifyPage;
