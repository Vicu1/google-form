<script>
export default {
  name: "FormItem",
  data() {
    return {
      id: this.$route.params["id"],
      formItem: [],
      time: null,
      menu2: false,
      date: null,
      menu: false,
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
    checkboxOptions(item) {
      return [3, 4, 5].includes(item.selectedOption);
    },
    clearForm(item) {
      item.questions.forEach((question) => {
        question.longText = "";
        question.shortText = "";
        question.date = "";
        question.time = "";
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
        <div v-for="question of item.questions" :key="question.id">
          <v-card class="mb-5 mx-auto pa-5" max-width="700" outlined>
            <div class="text-h6">{{ question.title }}</div>
            <div v-if="question.selectedOption === 1">
              <v-text-field
                label="Short answer"
                v-model="question.shortText"
              ></v-text-field>
            </div>
            <div v-if="question.selectedOption === 2">
              <v-text-field label="Detailed answer" v-model="question.longText">
              </v-text-field>
            </div>

            <div v-if="question.selectedOption === 3">
              <v-radio-group>
                <v-radio
                  v-for="form of question.form"
                  :key="form.formId"
                  :label="form.value"
                  :value="form"
                  @click="form.checkbox = true"
                >
                </v-radio>
              </v-radio-group>
            </div>

            <div v-if="question.selectedOption === 4">
              <v-checkbox
                v-for="form of question.form"
                :key="form.formId"
                :label="form.value"
                v-model="form.checkbox"
              ></v-checkbox>
            </div>
            <div v-if="question.selectedOption === 5">
              <v-select
                :items="question.form"
                label="Select"
                dense
                outlined
              ></v-select>
            </div>

            <div v-if="question.selectedOption === 6">
              <v-menu
                ref="menu"
                v-model="menu"
                :close-on-content-click="false"
                :return-value.sync="date"
                transition="scale-transition"
                offset-y
                min-width="auto"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="date"
                    label="Pick Date"
                    prepend-icon="mdi-calendar"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker v-model="date" no-title scrollable>
                  <v-spacer></v-spacer>
                  <v-btn text color="primary" @click="menu = false">
                    Cancel
                  </v-btn>
                  <v-btn text color="primary" @click="$refs.menu.save(date)">
                    OK
                  </v-btn>
                </v-date-picker>
              </v-menu>
            </div>
            <div v-if="question.selectedOption === 7">
              <v-menu
                ref="menu"
                v-model="menu2"
                :close-on-content-click="false"
                :nudge-right="40"
                :return-value.sync="time"
                transition="scale-transition"
                offset-y
                max-width="290px"
                min-width="290px"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="time"
                    label="Pick Time"
                    prepend-icon="mdi-clock-time-four-outline"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-time-picker
                  v-if="menu2"
                  v-model="time"
                  full-width
                  @click:minute="$refs.menu.save(time)"
                ></v-time-picker>
              </v-menu>
            </div>
          </v-card>
        </div>
        <div class="d-flex buttons">
          <v-btn color="primary">Submit</v-btn>
          <v-spacer></v-spacer>
          <v-btn @click="clearForm(item)" color="info">Clear ALL</v-btn>
        </div>
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
.buttons {
  max-width: 700px;
  margin: 0 auto;
}
.v-input--selection-controls {
  margin-top: 0;
}
</style>
