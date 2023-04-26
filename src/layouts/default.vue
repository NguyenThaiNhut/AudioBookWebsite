<template>
  <HeaderLayout />
  <RouterView />
  <FooterLayout />
</template>

<script setup lang="ts">
import { RouterView } from "vue-router";
import HeaderLayout from "../components/HeaderLayout.vue";
import FooterLayout from "../components/FooterLayout.vue";
</script>
