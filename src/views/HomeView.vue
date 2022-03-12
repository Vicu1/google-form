<script>
export default {
  name: "HomeView",

  components: {},

  data: () => ({
    forms: [
      {
        id: 1,
        src: "https://ssl.gstatic.com/docs/templates/thumbnails/forms-blank-googlecolors.png",
        title: "Empty file",
        router: "/new-Form",
      },
      {
        id: 2,
        src: "https://ssl.gstatic.com/docs/templates/thumbnails/1QzC_-eB2ayf1ft8q2vaSuZbwXDzYWYa-7TDbkf3BkDY_400.png",
        title: "Contact Information",
        router: "",
      },
      {
        id: 3,
        src: "https://ssl.gstatic.com/docs/templates/thumbnails/1aj2haytgz4ejLl4durXSMcTQXQyTGzBKzXixNGt18Es_400.png",
        title: "Reply to an invitation",
        router: "",
      },
      {
        id: 4,
        src: "https://ssl.gstatic.com/docs/templates/thumbnails/1QtmHiPAWOrYnB26xMlq-_18STLKt1TJw7GfYJS8u8t0_400.png",
        title: "Party invitation",
        router: "",
      },
      {
        id: 5,
        src: "https://ssl.gstatic.com/docs/templates/thumbnails/1UwjWiGMGOL57kWdw70oXSkSiiZLOivXftdpfYYOEMpY_400.png",
        title: "T-shirt order",
        router: "",
      },
      {
        id: 6,
        src: "https://ssl.gstatic.com/docs/templates/thumbnails/1w9je3CEhcvjnfHYdz379eHNffGv4BmQxM9TYZh0ocvQ_400.png",
        title: "Registration for the event\n",
        router: "",
      },
    ],
    savedForms: [],
  }),

  mounted() {
    this.loadData();
  },

  methods: {
    loadData() {
      const form = localStorage.getItem("form");

      if (form) {
        this.savedForms = JSON.parse(form);
      }
    },
  },
};
</script>

<template>
  <div class="home">
    <v-container>
      <div class="text-h4 ml-16 mb-5">Create Form</div>
      <div class="d-flex justify-space-around">
        <div v-for="item of forms" :key="item.id">
          <router-link :to="item.router" class="text-decoration-none mr-10">
            <v-img
              height="150"
              width="170"
              class="justify-center mx-auto"
              :src="item.src"
            />
            <div
              class="text-h6 text-xl-center black--text mt-4 text-decoration-none"
            >
              {{ item.title }}
            </div>
          </router-link>
        </div>
      </div>
    </v-container>
    <div class="savedForms">
      <v-container>
        <div class="text-h4 ml-16 mb-5 mt-5">Saved Forms</div>
        <div v-if="savedForms.length">
          <v-row>
            <v-col cols="2" v-for="(item, index) in savedForms" :key="index">
              <router-link
                class="text-decoration-none"
                :to="`/form/${item.id}`"
              >
                <v-card>
                  <v-img
                    class="justify-center mx-auto"
                    src="https://ssl.gstatic.com/docs/templates/thumbnails/1QzC_-eB2ayf1ft8q2vaSuZbwXDzYWYa-7TDbkf3BkDY_400.png"
                  >
                  </v-img>
                  <div class="d-flex">
                    <v-card-title v-text="item.name"></v-card-title>
                    <v-spacer></v-spacer>
                    <v-card-actions>
                      <v-icon class="ml-4">mdi-dots-vertical</v-icon>
                    </v-card-actions>
                  </div>
                </v-card>
              </router-link>
            </v-col>
          </v-row>
        </div>
      </v-container>
    </div>
  </div>
</template>
