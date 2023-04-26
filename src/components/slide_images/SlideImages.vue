<template>
    <a :href="url_a" class="flex-shrink-0">
        <img :src="url_img" :alt="alt"> 
    </a>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    url_a: String,
    url_img: String,
    alt: String,
  },
});
</script>