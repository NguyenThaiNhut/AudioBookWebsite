import type { SaveCategoryBookResponse, CategoryBookRecord } from "@/model/category_book/category_book";
import { ApiClient } from ".";
import { useCookies } from 'vue3-cookies'

class CartService extends ApiClient {

    // thêm sách vào giỏ hàng
    public addToCart(BookId: number) {
        const { cookies } = useCookies();
        const token = cookies.get('token');

        return this.$post<CartResponse<CartRecord>>('add', { BookId }, {
            headers: {
                Authorization: `Bearer ${token}`// Đính kèm token trong header Authorization
            }
        })
    }

    // hiển thị tất cả sản phẩm trong giỏ hàng
    public getToCart() {
        const { cookies } = useCookies();
        const token = cookies.get('token');

        return this.$get<CartResponse<CartRecord>>('', {}, {
            headers: {
                Authorization: `Bearer ${token}`// Đính kèm token trong header Authorization
            }
        })
    }

    // xóa sản phẩm trong giỏ hàng theo id
    public deleteBookInCartById(itemsId: number) {
        const { cookies } = useCookies();
        const token = cookies.get('token');
        return this.$delete<CartResponse<CartRecord>>(itemsId, {}, {
            headers: {
                Authorization: `Bearer ${token}`// Đính kèm token trong header Authorization
            }
        })
    }

    // xóa toàn bộ sản phẩm trong giỏ hàng
    public deleteAllBookInCart() {
        const { cookies } = useCookies();
        const token = cookies.get('token');
        return this.$delete<CartResponse<CartRecord>>("delete", {}, {
            headers: {
                Authorization: `Bearer ${token}`// Đính kèm token trong header Authorization
            }
        })
    }
}

export const cartService = new CartService("cart");
