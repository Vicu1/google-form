<script>
export default {
  name: "NewForm",

  data: () => ({
    question: true,
    selectedCard: null,
    close: false,
    questions: [
      {
        id: 0,
        form: [{ formId: 0, value: "Option 1" }],
      },
    ],
    selectedOption: 1,
    selectOptions: [
      { value: 1, text: " Text (string)", icon: "mdi-text-short" },
      { value: 2, text: " Text (paragraph)", icon: "mdi-text-long" },
      {
        value: 3,
        text: "One of the list",
        icon: "mdi-radiobox-marked",
      },
      {
        value: 4,
        text: "A few from the list",
        icon: "mdi-checkbox-marked",
      },
      {
        value: 5,
        text: "Drop-down list",
        icon: "mdi-arrow-down-drop-circle",
      },
      { value: 6, text: "Date", icon: "mdi-calendar-range" },
      { value: 7, text: "Time", icon: "mdi-clock-time-five-outline" },
    ],
  }),
  computed: {
    isList() {
      const listElements = [3, 4, 5];

      return listElements.includes(this.selectedOption);
    },
  },
  methods: {
    focus(name) {
      this.selectedCard = name;
    },
    deleteItem(id) {
      this.questions.splice(id, 1);
    },
    addItem() {
      this.questions.push({
        id: Math.random() * 100000,
        form: [
          {
            formId: Math.random() * 100000,
            value: `Option 1`,
          },
        ],
      });
    },
    copyItem(item) {
      this.questions.push({
        id: Math.random() * 100000,
        form: JSON.parse(JSON.stringify(item.form)),
      });
    },
    addOption(item) {
      item.form.push({
        formId: Math.random() * 100000,
        value: `Option ${item.form.length + 1}`,
      });
    },
    deleteOption(item, index) {
      item.form.splice(index, 1);
    },
  },
};
</script>
<template>
  <div class="body">
    <v-container>
      <div class="form">
        <v-card
          class="mx-auto pa-5 mb-5 main-card"
          active-class="border-left"
          max-width="700"
          outlined
        >
          <v-text-field
            class="text-h5"
            color="purple darken-2"
            placeholder="Form name"
            value="New Form"
            required
          ></v-text-field>
          <v-text-field
            color="purple darken-2"
            placeholder="description"
            dense
            required
          ></v-text-field>
        </v-card>
        <div v-for="(item, index) of questions" :key="item.id">
          <v-card
            :ripple="false"
            @focus="focus('second')"
            :class="{ 'border-left': selectedCard === 'second' }"
            class="mb-5 question mx-auto pa-5"
            max-width="700"
            outlined
            @click="question = false"
          >
            <v-card-text v-if="question">
              <div class="text-h4">Question</div>
              <v-text-field
                color="purple darken-2"
                value="Option 1"
                required
              ></v-text-field>
            </v-card-text>
            <v-card-text v-else>
              <div class="d-flex justify-space-between">
                <v-text-field
                  placeholder="Question"
                  class="mr-5"
                  filled
                  required
                ></v-text-field>
                <v-select
                  v-model="selectedOption"
                  :items="selectOptions"
                  label="Select Operation"
                  :menu-props="{ bottom: true, offsetY: true }"
                  outlined
                >
                  <template #item="{ item }">
                    <div>
                      <v-icon> {{ item.icon }} </v-icon>
                      <span>
                        {{ item.text }}
                      </span>
                    </div>
                  </template>
                </v-select>
              </div>
              <div v-if="isList">
                <div
                  v-for="(forms, formsIndex) of item.form"
                  :key="forms.formId"
                >
                  <v-hover v-slot="{ hover }">
                    <div class="d-flex justify-space-between align-center">
                      <v-icon v-if="selectedOption === 3" class="icon"
                        >mdi-radiobox-blank
                      </v-icon>
                      <v-icon v-if="selectedOption === 4" class="icon"
                        >mdi-crop-square
                      </v-icon>
                      <div v-if="selectedOption === 5" class="icon">
                        {{ formsIndex + 1 }}.
                      </div>
                      <v-text-field
                        color="purple darken-2"
                        required
                        v-model="forms.value"
                        class="ml-7 input-option"
                      >
                      </v-text-field>
                      <v-icon v-if="hover"> mdi-image-outline </v-icon>
                      <v-btn
                        v-if="item.form.length > 1"
                        @click="deleteOption(item, formsIndex)"
                        icon
                        fab
                      >
                        <v-icon class="mx-5"> mdi-close </v-icon>
                      </v-btn>
                    </div>
                  </v-hover>
                </div>
                <div class="button">
                  <v-btn @click="addOption(item)" color="info">
                    Add option
                  </v-btn>
                </div>
              </div>
              <div v-if="selectedOption === 1">
                <v-text-field
                  color=" darken-2"
                  required
                  label="Short answer"
                  class="input-option"
                >
                </v-text-field>
              </div>
              <div v-if="selectedOption === 2">
                <v-text-field
                  color="darken-2"
                  required
                  label="Detailed answer"
                  class="input-option"
                >
                </v-text-field>
              </div>
              <div v-if="selectedOption === 6">
                <v-text-field
                  color="darken-2"
                  required
                  label="Day, month, year"
                  class="input-date"
                  disabled
                  append-icon="mdi-calendar-range"
                >
                </v-text-field>
              </div>
              <div v-if="selectedOption === 7">
                <v-text-field
                  color="darken-2"
                  required
                  label="Time"
                  class="input-date"
                  append-icon="mdi-clock-time-five-outline"
                  disabled
                >
                </v-text-field>
              </div>
              <div class="icons d-flex align-center justify-lg-end mt-5">
                <v-btn icon fab>
                  <v-icon @click="copyItem(item)"> mdi-content-copy </v-icon>
                </v-btn>

                <v-btn icon fab>
                  <v-icon @click="deleteItem(index)" class="mx-5">
                    mdi-delete-empty
                  </v-icon>
                </v-btn>
                <v-switch
                  label="Required question"
                  color="indigo"
                  class="mt-0"
                  hide-details
                ></v-switch>
                <v-icon class="ml-4">mdi-dots-vertical</v-icon>
              </div>
            </v-card-text>
          </v-card>
        </div>
      </div>
    </v-container>
  </div>
</template>

<style scoped lang="scss">
.main-card::v-deep {
  border-top: 10px solid blueviolet !important;
  background-color: red;
  border-radius: 5px !important;
}
.border-left {
  border-left: 6px solid #739cde !important;
}
.body {
  height: 100%;
  background-color: rgb(240, 235, 248);
}
.input-option {
  max-width: 500px;
}
.icons {
  padding-top: 15px;
  border-top: 1px solid #e1e2e5;
}
.icon {
  position: absolute;
}
.input-date {
  max-width: 180px;
}
</style>
