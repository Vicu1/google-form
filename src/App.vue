<script>
import MainHeader from "@/components/mainHeader.vue";
export default {
  name: "App",
  components: {
    MainHeader,
  },
  data: () => ({
    //
  }),
};
</script>
<template>
  <v-app>
    <main-header />
    <router-view />
  </v-app>
</template>
