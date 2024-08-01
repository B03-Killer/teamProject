import { NextResponse, type NextRequest } from 'next/server';

const EMAIL_TOKEN = 'sb-ripbxzxpvscuqgdjpkix-auth-token';
const KAKAO_TOKEN_0 = 'sb-ripbxzxpvscuqgdjpkix-auth-token.0';
const KAKAO_TOKEN_1 = 'sb-ripbxzxpvscuqgdjpkix-auth-token.1';

export const middleware = (request: NextRequest) => {
  console.log('redirect 미들웨어 실행~~~');
  const { pathname } = request.nextUrl;
  const workspaceIdMatch = pathname.match(/^\/(\d+)/);
  const workspaceId = workspaceIdMatch ? workspaceIdMatch[1] : null;
  const cookies = request.headers.get('cookie');
  const userToken = cookies
    ?.split('; ')
    .find((row) => row.startsWith('userToken='))
    ?.split('=')[1];
  const emailToken = request.cookies.get(EMAIL_TOKEN)?.value;
  const kakaoToken0 = request.cookies.get(KAKAO_TOKEN_0)?.value;
  const kakaoToken1 = request.cookies.get(KAKAO_TOKEN_1)?.value;

  if (pathname.startsWith(`/${workspaceId}`)) {
    if (!emailToken && !kakaoToken0 && !kakaoToken1) {
      return NextResponse.redirect(new URL('/', request.url));
    }
    return NextResponse.next();
  }

  if (pathname.startsWith('/auth')) {
    if (emailToken || kakaoToken0 || kakaoToken1) {
      return NextResponse.redirect(new URL(`/${userToken}`, request.url));
    }
    return NextResponse.next();
  }

  if (pathname === '/') {
    if (emailToken || kakaoToken0 || kakaoToken1) {
      return NextResponse.redirect(new URL(`/${userToken}`, request.url));
    }
    return NextResponse.next();
  }
};

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|/).*)']
};
