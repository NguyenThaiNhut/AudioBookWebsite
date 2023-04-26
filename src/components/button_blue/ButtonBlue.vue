<template>
    <input type="submit" :value="value" class="bg-blue-400 text-white py-2 px-6 rounded-full mt-4 hover:bg-blue-500">
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    value: String,
  },
});
</script>