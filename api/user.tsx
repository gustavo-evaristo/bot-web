import { UserDTO } from "@/dto/user.dto";
import api from "@/service/axios";

export async function getAllUsers(): Promise<UserDTO> {
  const { data } = await api.get("/users");

  return data;
}