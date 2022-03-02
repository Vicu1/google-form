<script>
import { mdiDelete, mdiImageOutline, mdiContentCopy, mdiClose } from "@mdi/js";
export default {
  name: "NewForm",

  data: () => ({
    question: true,
    selectedCard: null,
    close: false,
    questions: [{ id: 0, form: [0] }],
    icons: {
      mdiDelete,
      mdiImageOutline,
      mdiContentCopy,
      mdiClose,
    },
  }),
  methods: {
    focus(name) {
      this.selectedCard = name;
    },
    deleteItem(id) {
      this.questions.splice(id, 1);
    },
    copyItem() {
      this.questions.push({ id: this.questions.length, form: [0] });
    },
    addOption() {
      this.questions.forEach((item) => {
        item.form.push(item.form.length);
        if (item.form.length > 1) {
          this.close = true;
        }
      });
    },
    deleteOption(index) {
      this.questions.forEach((item) => {
        item.form.splice(index, 1);
        if (item.form.length === 1) {
          this.close = false;
        }
      });
    },
  },
};
</script>
<template>
  <div class="body">
    <v-container>
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
      <div v-for="(item, index) of questions" :key="index">
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
              <v-select label="Outlined style" outlined></v-select>
            </div>
            <div v-for="(forms, formsIndex) of item.form" :key="formsIndex">
              <v-hover v-slot="{ hover }">
                <div class="d-flex justify-space-between align-center">
                  <v-text-field
                    color="purple darken-2"
                    required
                    :value="'Option ' + (formsIndex + 1)"
                    class="input-option"
                  >
                  </v-text-field>
                  <v-icon v-if="hover">
                    {{ icons.mdiImageOutline }}
                  </v-icon>
                  <v-btn
                    v-if="close"
                    @click="deleteOption(formsIndex)"
                    icon
                    fab
                  >
                    <v-icon class="mx-5">
                      {{ icons.mdiClose }}
                    </v-icon>
                  </v-btn>
                </div>
              </v-hover>
            </div>
            <div class="button">
              <v-btn @click="addOption()" color="info"> Add option </v-btn>
            </div>
            <div class="d-flex align-center justify-lg-end mt-5">
              <v-btn icon fab>
                <v-icon @click="copyItem()">
                  {{ icons.mdiContentCopy }}
                </v-icon>
              </v-btn>

              <v-btn icon fab>
                <v-icon @click="deleteItem(index)" class="mx-5">
                  {{ icons.mdiDelete }}
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
.button {
  padding-bottom: 15px;
  border-bottom: 1px solid #e1e2e5;
}
</style>
