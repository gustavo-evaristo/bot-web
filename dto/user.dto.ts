
export interface UserDTO {
  id: string
  name: string
  phone: string
  email: string
  createdAt: string
  updatedAt: string
}

export interface UserLoginDTO {
  email: string;
  password: string
}

export interface UserRegisterDTO {
  name: string
  email: string
  phone: string
  password: string
  confirmPassword:string
}

export interface UserRegisterResponseDTO {
  user: UserDTO,
  accessToken: string
}