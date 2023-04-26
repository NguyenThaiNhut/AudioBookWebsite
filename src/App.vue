<template>
  <HeaderLayout />
  <RouterView />
  <FooterLayout />
</template>


<script setup lang="ts">
import { RouterView } from "vue-router";
import HeaderLayout from "../src/components/HeaderLayout.vue";
import FooterLayout from "../src/components/FooterLayout.vue";

</script>

