<template>
  <Carousel :autoplay="4000" :wrap-around="true">
    <Slide class="relative" v-for="slide in slides" :key="slide">
      <img
        class="w-full h-[650px] object-cover brightness-[40%] -z-10"
        :src="slide.image"
      />
      <div class="text-center mx-[10%] md:mx-[25%] absolute">
        <h2 class="text-teal-600 text-2xl font-bold">ĐỀ NGHỊ ĐẶC BIỆT</h2>
        <h1 class="text-white text-5xl sm:text-5xl font-bold my-4">
          {{ slide.title }}
        </h1>
        <p class="text-white text-lg hidden sm:block">
          {{ slide.content }}
        </p>
        <input
          v-if="slide.title === 'Trở thành đối tác của chúng tôi'"
          type="submit"
          value="Đăng ký Partner"
          class="bg-teal-400 text-white py-2 px-6 rounded-full mt-4 hover:bg-teal-500 cursor-pointer"
        />
      </div>
      <!-- <div class="carousel__item">{{ slide }}</div> -->
    </Slide>

    <template #addons>
      <Pagination />
    </template>
  </Carousel>

  <!-- why should use nunubi? -->
  <div>
    <h1 class="text-center text-5xl font-bold my-20">
      Tại sao nên sử dụng nunubi?
    </h1>
    <div>
      <!-- whySholdUseLibroHome -->
      <div class="md:flex md:flex-row md:gap-16 mx-10">
        <div
          v-for="(item, index) in whySholdUseLibroHome"
          :key="index"
          class="md:flex md:flex-row md:items-start md:gap-5 md:basis-1/3"
        >
          <div
            class="md:basis-1/4 flex-shrink-0 flex justify-center items-center"
          >
            <div v-html="item.img"></div>
          </div>

          <div class="md:basis-3/4 text-center md:text-left mb-10">
            <h3 class="font-bold text-2xl">
              {{ item.textH3 }}
            </h3>
            <p>{{ item.text }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>

  <hr class="bg-slate-600 my-10 h-px" />

  <!-- bestseller -->
  <div>
    <h2 class="text-center text-3xl font-bold my-4">Bán chạy nhất</h2>
    <p class="text-center mb-7">
      Sách nói bán chạy nhất từ ​​hơn 2.000 đối tác hiệu sách của chúng tôi,
      được cập nhật hàng giờ.
      <router-link
        to="/bestseller"
        class="hover:text-blue-500 underline underline-offset-2"
      >
        Xem tất cả
      </router-link>
    </p>

    <div class="flex overflow-x-auto gap-5 py-3 mx-10 scrollbar">
      <div
        v-for="items in bestsellersHome"
        :key="items.ID"
        class="flex-shrink-0 max-w-[200px] cursor-pointer"
        @click="detailBook(items.ID)"
      >
        <img
          class="max-w-[200px] rounded-2xl shadow-xl w-full"
          :src="items.Img"
        />
      </div>
    </div>
  </div>

  <!-- Audiobooks recommended by trusted partners -->
  <!-- Audiobooks recommended by trusted partners -->
  <div></div>

  <!-- New releases -->
  <div class="mt-20 mb-10">
    <h2 class="text-center text-3xl font-bold my-4">Mới phát hành</h2>
    <p class="text-center mb-7">
      Khám phá sách nói được phát hành gần đây.
      <router-link
        to="/new-releases"
        class="hover:text-blue-500 underline underline-offset-2"
      >
        Xem tất cả
      </router-link>
    </p>

    <div class="flex overflow-x-auto gap-5 py-3 mx-10 scrollbar">
      <div
        v-for="items in newReleasesHome"
        :key="items.ID"
        class="flex-shrink-0 max-w-[200px] cursor-pointer"
        @click="detailBook(items.ID)"
      >
        <img
          class="max-w-[200px] rounded-2xl shadow-xl w-full"
          :src="items.Img"
        />
      </div>
    </div>
  </div>
</template>


<style scoped>
/* khắc phục lỗi mất overflow-x-scroll không hiển thị thanh cuộc */
.scrollbar::-webkit-scrollbar {
  width: 15px;
  height: 15px;
}

.scrollbar::-webkit-scrollbar-track {
  border-radius: 100vh;
  background: rgb(184, 184, 184);
}

.scrollbar::-webkit-scrollbar-thumb {
  background: rgb(1, 166, 255);
  border-radius: 100vh;
}

.scrollbar::-webkit-scrollbar-thumb:hover {
  background: #497cea;
}

/* Carousel trang chủ */
.carousel__item {
  min-height: 200px;
  width: 100%;
  font-size: 20px;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.carousel__slide {
  padding: 10px;
}

.carousel__prev,
.carousel__next {
  box-sizing: content-box;
  border: 5px solid white;
}
</style>


<script lang="ts">
import { defineComponent } from "vue";
import ButtonGreen from "../components/button_green/ButtonGreen.vue";
import Link from "../components/link/Link.vue";
import SlideImages from "../components/slide_images/SlideImages.vue";
import { bookService } from "../service/book_service";

import { Carousel, Pagination, Slide } from "vue3-carousel";

import "vue3-carousel/dist/carousel.css";

export default defineComponent({
  components: { SlideImages, Link, ButtonGreen, Carousel, Slide, Pagination },

  data() {
    return {
      slides: [
        {
          id: 1,
          image:
            "https://cdn.pixabay.com/photo/2020/04/28/18/10/bible-5105707_960_720.jpg",
          title: "Trở thành đối tác của chúng tôi",
          content:
            "Khi bạn đăng ký trở thành đối tác với nunubi. Bạn sẽ được cấp quyền Partner cho phép bạn tự do đăng bán sản phẩm sách nói. Ngoài ra, bạn sẽ được cung cấp thêm một số chức năng khác.",
        },

        {
          id: 2,
          image:
            "https://cdn.pixabay.com/photo/2018/01/25/20/34/audiobook-3106985_960_720.jpg",
          title: "Sách khuyến mãi của tháng",
          content:
            "Với mỗi tháng, chúng tôi sẽ giới thiệu đến bạn danh sách các cuốn sách nói được giảm giá đặc biệt trong thời gian đó. Bạn sẽ có cơ hội sở hữu những cuốn sách nói chất lượng với giá cực kỳ hấp dẫn.",
        },
        {
          id: 3,
          image:
            "https://cdn.pixabay.com/photo/2021/09/29/09/25/audio-book-6666976_960_720.jpg",
          title: "Đa dạng sách nói",
          content:
            "Tại nunubi, chúng tôi cung cấp cho bạn hàng ngàn cuốn sách nói trong nhiều thể loại khác nhau. Từ sách tiểu thuyết, tình cảm đến sách truyền cảm hứng, giáo dục... Bạn sẽ dễ dàng tìm thấy cuốn sách ưa thích của mình và nâng cao kiến thức, kỹ năng cũng như trải nghiệm của mình.",
        },
        // Add more slides here
      ],
      whySholdUseLibroHome: [
        {
          img: '<img class="rounded-full w-full h-auto" src="https://cdn.libro.fm/assets/website-images/home-why-bookstore-2023.jpg" alt="">',
          textH3: "Hỗ trợ các hiệu sách địa phương",
          text: "Mỗi khi bạn sử dụng tín dụng hoặc mua hàng, chúng tôi sẽ chia lợi nhuận cho hiệu sách địa phương của bạn.",
        },
        {
          img: '<img class="rounded-full w-full h-auto" src="https://cdn.libro.fm/assets/website-images/home-why-playlist.jpg" alt="">',
          textH3: "Danh sách phát do người bán sách tuyển chọn",
          text: "Khám phá cuốn sách nói yêu thích tiếp theo của bạn với danh sách phát do những người bán sách chuyên nghiệp, nhóm Libro.fm, những người có ảnh hưởng, v.v., tuyển chọn.",
        },
        {
          img: '<img class="rounded-full w-full h-auto" src="https://cdn.libro.fm/assets/website-images/home-why-app.jpg" alt="">',
          textH3: "Ứng dụng iOS và Android miễn phí",
          text: "Sử dụng các ứng dụng miễn phí của chúng tôi để thưởng thức sách nói của bạn với các tính năng cho phép bạn tùy chỉnh trải nghiệm nghe của mình.",
        },
      ],
      bestsellersHome: [],
      newReleasesHome: [],
      book: [],
    };
  },

  methods: {
    //thiết lập những sách bán chạy nhất
    getAllBookBestSeller(books) {
      this.bestsellersHome = books.filter((book) => {
        return book.IsBestSeller == true;
      });
    },

    //thiết lập những sách mới nhất
    getAllBookNewReleases(books) {
      books.reverse();
      console.log(books);
      for (let i = 0; i < 10; i++) {
        this.newReleasesHome.push(books[i]);
      }
    },

    //lấy tất cả sách
    async getAllBook() {
      try {
        const { data, status } = await bookService.getAllBook();
        if (status == 200) {
          console.log("lấy tất cả sách thành công");
          this.getAllBookBestSeller(data.Data);
          this.getAllBookNewReleases(data.Data);
        } else {
          alert("lấy tất cả sách thất bại");
        }
      } catch (error) {
        console.log(error);
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

  mounted() {
    this.getAllBook();
  },
});
</script>