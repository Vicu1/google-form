<script>
export default {
  name: "FormItem",

  data: () => ({
    formItem: [],
    menus: [],
    menusDate: [],
    activePicker: null,
    checkbox: [],
  }),

  mounted() {
    this.loadData();

    // let site = window.open("http://localhost:8080/form/5");
    // site.postMessage("asd", "http://localhost:8080/form/5");
    //
    // function receiveMessage(event) {
    //   if (
    //     event.origin !==
    //     "https://developer.mozilla.org/ru/docs/Web/API/Window/postMessage"
    //   )
    //     return;
    // }
    // window.addEventListener("message", receiveMessage);
  },

  methods: {
    loadData() {
      const form = localStorage.getItem("form");
      const id = this.$route.params["id"];
      JSON.parse(form).forEach((item) => {
        if (item.id === Number(id)) {
          this.formItem.push(item);
        }
      });
    },
    clearForm(item) {
      item.questions = item.questions.map((question) => ({
        ...question,
        value: "",
      }));
      this.checkbox = [];
    },
    saveMinutes(value, item, index) {
      item.value = value;
      this.menus[index] = false;
    },
    saveDate(item) {
      const [menu] = this.$refs.menu;
      menu.save(item.value);
    },
    isChecked(item) {
      return item.form.some((form) => form.checkbox === true);
    },
    cancelAnswer(item) {
      item.form = item.form.map((form) => ({ ...form, checkbox: false }));
    },
    speak(text) {
      const message = new SpeechSynthesisUtterance();
      message.lang = "ru-RU";
      message.text = text;
      window.speechSynthesis.speak(message);
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
        <div v-for="(question, index) of item.questions" :key="question.id">
          <v-card class="mb-5 mx-auto pa-5" max-width="700" outlined>
            <div class="text-h6">{{ question.title }}</div>
            <div v-if="question.selectedOption === 1">
              <v-text-field
                label="Short answer"
                v-model="question.value"
                @change="speak($event)"
              ></v-text-field>
            </div>
            <div v-if="question.selectedOption === 2">
              <v-text-field label="Detailed answer" v-model="question.value">
              </v-text-field>
            </div>

            <div v-if="question.selectedOption === 3">
              <v-radio-group v-model="question.value">
                <v-radio
                  v-for="form of question.form"
                  :key="form.formId"
                  :label="form.value"
                  :value="form"
                >
                </v-radio>
              </v-radio-group>
              <div class="text-right" v-if="isChecked(question)">
                <v-btn dense color="info" @click="cancelAnswer(question)">
                  Clear Answer
                </v-btn>
              </div>
            </div>

            <div v-if="question.selectedOption === 4">
              <v-checkbox
                v-for="(form, index) of question.form"
                :key="form.formId"
                :label="form.value"
                v-model="checkbox[index]"
              ></v-checkbox>
            </div>
            <div v-if="question.selectedOption === 5">
              <v-select
                :items="question.form"
                label="Select"
                dense
                item-value="value"
                item-text="value"
                outlined
                v-model="question.value"
              ></v-select>
            </div>
            <div v-if="question.selectedOption === 6">
              <v-menu
                ref="menu"
                v-model="menusDate[index]"
                :close-on-content-click="false"
                transition="scale-transition"
                offset-y
                min-width="auto"
              >
                <template #activator="{ on, attrs }">
                  <v-text-field
                    v-model="question.value"
                    label="Pick the Date"
                    prepend-icon="mdi-calendar"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="question.value"
                  :active-picker.sync="activePicker"
                  :max="
                    new Date(
                      Date.now() - new Date().getTimezoneOffset() * 60000
                    )
                      .toISOString()
                      .substr(0, 10)
                  "
                  min="1950-01-01"
                  @change="saveDate"
                ></v-date-picker>
              </v-menu>
            </div>
            <div v-if="question.selectedOption === 7">
              {{ menus }}
              <v-menu
                ref="menu"
                v-model="menus[index]"
                transition="scale-transition"
                offset-y
                max-width="290px"
                min-width="290px"
                :close-on-content-click="false"
                :nudge-right="40"
                :return-value.sync="question.value"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="question.value"
                    label="Pick the time"
                    prepend-icon="mdi-clock-time-four-outline"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-time-picker
                  v-if="menus[index]"
                  :value="question.value"
                  full-width
                  @change="saveMinutes($event, question, index)"
                ></v-time-picker>
              </v-menu>
            </div>
          </v-card>
        </div>
        <div class="d-flex buttons">
          <v-btn color="primary">Submit</v-btn>
          <v-spacer></v-spacer>
          <v-btn color="info" @click="clearForm(item)">Clear ALL</v-btn>
        </div>
      </div>
    </v-container>
  </div>
</template>

<style scoped>
.main-card::v-deep {
  border-top: 10px solid blueviolet !important;
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
