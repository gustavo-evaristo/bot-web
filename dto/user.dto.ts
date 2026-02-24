
export interface UserDTO {
  id: string,
  isActive?: boolean,
  name: string,
  email: string,
  phone: string,
  createdAt?: string,
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
  confirmPassword: string
}

export interface UserLoginResponseDTO {
  email: string
  id: string
  name: string
  phone: string
  token: string
}

export interface UserRegisterResponseDTO {
  id: string
  name: string
  phone: string
  email: string
  token: string
}
