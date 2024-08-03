import { NextResponse, type NextRequest } from 'next/server';

const EMAIL_TOKEN = 'sb-ripbxzxpvscuqgdjpkix-auth-token';
const KAKAO_TOKEN_0 = 'sb-ripbxzxpvscuqgdjpkix-auth-token.0';
const KAKAO_TOKEN_1 = 'sb-ripbxzxpvscuqgdjpkix-auth-token.1';
const AUTH_PATHS = ['/auth', '/null', '/undefined'];

const hasValidToken = (request: NextRequest) => {
  const emailToken = request.cookies.get(EMAIL_TOKEN)?.value;
  const kakaoToken0 = request.cookies.get(KAKAO_TOKEN_0)?.value;
  const kakaoToken1 = request.cookies.get(KAKAO_TOKEN_1)?.value;
  return emailToken || kakaoToken0 || kakaoToken1;
};

export const middleware = (request: NextRequest) => {
  const { pathname } = request.nextUrl;
  const workspaceIdMatch = pathname.match(/^\/(\d+)/);
  const workspaceId = workspaceIdMatch ? workspaceIdMatch[1] : null;
  const cookies = request.headers.get('cookie');
  //? WORKSPACE_ID임
  const userToken = cookies
    ?.split('; ')
    .find((row) => row.startsWith('userToken='))
    ?.split('=')[1];

  // TODO: /2로 시작할때 토큰을 가지고 있지 않으면 리다이렉트 시키는데? 어디로 시키는거지..? 홈으로 리다이렉트 시킨다.
  // if (pathname.startsWith(`/${workspaceId}`)) {
  //   if (!hasValidToken(request)) {
  //     return NextResponse.redirect(new URL('/', request.url));
  //   }
  //   return NextResponse.next();
  // }

  //TODO: 로그인 되어있을때 auth 랑 홈을 가면 /2로 리다이렉트 시킨다 // 쿠키 값을 가지고
  // if (AUTH_PATHS.some((path) => pathname.startsWith(path)) || pathname === '/') {
  //   if (hasValidToken(request)) {
  //     return NextResponse.redirect(new URL(`/${userToken}`, request.url));
  //   }
  //   return NextResponse.next();
  // }
};

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|/).*)']
};
