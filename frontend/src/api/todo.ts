import { useQuery } from "@tanstack/react-query";

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
