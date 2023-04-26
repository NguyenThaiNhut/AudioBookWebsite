<template>
  <div>
    <div class="my-20" v-show="!isReadyCart">
      <h1 class="font-bold text-5xl text-center">Giỏ hàng đang rỗng</h1>
      <p class="text-center mt-5 text-lg">
        Đăng nhập hoặc thêm sản phẩm đầu tiên cho bạn!!!
      </p>
    </div>
    <div v-show="isReadyCart">
      <div
        class="lg:flex lg:flex-row gap-10 bg-slate-100 px-5 lg:pl-10 lg:mr-10"
      >
        <div id="cart" class="w-full flex-auto">
          <h1 class="my-8 text-4xl font-bold text-gray-700">
            GIỎ HÀNG CỦA BẠN ({{ cart.bookNumber }})
          </h1>
          <div class="my-5">
            <div class="w-full my-10 overflow-x-auto">
              <div class="w-full">
                <div
                  class="min-w-[300px] bg-white border border-slate-300 text-center sm:text-left sm:flex lg:flex-row w-full rounded-3xl mb-5"
                  v-for="items in setBookCart"
                  :key="items.Book.ID"
                >
                  <div class="flex-none sm:w-[200px]" v-if="items.Book.Img">
                    <div class="flex flex-col items-center w-full">
                      <img
                        class="w-[150px] rounded-xl m-5 cursor-pointer"
                        :src="items.Book.Img"
                        @click="detailBook(items.Book.ID)"
                      />
                    </div>
                  </div>
                  <div class="flex-auto my-5 w-full h-[150px]">
                    <div class="w-full h-[150px] flex flex-col justify-between">
                      <div>
                        <p
                          v-if="items.Book.BookName"
                          class="text-xl font-bold cursor-pointer"
                          @click="detailBook(items.Book.ID)"
                        >
                          {{ items.Book.BookName }}
                        </p>
                        <p class="pt-2" v-if="items.Book.Author">
                          -{{ items.Book.Author }}-
                        </p>
                      </div>
                      <div
                        v-if="items.Book.Price"
                        class="flex flex-row justify-between mx-5 sm:ml-0 sm:mr-5"
                      >
                        <div class="font-bold text-green-700">
                          {{
                            items.Book.Price.toLocaleString("vi-VN", {
                              style: "currency",
                              currency: "VND",
                            })
                          }}
                        </div>

                        <div
                          @click="deleteBook(items.Id)"
                          v-if="items.Book.BookName"
                          class="italic text-red-500 hover:underline hover:font-bold cursor-pointer"
                        >
                          Xoá sản phẩm
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="flex flex-col items-center">
          <div
            id="payment"
            class="flex-none min-w-[300px] w-full sm:w-[500px] px-10 bg-white"
          >
            <h1 class="my-8 text-4xl font-bold text-gray-700">Thanh toán</h1>
            <hr class="bg-slate-600 h-px w-full" />
            <table class="w-full mt-2">
              <tr>
                <td>Tổng tiền (VNĐ):</td>
                <td class="text-right">
                  {{
                    cart.totalPrice.toLocaleString("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    })
                  }}
                </td>
              </tr>
              <tr>
                <td>Giảm giá (VNĐ):</td>
                <td class="text-right">
                  {{
                    cart.discount.toLocaleString("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    })
                  }}
                </td>
              </tr>
              <tr class="font-bold text-lg">
                <td>Tổng thanh toán (VNĐ):</td>
                <td class="text-right">
                  {{
                    cart.totalPrice.toLocaleString("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    })
                  }}
                </td>
              </tr>
            </table>

            <div
              id="methodPayment"
              class="border border-black my-10 rounded-2xl"
            >
              <div
                id="methodPaymentChild"
                class="border border-black mx-5 mt-10 mb-5 p-4 rounded-sm"
              >
                <div>
                  <h1 class="text-lg font-bold text-gray-700">
                    Phương thức thanh toán:
                  </h1>
                  <div class="w-[100px]">
                    <img
                      src="https://inrenhat.com/wp-content/uploads/2022/08/logo-sacombank.jpg"
                      alt="Sacombank"
                    />
                  </div>
                </div>

                <hr class="bg-slate-600 h-px w-full" />

                <div class="mt-10">
                  <div>
                    <div class="my-2">
                      <label for="cardNumber">Số tài khoản:</label>
                    </div>
                    <div>
                      <input
                        id="cardNumber"
                        class="border-slate-200 w-full border outline-0 rounded-md bg-gray-50 focus:border-blue-400 p-3"
                        type="search"
                        v-model="cartNumber"
                        maxlength="19"
                        placeholder="____ ____ ____ ____"
                        @input="cartNumberBinding()"
                        @keyup.enter="order()"
                      />
                    </div>
                  </div>

                  <div>
                    <div class="my-2">
                      <label for="expirationDate">Ngày hết hạn:</label>
                    </div>
                    <div>
                      <input
                        id="expirationDate"
                        class="border-slate-200 w-full border outline-0 rounded-md bg-gray-50 focus:border-blue-400 p-3"
                        type="text"
                        v-model="expirationDate"
                        maxlength="5"
                        placeholder="MM/YY"
                        @input="dateBinding()"
                        @keyup.enter="order()"
                      />
                    </div>
                  </div>

                  <div>
                    <div class="my-2">
                      <label for="cvv">CVV:</label>
                    </div>
                    <div>
                      <input
                        id="cvv"
                        class="border-slate-200 w-full border outline-0 rounded-md bg-gray-50 focus:border-blue-400 p-3"
                        type="search"
                        maxlength="3"
                        v-model="cvv"
                        placeholder="***"
                        @input="numBinding()"
                        @keyup.enter="order()"
                      />
                    </div>
                  </div>
                </div>
                <input
                  @click="order()"
                  type="submit"
                  value="Xác nhận thanh toán"
                  class="bg-blue-400 text-white w-full py-2 px-6 rounded-full my-4 hover:bg-blue-500 cursor-pointer"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>


<script lang="ts">
import { defineComponent } from "vue";
import { cartService } from "../../service/cart_service";
import { orderService } from "../../service/order_service";
import { bookService } from "../../service/book_service";

export default defineComponent({
  data() {
    return {
      isReadyCart: false,

      bookCart: [],
      cart: {
        bookNumber: 0,
        cartId: -1,
        totalPrice: 0,
        discount: 0,
      },

      cartNumber: "",
      expirationDate: "",
      cvv: "",
    };
  },

  computed: {
    setBookCart() {
      if (this.bookCart.length > 0) this.isReadyCart = true;
      else this.isReadyCart = false;
      return this.bookCart;
    },
  },

  mounted() {
    //get sản phẩm từ server
    this.getToCart();

    //get sản phẩm bằng local storage
    // const user = this.$cookies.get("username");
    // const cartData = localStorage.getItem(`cart_${user}`);
    // const cart = cartData ? JSON.parse(cartData) : { items: [] };
    // console.log(cart);
    // if (user) {
    //   console.log(cart.items.length);
    //   if (cart.items.length > 0) {
    //     this.isReadyCart = true;
    //     cart.items.forEach((item: any) => {
    //       console.log(item); // In ra thông tin của từng sản phẩm trong giỏ hàng
    //       this.bookCart.push(item);
    //     });
    //   }
    // }
  },

  methods: {
    async getToCart() {
      try {
        if (this.$cookies.isKey("token")) {
          const { data, status } = await cartService.getToCart();
          if (status == 200) {
            this.bookCart = data.Data.Items;
            console.log(data.Data);
            this.cart.cartId = data.Data.Id;
            this.cart.bookNumber = this.bookCart.length;
            // this.cart.totalPrice = data.Data.TotalPrice;
            let total = 0;
            this.bookCart.forEach((item) => {
              total += item.Book.Price;
            });
            this.cart.totalPrice = total;
          } else {
            console.log("thiết lập giỏ hàng thất bại");
          }
        }
      } catch (error) {
        console.log(error);
      }
    },

    // deleteBook(index: number) {
    //   console.log(index);
    //   const user = this.$cookies.get("username");
    //   const cartData = localStorage.getItem(`cart_${user}`);
    //   const cart = cartData ? JSON.parse(cartData) : { items: [] };
    //   cart.items.splice(index - 1, 1);

    //   console.log(
    //     "length cart: " + cart.items.length + ", length items: " + index
    //   );
    //   localStorage.setItem(`cart_${user}`, JSON.stringify(cart));
    //   this.bookCart.splice(index, 1);
    // },

    //ràng buộc số tài khoản
    cartNumberBinding() {
      this.cartNumber = this.cartNumber.replace(/[^0-9]/g, "");
      let newValue = "";
      if (this.cartNumber.length > 4 && this.cartNumber.length <= 8) {
        newValue = `${this.cartNumber.slice(0, 4)} ${this.cartNumber.slice(4)}`;
      } else if (this.cartNumber.length > 8 && this.cartNumber.length <= 12) {
        newValue = `${this.cartNumber.slice(0, 4)} ${this.cartNumber.slice(
          4,
          8
        )} ${this.cartNumber.slice(8)}`;
      } else if (this.cartNumber.length > 12) {
        newValue = `${this.cartNumber.slice(0, 4)} ${this.cartNumber.slice(
          4,
          8
        )} ${this.cartNumber.slice(8, 12)} ${this.cartNumber.slice(12)}`;
      } else {
        newValue = this.cartNumber;
      }
      this.cartNumber = newValue;
    },

    // ràng buộc ngày
    dateBinding() {
      this.expirationDate = this.expirationDate.replace(/[^0-9]/g, "");

      let newValue = "";
      if (this.expirationDate.length > 2) {
        newValue = `${this.expirationDate.slice(
          0,
          2
        )}/${this.expirationDate.slice(2)}`;
      } else {
        newValue = this.expirationDate;
      }
      this.expirationDate = newValue;
    },

    //ràng buộc CVV
    numBinding() {
      this.cvv = this.cvv.replace(/[^0-9]/g, "");
    },

    validateAccount(): boolean {
      //form validation - kiểm tra rỗng
      if (
        this.cartNumber.length !== 19 ||
        this.expirationDate.length !== 5 ||
        this.cvv.length !== 3
      ) {
        alert("Vui lòng nhập đầy đủ thông tin bắt buộc");
        return false;
      }

      let month = parseInt(this.expirationDate.slice(0, 2));
      console.log(month);
      if (month <= 0 || month >= 13) {
        alert("Tháng nhập vào không hợp lệ");
        return false;
      }

      return true;
    },

    //xóa toàn bộ sách trong giỏ hàng
    async deleteAllBookInCartFunc() {
      // Người dùng đã chọn đồng ý
      try {
        const { data, status } = await cartService.deleteAllBookInCart();
        if (status == 200) {
          console.log("Xóa toàn bộ sách trong giỏ hàng thành công");
          this.getToCart();
        } else {
          console.log("Không thể xóa toàn bộ sách trong giỏ hàng");
        }
      } catch (error) {
        console.log(error);
      }
    },

    //xác nhận mua hàng
    async order() {
      if (!this.validateAccount()) {
        return;
      }

      try {
        // console.log(this.cart.cartId);
        // console.log(typeof this.cart.cartId);
        const { data, status } = await orderService.orderBook(this.cart.cartId);
        if (status == 200) {
          alert(
            "Xác nhận mua hàng thành công. Sản phẩm sẽ được chuyển vào danh sách phát của bạn sớm nhất"
          );
          console.log(data.Data);
          this.$router.push("/notify/wait");
        } else {
          alert("Thanh toán thất bại");
        }
      } catch (error) {
        console.log(error);
      }
    },

    // xóa sách theo id
    async deleteBook(itemsId: number) {
      const result = confirm("Bạn thật sự muốn xóa sách này?");
      if (result === true) {
        // Người dùng đã chọn đồng ý
        try {
          const { data, status } = await cartService.deleteBookInCartById(
            itemsId
          );
          if (status == 200) {
            console.log("Xóa sách thành công");
            this.getToCart();
          } else {
            console.log("Không thể xóa sách");
          }
        } catch (error) {
          console.log(error);
        }
      } else {
        // Người dùng đã chọn từ chối
      }
    },

    //lấy thông tin của sách theo id sách
    async setupBookInfo(idBook: number) {
      const bookCategories = [];
      try {
        const { data, status } = await bookService.getBookId(idBook);
        if (status == 200) {
          console.log("Lấy thông tin sách thành công");
          this.bookCategories = data.Data.BookCategory;
        }
      } catch (error) {
        console.log(error);
      }
      return this.bookCategories;
    },

    //di chuyển đến nội dung của 1 audio book khi click vào audio book tương ứng
    async detailBook(idBook: number) {
      const bookCategories = await this.setupBookInfo(idBook);
      const idCategory = bookCategories[0].ID;
      this.$router.push(`/genres/${idCategory}/book/${idBook}`);
    },
  },
});
</script>