<template>
  <div class="my-2">
    <div class="text-left ml-1 text-lg">
      <label for="sign-up-email">{{ name }}</label>
    </div>
    <div>
      <input
        class="border-slate-200 w-full border outline-0 rounded-md bg-gray-50 focus:border-blue-400 p-3"
        id="sign-up-email"
        type="search"
        :placeholder="placeholder"
        required
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    name: String,
    placeholder: String,
  },
});
</script>