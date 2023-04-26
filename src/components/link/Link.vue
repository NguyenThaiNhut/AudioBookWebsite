<template>
  <a :href="url" class="hover:text-blue-500 underline underline-offset-2">
    {{ name }}
  </a>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    name: String,
    url: String,
  },
});
</script>