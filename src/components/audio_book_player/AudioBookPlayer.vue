<template>
  <div class="my-20" v-show="lengthList == 0">
    <h1 class="font-bold text-5xl text-center">Danh sách phát đang rỗng</h1>
    <p class="text-center mt-5 text-lg">
      Mua sản phẩm đầu tiên dành cho bạn!!!
    </p>
  </div>
  <div class="sm:flex sm:flex-row gap-10 mx-10 my-5" v-show="lengthList > 0">
    <div
      class="min-w-[300px] max-w-[400px] border shadow-lg p-3 my-11 rounded-md"
    >
      <!-- ảnh, tên audiobook, tác giá -->
      <div>
        <div class="text-center">
          <p id="main-title" class="text-lg font-bold"></p>
          <p id="main-author" class=""></p>
        </div>

        <!-- ảnh lớn - sách đang được chọn -->
        <div id="main-thumb" class="flex flex-col items-center mt-4 mx-20">
          <img
            class="max-w-[150px] rounded-full drop-shadow-lg"
            src="https://covers.libro.fm/9780593670682_1120.jpg"
            alt=""
          />
        </div>
      </div>

      <!-- control -->
      <div class="mt-4 flex flex-col items-center">
        <!-- các button chức năng -->
        <div class="flex flex-row gap-5">
          <div v-show="btnControls" id="btn-repeat">
            <img
              v-show="btnRepeatDefault"
              class="w-[20px] cursor-pointer"
              src="src/assets/images/audio-player/controls/repeat-svgrepo-black.svg"
              alt=""
            />
            <img
              v-show="!btnRepeatDefault"
              class="w-[20px] cursor-pointer"
              src="src/assets/images/audio-player/controls/repeat-svgrepo-red.svg"
              alt=""
            />
          </div>
          <div v-show="btnControls">
            <img
              id="btn-prev"
              class="w-[20px] cursor-pointer"
              src="https://www.svgrepo.com/show/491060/prev.svg"
              alt=""
            />
          </div>
          <div @click="toggleAudioFunc">
            <div v-show="btnControls" id="btn-play-or-pause">
              <img
                v-show="isPlayingAudio"
                id="btn-pause"
                class="w-[20px] cursor-pointer"
                src="https://www.svgrepo.com/show/503068/pause.svg"
                alt=""
              />
              <img
                v-show="!isPlayingAudio"
                id="btn-play"
                class="w-[20px] cursor-pointer"
                src="https://www.svgrepo.com/show/503072/play.svg"
                alt=""
              />
            </div>
          </div>
          <div v-show="btnControls">
            <img
              id="btn-next"
              class="w-[20px] cursor-pointer"
              src="https://www.svgrepo.com/show/491054/next.svg"
              alt=""
            />
          </div>
          <div v-show="btnControls" id="btn-random">
            <img
              v-show="btnRamdomDefault"
              class="w-[20px] cursor-pointer"
              src="src/assets/images/audio-player/controls/random-svgrepo-black.svg"
              alt=""
            />
            <img
              v-show="!btnRamdomDefault"
              class="w-[20px] cursor-pointer"
              src="src/assets/images/audio-player/controls/random-svgrepo-red.svg"
              alt=""
            />
          </div>
        </div>

        <!-- Thanh thời gian -->
        <div v-show="btnControls" class="w-full mt-4">
          <input
            id="audio-range"
            type="range"
            value="0"
            step="0.5"
            min="0"
            max="100"
            ref="currentAudioRange"
            class="block appearance-none w-full h-2 rounded-sm bg-gray-300"
          />
          <div class="mt-3">
            {{ audioFormatTimeCurrentTime }} / {{ getAudioDuration }}
          </div>
        </div>

        <!-- thẻ audio, để xử lý sự kiện  -->
        <div>
          <!-- ??? thêm controls để dễ quan sát thay đổi -->
          <audio id="main-audio" src=""></audio>
        </div>
      </div>
    </div>

    <!-- danh sách audiobook -->

    <div class="w-full">
      <div class="mb-3">
        <h1 class="text-2xl font-bold">Danh sách Audio Book</h1>
      </div>
      <div
        id="audio-book-by-list"
        class="min-w-[300px] h-[400px] overflow-auto"
      >
        <div
          v-for="(items, index) in getAvailableList"
          :key="index"
          :class="{ 'bg-blue-400': index === currentIndex.value }"
          @click="updateCurrentAudio(index)"
          id="audio-book"
          class="w-full h-[90px] flex flex-row items-center border rounded-md shadow-md mb-2 cursor-pointer"
        >
          <div id="thumb-by-list" class="min-w-[58px]">
            <img
              class="rounded-full max-w-[40px] w-full ml-3"
              :src="items.Img"
              alt=""
            />
          </div>
          <div
            class="w-full ml-1 flex flex-col justify-center h-full"
            :class="{ 'text-white': index === currentIndex.value }"
          >
            <p id="title-by-list" class="font-bold">
              {{ items.BookName }}
            </p>
            <p id="author-by-list">{{ items.Author }}</p>
          </div>
          <div id="option-by-list" class="w-16">
            <svg
              class="w-[20px] ml-5"
              :class="{ 'fill-white': index === currentIndex.value }"
              fill="#000000"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                <path
                  d="M12,10a2,2,0,1,1-2,2A2,2,0,0,1,12,10ZM4,14a2,2,0,1,0-2-2A2,2,0,0,0,4,14Zm16-4a2,2,0,1,0,2,2A2,2,0,0,0,20,10Z"
                ></path>
              </g>
            </svg>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<style>
