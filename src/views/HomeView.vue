<script>
export default {
  name: "HomeView",
  components: {},
};
</script>

<template>
  <div class="home">
    <v-container>
      <span class="text-h4">New forms</span>
      <div class="d-flex">
        <router-link to="/new-Form" class="mr-10">
          <v-img
            height="100"
            width="100"
            class="justify-center"
            src="../assets/plus.png"
          />
          <div class="text-h6" color="black">Empty file</div>
        </router-link>
        <router-link to="/NewForm">
          <v-img
            height="100"
            width="100"
            class="justify-center"
            src="../assets/plus.png"
          />
          <div class="text-h6" color="black">Contact form</div>
        </router-link>
      </div>
    </v-container>
  </div>
</template>
