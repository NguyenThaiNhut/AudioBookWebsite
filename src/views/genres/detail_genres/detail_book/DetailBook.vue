<template>
  <div class="sm:flex sm:flex-row m-5 gap-5">
    <div class="basis-1/3">
      <img
        class="md:max-w-[400px] w-full rounded-3xl shadow-lg"
        :src="bookInfo.Img"
      />
      <!-- <audio controls autoplay class="md:max-w-[400px] w-full my-5">
        <source :src="bookInfo.Audio" type="audio/mpeg" />
      </audio> -->
      <audio
        id="audioDemo"
        class="md:max-w-[400px] w-full my-5"
        :src="bookInfo.Audio"
        type="audio/mpeg"
        controls
        @timeupdate="checkDuration()"
      ></audio>
      <div class="md:max-w-[400px] w-full">
        <p class="italic text-center">(Bạn có 5 phút để nghe thử)</p>
      </div>
    </div>

    <div class="basis-2/3">
      <div class="text-center">
        <h1 class="text-5xl font-bold mt-3 mb-8">{{ bookInfo.BookName }}</h1>
        <p class="text-xl">Tác giả</p>
        <p>{{ bookInfo.Author }}</p>
        <p class="font-bold text-4xl my-10">
          {{
            bookInfo.Price
              ? bookInfo.Price.toLocaleString("vi-VN", {
                  style: "currency",
                  currency: "VND",
                })
              : ""
          }}
        </p>
        <!-- <ButtonGreen value="Thêm vào giỏ hàng" /> -->
        <div class="text-center">
          <button
            class="bg-teal-400 w-[200px] text-white py-2 px-6 rounded-full mt-4 cursor-pointer hover:bg-teal-500"
            @click="addBook()"
          >
            Thêm vào giỏ hàng
          </button>
        </div>
      </div>

      <!-- thời lượng, ngôn ngữ, người đọc -->
      <div class="text-center my-20">
        <div class="flex flex-row divide-x-2 border-y-2 py-4">
          <div class="basis-1/2 text-center">
            <p>Chiều dài</p>
            <p class="text-lg font-bold">{{ audioFormatTime }}</p>
          </div>
          <div class="basis-1/2">
            <p>Thể loại</p>
            <p
              class="text-lg font-bold"
              v-for="items in bookCategories"
              :key="items.ID"
            >
              {{ items.Name }}
            </p>
          </div>
        </div>

        <!-- <div class="border-b-2 py-4">
                    <p>Người kể chuyện</p>
                    <p class="text-lg font-bold">Jennifer Kim &amp; Julian Cihi</p>
                </div> -->
      </div>

      <!-- tom tat sach va tac gia -->
      <div class="flex flex-row gap-10 my-10 text-lg font-bold border-b-2">
        <button
          @click="showBookSummary"
          :class="isBookInformation ? 'border-b-2 border-teal-500' : ''"
        >
          Tóm tắt
        </button>
        <button
          @click="showAuthorIntroduction"
          :class="!isBookInformation ? 'border-b-2 border-teal-500' : ''"
        >
          Giới thiệu tác giả
        </button>
      </div>

      <!-- tom tat sach -->
      <div v-show="isBookInformation">
        <p>
          {{ bookInfo.Content }}
        </p>
      </div>

      <!-- gioi thieu tac gia -->
      <div class="italic" v-show="isBookInformation == false">
        Chưa có thông tin
      </div>

      <!-- tag -->
      <!-- <div class="flex flex-row gap-10 my-5">
                <a href="" class="text-blue-400 italic">Viễn tưởng</a>
                <a href="" class="text-blue-400 italic">Tiểu thuyết - văn học</a>
            </div> -->
    </div>
  </div>
</template>
  
  
  <style scoped>
</style>
  
  
  <script lang="ts">
import { defineComponent, ref, onMounted, watch } from "vue";
import { bookService } from "../../../../service/book_service";
import { useRoute } from "vue-router";
import { cartService } from "../../../../service/cart_service";
import { orderService } from "../../../../service/order_service";

