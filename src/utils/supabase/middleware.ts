import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => request.cookies.set(name, value));
          supabaseResponse = NextResponse.next({
            request
          });
          cookiesToSet.forEach(({ name, value, options }) => supabaseResponse.cookies.set(name, value, options));
        }
      }
    }
  );

  // ? 여기 처리 ? 어디서 가져온거지 아마 전 프로젝트 --------------------- --------------------- --------------------- --------------------- --------------
  // const {
  //   data: { user },
  // } = await supabase.auth.getUser();

  // if (user && request.nextUrl.pathname.startsWith("/login")) {
  //   return NextResponse.redirect(new URL("/", request.url));
  // }

  // ? 공홈 원본 --------------------- --------------------- --------------------- --------------------- --------------------- ---------------------
  // const {
  //   data: { user },
  // } = await supabase.auth.getUser()

  // if (
  //   !user &&
  //   !request.nextUrl.pathname.startsWith('/login') &&
  //   !request.nextUrl.pathname.startsWith('/auth')
  // ) {
  //   // no user, potentially respond by redirecting the user to the login page
  //   const url = request.nextUrl.clone()
  //   url.pathname = '/login'
  //   return NextResponse.redirect(url)
  // }

  // ? 챌린지 수업
  // ? api 도메인 자체에서 회원만 접근해야하는 페이지에 api 요청인 경우에는 리다이렉트를 강제로 하는 로직이 있다 백엔드 적인 방어 --------------------- ---------------------
  // const {
  //   data: { user },
  // } = await supabase.auth.getUser();

  // if (
  //   !user &&
  //   request.nextUrl.pathname !== "/" &&
  //   !request.nextUrl.pathname.startsWith("/api") &&
  //   !request.nextUrl.pathname.startsWith("/log-in")
  // ) {
  //   // no user, potentially respond by redirecting the user to the login page
  //   const url = request.nextUrl.clone();
  //   url.pathname = "/log-in";
  //   return NextResponse.redirect(url);
  // }

  return supabaseResponse;
}
