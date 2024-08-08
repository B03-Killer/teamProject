'use client';
import { supabase } from '@/utils/supabase/supabaseClient';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { checkEmail, emailRegex } from '../_utils/emailCheck';
import { useSnackBar } from '@/providers/SnackBarContext';
import AgreeBottomSheet from './_components/AgreeBottomSheet';
import { TopBar } from '@/components/TopBar';
import { validatePassword } from './verify/_utils/validatePassword';

const SignUpPage = () => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [emailCheck, setEmailCheck] = useState<boolean>(false);
  const [password, setPassword] = useState<string>('');
  const [passwordCheck, setPasswordCheck] = useState<string>('');
  const [isOpen, setIsOpen] = useState(false);
  const route = useRouter();
  const { openSnackBar } = useSnackBar();

  // TODO : 리팩터링 예정
  const signUpMutation = useMutation({
    mutationFn: async () => {
      const passwordValidationMessage = validatePassword(password);
      if (!emailCheck) return openSnackBar({ message: '이메일 중복확인을 해주세요' });
      if (password !== passwordCheck) return openSnackBar({ message: '비밀번호가 일치하지 않아요' });
      if (passwordValidationMessage !== true) return openSnackBar({ message: passwordValidationMessage });

      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${process.env.NEXT_PUBLIC_API_URL}/api/signup/email`,
          data: {
            name: name
          }
        }
      });

      if (error?.message === 'Email rate limit exceeded') {
        return openSnackBar({ message: '할당량이 초과되었어요.' });
      }

      if (error) {
        return openSnackBar({ message: '에러가 발생했어요.' });
      }

      if (data) {
        setEmailCheck(false);
        handleToggleBottomSheet();
      }
    }
  });

  const emailCheckMutation = useMutation({
    mutationFn: async (email: string) => {
      if (!emailRegex(email)) {
        setEmailCheck(false);
        openSnackBar({ message: '이메일 형식이 올바르지 않아요' });
        return;
      }

      const isDuplicateEmail = await checkEmail(email);
      if (!isDuplicateEmail) return setEmailCheck(true);
      if (isDuplicateEmail) {
        setEmailCheck(false);
        return openSnackBar({ message: '이미 존재하는 이메일이에요' });
      }
    }
  });

  const handleToggleBottomSheet = () => {
    setIsOpen((prev) => !prev);
  };

  const { mutate: handleSignUp } = signUpMutation;
  const { mutate: handleEmailCheck } = emailCheckMutation;

  return (
    <main className="flex justify-center items-center">
      <div className="flex flex-col w-[375px] h-dvh px-4">
        <TopBar title="" style={{ padding: '0px' }} />
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSignUp();
          }}
        >
          <div className="flex-grow">
            <h1 className="text-[20px] text-[#2E2E2E] font-semibold pt-[42px] pb-[28px] flex items-center">
              정보 입력
            </h1>
            <div className="flex flex-col gap-[24px]">
              <div className="flex flex-col">
                <label className="text-[14px] text-[#2F323C] pl-[6px] mb-2" htmlFor="name">
                  이름
                </label>
                <input
                  className="py-[12px] px-[16px] rounded-lg border border-[#C7C7C7] shadow-md focus:outline-none"
                  type="text"
                  id="name"
                  placeholder="홍길동"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required={true}
                />
              </div>
              <div className="flex flex-col">
                <label className="text-[14px] text-[#2F323C] pl-[6px] mb-2" htmlFor="email">
                  이메일 입력
                </label>
                <div className="flex gap-[12px]">
                  <input
                    className="py-[12px] px-[16px] rounded-lg border border-[#C7C7C7] shadow-md focus:outline-none"
                    type="email"
                    id="email"
                    placeholder="asdf123@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required={true}
                  />
                  <button
                    type="button"
                    onClick={() => handleEmailCheck(email)}
                    disabled={emailCheckMutation.isPending ? true : false}
                    className="w-full flex-shrink text-sm py-[12px] bg-[#7173FA] text-white rounded-lg shadow-md"
                  >
                    {emailCheckMutation.isPending ? '확인중...' : '중복확인'}
                  </button>
                </div>
                {emailCheck ? <p className="text-[14px] text-[#6C6C6C] pt-2">사용 가능한 이메일 입니다</p> : null}
              </div>
              <div className="flex flex-col">
                <label className="text-[14px] text-[#2F323C] pl-[6px] mb-2" htmlFor="password">
                  비밀번호
                </label>
                <input
                  className="py-[12px] px-[16px] rounded-lg border border-[#C7C7C7] shadow-md focus:outline-none"
                  type="password"
                  id="password"
                  placeholder="비밀번호 입력"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required={true}
                  maxLength={8}
                />
                <p className="text-[14px] text-[#ACB1BE] pl-[6px] mt-2">영문자 및 숫자 조합으로 8자 이내 입력</p>
              </div>
              <div className="flex flex-col pb-[32px]">
                <label className="text-[14px] text-[#2F323C] pl-[6px] mb-2" htmlFor="passwordCheck">
                  비밀번호 재입력
                </label>
                <input
                  className="py-[12px] px-[16px] rounded-lg border border-[#C7C7C7] shadow-md focus:outline-none"
                  type="password"
                  id="passwordCheck"
                  placeholder="비밀번호 재입력"
                  value={passwordCheck}
                  onChange={(e) => setPasswordCheck(e.target.value)}
                  required={true}
                  maxLength={8}
                />
                <p className="text-[14px] text-[#ACB1BE]  pl-[6px] mt-2">영문자 및 숫자 조합으로 8자 이내 입력</p>
              </div>
            </div>
          </div>
          <div className="flex justify-center pb-4 sticky bottom-0 bg-white">
            <button
              className="w-full text-lg py-[12px] px-[22px] bg-[#7173FA] text-white rounded-lg shadow-md"
              disabled={signUpMutation.isPending ? true : false}
            >
              {signUpMutation.isPending ? '메일 발송중...' : '인증 메일 발송'}
            </button>
          </div>
        </form>
      </div>
      <AgreeBottomSheet isOpen={isOpen} handleToggleBottomSheet={handleToggleBottomSheet} email={email} />
    </main>
  );
};

export default SignUpPage;
