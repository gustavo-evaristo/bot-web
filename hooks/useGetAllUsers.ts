import { getAllUsers } from "@/api/user";
import { useQuery } from "@tanstack/react-query";

export function useGetAllUsers() {
  return useQuery({
    queryKey: ["getAllUsers"],
    queryFn: () => getAllUsers(),
    enabled: true,
  })
}
