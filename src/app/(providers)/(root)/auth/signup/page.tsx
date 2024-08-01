'use client';
import { supabase } from '@/utils/supabase/supabaseClient';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { checkEmail, emailRegex } from '../_utils/emailCheck';
import BackButton from '../_components/BackButton';

const SignUpPage = () => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [emailCheck, setEmailCheck] = useState<boolean>(false);
  const [password, setPassword] = useState<string>('');
  const [passwordCheck, setPasswordCheck] = useState<string>('');
  const route = useRouter();

  // TODO : 리팩터링 예정
  const signUpMutation = useMutation({
    mutationFn: async () => {
      if (!name || !email || !password || !passwordCheck) return alert('빈칸을 입력해주세요.');
      if (!emailCheck) return alert('이메일 중복확인을 진행해주세요.');
      if (password !== passwordCheck) return alert('비밀번호가 일치하지 않습니다.');

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

      if (error?.message === 'Email rate limit exceeded') return alert('이메일 전송 할당량이 초과되었습니다.');

      if (error) return alert(`회원가입 중 에러 : ${error.message}`);

      if (data) {
        setEmailCheck(false);
        route.push(`/auth/signup/verify?email=${encodeURIComponent(email)}`);
      }
    }
  });

  const handleEmailCheck = async (email: string) => {
    if (!emailRegex(email)) {
      setEmailCheck(false);
      alert('이메일 형식이 올바르지 않습니다.');
      return;
    }

    const isDuplicateEmail = await checkEmail(email);
    if (!isDuplicateEmail) return setEmailCheck(true);
    if (isDuplicateEmail) {
      setEmailCheck(false);
      return alert('이미 존재하는 이메일입니다.');
    }
  };

  const { mutate: signUpMutate } = signUpMutation;

  return (
    <main className="flex justify-center items-center">
      <div className="flex flex-col w-[375px] h-dvh px-4">
        <div className="flex w-[375px] h-[52px] pt-[14px] pb-[12px] items-center">
          <BackButton />
        </div>
        <div className="flex-grow">
          <h1 className="text-[20px] text-[#2E2E2E] font-semibold pt-[42px] pb-[28px] flex items-center">정보 입력</h1>
          <div className="flex flex-col gap-[24px]">
            <div className="flex flex-col">
              <label className="text-[14px] text-[#333] opacity-60 pl-[6px] pb-2" htmlFor="name">
                이름
              </label>
              <input
                className="py-[12px] px-[16px] rounded-lg border border-[#C7C7C7] shadow-md focus:outline-none"
                type="text"
                id="name"
                placeholder="이름을 입력해주세요."
                value={name}
                onChange={(e) => setName(e.target.value)}
                required={true}
              />
            </div>
            <div className="flex flex-col">
              <label className="text-[14px] text-[#333] opacity-60 pl-[6px] pb-2" htmlFor="email">
                이메일 입력
              </label>
              <div className="flex gap-[12px]">
                <input
                  className="py-[12px] px-[16px] rounded-lg border border-[#C7C7C7] shadow-md focus:outline-none"
                  type="email"
                  id="email"
                  placeholder="이메일을 입력해주세요."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required={true}
                />
                <button
                  onClick={() => handleEmailCheck(email)}
                  className="w-full text-sm py-[12px] bg-[#7173FA] text-white rounded-lg shadow-md"
                >
                  중복확인
                </button>
              </div>
              {emailCheck ? (
                <p className="text-[14px] text-[#6C6C6C] opacity-60 pt-2">사용 가능한 이메일 입니다!</p>
              ) : null}
            </div>
            <div className="flex flex-col">
              <label className="text-[14px] text-[#333] opacity-60 pl-[6px] pb-2" htmlFor="password">
                비밀번호
              </label>
              <input
                className="py-[12px] px-[16px] rounded-lg border border-[#C7C7C7] shadow-md focus:outline-none"
                type="password"
                id="password"
                placeholder="비밀번호를 입력해주세요."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required={true}
              />
            </div>
            <div className="flex flex-col pb-[32px]">
              <label className="text-[14px] text-[#333] opacity-60 pl-[6px] pb-2" htmlFor="passwordCheck">
                비밀번호 재입력
              </label>
              <input
                className="py-[12px] px-[16px] rounded-lg border border-[#C7C7C7] shadow-md focus:outline-none"
                type="password"
                id="passwordCheck"
                placeholder="비밀번호를 입력해주세요."
                value={passwordCheck}
                onChange={(e) => setPasswordCheck(e.target.value)}
                required={true}
              />
            </div>
          </div>
        </div>
        <div className="flex justify-center pb-4 sticky bottom-0 z-10 bg-white">
          <button
            onClick={() => signUpMutate()}
            className="w-full text-lg py-[12px] px-[22px] bg-[#7173FA] text-white rounded-lg shadow-md"
            disabled={signUpMutation.isPending ? true : false}
          >
            {signUpMutation.isPending ? '메일 발송중...' : '인증 메일 발송'}
          </button>
        </div>
      </div>
    </main>
  );
};

export default SignUpPage;
