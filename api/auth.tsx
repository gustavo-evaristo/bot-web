import { UserLoginDTO, UserLoginResponseDTO, UserRegisterDTO, UserRegisterResponseDTO } from "@/dto/user.dto";
import api from "@/service/axios";

export async function loginProfile({
  email,
  password,
}: UserLoginDTO): Promise<UserLoginResponseDTO> {
  const { data } = await api.post("/login", {
    email,
    password,
  });

  return data;
}

export async function registerProfile({
  email,
  name,
  password,
  confirmPassword,
  phone,
}: UserRegisterDTO): Promise<UserRegisterResponseDTO> {
  const { data } = await api.post("/users", {
    email,
    name,
    password,
    confirmPassword,
    phone,
  });

  return data;
}