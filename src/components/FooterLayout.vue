<template>
  <div id="comp-footer" class="">
    <div class="w-full grid comp-footer-first xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-4 bg-black">
      <div class="menu_footer">
        <p class="text-blue-300">Sách nói</p>
        <a v-for="(item, index) in audioBookFooter" :key="index" :href="item.href">
          {{item.text }}
        </a>
      </div>

      <div class="menu_footer">
        <p class="text-blue-300">Về nunubi</p>
        <a v-for="(item, index) in forLibroFooter" :key="index" :href="item.href">
          {{item.text}}
        </a>
      </div>

      <div class="menu_footer">
        <p class="text-blue-300">Đối tác</p>
        <a v-for="(item, index) in partnerFooter" :key="index" :href="item.href">
          {{item.text}}
        </a>
      </div>

      <div class="menu_footer">
        <p class="text-blue-300">Hỗ trợ</p>
        <a v-for="(item, index) in supportFooter" :key="index" :href="item.href">
          {{item.text}}
        </a>
      </div>
    </div>

    <div class="comp-footer-second">
      <div class="social-prupose flex items-center flex-col md:flex-row">
        <div class="div-img">
          <img class="w-64" src="../assets/images/footer_social_purpose.png" />
        </div>
        <div class="div-text text-justify w-full px-10">
          <h1 class="font-bold text-2xl">
            nunubi là một công ty mục đích xã hội
          </h1>
          <p>
            Công ty vì mục đích xã hội (SPC) sử dụng phương pháp kết hợp giữa tăng trưởng và lợi nhuận, kết hợp các 
            yếu tố của tổ chức phi lợi nhuận và kinh doanh vì lợi nhuận truyền thống. Một SPC có thể theo đuổi cả mục 
            tiêu xã hội và tài chính trong bối cảnh vì lợi nhuận, ngay cả khi những mục tiêu xã hội đó đôi khi có thể 
            mâu thuẫn với lợi ích tài chính của công ty hoặc lợi ích tài chính của cổ đông.
          </p>
        </div>
      </div>
    </div>

    <div class="comp-footer-last bg-black">
      <div class="logo-social text-center">
        <a href=""
          ><img src="../assets/images/footer-social-fb.png" alt=""
        /></a>
        <a href=""
          ><img src="../assets/images/footer-social-ing.png" alt=""
        /></a>
        <a href=""
          ><img src="../assets/images/footer-social-twitter.png" alt=""
        /></a>
        <a href=""
          ><img src="../assets/images/footer-social-ytb.png" alt=""
        /></a>
        <p class="pb-8 text-white">
          © Copyright 2023 by nunubi / <a href="">Điều khoản sử dụng</a> /
          <a href="">Chính sách riêng</a>
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  data() {
    return {
      audioBookFooter: [
        {
          href: "",
          text: "Thành viên",
        },
        {
          href: "/",
          text: "Quà tặng sách nói",
        },
        {
          href: "",
          text: "Lựa chọn của người bán",
        },
        {
          href: "",
          text: "Mới phát hành",
        },
        {
          href: "",
          text: "Bán chạy nhất",
        },
        {
          href: "",
          text: "Danh sách phát",
        },
        {
          href: "",
          text: "Thể loại",
        },
      ],
      forLibroFooter: [
        {
          href: "",
          text: "Câu chuyện của chúng tôi",
        },
        {
          href: "/",
          text: "Tìm hiệu sách",
        },
        {
          href: "",
          text: "Tệp âm thanh",
        },
        {
          href: "",
          text: "Blog",
        },
        {
          href: "",
          text: "Mời một người bạn",
        },
      ],

      partnerFooter: [
        {
          href: "",
          text: "Hiệu sách",
        },
        {
          href: "",
          text: "Tác giả",
        },
        {
          href: "",
          text: "Chi nhánh",
        },
      ],

      supportFooter: [
        {
          href: "",
          text: "Tìm hiệu sách của bạn",
        },
        {
          href: "",
          text: "Trung tâm hỗ trợ",
        },
        {
          href: "",
          text: "Liên hệ chúng tôi",
        },
      ],
    };
  },

  setup() {},
});
</script>


<style lang="postcss" scoped>

  .menu_footer {
    @apply flex flex-col nav-col;
  }
  .nav-col > a {
    color: aliceblue;
    font-weight: 500;
    font-size: 17px;
    padding: 7px;
  }
  .nav-col {
    padding: 15px;
    font-weight: 700;
    font-size: 23px;
    text-align: center;
    margin: 10%;
    font-family: museo-sans-rounded, "Helvetica Neue", Helvetica, Roboto, Arial,
      sans-serif;
  }
  .nav-col > p {
    padding-bottom: 14px;
  }

  .comp-footer-second {
    background-color: black;
    margin: 1px 0px;
    color: white;
    /* display: inline; */
  }

  .logo-social > a > img {
    width: 60px;
    display: inline;
    padding: 40px 10px;
  }
</style>
