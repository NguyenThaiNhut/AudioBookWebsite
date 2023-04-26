

<template>
  <div
    :style="{ height: headerHeight, transition: 'height 0.1s ease-in-out' }"
    class="sticky top-0 bg-white z-50 max-w-full border-b-2 shadow-lg"
  >
    <!-- header higher -->
    <div class="flex justify-between w-full">
      <router-link to="/" id="audio-book-header-left" class="h-20">
        <img
          src="../../src/assets/images/nunubi_logo.png"
          alt="logo"
          class="h-12 mt-2 mx-4"
        />
      </router-link>

      <div
        id="audio-book-header-lower-left"
        class="h-20 w-11/12 mt-3 mx-auto md:w-1/3 md:ml-6 hidden lg:block"
        v-show="headerMenuScrolled"
      >
        <div class="relative">
          <div class="absolute mt-4 pl-4 pointer-events-none">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-search"
              viewBox="0 0 16 16"
            >
              <path
                d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"
              />
            </svg>
          </div>
          <input
            type="search"
            class="block w-full h-12 p-3 pl-10 text-md text-gray-900 border rounded-full bg-gray-50 focus:bg-gray-100 focus:border-blue-500 outline-0 transition-all duration-200"
            placeholder="Tìm kiếm sách nói..."
            v-model="searchContent"
            @keyup.enter="searchBooks()"
          />

          <div
            class="font-medium absolute text-white right-1 bottom-1 bg-blue-400 hover:bg-blue-500 focus:ring-3 rounded-full px-5 py-2 cursor-pointer"
            @click="searchBooks()"
          >
            Tìm kiếm
          </div>
        </div>
      </div>

      <div id="audio-book-header-right" class="h-20">
        <!-- header higher right -->
        <ul class="catagory-genres h-20 items-center gap-x-1 sm:gap-x-2 mr-4">
          <!-- header higher "membership" and "how it work" -->
          <li
            v-for="(item, index) in headerHigherRight"
            :key="index"
            v-show="!headerMenuScrolled"
          >
            <a :href="item.href" class="member-ship-and-how-it-works">
              {{ item.text }}
            </a>
          </li>

          <!-- header higher "sign up" -->
          <li v-show="!globalOnLogged">
            <a
              href="/sign-up"
              aria-label="sign-up"
              class="sign-up-and-login text-white bg-blue-400 hover:bg-blue-500"
            >
              Đăng ký
            </a>
          </li>

          <!-- header higher "login" -->
          <li v-show="!globalOnLogged">
            <a
              href="/login"
              aria-label="login"
              class="sign-up-and-login border-2 hover:bg-slate-200"
            >
              Đăng nhập
            </a>
          </li>

          <!-- người dùng đã đăng nhập thành công -->
          <li v-show="globalOnLogged">
            <button class="mt-1.5 group-one">
              <div
                class="max-w-[40px] block border-2 rounded-full p-2 hover:bg-slate-200 cursor-pointer"
              >
                <img src="https://www.svgrepo.com/show/454078/account.svg" />
              </div>
              <div
                class="z-50 hidden absolute top-16 right-[40px] sm:right-[140px] h-auto w-auto pb-3 bg-white opacity-0 group-one-focus:opacity-100 group-one-focus:block border-2 border-slate-200 rounded-xl drop-shadow-lg"
              >
                <div
                  class="flex flex-col text-left w-full pt-3 divide-y divide-white"
                >
                  <a @click="openInfoAcount()" class="menu-lower-items"
                    >Thông tin</a
                  >
                  <div class="menu-lower-items" @click="toPlayList()">
                    Danh sách phát
                  </div>
                  <div class="menu-lower-items" @click="logoutUser()">
                    Đăng xuất
                  </div>
                </div>
              </div>
            </button>
          </li>

          <!-- header higher "cart" -->
          <li>
            <div
              @click="toCart()"
              class="max-w-[40px] hidden sm:block border-2 rounded-full p-2 hover:bg-slate-200 cursor-pointer"
            >
              <img src="https://www.svgrepo.com/show/344069/cart-fill.svg" />
            </div>
          </li>

          <!-- header higher "thông báo" -->
          <li>
            <button class="group-one">
              <div
                class="max-w-[40px] mt-1.5 hidden sm:block border-2 rounded-full p-2 hover:bg-slate-200 cursor-pointer"
              >
                <img src="https://www.svgrepo.com/show/513429/bell.svg" />
              </div>
              <div
                class="z-50 hidden absolute top-16 right-10 h-auto w-auto pb-3 bg-white opacity-0 group-one-focus:opacity-100 group-one-focus:block border-2 border-slate-200 rounded-xl drop-shadow-lg"
              >
                <div
                  class="flex flex-col text-left w-full pt-3 divide-y divide-white"
                >
                  <div class="menu-lower-items" @click="toDetailNotify(0)">
                    Đơn hàng đang xử lý
                  </div>
                  <div class="menu-lower-items" @click="toDetailNotify(1)">
                    Đơn hàng thành công
                  </div>
                </div>
              </div>
            </button>
          </li>

          <!-- header higher "menu" -->
          <li>
            <button aria-label="menu" class="group-one">
              <div
                @click="openHeaderMenu"
                class="max-w-[40px] px-2 py-2 mt-1.5 border-2 rounded-full hover:bg-slate-200"
              >
                <img
                  src="https://www.svgrepo.com/show/512467/menu-navigation-grid-1530.svg"
                />
              </div>

              <!-- header higher "menu board is hidden" -->
              <!-- -right-[2500px] -->
              <div
                id="header-menu"
                class="drop-shadow-lg z-50 fixed top-0 right-[-2500px] transition-all duration-300 h-screen bg-white border overflow-auto touch-auto"
              >
                <!-- menu board is hidden - button delete -->
                <div
                  @click="removeHeaderMenu"
                  class="h-10 w-10 absolute right-2 top-2 border-2 rounded-full border-slate-200 hover:bg-slate-200"
                >
                  <input
                    type="button"
                    class="absolute top-0 right-0 h-10 w-10 cursor-pointer"
                  />
                  <svg
                    class="m-2.5"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1.21179 1.21179L14.7882 14.7882"
                      stroke="black"
                      stroke-width="1.8"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></path>
                    <path
                      d="M14.7882 1.21179L1.21176 14.7882"
                      stroke="black"
                      stroke-width="1.8"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></path>
                  </svg>
                </div>

                <!-- menu board is hidden - category -->
                <div
                  class="min-w-[300px] flex lg:flex-row flex-col snap-y pt-10 lg:gap-32"
                >
                  <div>
                    <ul class="menu-board-hidden">
                      <li class="menu-title">Khám phá</li>
                      <div
                        v-for="(item, index) in menuBoard1"
                        :key="index"
                        class="header-catagory"
                        @click="toMenuBoard1(index)"
                      >
                        {{ item.text }}
                      </div>

                      <!-- genres catalog -->
                      <li>
                        <button
                          href="#"
                          class="group-two"
                          @click="toggleFocusCategoryHidden()"
                        >
                          <span
                            href="#"
                            class="header-catagory catagory-genres"
                          >
                            Thể loại
                            <span class="mt-1 ml-2">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="currentColor"
                                class="bi bi-chevron-down group-two-hover:rotate-180 group-two-hover:transition-all group-two-hover:duration-300S"
                                viewBox="0 0 16 16"
                              >
                                <path
                                  fill-rule="evenodd"
                                  d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
                                />
                              </svg>
                            </span>
                          </span>
                          <div
                            id="categoriesDetail"
                            class="h-auto hidden group-two-focus:block w-auto ml-5"
                            :class="
                              isFocusedCategoryHidden == true
                                ? 'group-two-focus:block'
                                : 'group-two-focus:hidden'
                            "
                          >
                            <div
                              v-for="items in gettersCategoryList"
                              :key="items.ID"
                              class="header-catagory catagory-genres"
                              @click="toCatagoryDetails(items.ID)"
                            >
                              {{ items.Name }}
                            </div>
                            <div
                              class="header-catagory catagory-genres"
                              @click="buttonEventViewAllGenres()"
                            >
                              Xem tất cả
                            </div>
                          </div>
                        </button>
                      </li>
                    </ul>

                    <ul class="menu-board-hidden">
                      <li class="menu-title">Khách hàng</li>
                      <li
                        v-for="(item, index) in menuBoard2"
                        :key="index"
                        class="header-catagory"
                        @click="toClientFeature(index)"
                      >
                        {{ item.text }}
                      </li>
                      <button
                        href="#"
                        class="group-three"
                        @click="toggleFocusNotifyHidden()"
                      >
                        <span href="#" class="header-catagory catagory-genres">
                          Thông báo
                          <span class="mt-1 ml-2">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              fill="currentColor"
                              class="bi bi-chevron-down group-two-hover:rotate-180 group-two-hover:transition-all group-two-hover:duration-300S"
                              viewBox="0 0 16 16"
                            >
                              <path
                                fill-rule="evenodd"
                                d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
                              />
                            </svg>
                          </span>
                        </span>
                        <div
                          id="categoriesDetail"
                          class="h-auto hidden group-three-focus:block w-auto ml-5"
                          :class="
                            isFocusedNotifyHidden == true
                              ? 'group-three-focus:block'
                              : 'group-three-focus:hidden'
                          "
                        >
                          <div
                            v-for="(item, index) in menuBoard2Notify"
                            :key="index"
                            class="header-catagory catagory-genres"
                            @click="toDetailNotify(index)"
                          >
                            {{ item.text }}
                          </div>
                        </div>
                      </button>
                    </ul>
                  </div>

                  <div>
                    <ul class="menu-board-hidden">
                      <li class="menu-title">Partner</li>
                      <li
                        v-for="(item, index) in menuBoard3"
                        :key="index"
                        class="header-catagory"
                      >
                        {{ item.text }}
                      </li>
                    </ul>

                    <ul class="menu-board-hidden">
                      <li class="menu-title">Hỗ trợ</li>
                      <li
                        v-for="(item, index) in menuBoard4"
                        :key="index"
                        class="header-catagory"
                      >
                        {{ item.text }}
                      </li>
                    </ul>
                  </div>

                  <!-- menu hidden images -->
                  <!-- <div class="mt-4 mr-10 xl:block hidden">
                    <a
                      v-for="(item, index) in menuImages"
                      :key="index"
                      class="w-52 h-36"
                    >
                      <img v-bind:src="item.url" class="menu-hidden-images" />
                    </a>
                  </div> -->
                </div>

                <!-- menu board is hidden - sign up & log in -->
                <div v-show="!globalOnLogged" class="mt-28 mr-8 w-full">
                  <a
                    href="/sign-up"
                    aria-label="sign-up"
                    class="font-medium text-white bg-blue-400 hover:bg-blue-500 py-2 md:px-60 px-10 w-1/2 items-center rounded-full text-center mx-auto"
                  >
                    Đăng ký
                  </a>
                  <p class="mt-3 mb-10">
                    Bạn đã có sẵn một tài khoản?
                    <br class="block sm:hidden" />
                    <a
                      href="/login"
                      class="hover:text-blue-500 underline underline-offset-2"
                      >Đăng nhập ngay bây giờ</a
                    >
                  </p>
                </div>
              </div>
            </button>
          </li>
        </ul>
      </div>
    </div>

    <!-- menu lower -->
    <div
      v-show="!headerMenuScrolled"
      id="audio-book-header-lower"
      class="flex flex-row"
    >
      <!-- menu lower left "search" -->
      <div
        id="audio-book-header-lower-left"
        class="h-20 w-11/12 mx-auto md:w-1/3 md:ml-6"
      >
        <div class="relative">
          <div class="absolute mt-4 pl-4 pointer-events-none">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-search"
              viewBox="0 0 16 16"
            >
              <path
                d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"
              />
            </svg>
          </div>
          <input
            type="search"
            class="block w-full h-12 p-3 pl-10 text-md text-gray-900 border rounded-full bg-gray-50 focus:bg-gray-100 focus:border-blue-500 outline-0 transition-all duration-200"
            placeholder="Tìm kiếm sách nói..."
            v-model="searchContent"
            @keyup.enter="searchBooks()"
          />

          <div
            class="font-medium absolute text-white right-1 bottom-1 bg-blue-400 hover:bg-blue-500 focus:ring-3 rounded-full px-5 py-2 cursor-pointer"
            @click="searchBooks()"
          >
            Tìm kiếm
          </div>
        </div>
      </div>

      <!-- menu lower right -->
      <div id="audio-book-header-lower-right" class="hidden md:block h-12">
        <ul class="flex gap-x mr-4 h-12 items-center">
          <!-- menu lower right "find an audiobook" -->
          <li>
            <button
              class="flex group-one font-medium pt-2 pb-2 pl-4 pr-4 rounded-lg hover:bg-slate-200"
            >
              Tùy chọn
              <span class="mt-1 ml-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-chevron-down group-one-hover:rotate-180 group-one-hover:transition-all group-one-hover:duration-300S"
                  viewBox="0 0 16 16"
                >
                  <path
                    fill-rule="evenodd"
                    d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
                  />
                </svg>
              </span>
              <div
                class="hidden absolute top-32 h-auto w-auto pb-3 bg-white opacity-0 group-one-focus:opacity-100 group-one-focus:block border-2 border-slate-200 rounded-xl drop-shadow-lg"
              >
                <ul
                  class="flex flex-col text-left w-full pt-3 divide-y divide-white"
                >
                  <li
                    v-for="(item, index) in findAnAudioBook"
                    :key="index"
                    @click="toMenuBoard1(index)"
                    class="menu-lower-items"
                  >
                    {{ item.text }}
                  </li>
                </ul>
              </div>
            </button>
          </li>

          <!-- menu lower right "genres" -->
          <li>
            <button
              @click="clickMenuGenres"
              id="menu-lower-right-genres-parent"
              class="flex group-one font-medium py-2 px-4 rounded-lg hover:bg-slate-200 cursor-pointer"
            >
              Thể loại
              <span class="mt-1 ml-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-chevron-down group-one-hover:rotate-180 group-one-hover:transition-all group-one-hover:duration-300S"
                  viewBox="0 0 16 16"
                >
                  <path
                    fill-rule="evenodd"
                    d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
                  />
                </svg>
              </span>
            </button>
            <div id="menu-lower-right-genres-child" class="group-one">
              <div
                class="text-left py-3 min-w-[200px] hidden absolute top-32 h-auto w-auto bg-white group-one-focus:right-[60px] lg:group-one-focus:right-[180px] group-one-focus:opacity-100 group-one-focus:block border-2 border-slate-200 rounded-xl drop-shadow-lg"
              >
                <table class="w-full">
                  <tr
                    class="hover:bg-slate-200 py-1.5 px-6 flex cursor-pointer"
                    v-for="items in gettersCategoryList"
                    :key="items.ID"
                    @click="toCatagoryDetails(items.ID)"
                  >
                    <td class="w-12">
                      <img class="max-w-[30px]" :src="items.Images" alt="" />
                    </td>
                    <td class="font-bold">
                      {{ items.Name }}
                    </td>
                  </tr>
                </table>
                <div class="mx-5 text-center">
                  <ButtonChildClick
                    @click="buttonEventViewAllGenres()"
                    text="Xem tất cả"
                  />
                </div>
              </div>
            </div>
          </li>

          <!-- menu lower right "Gift audiobooks" -->
          <li class="gift-and-business hidden lg:block">
            <a href="" class="text-blue-400 font-medium"> Khuyến mãi </a>
          </li>

          <!-- menu lower right "nunubi for Business" -->
          <li class="gift-and-business">
            <a href="" class="font-medium"> Đăng ký Partner </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>


