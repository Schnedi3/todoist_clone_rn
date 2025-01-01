import { useQuery } from "@tanstack/react-query";

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
