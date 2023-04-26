<template>
  <div class="text-center mx-5 sm:mx-28 md:mx-60">
    <h1 class="font-bold text-5xl mt-20">Đăng ký tài khoản nunubi</h1>

    <div class="flex flex-col items-center my-16">
      <hr class="bg-slate-600 h-px w-32" />
    </div>

    <div class="lg:grid lg:grid-cols-2 lg:gap-5">
      <div class="my-2">
        <div class="text-left ml-1 text-lg">
          <label class="after:content-['*'] after:ml-0.5 after:text-red-500">
            <span>{{ userNameLable }} </span>
            <span class="italic text-sm">
              (tên người dùng từ 6-20 kí tự)</span
            ></label
          >
        </div>
        <div>
          <input
            class="border-slate-200 w-full border outline-0 rounded-md bg-gray-50 focus:border-blue-400 p-3"
            v-model="username"
            type="search"
            :placeholder="placeHolderUserName"
            @keyup.enter="signUp()"
          />
        </div>
      </div>

      <div class="my-2">
        <div class="text-left ml-1 text-lg">
          <label class="after:content-['*'] after:ml-0.5 after:text-red-500">
            <span>{{ passwordLable }} </span>
            <span class="italic text-sm"> (mật khẩu từ 6 kí tự trở lên)</span>
          </label>
        </div>
        <div>
          <input
            class="border-slate-200 w-full border outline-0 rounded-md bg-gray-50 focus:border-blue-400 p-3"
            v-model="password"
            type="search"
            :placeholder="placeHolderPassword"
            @keyup.enter="signUp()"
          />
        </div>
      </div>

      <div class="my-2">
        <div class="text-left ml-1 text-lg">
          <label class="after:content-['*'] after:ml-0.5 after:text-red-500">{{
            confirmPasswordLable
          }}</label>
        </div>
        <div>
          <input
            class="border-slate-200 w-full border outline-0 rounded-md bg-gray-50 focus:border-blue-400 p-3"
            v-model="confirmPassword"
            type="search"
            :placeholder="placeHolderConfirmPassword"
            @keyup.enter="signUp()"
          />
        </div>
      </div>

      <div class="my-2">
        <div class="text-left ml-1 text-lg">
          <label class="after:content-['*'] after:ml-0.5 after:text-red-500">{{
            phoneLable
          }}</label>
        </div>
        <div>
          <input
            class="border-slate-200 w-full border outline-0 rounded-md bg-gray-50 focus:border-blue-400 p-3"
            v-model="phone"
            type="search"
            :placeholder="placeHolderPhone"
            @keyup.enter="signUp()"
          />
        </div>
      </div>

      <div class="my-2">
        <div class="text-left ml-1 text-lg">
          <label class="after:content-['*'] after:ml-0.5 after:text-red-500">{{
            fullNameLable
          }}</label>
        </div>
        <div>
          <input
            class="border-slate-200 w-full border outline-0 rounded-md bg-gray-50 focus:border-blue-400 p-3"
            v-model="fullName"
            type="search"
            :placeholder="placeHolderFullName"
            @keyup.enter="signUp()"
          />
        </div>
      </div>

      <div class="my-2">
        <div class="text-left ml-1 text-lg">
          <label class="after:content-['*'] after:ml-0.5 after:text-red-500">{{
            ageLable
          }}</label>
        </div>
        <div>
          <input
            class="border-slate-200 w-full border outline-0 rounded-md bg-gray-50 focus:border-blue-400 p-3"
            v-model="age"
            type="search"
            :placeholder="placeHolderAge"
            @keyup.enter="signUp()"
          />
        </div>
      </div>

      <div class="my-2">
        <div class="text-left ml-1 text-lg">
          <label class="after:content-['*'] after:ml-0.5 after:text-red-500">{{
            emailLable
          }}</label>
        </div>
        <div>
          <input
            class="border-slate-200 w-full border outline-0 rounded-md bg-gray-50 focus:border-blue-400 p-3"
            v-model="email"
            type="search"
            :placeholder="placeHolderEmail"
            @keyup.enter="signUp()"
          />
        </div>
      </div>

      <div class="my-2">
        <div class="text-left ml-1 text-lg">
          <label>{{ addressLable }}</label>
        </div>
        <div>
          <input
            class="border-slate-200 w-full border outline-0 rounded-md bg-gray-50 focus:border-blue-400 p-3"
            v-model="address"
            type="search"
            :placeholder="placeHolderAddress"
            @keyup.enter="signUp()"
          />
        </div>
      </div>
    </div>

    <!-- <div class="my-2">
        <div class="text-left ml-1 text-lg">
          <label for="sign-up-email">{{ photoLable }}</label>
        </div>
        <div>
          <input
            class="border-slate-200 w-full border outline-0 rounded-md bg-gray-50 focus:border-blue-400 p-3"
            id="sign-up-email"
            type="file"
            accept="image/*"
            @change="handleImageUpload"
          />
          <span class="mx-auto flex justify-center">
              <img
                v-if="photoURL != ''"
                class="w-40 h-40 mx-auto my-2 object-cover rounded-full"
                :src="photoURL"
                alt=""
              />
            </span>
        </div>
      
    </div> -->

    <input
      @click="signUp()"
      type="submit"
      value="Đăng ký"
      class="bg-blue-400 text-white py-2 px-6 rounded-full my-4 hover:bg-blue-500 cursor-pointer"
    />

    <!-- check vào đồng ý với điều khoản -->
    <!-- <div class="flex items-center m-4">
        <input
          id="default-checkbox"
          type="checkbox"
          value=""
          class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
        />
        <label
          for="default-checkbox"
          class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >Tôi đồng ý với điều khoản riêng của nunubi và chính sách sử dụng,
          được cập nhật mới nhất vào ngày 25/02/2023.</label
        >
      </div> -->

    <!-- Login and sign up -->
    <!-- <ButtonBlue value="Tạo tài khoản"/> -->
    <!-- <p class="mt-3 mb-10">
        Đã có tài khoản?
        <Link name="Đăng nhập tại đây." href="/login" />
      </p> -->
  </div>
