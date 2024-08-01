import api from '@/api/api';
import { Tables } from '@/types/supabase';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

const useTodoList = (workspaceUserId: string | null) => {
  const queryClient = useQueryClient();
  const {
    data: todoList,
    isPending,
    isError
  } = useQuery<Tables<'todo'>[] | undefined>({
    queryKey: ['todo'],
    queryFn: () => {
      if (!workspaceUserId) return;
      return api.todo.getTodoList(workspaceUserId);
    },
    enabled: !!workspaceUserId
  });

  const { mutateAsync: delTodo } = useMutation({
    mutationFn: (todoId: string) => api.todo.delTodo(todoId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todo'] });
    }
  });

  const { mutateAsync: addTodo } = useMutation({
    mutationFn: (todo: Tables<'todo'>) => {
      return api.todo.postTodo(todo);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todo'] });
    }
  });

  const { mutateAsync: updateTodo } = useMutation({
    mutationFn: ({ todo, id }: { todo: Partial<Tables<'todo'>>; id: string }) => {
      return api.todo.putTodo(todo, id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todo'] });
    }
  });
  return { todoList, isPending, isError, delTodo, addTodo, updateTodo };
};

export default useTodoList;
