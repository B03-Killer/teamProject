import { createClient } from '@/utils/supabase/supabaseServer';
import { NextRequest, NextResponse } from 'next/server';
import { URL } from 'url';

export const GET = async (request: NextRequest) => {
  const supabase = createClient();
  const { searchParams } = new URL(request.url);
  const workspaceUserId = searchParams.get('workspaceUserId');

  try {
    const { data, error } = await supabase
      .from('todo')
      .select()
      .eq('workspace_user_id', workspaceUserId!)
      .order('start_date', { ascending: true });
    if (error)
      return NextResponse.json({
        message: 'Failed to fetch supabase data',
        error,
        status: false,
        statusCode: 500
      });
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({
      message: 'Failed to fetch data',
      error,
      status: false,
      statusCode: 500
    });
  }
};

export const DELETE = async (request: NextRequest) => {
  const { searchParams } = new URL(request.url);
  const todoId = searchParams.get('todoId');
  const supabase = createClient();

  try {
    const { error } = await supabase.from('todo').delete().eq('id', todoId!);

    if (error)
      return NextResponse.json({
        message: 'Failed to delete supabase data',
        error,
        status: false,
        statusCode: 500
      });
    return NextResponse.json({
      message: 'Success to delete data',
      error,
      status: false,
      statusCode: 200
    });
  } catch (error) {
    return NextResponse.json({
      message: 'Failed to delete data',
      error,
      status: false,
      statusCode: 500
    });
  }
};

export const POST = async (request: NextRequest) => {
  const todo = await request.json();
  const supabase = createClient();

  try {
    const { error } = await supabase.from('todo').insert(todo);

    if (error)
      return NextResponse.json({
        message: 'Failed to insert supabase data',
        error,
        status: false,
        statusCode: 500
      });
    return NextResponse.json({
      message: 'Success to insert data',
      error,
      status: false,
      statusCode: 200
    });
  } catch (error) {
    return NextResponse.json({
      message: 'Failed to post data',
      error,
      status: false,
      statusCode: 500
    });
  }
};

export const PUT = async (request: NextRequest) => {
  const requestData = await request.json();
  const todo = requestData.todo;
  const id = requestData.id;
  const supabase = createClient();

  try {
    const { error } = await supabase.from('todo').update(todo).eq('id', id);

    if (error)
      return NextResponse.json({
        message: 'Failed to insert supabase data',
        error,
        status: false,
        statusCode: 500
      });
    return NextResponse.json({
      message: 'Success to insert data',
      error,
      status: false,
      statusCode: 200
    });
  } catch (error) {
    return NextResponse.json({
      message: 'Failed to post data',
      error,
      status: false,
      statusCode: 500
    });
  }
};
