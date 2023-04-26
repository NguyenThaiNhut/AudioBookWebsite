import type { UserRecord, UserResponse } from "@/model/user/user";
import { ApiClient } from ".";
import type { LoginRequest, SignupRequest, editInfoRequest } from "@/model/user/request";
import { useCookies } from 'vue3-cookies'


class OrderService extends ApiClient {

    //mua sách
    public orderBook(CartId: number) {
        const { cookies } = useCookies()
        const token = cookies.get('token')

        return this.$post<UserResponse<UserRecord>>('save', { CartId }, {
            headers: {
                Authorization: `Bearer ${token}` // Đính kèm token trong header Authorization
            }
        })
    }

    //lấy tất cả sách mua đang chờ xác nhận
    public getWaitingBook(status: number) {
        const { cookies } = useCookies()
        const token = cookies.get('token')

        return this.$get<UserResponse<UserRecord>>(`get/${status}`, {}, {
            headers: {
                Authorization: `Bearer ${token}` // Đính kèm token trong header Authorization
            }
        })
    }

    //lấy tất cả đơn hàng đang chờ xác nhận
    public getWaitingOrder(status: number) {
        const { cookies } = useCookies()
        const token = cookies.get('token')

        return this.$get<UserResponse<UserRecord>>(`me/${status}`, {}, {
            headers: {
                Authorization: `Bearer ${token}` // Đính kèm token trong header Authorization
            }
        })
    }
}

export const orderService = new OrderService("order");
