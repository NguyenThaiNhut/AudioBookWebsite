
<template>
  <div class="text-center my-16">
    <h2 class="text-teal-400 text-2xl font-bold">TÌM KIẾM</h2>
    <h1 class="text-3xl font-bold mt-20 mb-8">
      {{ quantity }} kết quả được tìm thấy - Cụm từ tìm kiếm "{{ nameSearch }}"
    </h1>
  </div>

  <div
    class="flex flex-col-reverse tiny:flex-row mx-5 w-auto h-full gap-5 border-2 divide-x-2 pl-5"
    v-show="bookList.length > 0"
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
      bookList: [],
      bookListCopy: [],
      quantity: 0,

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

  mounted() {
    console.log(this.$route.query.q);
  },

  computed: {
    ...mapGetters([
      "gettersCategoryList",
      "indexCategoryGet",
      "allBookbyCategoryGet",
    ]),

    nameSearch() {
      const name = this.$route.query.q;
      this.setAllBook();
      return name ? name : "";
    },

    sortedBooks() {
      return this.bookList;
    },
  },

  methods: {
    async setAllBook() {
      try {
        const bookName = this.$route.query.q;
        const { data, status } = await bookService.getBookSearch(bookName);
        if (status == 200) {
          console.log("Tìm kiếm theo tên sách thành công");
          this.bookList = data.Data;
          this.quantity = this.bookList.length;
          this.bookListCopy = [...this.bookList];
        } else {
          console.log("Tìm kiếm thất bại");
        }
      } catch (error) {
        console.log(error);
      }
    },

    //di chuyển đến nội dung của 1 audio book khi click vào audio book tương ứng
    detailBook(idBook: number) {
      const idGenres = this.$route.params.id;
      this.$router.push(`/genres/${idGenres}/book/${idBook}`);
    },

    //filter - sắp xếp từ A-Z và Z-A
    sortBooks() {
      // if (this.optionFilter[0].value == 0) {
      //   this.optionFilter.splice(0, 1);
      // }

      switch (this.selectedValue) {
        case 1:
          this.bookList.sort((a, b) => a.BookName.localeCompare(b.BookName));
          break;
        case 2:
          this.bookList.sort((a, b) => b.BookName.localeCompare(a.BookName));
          break;
        case 3:
          this.bookList.sort((a, b) => a.Author.localeCompare(b.Author));
          break;
        case 4:
          this.bookList.sort((a, b) => b.Author.localeCompare(a.Author));
          break;
        case 5:
          this.bookList.sort((a, b) => a.Price - b.Price);
          break;
        case 6:
          this.bookList.sort((a, b) => b.Price - a.Price);
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
        this.bookList = this.bookList.filter(function (book) {
          return book.Price < 100000;
        });
      } else if (index == 1) {
        this.bookList = this.bookList.filter(function (book) {
          return book.Price < 200000;
        });
      } else if (index == 2) {
        this.bookList = this.bookList.filter(function (book) {
          return book.Price > 100000;
        });
      } else if (index == 3) {
        this.bookList = this.bookList.filter(function (book) {
          return book.Price > 200000;
        });
      }
    },

    // xóa bỏ tất cả Filter
    deleteFilter() {
      this.bookList = [...this.bookListCopy];
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
        this.bookList.map(async (book) => {
          const bookCategory = await this.getCategoryBook(book.ID);
          return this.selectedCategories.every((selectedCategory) => {
            return bookCategory.some((bookCategoryItem) => {
              return bookCategoryItem.ID == selectedCategory;
            });
          });
        })
      );

      this.bookList = this.bookList.filter((_, index) => {
        return bookListFilter[index];
      });
    },
  },
});
</script>