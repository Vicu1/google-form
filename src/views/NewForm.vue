<script>
import CustomOption from "@/components/CustomOption";

export default {
  name: "NewForm",

  components: { CustomOption },

  data: () => ({
    close: false,
    selectedCard: 0,
    model: {
      name: "",
      questions: [
        {
          id: 0,
          form: [{ formId: 0, value: "Option 1" }],
          input: "Question",
          selectedOption: 1,
          focused: false,
        },
      ],
    },
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
    name: "",
  }),

  methods: {
    focus(name) {
      this.selectedCard = name;
    },
    deleteItem(index) {
      this.model.questions.splice(index, 1);
      if (index === this.model.questions.length - 1) {
        this.selectedCard = this.model.questions.length - 1;
      } else if (!index) {
        this.selectedCard = 0;
      } else {
        this.selectedCard = index - 1;
      }
    },
    addItem() {
      this.model.questions.push({
        id: new Date().getTime(),
        form: [
          {
            formId: new Date().getTime(),
            value: `Option 1`,
          },
        ],
        input: "Question",
        selectedOption: 1,
        focused: false,
      });
      this.selectedCard = this.model.questions.length - 1;
    },
    copyItem(item) {
      this.model.questions.push({
        id: new Date().getTime(),
        form: JSON.parse(JSON.stringify(item.form)),
        input: item.input,
        selectedOption: item.selectedOption,
        focused: false,
      });
      this.selectedCard = this.model.questions.length - 1;
    },
    focusItem() {
      this.model.questions.forEach((item, index) => {
        item.focused = index !== this.selectedCard;
      });
    },
    addOption(item) {
      item.form.push({
        formId: new Date().getTime(),
        value: `Option ${item.form.length + 1}`,
      });
    },
    deleteOption(item, index) {
      item.form.splice(index, 1);
    },
    checkboxOptions(item) {
      const listElements = [3, 4, 5];

      return listElements.includes(item.selectedOption);
    },
    submit() {
      let items = [];

      if (localStorage.getItem("form")) {
        items = JSON.parse(localStorage.getItem("form"));
      }

      items.push({
        ...this.model,
        id: items.length + 1,
      });

      localStorage.setItem("form", JSON.stringify(items));

      this.$router.push("/");
    },
  },
};
</script>
<template>
  <div class="body">
    <v-container>
      <div class="form" @click="focusItem()">
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
            v-model="model.name"
            required
          ></v-text-field>
          <v-text-field
            color="purple darken-2"
            placeholder="description"
            dense
            required
          ></v-text-field>
        </v-card>
        <div v-for="(item, index) of model.questions" :key="item.id">
          <v-card
            :class="{ 'border-left': selectedCard === index }"
            class="mb-5 question mx-auto pa-5"
            max-width="700"
            outlined
            @mousedown="focus(index)"
            v-ripple="false"
          >
            <v-card-text v-if="item.focused && checkboxOptions(item)">
              <div class="text-h4">{{ item.input }}</div>
              <div v-for="(forms, formsIndex) of item.form" :key="forms.formId">
                <div class="d-flex justify-space-between align-center">
                  <v-icon v-if="item.selectedOption === 3" class="icon"
                    >mdi-radiobox-blank
                  </v-icon>
                  <v-icon v-if="item.selectedOption === 4" class="icon"
                    >mdi-crop-square
                  </v-icon>
                  <div v-if="item.selectedOption === 5" class="icon">
                    {{ formsIndex + 1 }}.
                  </div>
                  <v-text-field
                    color="purple darken-2"
                    required
                    v-model="forms.value"
                    class="ml-7 input-option"
                    readonly
                  >
                  </v-text-field>
                </div>
              </div>
            </v-card-text>
            <v-card-text v-else-if="item.focused">
              <div class="text-h4">{{ item.input }}</div>
              <custom-option></custom-option>
            </v-card-text>

            <v-card-text v-else>
              <div class="d-flex justify-space-between">
                <v-text-field
                  placeholder="Question"
                  v-model="item.input"
                  class="mr-5"
                  filled
                  required
                ></v-text-field>
                <v-select
                  v-model="item.selectedOption"
                  :items="selectOptions"
                  @click="checkboxOptions(item)"
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
              <div v-if="checkboxOptions(item)">
                <div
                  v-for="(forms, formsIndex) of item.form"
                  :key="forms.formId"
                >
                  <v-hover v-slot="{ hover }">
                    <div class="d-flex justify-space-between align-center">
                      <v-icon v-if="item.selectedOption === 3" class="icon"
                        >mdi-radiobox-blank
                      </v-icon>
                      <v-icon v-if="item.selectedOption === 4" class="icon"
                        >mdi-crop-square
                      </v-icon>
                      <div v-if="item.selectedOption === 5" class="icon">
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
              <custom-option :option="item.selectedOption"></custom-option>
              <div class="icons d-flex align-center justify-lg-end mt-5">
                <v-btn @click="copyItem(item)" icon fab>
                  <v-icon> mdi-content-copy </v-icon>
                </v-btn>

                <v-btn @click="deleteItem(index)" icon fab>
                  <v-icon class="mx-5"> mdi-delete-empty </v-icon>
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
        <v-btn class="btn" @click="addItem()">
          <v-icon> mdi-plus-circle </v-icon>
        </v-btn>
        <div class="mt-5 text-center">
          <v-btn @click="submit()" color="primary"> Save Form </v-btn>
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
  position: relative;
}
.form {
  position: relative;
}
.btn {
  position: fixed;
  top: 70px;
  right: 28%;
}

.icons {
  padding-top: 15px;
  border-top: 1px solid #e1e2e5;
}
.icon {
  position: absolute;
}
</style>
