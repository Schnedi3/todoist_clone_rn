import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

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
