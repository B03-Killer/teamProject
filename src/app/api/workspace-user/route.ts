import { createClient } from '@/utils/supabase/supabaseServer';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (request: NextRequest) => {
  const supabase = createClient();
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('workspaceUserId');

  try {
    const { data, error } = await supabase.from('workspace_user').select().eq('id', id!);
    const workspaceUserInfo = data && data[0];
    if (error)
      return NextResponse.json({
        message: 'Failed to fetch supabase data',
        error,
        status: false,
        statusCode: 500
      });
    return NextResponse.json(workspaceUserInfo);
  } catch (error) {
    return NextResponse.json({
      message: 'Failed to fetch data',
      error,
      status: false,
      statusCode: 500
    });
  }
};
