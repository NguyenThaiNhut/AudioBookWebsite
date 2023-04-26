<template>
  <div class="text-center my-16">
    <h1 class="text-5xl font-bold mt-3 mb-8">SÁCH BÁN CHẠY NHẤT</h1>
  </div>

  <div class="my-20" v-show="bestsellersHome.length == 0">
    <h1 class="font-bold text-5xl text-center">Không tồn tại sản phẩm</h1>
  </div>

  <div
    class="flex flex-col-reverse tiny:flex-row mx-5 w-auto h-full gap-5 border-2 divide-x-2 pl-5"
    v-show="bestsellersHome.length > 0"
  >
    <!-- audiobook cua tieu thuyet -->
    <div
      class="grid grid-cols sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 py-5"
    >
      <div
        class="p-2 shadow-lg cursor-pointer hover:bg-slate-200"
        v-for="items in sortedBooks"
        :key="items.ID"
        @click="detailBook(items.ID)"
      >
        <div class="sm:max-w-[300px] h-auto">
          <a class="sm:w-full h-auto">
            <img class="min-w-full" :src="items.Img" />
          </a>
        </div>

        <div class="sm:max-w-[300px] text-center">
          <p class="font-bold text-lg">{{ items.BookName }}</p>
          <p>{{ items.Author }}</p>
          <p class="italic">
            {{
              items.Price.toLocaleString("vi-VN", {
                style: "currency",
                currency: "VND",
              })
            }}
          </p>
        </div>
      </div>
    </div>

    <!-- filter -->
    <div class="w-[200px] flex-none h-auto px-2">
      <form class="my-10" action="">
        <p class="text-xl font-bold">Sắp xếp theo</p>
        <div class="my-5">
          <label
            class="border border-slate-400 py-3 px-2 rounded-lg"
            for="selectRelevancy"
          >
            <select
              id="selectRelevancy"
              v-model="selectedValue"
              @change="sortBooks()"
            >
              <option
                v-for="items in optionFilter"
                :key="items.id"
                :value="items.value"
              >
                {{ items.label }}
              </option>
            </select>
          </label>
        </div>

        <div
          class="text-white shadow-lg bg-slate-800 rounded-full py-2 px-5 text-center hover:bg-teal-500 cursor-pointer"
          @click="deleteFilter()"
        >
          Xóa bộ lọc
        </div>

        <p class="text-xl font-bold my-4">Lựa chọn</p>

        <div v-for="(name, index) in optionFilterSecond" :key="index">
          <label :for="index">
            <input
              :id="index"
              name="option"
              type="radio"
              :value="index"
              @change="onRadioChange(index)"
              :checked="selectedOption === index"
            />
            {{ name }}
          </label>
        </div>

        <p class="text-xl font-bold my-4">Lựa chọn khác</p>
        <div v-for="items in gettersCategoryList" :key="items.ID">
          <label :for="items.Name">
            <input
              :id="items.Name"
              type="checkbox"
              :value="items.ID"
              v-model="selectedCategories"
              @change="onCheckboxChange(items.ID)"
            />
            {{ items.Name }}
          </label>
        </div>
      </form>
    </div>
  </div>
</template>


<script lang="ts">
import { defineComponent } from "vue";
import { mapGetters, mapActions } from "vuex";
import { bookService } from "../../service/book_service";