</template>

<style scoped>
</style>


<script lang="ts">
import { defineComponent } from "vue";
// import ButtonBlue from "../../components/button_blue/ButtonBlue.vue";
// import FormInput from "../../components/forms/FormInput.vue";
// import Link from "../../components/link/Link.vue";
import { authService } from "../../service/auth_service";
import type { SignupRequest } from "../../model/user/request";

export default defineComponent({
  data() {
    return {
      userNameLable: "Tên người dùng",
      placeHolderUserName: "Nhập tên người dùng...",
      passwordLable: "Mật khẩu",
      placeHolderPassword: "Nhập mật khẩu...",
      confirmPasswordLable: "Xác nhận mật khẩu",
      placeHolderConfirmPassword: "Nhập lại mật khẩu...",
      phoneLable: "Số điện thoại",
      placeHolderPhone: "Nhập số điện thoại...",
      fullNameLable: "Tên đầy đủ",
      placeHolderFullName: "Nhập tên đầy đủ...",
      ageLable: "Tuổi",
      placeHolderAge: "Nhập tuổi...",
      emailLable: "Email",
      placeHolderEmail: "Nhập email...",
      addressLable: "Địa chỉ",
      placeHolderAddress: "Nhập địa chỉ...",
      photoLable: "Ảnh đại diện",

      // username: "",
      // password: "",
      // confirmPassword: "",
      // phone: "",
      // fullName: "",
      // age: "",
      // email: "",
      address: "",
      photoURL: "",

      username: "thainhut1",
      password: "thainhut1",
      confirmPassword: "thainhut1",
      phone: "033256666",
      fullName: "Nguyen Nhut ",
      age: "22",
      email: "thainhut1@gmail.com",
    };
  },

  methods: {
    validateAccount(): boolean {
      //form validation - kiểm tra rỗng
      if (
        this.username == "" ||
        this.password == "" ||
        this.confirmPassword == "" ||
        this.phone == "" ||
        this.fullName == "" ||
        this.age == "" ||
        this.email == ""
      ) {
        alert("Vui lòng nhập đầy đủ thông tin bắt buộc");
        return false;
      }

      //xác thực username
      if (this.username.length < 6 || this.username.length > 20) {
        alert("Tên người dùng phải từ 6-20 kí tự");
        return false;
      } else {
        const pattern = /^[a-zA-Z0-9]+$/;
        if (!pattern.test(this.username)) {
          alert("Tên người dùng chỉ chứa chữ và số");
          return false;
        }
      }

      //xác thực mật khẩu
      if (this.password.length < 6) {
        alert("Mật khẩu phải từ 6 kí tự trở lên");
        return false;
      }

      //kiểm tra mật khẩu == với xác nhận mật khẩu
      if (this.password !== this.confirmPassword) {
        alert("Xác nhận mật khẩu chưa chính xác");
        return false;
      }

      //kiểm tra số điện thoại
      if (isNaN(parseInt(this.phone))) {
        alert("Số điện thoại phải là kiểu số");
        return false;
      } else if (this.phone.length !== 10) {
        alert("Số điện thoại phải có 10 chữ số");
        return false;
      }

      //kiểm tra tuổi
      if (isNaN(parseInt(this.age))) {
        alert("Tuổi phải là kiểu số");
        return false;
      } else if (this.age.length <= 0) {
        alert("Tuổi không hợp lệ");
        return false;
      }

      //xác thuật email
      const patternEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!patternEmail.test(this.email)) {
        alert("Email không hợp lệ");
        return false;
      }

      return true;
    },

    async signUp() {
      console.log("sign up");

      //gọi hàm xác thực dữ liệu đăng ký
      if (!this.validateAccount()) {
        return;
      }

      const request: SignupRequest = {
        address: this.address,
        age: parseInt(this.age),
        email: this.email,
        fullName: this.fullName,
        password: this.password,
        phone: this.phone,
        photo: this.photoURL,
        username: this.username,
      };
      console.log(request);

      try {
        const { data, status } = await authService.signUp(request);

        if (status == 200) {
          alert("Đăng ký thành công");
          console.log(data);

          this.$router.push("/");
        } else {
          alert("Đăng ký thất bại");
        }
      } catch (error) {
        if (error.response.status == 409) {
          alert(error.response.data.Message);
        }

        // this.username= "",
        // this.password= "",
        // this.confirmPassword= "",
        // this.phone= "",
        // this.fullName= "",
        // this.age= "";
      }
    },

    //đổi ảnh thành kiểu src: string
    // handleImageUpload(event: any) {
    //   const file = event.target.files[0];

    //   if (!file) {
    //     this.photoURL = "";
    //     return;
    //   }

    //   const reader = new FileReader();
    //   reader.onload = () => {
    //     const base64Image = btoa(e.target.result as string);
    //     this.photoURL = `data:image/png;base64,${base64Image}`;

    //   };
    //   reader.readAsBinaryString(file);
    // },
  },

  components: {
    // Link,
    // ButtonBlue,
  },
});
</script>