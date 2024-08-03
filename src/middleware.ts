import type { NextRequest } from 'next/server';
import { updateSession } from '@/utils/supabase/middleware';

// ??: 경로를 잃었다
export async function middleware(request: NextRequest) {
  return await updateSession(request);
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)']
};
