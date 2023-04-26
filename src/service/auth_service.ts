import type { UserRecord, UserResponse } from "@/model/user/user";
import { ApiClient } from ".";
import type { LoginRequest, SignupRequest, editInfoRequest } from "@/model/user/request";
import { useCookies } from 'vue3-cookies'


class AuthService extends ApiClient {
  //gửi dữ liệu đăng nhập, nhận thông tin trả về
  public login(data: LoginRequest) {
    return this.$post<UserResponse<UserRecord>>('signin', data); // err: api đang ngược, signup với signin
  }

  //gửi dữ liệu đăng ký, nhận thông tin trả về
  public signUp(data: SignupRequest) {
    return this.$post<UserResponse<UserRecord>>('signup', data); // err: api đang ngược, signup với signin
  }

  //gửi dữ liệu chỉnh sửa thông tin cá nhân, nhận thông tin trả về
  public editInfo(data: editInfoRequest) {
    const { cookies } = useCookies()
    const token = cookies.get('token')
    console.log(token)

    return this.$post<UserResponse<UserRecord>>('update', data, {
      headers: {
        Authorization: `Bearer ${token}` // Đính kèm token trong header Authorization
      }
    })
  }

  //lấy thông tin người dùng đã đăng nhập
  public getProfile() {
    const { cookies } = useCookies()
    const token = cookies.get('token')

    return this.$get<UserResponse<UserRecord>>('profile', {}, {
      headers: {
        Authorization: `Bearer ${token}` // Đính kèm token trong header Authorization
      }
    })
  }
}

export const authService = new AuthService("user");
