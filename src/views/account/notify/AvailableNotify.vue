<template>
  <div>
    <div class="my-20" v-show="!isReadyWaitingOrder">
      <h1 class="font-bold text-5xl text-center">
        Sản phẩm đang chờ xác nhận rỗng
      </h1>
    </div>
    <div v-show="isReadyWaitingOrder" class="bg-slate-100">
      <div class="lg:flex lg:flex-row gap-10 px-5 lg:pl-10">
        <div id="cart" class="w-full flex-auto">
          <h1 class="my-8 text-4xl font-bold text-gray-700">
            ĐƠN HÀNG XÁC NHẬN THÀNH CÔNG ({{ setOrder ? setOrder.length : 0 }})
          </h1>
          <div class="my-5">
            <div class="w-full my-10 overflow-x-auto">
              <div class="w-full">
                <div
                  class="my-5"
                  v-for="(items, index) in setOrder"
                  :key="index"
                >
                  <div
                    class="min-w-[300px] bg-white border border-slate-300 rounded-t-xl text-center sm:text-left sm:flex lg:flex-row w-full"
                  >
                    <div class="flex-auto my-3 w-full h-[30px]">
                      <div
                        class="w-full h-[50px] flex flex-col justify-between"
                      >
                        <div
                          v-if="items.Id"
                          class="flex flex-row justify-between mx-5"
                        >
                          <div>Mã đơn hàng: {{ items.Id }}</div>

                          <div class="italic text-red-500 font-bold">
                            Xác nhận thành công
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div v-for="(books, index) in items.Cart.Items" :key="index">
                    <div
                      class="min-w-[300px] bg-white border-x border-slate-300 text-center sm:text-left sm:flex lg:flex-row w-full"
                    >
                      <div class="flex-none sm:w-[200px]" v-if="books.Book.Img">
                        <div class="flex flex-col items-center w-full">
                          <img
                            class="w-[150px] rounded-xl m-5 cursor-pointer"
                            @click="detailBook(books.Book.ID)"
                            :src="books.Book.Img"
                          />
                        </div>
                      </div>
                      <div class="flex-auto w-full h-[150px]">
                        <div
                          class="w-full h-[150px] sm:py-5 flex flex-col justify-between"
                        >
                          <div>
                            <p
                              v-if="books.Book.BookName"
                              class="text-xl font-bold cursor-pointer"
                              @click="detailBook(books.Book.ID)"
                            >
                              {{ books.Book.BookName }}
                            </p>
                            <p class="pt-2" v-if="books.Book.Author">
                              -{{ books.Book.Author }}-
                            </p>
                          </div>
                          <div
                            v-if="books.Book.Price"
                            class="mb-5 sm:ml-0 sm:mr-5"
                          >
                            Giá:
                            <span class="font-bold text-blue-600">
                              {{
                                books.Book.Price.toLocaleString("vi-VN", {
                                  style: "currency",
                                  currency: "VND",
                                })
                              }}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    class="min-w-[300px] bg-white border border-slate-300 rounded-b-xl text-center sm:text-left sm:flex lg:flex-row w-full"
                  >
                    <div class="flex-auto my-3 w-full h-[30px]">
                      <div
                        class="w-full h-[50px] flex flex-col justify-between"
                      >
                        <div
                          v-if="items.Id"
                          class="flex flex-row justify-between mx-5"
                        >
                          <div>Số sản phẩm: {{ items.Cart.Items.length }}</div>
                          <div
                            v-if="items.Cart.Items"
                            class="font-bold text-right"
                          >
                            Tổng đơn hàng:
                            <span class="text-blue-600 text-xl">
                              {{
                                totalBooksPrice(
                                  items.Cart.Items
                                ).toLocaleString("vi-VN", {
                                  style: "currency",
                                  currency: "VND",
                                })
                              }}
                            </span>
                          </div>
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
            class="flex-none min-w-[300px] w-full sm:w-[500px] px-10 bg-white pb-8"
          >
            <h1 class="my-8 text-4xl font-bold text-gray-700">
              Tổng thanh toán
            </h1>
            <hr class="bg-slate-600 h-0.5 w-full" />
            <table class="w-full mt-2">
              <tr>
                <td>Tổng tiền (VNĐ):</td>
                <td class="text-right">
                  {{
                    totalPriceAllOrder.toLocaleString("vi-VN", {
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
                    totalPriceAllOrder.toLocaleString("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    })
                  }}
                </td>
              </tr>
            </table>
            <div class="mt-20">
              <h1 class="my-8 text-4xl font-bold text-gray-700">
                Thông tin doanh nghiệp
              </h1>
              <hr class="bg-slate-600 h-0.5 w-full" />
              <p class="mt-2 text-justify">
                Nunubi là một doanh nghiệp cung cấp dịch vụ sách nói trực tuyến.
                Với sứ mệnh là mang lại cho người đọc những trải nghiệm thú vị
                và tiện lợi khi đọc sách, Nunubi cung cấp cho người dùng hàng
                ngàn tựa sách nói từ các thể loại khác nhau như tiểu thuyết,
                kinh tế, khoa học, tâm lý học, và nhiều hơn nữa.
              </p>
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
import { orderService } from "../../../service/order_service";
import { bookService } from "../../../service/book_service";

export default defineComponent({
  data() {
    return {
      isReadyWaitingOrder: false,

      order: [],
      bookOrder: [],
      cart: {
        bookNumber: 0,
        cartId: -1,
        totalPrice: 0,
        discount: 0,
      },

      totalPriceAllOrder: 0,
    };
  },

  computed: {
    setOrder() {
      if (this.order) {
        if (this.order.length > 0) this.isReadyWaitingOrder = true;
        else this.isReadyWaitingOrder = false;
        return this.order;
      }
    },
  },

  methods: {
    totalAllOrderPrice(orderList) {
      let total = 0;
      orderList.forEach((order) => {
        order.Cart.Items.forEach((books) => {
          total += books.Book.Price;
        });
      });
      this.totalPriceAllOrder = total;
    },

    //lấy tất cả đơn hàng của người dùng đang chờ xác nhận
    async getBookWaitingOrder() {
      try {
        if (this.$cookies.isKey("token")) {
          const { data, status } = await orderService.getWaitingOrder(1);
          if (status == 200) {
            console.log(data.Data);
            this.order = data.Data;
            this.order.reverse();
            this.totalAllOrderPrice(this.order);
            console.log(
              "Lấy tất cả sản phẩm đã mua đang chờ xác nhận thành công"
            );
          } else {
            console.log(
              "Lấy tất cả sản phẩm đã mua đang chờ xác nhận thất bại"
            );
          }
        }
      } catch (error) {
        console.log(error);
      }
    },

    //tính tổng giá của từng đơn hàng
    totalBooksPrice(booksList) {
      let total = 0;
      booksList.forEach((book) => {
        total += book.Book.Price;
      });
      return total;
    },

    //lấy thông tin của 1 cuốn sách,
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

  mounted() {
    //get sản phẩm từ server
    this.getBookWaitingOrder();
  },
});
</script>