/* định dạng cho nút kéo thẻ "input type:range" */
input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 16px;
  height: 16px;
  background-color: #25d5af;
  border-radius: 50%;
  cursor: pointer;
}
input[type="range"]::-moz-range-thumb {
  appearance: none;
  width: 16px;
  height: 16px;
  background-color: #25d5af;
  border-radius: 50%;
  cursor: pointer;
}
input[type="range"]::-ms-thumb {
  appearance: none;
  width: 16px;
  height: 16px;
  background-color: #25d5af;
  border-radius: 50%;
  cursor: pointer;
}
</style>


<script lang="ts">
// frameworks vuejs
import { computed, defineComponent, reactive, ref, watch } from "vue";
import { onMounted, nextTick } from "vue";
import { orderService } from ".././../service/order_service";

export default {
  data() {
    return {
      selected: 0,
      lengthList: 0,
    };
  },

  computed: {
    getAvailableList() {
      return this.availableList;
    },

    getAudioCurrentTime() {
      return this.audioCurrentTime;
    },
  },

  methods: {
    // tô màu audio book hiện tại và cập nhật audio hiện tại
    updateCurrentAudio(index: number) {
      //hàm này bắt sự kiện click
      // currentIndex.value =
      this.currentIndex.value = index;
      this.loadCurrentAudio();
      // audio tải hoàn tất mới chạy
    },
  },

  setup() {
    //hai biến toàn cục để tái sử dụng
    const isPageLoaded = ref(false);
    const $ = document.querySelector.bind(document);
    const $$ = document.querySelectorAll.bind(document);
    const title = ref<HTMLElement | null>(null);
    const author = ref<HTMLElement | null>(null);
    const thumb = ref<HTMLImageElement | null>(null);
    const audio = ref<HTMLAudioElement | null>(null);
    const isPlayingAudio = ref(false); //dùng để chuyển đổi btn play và pause
    const isLoaded = ref(false);
    const playOrPauseBtn = ref<HTMLElement | null>(null);
    const draggingSlider = ref(false); //dùng để kiểm tra coi có đang kéo thanh trượt hay không
    const btnControls = ref(false); //các nút controls mặc định sẽ không hiển thị
    const nextAudio = ref<HTMLImageElement | null>(null);
    const prevAudio = ref<HTMLImageElement | null>(null);
    const randomAudio = ref<HTMLImageElement | null>(null);
    const isRandom = ref(false);
    const btnRamdomDefault = ref(true); //thay đổi màu của nút random button
    const repeatAudio = ref<HTMLImageElement | null>(null);
    const isRepeat = ref(false);
    const btnRepeatDefault = ref(true);

    const availableList = ref([]);
    const audioDuration = ref(0);
    const audioCurrentTime = ref(0);

    let audioRef = ref<HTMLAudioElement>();
    const audioDurationFormat = ref<number>();

    const audioFormatTimeDuration = ref<String>();
    const audioFormatTimeCurrentTime = ref<String>();

    const audioFormatTime = ref<String>();
    const lengthList = ref(0); // biến kiếm tra danh sách phát có dữ liệu hay không

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

    const updateAudioInfo = (value) => {
      value = Math.round(value);
      audioFormatTime.value = formatTime(value);
      return audioFormatTime.value;
    };

    //danh sách audio book
    // const audioBookByList = ref(null)
    // const thumbByList = ref(null)
    // const titleByList = ref(null)
    // const authorByList = ref(null)
    // const optionByList= ref(null)

    // kiểm tra trang web đã load xong hay chưa
    window.addEventListener("load", () => {
      isPageLoaded.value = true;
    });

    // giá trị index của audio book
    const currentIndex = reactive({
      value: 0,
    });

    //lấy index của audio book hiện tại
    const getAudioBookCurrent = computed(() => {
      return availableList.value[currentIndex.value];
    });

    //khi mà click vào play hoặc pause
    const toggleAudioFunc = () => {
      // audio tải hoàn tất mới chạy
      if (audio.value.readyState >= 2) {
        if (!isPlayingAudio.value) {
          audio.value.play();
          isPlayingAudio.value = true;
          console.log("chuyển bài chắc vào đây");
        } else {
          audio.value.pause();
          console.log("Dự liệu đang load vui lòng đợi");
          isPlayingAudio.value = false;
        }
      } else {
        console.log("Đang tải dữ liệu, vui lòng đợi");
      }
    };

    // lấy thời gian của audio
    const getAudioDuration = computed(() => {
      audioFormatTimeDuration.value = updateAudioInfo(audioDuration.value);
      return audioFormatTimeDuration.value;
    });

    const getAudioCurrentTime = computed(() => {
      audioFormatTimeCurrentTime.value = updateAudioInfo(
        audioCurrentTime.value
      );
      return audioCurrentTime.value;
    });

    // lắng nghe / xử lý sự kiện mặc định
    const handleEvent = () => {
      if (audio.value) {
        const audioValue = audio.value;
        //bắt sự kiện khi audio có thể play, khi đó các phím chức năng sẽ được hiển thị
        audioValue.addEventListener("canplaythrough", () => {
          isLoaded.value = true;
          btnControls.value = true;
          audioDuration.value = audioValue.duration;
        });

        // bắt sự kiện khi xảy ra lỗi
        audioValue.addEventListener("error", () => {
          audioValue.pause();
        });

        // bắt sự kiện click play or pause
        // playOrPauseBtn.value = $("#btn-play-or-pause");

        // playOrPauseBtn.value?.addEventListener("click", () => {
        //   //audio hiện tại sẽ play
        //   if (isPageLoaded.value && audioValue) {
        //     if (!isPlayingAudio.value) {
        //       audioValue.play();
        //     } else {
        //       audioValue.pause();
        //     }
        //   }
        // });

        audioValue.addEventListener("play", () => {
          isPlayingAudio.value = true;
        });
        audioValue.addEventListener("pause", () => {
          isPlayingAudio.value = false;
        });

        //thanh thời gian audio book chạy
        // audio.value(() => computed());
        const currentAudioRange = $("#audio-range") as HTMLInputElement;
        if (currentAudioRange.value) {
          audioValue.addEventListener("timeupdate", () => {
            let currentAudioRangeValue = parseFloat(currentAudioRange.value);
            const oriCurrentTimeAudio = audioValue.currentTime;
            if (!draggingSlider.value) {
              // console.log(oriCurrentTimeAudio)
              currentAudioRangeValue =
                (oriCurrentTimeAudio * 100) / audioValue.duration;
              if (oriCurrentTimeAudio == 0) currentAudioRangeValue = 0;
              currentAudioRange.value = currentAudioRangeValue.toString();
            }
            audioCurrentTime.value = oriCurrentTimeAudio;
            audioFormatTimeCurrentTime.value = updateAudioInfo(
              audioCurrentTime.value
            );
          });
        }

        // xử lý khi tua audio book
        currentAudioRange.addEventListener("input", (event: Event) => {
          const target = event.target as HTMLInputElement;
          draggingSlider.value = true;
          audioValue.currentTime =
            (audioValue.duration / 100) * parseInt(target.value);
        });

        currentAudioRange.addEventListener("change", (event) => {
          draggingSlider.value = false;
        });

        //next audio book
        nextAudio.value = $("#btn-next");
        nextAudio.value?.addEventListener("click", () => {
          if (!isRepeat.value) {
            if (isRandom.value) {
              randomAudioFun();
            } else {
              nextAudioFun();
            }
          } else {
            loadCurrentAudio();
          }
          // audio tải hoàn tất mới chạy
          audioValue.onloadedmetadata = () => {
            audioValue.play();
          };
        });

        //hàm tăng giá trị index của mảng audio book khi bấm next
        const nextAudioFun = () => {
          if (availableList.value.length > currentIndex.value + 1) {
            currentIndex.value += 1;
          } else currentIndex.value = 0;
          loadCurrentAudio();
        };

        //prev audio book
        prevAudio.value = $("#btn-prev");
        prevAudio.value?.addEventListener("click", () => {
          if (!isRepeat.value) {
            if (isRandom.value) {
              randomAudioFun();
            } else {
              prevAudioFun();
            }
          } else {
            loadCurrentAudio();
          }

          // audio tải hoàn tất mới chạy
          audioValue.onloadedmetadata = () => {
            audioValue.play();
          };
        });

        //hàm tăng giá trị index của mảng audio book khi bấm next
        const prevAudioFun = () => {
          if (currentIndex.value > 0) {
            currentIndex.value -= 1;
          } else currentIndex.value = availableList.value.length - 1;
          loadCurrentAudio();
        };

        //hàm random giá trị ngẫu nhiên audio book
        const randomAudioFun = () => {
          let newIndex;
          do {
            newIndex = Math.floor(Math.random() * availableList.value.length);
          } while (newIndex === currentIndex.value);
          currentIndex.value = newIndex;
          loadCurrentAudio();
        };

        //bật / tắt random audio book
        randomAudio.value = $("#btn-random");
        randomAudio.value?.addEventListener("click", () => {
          btnRamdomDefault.value = !btnRamdomDefault.value;
          isRandom.value = !isRandom.value;
        });

        //tự động chuyển audio book tiếp theo khi audio book hiện tại đã phát xong
        audio.value.addEventListener("ended", () => {
          console.log("vào đây");
          if (!isRepeat.value) {
            if (!isRandom.value) {
              nextAudioFun();
            } else {
              randomAudioFun();
              // audio tải hoàn tất mới chạy
              audioValue.onloadedmetadata = () => {
                audio.value?.play();
              };
            }
          } else {
            audio.value?.play();
          }
        });

        // bật / tắt repeat audio book
        repeatAudio.value = $("#btn-repeat");
        repeatAudio.value?.addEventListener("click", () => {
          btnRepeatDefault.value = !btnRepeatDefault.value;
          isRepeat.value = !isRepeat.value;
        });
      }
    };

    // tải thông tin audio book đầu tiên vào UI khi chạy ứng dụng
    const loadCurrentAudio = () => {
      title.value = $("#main-title");
      author.value = $("#main-author");
      thumb.value = $("#main-thumb img");
      audio.value = $("#main-audio");

      // đảm bảo rằng, các thành phần Dom đã được load xong, sau đó mới thực thi
      nextTick(() => {
        if (title.value)
          title.value.innerText = getAudioBookCurrent.value.BookName;
        if (author.value)
          author.value.innerText = getAudioBookCurrent.value.Author;
        if (thumb.value) thumb.value.src = getAudioBookCurrent.value.Img;
        if (audio.value) {
          audio.value.src = getAudioBookCurrent.value.Audio;
        }
      });

      console.log(isPlayingAudio.value);
      if (isPlayingAudio.value) {
        audio.value.onloadedmetadata = () => {
          audio.value.play();
        };
      }
    };

    // tự động gọi hàm khi load xong các phần tử
    onMounted(async () => {
      // tải thông tin audio book đầu tiên vào UI khi chạy ứng dụng

      try {
        const { data, status } = await orderService.getWaitingBook(1);
        if (status == 200) {
          console.log("Lấy tất cả sản phẩm đã có sẵn thành công");
          console.log(data.Datas);
          availableList.value = data.Data;
          lengthList.value = data.Data.length;
        } else {
          console.log("Lấy tất cả sản phẩm đã có sẵn thất bại");
        }
      } catch (error) {
        lengthList.value = 0;
        console.log(error);
        return;
      }

      loadCurrentAudio();

      // lắng nghe / xử lý sự kiện mặc định
      handleEvent();
    });

    return {
      toggleAudioFunc,
      isPlayingAudio,
      btnControls,
      btnRamdomDefault,
      btnRepeatDefault,
      currentIndex,
      loadCurrentAudio,
      availableList,
      getAudioDuration,
      getAudioCurrentTime,
      audioCurrentTime,
      audioFormatTimeCurrentTime,
      lengthList,
    };
  },
};
</script>
