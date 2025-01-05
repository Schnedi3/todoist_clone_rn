import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "expo-router";

import { baseURL } from "@/src/constants/baseURL";

export const useGetTodos = () => {
  return useQuery({
    queryKey: ["todos"],
    queryFn: async () => {
      const response = await fetch(`${baseURL}/todo`, { method: "GET" });
      return response.json();
    },
    initialData: [],
  });
};

export const useAddTodo = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: async ({
      title,
      description,
      projectId,
      priority,
      dueDate,
    }: {
      title: string;
      description: string;
      projectId: number;
      priority: string;
      dueDate: string;
    }) => {
      await fetch(`${baseURL}/todo`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          description,
          projectId,
          priority,
          dueDate,
        }),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
      router.dismiss();
    },
  });
};

export const useCompleteTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      completed,
      id,
    }: {
      completed: boolean;
      id: number;
    }) => {
      await fetch(`${baseURL}/todo/completed/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ completed }),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });
};

export const useGetTodoById = (id: number) => {
  return useQuery({
    queryKey: ["todo", id],
    queryFn: async () => {
      const response = await fetch(`${baseURL}/todo/${id}`, { method: "GET" });
      return response.json();
    },
  });
};

export const useUpdateTodo = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: async ({
      title,
      description,
      projectId,
      priority,
      dueDate,
      id,
    }: {
      title: string;
      description: string;
      projectId: number;
      priority: string;
      dueDate: string;
      id: number;
    }) => {
      await fetch(`${baseURL}/todo/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          description,
          projectId,
          priority,
          dueDate,
        }),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
      router.dismiss();
    },
  });
};