export default defineComponent({
  data() {
    return {
      bestsellersHome: [],
      bookListCopy: [],

      selectedValue: 0,

      optionFilterSecond: ["Dưới 100k", "Dưới 200k", "Trên 100k", "Trên 200k"],
      selectedOption: null,

      optionFilter: [
        { label: "Chọn nội dung...", value: 0, id: "optionFilter0" },
        { label: "Tiêu đề từ A-Z", value: 1, id: "optionFilter1" },
        { label: "Tiêu đề từ Z-A", value: 2, id: "optionFilter2" },
        { label: "Tên tác giả từ A-Z", value: 3, id: "optionFilter3" },
        { label: "Tên tác giả từ Z-A", value: 4, id: "optionFilter4" },
        { label: "Giá tăng dần", value: 5, id: "optionFilter5" },
        { label: "Giá giảm dần", value: 6, id: "optionFilter6" },
      ],

      selectedCategories: [],
      bookListFilter: [],
    };
  },

  computed: {
    ...mapGetters([
      "gettersCategoryList",
      "indexCategoryGet",
      "allBookbyCategoryGet",
    ]),

    genresName() {
      const id = this.$router.currentRoute.value.params.id;
      const category = this.gettersCategoryList[id - 1];
      this.setAllBook();
      return category ? category.Name : "";
    },

    sortedBooks() {
      return this.bestsellersHome;
    },
  },

  mounted() {
    this.getAllBook();
  },

  methods: {
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

    //thiết lập những sách bán chạy nhất
    getAllBookBestSeller(books) {
      this.bestsellersHome = books.filter((book) => {
        return book.IsBestSeller == true;
      });
      this.bookListCopy = [...this.bestsellersHome];
      console.log(this.bestsellersHome);
    },

    //lấy tất cả sách
    async getAllBook() {
      try {
        const { data, status } = await bookService.getAllBook();
        if (status == 200) {
          console.log("lấy tất cả sách thành công");
          this.getAllBookBestSeller(data.Data);
        } else {
          alert("lấy tất cả sách thất bại");
        }
      } catch (error) {
        console.log(error);
      }
    },

    //filter - sắp xếp từ A-Z và Z-A
    sortBooks() {
      // if (this.optionFilter[0].value == 0) {
      //   this.optionFilter.splice(0, 1);
      // }

      switch (this.selectedValue) {
        case 1:
          this.bestsellersHome.sort((a, b) =>
            a.BookName.localeCompare(b.BookName)
          );
          break;
        case 2:
          this.bestsellersHome.sort((a, b) =>
            b.BookName.localeCompare(a.BookName)
          );
          break;
        case 3:
          this.bestsellersHome.sort((a, b) => a.Author.localeCompare(b.Author));
          break;
        case 4:
          this.bestsellersHome.sort((a, b) => b.Author.localeCompare(a.Author));
          break;
        case 5:
          this.bestsellersHome.sort((a, b) => a.Price - b.Price);
          break;
        case 6:
          this.bestsellersHome.sort((a, b) => b.Price - a.Price);
          break;
        default:
          break;
      }
    },

    //filter - lựa chọn
    onRadioChange(index: number) {
      this.deleteFilter();
      this.selectedOption = index;

      if (index == 0) {
        this.bestsellersHome = this.bestsellersHome.filter(function (book) {
          return book.Price < 100000;
        });
      } else if (index == 1) {
        this.bestsellersHome = this.bestsellersHome.filter(function (book) {
          return book.Price < 200000;
        });
      } else if (index == 2) {
        this.bestsellersHome = this.bestsellersHome.filter(function (book) {
          return book.Price > 100000;
        });
      } else if (index == 3) {
        this.bestsellersHome = this.bestsellersHome.filter(function (book) {
          return book.Price > 200000;
        });
      }
    },

    // xóa bỏ tất cả Filter
    deleteFilter() {
      this.bestsellersHome = [...this.bookListCopy];
      this.selectedOption = null;
      this.selectedCategories = [];
      this.selectedValue = 0;
    },

    // lấy chi tiết 1 cuốn sách
    async getCategoryBook(bookId: number) {
      const bookCategory = [];
      try {
        const { data, status } = await bookService.getBookId(bookId);
        if (status == 200) {
          console.log("Lấy thông tin sách thành công");
          this.bookCategory = data.Data.BookCategory;
        } else {
          console.log("Lấy thông tin sách thất bại");
        }
      } catch (error) {
        console.log(error);
      }
      return this.bookCategory;
    },

    // filter - theo thể loại
    async onCheckboxChange() {
      const bookListFilter = await Promise.all(
        this.bestsellersHome.map(async (book) => {
          const bookCategory = await this.getCategoryBook(book.ID);
          return this.selectedCategories.every((selectedCategory) => {
            return bookCategory.some((bookCategoryItem) => {
              return bookCategoryItem.ID == selectedCategory;
            });
          });
        })
      );

      this.bestsellersHome = this.bestsellersHome.filter((_, index) => {
        return bookListFilter[index];
      });
    },
  },
});
</script>