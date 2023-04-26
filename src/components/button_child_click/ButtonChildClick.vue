<template>
  <div
    class="bg-blue-400 text-white py-2 px-6 rounded-full mb-3 mt-5 hover:bg-blue-500 cursor-pointer"
  >
    {{ text }}
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    text: String,
  },
});
</script>