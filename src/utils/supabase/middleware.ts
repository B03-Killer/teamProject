import { redirectRoutes } from '@/constants/redirectRoutes';
import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';
import { getCurrentRoute } from './getCurrentRoute';
import { captureMessage } from '@sentry/nextjs';

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

  const {
    data: { user }
  } = await supabase.auth.getUser();

  const path = request.nextUrl.pathname;
  const workspaceId = request.cookies.get('workspaceId')?.value;

  const isWorkspaceIdCookieMissing = user && !workspaceId && path.startsWith(`/${workspaceId}`);

  if (isWorkspaceIdCookieMissing) {
    captureMessage('현재 쿠키값에 workspaceId가 없어서 센트리 에러를 로깅합니다.', {
      level: 'error'
    });
  }

  const target = getCurrentRoute({ routes: redirectRoutes, path });

  if (user && target?.isGuestOnly) {
    return NextResponse.redirect(new URL(`/${workspaceId}`, request.url));
  }

  if (!user && target?.isAuthOnly) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return supabaseResponse;
}
