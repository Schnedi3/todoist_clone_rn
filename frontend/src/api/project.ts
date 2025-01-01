import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "expo-router";

import { baseURL } from "@/src/constants/baseURL";

export const useGetProjects = () => {
  return useQuery({
    queryKey: ["projects"],
    queryFn: async () => {
      const response = await fetch(`${baseURL}/project`, { method: "GET" });
      return response.json();
    },
    initialData: [],
  });
};

export const useAddProject = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: async ({ name, color }: { name: string; color: string }) => {
      await fetch(`${baseURL}/project`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, color }),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      router.dismiss();
    },
  });
};
