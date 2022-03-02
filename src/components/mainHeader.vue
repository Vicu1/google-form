<script>
export default {
  name: "mainHeader",
};
</script>
<template>
  <div>
    <v-app-bar color="deep-purple accent-4" dark>
      <v-row class="justify-space-between align-center">
        <div class="d-flex align-center">
          <v-app-bar-nav-icon></v-app-bar-nav-icon>
          <router-link class="white--text text-h4 text-decoration-none" to="/"
            >Forms</router-link
          >
        </div>

        <div class="mt-7">
          <v-text-field
            class="input"
            placeholder="Search"
            dense
            outlined
          ></v-text-field>
        </div>
        <div>
          <v-btn icon>
            <v-icon>mdi-apps</v-icon>
          </v-btn>

          <v-avatar color="primary" size="40">V</v-avatar>
        </div>
      </v-row>
    </v-app-bar>
  </div>
</template>
<style scoped>
.input {
  width: 500px;
}
</style>
