<template>
    <input type="submit" :value="value" class="bg-teal-400 text-white py-2 px-6 rounded-full mt-4 hover:bg-teal-500">
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    value: String,
  },
});
</script>