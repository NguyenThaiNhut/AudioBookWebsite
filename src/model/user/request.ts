//tham số gửi đi / đăng nhập
export interface LoginRequest {
  username: string;
  password: string;
}

export interface SignupRequest {

  address: string;
  age: number;
  email: string;
  fullName: string;
  password: string;
  phone: string;
  photo: string;
  username: string;
}

export interface editInfoRequest {
  // username: string;
  address: string;
  age: number;
  email: string;
  fullName: string;
  // password: string;
  phone: string;
  photo: string;
}

