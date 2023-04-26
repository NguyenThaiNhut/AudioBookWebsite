<template>
  <div>
    <h1 class="font-bold text-5xl mt-20 text-center">Thể loại chính</h1>

    <div class="flex flex-col items-center my-16">
      <hr class="bg-slate-600 h-px w-32" />
    </div>

    <!-- <ListGenres />  -->
    <div class="mx-10 my-20">
      <table class="w-full">
        <tr
          class="border border-gray-400 text-center"
          v-for="items in gettersCategoryList"
          :key="items.ID"
        >
          <td class="p-2 md:min-w-[80px]">
            <div class="flex justify-center">
              <img class="max-w-[50px]" :src="items.Images" alt="" />
            </div>
          </td>
          <td class="font-bold text-center md:min-w-[180px]">
            {{ items.Name }}
          </td>
          <td class="hidden text-justify p-2 md:block">
            {{ items.Description }}
          </td>
          <td class="p-2 min-w-[90px] md:w-[130px]">
            <div
              class="bg-blue-400 text-white py-2 rounded-full hover:bg-blue-500 cursor-pointer"
              @click="toCatagoryDetails(items.ID)"
            >
              Chi tiết
            </div>
          </td>
        </tr>
      </table>
    </div>
  </div>

  <!-- <hr class="bg-slate-600 my-10 h-px" />

  <div class="lg:flex lg:flex-row mx-32 my-4">
    <label for="add-genres" class="basis-2/12">{{ genresLable }}</label>
    <input
      class="w-full border-slate-200 border outline-0 rounded-md bg-gray-50 focus:border-blue-400 p-3"
      id="add-genres"
      type="search"
      v-model="genres"
      :placeholder="placeholderGenres"
    />
  </div>

  <div class="lg:flex lg:flex-row mx-32 my-4">
    <label for="add-genres" class="basis-2/12">{{ descriptionLable }}</label>
    <input
      class="w-full border-slate-200 border outline-0 rounded-md bg-gray-50 focus:border-blue-400 p-3"
      id="add-genres"
      type="search"
      v-model="description"
      :placeholder="placeholderDescription"
    />
  </div>

  <div class="lg:flex lg:flex-row mx-32 my-4">
    <label for="add-genres" class="basis-2/12">{{ imagesLable }}</label>
    <input
      class="w-full border-slate-200 border outline-0 rounded-md bg-gray-50 focus:border-blue-400 p-3"
      id="add-genres"
      type="search"
      v-model="images"
      :placeholder="placeholderImages"
    />
  </div>

  <div class="flex justify-center">
    <input
      type="submit"
      value="Thiết lập thể loại"
      class="bg-blue-400 text-white py-2 px-6 rounded-full mb-5 hover:bg-blue-500 cursor-pointer"
    />
  </div> -->

  <!-- All genres -->
  <!-- <div>
    <h2 class="text-center text-3xl font-bold my-4">Tất cả thể loại</h2>
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 m-10 text-left sm:text-center">
      <a v-for="(item, index) in allGenres" :key="index" :href="item.href" class="hover:bg-slate-200 py-1.5 px-6 w-full cursor-pointer">
        {{item.text}}
      </a>
    </div>
  </div> -->
</template>


<style lang="postcss" scoped>
</style>


<script lang="ts">
import { defineComponent } from "vue";
// import ListGenres from "../../components/list_genres/ListGenres.vue";
import { mapGetters } from "vuex";

export default defineComponent({
  // components: {
  //   ListGenres,
  // },

  data() {
    return {};
  },

  computed: {
    ...mapGetters(["gettersCategoryList"]),
  },

  methods: {
    //đến chi tiết thể loại
    toCatagoryDetails(id: number) {
      this.$router.push(`/genres/${id}`);
    },
  },
});
</script>