'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper/modules';
import Image from 'next/image';
import Link from 'next/link';
import { signInWithKakao } from './auth/_utils/kakaoLogin';
import KakaoIcon from '@/icons/Kakao.svg';
import Typography from '@/components/Typography';

// TODO : 리팩터링 예정
const LandingPage = () => {
  return (
    <main className="relative flex justify-center items-center">
      <div className="w-[375px] h-dvh flex flex-col px-4">
        <div className="flex-grow flex items-center">
          <Swiper
            modules={[Navigation, Pagination]}
            slidesPerView={1}
            navigation
            pagination={{
              clickable: true
            }}
          >
            {onboardingData.map((item) => (
              <SwiperSlide key={item.id}>
                <div className="flex flex-col items-center justify-center">
                  <div className="w-full">
                    <Image
                      className="w-full h-auto object-cover aspect-square"
                      src={item.image}
                      alt="일러스트 이미지"
                      width={375}
                      height={454}
                      unoptimized
                    />
                  </div>
                  <div className="flex flex-col items-center justify-center h-[132px] text-[24px] font-bold mb-9">
                    <Typography variant="Title22px" className="text-center mb-3 " color="grey900">
                      {item.title}
                    </Typography>
                    <Typography
                      variant="Subtitle16px"
                      className="text-center whitespace-pre-line tracking-tighter "
                      color="grey500"
                    >
                      {item.subTitle}
                    </Typography>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div className="h-[148px]">
          <div className="w-full flex flex-col items-start gap-2 py-4">
            <button
              onClick={signInWithKakao}
              className="flex justify-center items-center w-full h-[56px] text-lg font-medium bg-[#FEE502] rounded-lg text-[#3B1E1D] px-[22px] py-[12px] shadow-[0px_1px_5px_0px_rgba(0,0,0,0.12)]"
            >
              <KakaoIcon className="h-6 w-6" />
              <span className="ml-3">카카오로 시작하기</span>
            </button>
          </div>
          <div className="pb-7 text-[14px] text-[#2F323C] flex justify-center items-center gap-1">
            <Link href="/auth/login">
              <Typography as="span" variant="Body14px" color="grey700Black">
                이메일로 로그인
              </Typography>
            </Link>
            <span>ㅣ</span>
            <Link href="/auth/signup">
              <Typography as="span" variant="Body14px" color="grey700Black">
                회원가입
              </Typography>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
};

const onboardingData = [
  {
    id: 1,
    image: '/images/onboarding/onboarding-todo.png',
    title: '나만의 똑똑한 일정관리',
    subTitle: `오늘 할 일을 계획하고,\n우선 순위 설정으로 중요한 일정을 놓칠 일이 없어요`
  },
  {
    id: 2,
    image: '/images/onboarding/onboarding-chat.png',
    title: '사내 업무공유와 채팅을 한번에 !',
    subTitle: '편리하고 심플한 업무용 메신저로 소통을 강화하고,\n직장 동료의 실시간 상태 확인으로 업무 효율을 높이세요'
  },
  {
    id: 3,
    image: '/images/onboarding/onboarding-meeting.png',
    title: '원할한 협업을 위한 화상회의',
    subTitle: '회의실로 직접 갈 필요 없이, 각자 자리에서 실시간으로\n시간을 절약하고, 협업의 효율성을 높이세요'
  }
];

export default LandingPage;