export default defineComponent({
  setup() {
    let audioRef = ref<HTMLAudioElement>();
    const audioDuration = ref<number>();
    const audioFormatTime = ref<String>();
    const route = useRoute();
    const demoDuration = 300; //thời gian cho phép nghe thử

    const formatTime = (seconds: number) => {
      let hours = Math.floor(seconds / 3600);
      let remainingSeconds = seconds % 3600;
      let minutes = Math.floor(remainingSeconds / 60);
      remainingSeconds = remainingSeconds % 60;

      let formattedHours = hours < 10 ? "0" + hours : hours;
      let formattedMinutes = minutes < 10 ? "0" + minutes : minutes;
      let formattedSeconds =
        remainingSeconds < 10 ? "0" + remainingSeconds : remainingSeconds;

      return formattedHours + ":" + formattedMinutes + ":" + formattedSeconds;
    };

    const updateAudioInfo = () => {
      audioRef.value = document.getElementById("audioDemo") as HTMLAudioElement;

      audioRef.value.addEventListener("loadedmetadata", () => {
        audioDuration.value = Math.round(audioRef.value.duration);
        audioFormatTime.value = formatTime(audioDuration.value);
        console.log(audioFormatTime.value);
      });
    };

    const stopDemo = () => {
      audioRef.value.pause(); // dừng phát
      audioRef.value.currentTime = 0;
      alert("Mua Audio Book để nghe trọn bộ");
    };

    const checkDuration = () => {
      if (audioRef.value.currentTime >= demoDuration) {
        stopDemo();
      }
    };

    onMounted(() => {
      updateAudioInfo();
    });

    watch(
      () => route.params,
      (newParams) => {
        updateAudioInfo();
      }
    );

    return {
      audioDuration,
      audioFormatTime,
      checkDuration,
    };
  },

  data() {
    return {
      bookInfo: {},
      isBookInformation: true,

      bookCategories: [],
      bookAvailable: false,
    };
  },

  mounted() {
    this.testBookAvailable();
    this.setupBookInfo();
  },

  methods: {
    async getBookWaitingOrder() {
      const bookWait = [];
      try {
        if (this.$cookies.isKey("token")) {
          const { data, status } = await orderService.getWaitingOrder(0);
          if (status == 200) {
            this.bookWait = data.Data;
          } else {
            console.log("Lỗi");
          }
        }
      } catch (error) {
        console.log(error);
      }
      return this.bookWait;
    },

    async getBookAvailableOrder() {
      const bookAvailable = [];
      try {
        if (this.$cookies.isKey("token")) {
          const { data, status } = await orderService.getWaitingOrder(1);
          if (status == 200) {
            this.bookAvailable = data.Data;
            console.log(data.Data);
          } else {
            console.log("Lỗi");
          }
        }
      } catch (error) {
        console.log(error);
      }
      return this.bookAvailable;
    },

    async testBookAvailable() {
      // bookAvailable
      const bookWait = await this.getBookWaitingOrder();
      const bookAvailable = await this.getBookAvailableOrder();
      // console.log(bookWait);
      // console.log(bookAvailable);
      const bookId = this.$route.params.idBook;
      console.log(bookWait);

      // if (!bookWait.Id.includes(bookId) && !bookAvailable.Id.includes(bookId)) {
      //   console.log("sách chưa được mua");
      // } else {
      //   console.log("sách đã được mua hoặc có sẵn");
      // }
    },

    async setupBookInfo() {
      const genresId = this.$route.params.id;
      const bookId = this.$route.params.idBook;
      try {
        const { data, status } = await bookService.getBookId(bookId);
        if (status == 200) {
          console.log("Lấy thông tin sách thành công");
          console.log(data.Data);
          this.bookCategories = data.Data.BookCategory;
          this.bookInfo = data.Data;
        }
      } catch (error) {
        console.log(error);
      }
    },

    showBookSummary() {
      this.isBookInformation = true;
    },

    showAuthorIntroduction() {
      this.isBookInformation = false;
    },

    async addBook() {
      // console.log(this.$route.params.idBook);
      const idBook = parseInt(this.$route.params.idBook);
      try {
        const { data, status } = await cartService.addToCart(idBook);
        if (status == 200) {
          alert("Thêm sách vào giỏ hàng thành công");
        } else {
          alert("Thêm sách vào giỏ hàng thất bại");
        }
      } catch (error) {
        if (error.response.status == 400) {
          alert(error.response.data.Message);
        }
      }
    },
  },
});
</script>