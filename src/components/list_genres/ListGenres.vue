<template>
  <div
    v-for="(item, index) in menuLowerGenres"
    :key="index"
    @click="handleClick(index)"
    class="hover:bg-slate-200 py-1.5 px-6 flex cursor-pointer"
  >
    <img :src="item.url" :alt="item.alt" class="w-5 h-5 mr-2" />
    {{ item.text }}
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  data() {
    return {
      id: "",
      name: "",
      description: "",
      images: "",

      menuLowerGenres: [],
    };
  },

  mounted() {
    try {
      // const { data, status } = await authService.login(request);
    } catch (err) {
      console.log(err);
    }
  },

  methods: {
    handleClick(index: number) {
      switch (index) {
        case 0:
          this.$router.push({ name: "fiction_literary" });
          break;
        case 1:
          this.$router.push({ name: "romance" });
          break;
        case 2:
          this.$router.push({ name: "science_and_technology" });
          break;
        case 3:
          this.$router.push({ name: "history" });
          break;
        case 4:
          this.$router.push({ name: "biography_and_memoir" });
          break;
        case 5:
          this.$router.push({ name: "mystery_and_thriller" });
          break;
        case 6:
          this.$router.push({ name: "self_improvement" });
          break;
        case 7:
          this.$router.push({ name: "ya_fiction" });
          break;
        case 8:
          this.$router.push({ name: "fantasy" });
          break;
        case 9:
          this.$router.push({ name: "social_science" });
          break;
        case 10:
          this.$router.push({ name: "science_fiction" });
          break;
        case 11:
          this.$router.push({ name: "child" });
          break;
        default:
          break;
      }
    },
  },
});
</script>