<style lang="postcss" scoped>
.member-ship-and-how-it-works {
  @apply font-medium hidden lg:block pt-2 pb-2 pl-4 pr-4 rounded-lg hover:bg-slate-200;
}

.sign-up-and-login {
  @apply font-medium hidden sm:block p-2 w-28 rounded-full text-center;
}

.header-catagory {
  @apply hover:text-blue-500 py-2 px-6;
}

.catagory-genres {
  @apply flex flex-row;
}

.menu-board-hidden {
  @apply flex flex-col items-start w-full pt-1;
}

.menu-title {
  @apply text-lg text-black font-bold py-4 px-6;
}

.menu-hidden-images {
  @apply w-64 h-40 rounded-xl m-4 hover:brightness-125;
}

.menu-lower-items {
  @apply hover:bg-slate-200 py-1.5 px-6 w-full;
}

.gift-and-business {
  @apply pt-2 pb-2 pl-4 pr-4 rounded-lg hover:bg-slate-200;
}
</style>


<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import ButtonChildClick from "./button_child_click/ButtonChildClick.vue";
import ListGenres from "./list_genres/ListGenres.vue";
import { mapState, mapActions, mapGetters, mapMutations } from "vuex";
import _ from "lodash";

export default defineComponent({
  setup() {
    const headerHeight = ref("150px");
    let height = 150;
    const minHeight = 80;
    const maxHeight = 150;
    const headerMenuScrolled = ref(false);

    const handleScroll = () => {
      let scrolled = window.scrollY;

      if (scrolled > 150) {
        headerMenuScrolled.value = true;
        height = minHeight;
      } else if (scrolled == 0) {
        headerMenuScrolled.value = false;
        height = maxHeight;
      }
      headerHeight.value = `${height}px`;
    };

    onMounted(() => {
      window.addEventListener("scroll", handleScroll);
      window.addEventListener("scroll", _.throttle(handleScroll, 200));
    });

    return {
      headerHeight,
      headerMenuScrolled,
    };
  },

  computed: {
    ...mapState(["globalOnLogged"]),
    ...mapGetters(["globalOnLoggedFunc", "gettersCategoryList"]),
    ...mapMutations(["setGlobalBooleanTrue", "setGlobalBooleanFalse"]),
  },

  components: { ButtonChildClick, ListGenres },

  mounted() {
    if (this.$cookies.isKey("token")) {
      console.log("vào - cookie");
      this.setGlobalBooleanTrue;
      // this.setglobalUserNameAc(this.$cookies.get("userName"))
    }
    //thiết lập tất cả thể loại của trang web
    this.setCategoryListAll();
  },

  methods: {
    ...mapActions(["setglobalUserNameAc", "getCategoryList"]),
    //mở menu đang ẩn
    openHeaderMenu() {
      const headerMenu = document.getElementById("header-menu");
      if (
        headerMenu?.classList.contains(
          "group-one-focus-within:right-[-2500px]"
        ) == true
      ) {
        headerMenu.classList.remove("group-one-focus-within:right-[-2500px]");
      }
      if (
        headerMenu?.classList.contains("group-one-focus-within:right-0") ==
        false
      ) {
        headerMenu.classList.add("group-one-focus-within:right-0");
      }
    },

    //đóng menu
    removeHeaderMenu() {
      const headerMenu = document.getElementById("header-menu");
      headerMenu?.classList.replace(
        "group-one-focus-within:right-0",
        "group-one-focus-within:right-[-2500px]"
      );
    },

    //di chuyển đến trang thể loại
    buttonEventViewAllGenres() {
      this.$router.push({ name: "genres" });
    },

    //nhấp vào nút meue, để menu ẩn bắt sự kiện focus, => mở menu
    clickMenuGenres() {
      const myChild = document.getElementById("menu-lower-right-genres-child");
      if (myChild !== null) {
        myChild.tabIndex = 0;
        if (myChild !== document.activeElement) {
          myChild.focus();
        }
      }
    },

    //di chuyển đến giỏ hàng
    toCart() {
      this.$router.push("/cart");
    },

    //đăng xuất khỏi tài khoản
    logoutUser() {
      // console.log("đăng xuất tài khoản thành công")
      this.$cookies.remove("token");
      this.$cookies.remove("userName");
      this.setGlobalBooleanFalse;
      this.$router.push("/");
    },

    //mở thông tin tài khoản
    openInfoAcount() {
      this.$router.push(`/info-account/${this.$cookies.get("userId")}`);
    },

    // mở cửa sổ thông báo theo tài khoản
    openNotify() {
      this.$router.push(`/notify/${this.$cookies.get("userId")}`);
    },

    //thiết lập tất cả thể loại của trang web
    async setCategoryListAll() {
      // await this.getCategoryList();
      // console.log(this.$store.getters["category/gettersCategoryList"]);
      try {
        await this.getCategoryList();
        console.log(this.gettersCategoryList);
      } catch (error) {
        console.log(error);
      }
    },

    //đến chi tiết thể loại
    toCatagoryDetails(id) {
      console.log("index: " + id);
      this.$router.push(`/genres/${id}`);
      // this.$router.push(`/info-account/${this.$cookies.get("userId")}`);
    },

    //đên trang tìm kiếm sách
    searchBooks() {
      this.$router.push(`/search?q=${encodeURIComponent(this.searchContent)}`);
    },

    toPlayList() {
      this.$router.push({ name: "audio_book_player" });
    },

    //đến từng tính năng của khách trong menu ẩn
    toClientFeature(index: number) {
      switch (index) {
        case 0:
          this.openInfoAcount();
          break;
        case 1:
          this.toPlayList();
          break;
        case 2:
          this.$router.push({ name: "cart" });
          break;
        case 3:
          this.openNotify();
          break;
        default:
          this.logoutUser();
          break;
      }
    },

    //ẩn hiện khi click vào thể loại trong menu ẩn
    // resetFocusCategoryHidden() {
    //   if(this.)
    //   this.isFocusedCategoryHidden = !this.isFocusedCategoryHidden;
    // },
    toggleFocusCategoryHidden() {
      this.isFocusedCategoryHidden = !this.isFocusedCategoryHidden;
    },

    toggleFocusNotifyHidden() {
      this.isFocusedNotifyHidden = !this.isFocusedNotifyHidden;
    },

    //đến chi tiết thông báo
    toDetailNotify(index: number) {
      if (index == 0) {
        this.$router.push("/notify/wait");
      } else if (index == 1) {
        this.$router.push("/notify/available");
      }
    },

    //tới menuBoard1
    toMenuBoard1(index) {
      switch (index) {
        case 0:
          this.$router.push("/new-releases");
          break;
        case 1:
          this.$router.push("/bestseller");
          break;
        default:
          break;
      }
    },
  },

  data() {
    return {
      searchContent: "",
      isFocusedCategoryHidden: false,
      isFocusedNotifyHidden: false,

      headerHigherRight: [
        {
          href: "",
          text: "Thành viên",
        },
        {
          href: "how-it-works",
          text: "Hoạt động như thế nào?",
        },
      ],
      menuBoard1: [
        { text: "Mới phát hành", href: "" },
        { text: "Bán chạy nhất", href: "" },
      ],
      menuBoard2: [
        { text: "Thông tin" },
        { text: "Danh sách phát" },
        { text: "Giỏ hàng" },
        { text: "Đăng xuất" },
      ],
      menuBoard2Notify: [
        { text: "Đơn hàng đang xử lý" },
        { text: "Đơn hàng thành công" },
      ],
      menuBoard3: [{ text: "Đăng ký Partner" }, { text: "Thông tin Partner" }],
      menuBoard4: [{ text: "Trung tâm hỗ trợ" }, { text: "Liên hệ chúng tôi" }],
      // menuImages: [
      //   {
      //     href: "",
      //     url: "../../src/assets/images/header/menu/start_girt.jpg",
      //   },
      //   {
      //     href: "",
      //     url: "../../src/assets/images/header/menu/business.jpg",
      //   },
      //   {
      //     href: "",
      //     url: "../../src/assets/images/header/menu/audio_book.jpg",
      //   },
      // ],
      findAnAudioBook: [
        { text: "Mới phát hành", href: "" },
        { text: "Bán chạy nhất", href: "" },
        { text: "Khuyến mãi", href: "" },
        { text: "Đăng ký Partner", href: "" },
      ],
    };
  },
});
</script>


