<script>
export default {
  name: "FormItem",
  data() {
    return {
      id: this.$route.params["id"],
      formItem: [],
    };
  },
  mounted() {
    this.loadData();
    console.log(this.formItem);
  },
  methods: {
    loadData() {
      const form = localStorage.getItem("form");
      JSON.parse(form).forEach((item) => {
        if (item.id === Number(this.id)) {
          this.formItem.push(item);
        }
      });
    },
  },
};
</script>

<template>
  <div class="body">
    <v-container>
      <div v-for="(item, index) of formItem" :key="index">
        <v-card
          class="mx-auto pa-5 mb-5 main-card"
          active-class="border-left"
          max-width="700"
          outlined
        >
          <div class="text-h5">{{ item.name }}</div>
          <div>{{ item.description }}</div>
        </v-card>
      </div>
    </v-container>
  </div>
</template>

<style scoped>
.main-card::v-deep {
  border-top: 10px solid blueviolet !important;
  background-color: red;
  border-radius: 5px !important;
}
</style>
