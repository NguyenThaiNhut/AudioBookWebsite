<template>
  <div class="text-center mx-5 sm:mx-28 md:mx-60">
    <h1 class="font-bold text-5xl mt-20">Đăng nhập</h1>

    <div class="flex flex-col items-center my-16">
      <hr class="bg-slate-600 h-px w-32" />
    </div>

    <!-- <FormInput name="Email" placeholder="Nhập Email..."/> -->
    <!-- <FormInput name="Mật khẩu" placeholder="Nhập mật khẩu..."/> -->
    <div class="my-2">
      <div class="text-left ml-1 text-lg">
        <label for="sign-up-email">{{ nameLable }}</label>
      </div>
      <div>
        <input
          class="border-slate-200 w-full border outline-0 rounded-md bg-gray-50 focus:border-blue-400 p-3"
          v-model="username"
          id="sign-up-email"
          type="search"
          :placeholder="placeholderName"
          @keyup.enter="login()"
        />
      </div>
    </div>

    <div class="my-2">
      <div class="text-left ml-1 text-lg">
        <label for="sign-up-email">{{ passwordLable }}</label>
      </div>
      <div>
        <input
          class="border-slate-200 w-full border outline-0 rounded-md bg-gray-50 focus:border-blue-400 p-3"
          id="sign-up-email"
          type="search"
          v-model="password"
          :placeholder="placeholderPassword"
          @keyup.enter="login()"
        />
      </div>
    </div>
    <input
      @click="login()"
      type="submit"
      value="Đăng nhập"
      class="bg-blue-400 text-white py-2 px-6 rounded-full my-4 hover:bg-blue-500 cursor-pointer"
    />

    <!-- <ButtonBlue value="Đăng nhập" />
      <p class="mt-3 mb-10">
        <Link name="Quên mật khẩu" url="" />
        <span> • </span>
        <Link name="Tạo tài khoản" url="/sign-up" />
      </p> -->
  </div>
</template>

<style scoped></style>

<script lang="ts">
import { defineComponent, inject } from "vue";
import { authService } from "../../service/auth_service";
import type { LoginRequest } from "../../model/user/request";
import { mapGetters, mapMutations } from "vuex";

export default defineComponent({
  data() {
    return {
      nameLable: "Tên người dùng",
      placeholderName: "Nhập tên người dùng...",
      passwordLable: "Mật khẩu",
      placeholderPassword: "Nhập mật khẩu...",
      username: "",
      password: "",
    };
  },

  computed: {
    ...mapGetters(["globalOnLoggedFunc"]),
    ...mapMutations(["setGlobalBooleanTrue", "setGlobalBooleanFalse"]),
  },

  methods: {
    ...mapMutations([
      // "setGlobalBooleanTrue",
      // "setGlobalBooleanFalse",
      // "setglobalUserName",
    ]),

    async login() {
      console.log("Login");

      if (this.username == "" || this.password == "") {
        alert("Vui lòng nhập đầy đủ thông tin");
        return;
      }

      const request: LoginRequest = {
        username: this.username,
        password: this.password,
      };

      try {
        const { data, status } = await authService.login(request);

        if (status == 200) {
          const d = data.Data; //khai báo biến để lấy dữ liệu trả về

          console.log(d);
          alert("Đăng nhập thành công");

          alert(d.FullName);

          this.$cookies.set("token", d.Token);
          this.$cookies.set("userId", d.Id);
          const user = this.$cookies.set("username", d.Username);

          // Lấy thông tin giỏ hàng từ local storage
          const cartStr = localStorage.getItem(`cart_${user}`);

          // Nếu không tìm thấy giỏ hàng, tạo giỏ hàng mặc định và lưu vào local storage
          if (!cartStr) {
            const defaultCart = { items: [] };
            localStorage.setItem(`cart_${user}`, JSON.stringify(defaultCart));
          }

          // this.$cookies.remove("token");
          // this.$cookies.remove("userName");
          if (this.$cookies.isKey("token")) {
            console.log(d.Username);
            this.setGlobalBooleanTrue;
            // this.setglobalUserName(d.Username);
          }

          this.$router.push("/");
        } else {
          alert("Đăng nhập thất bại");
        }
      } catch (err) {
        console.log(err);
        alert("Sai tài khoản hoặc mật khẩu");
        this.username = "";
        this.password = "";
      }
    },
  },
});
</script>
