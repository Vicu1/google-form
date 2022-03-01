<script>
export default {
  name: "NewForm",

  data: () => ({
    question: true,
    selectedCard: null,
  }),

  methods: {
    focus(name) {
      this.selectedCard = name;
    },
  },
};
</script>
<template>
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

    <v-card
      :ripple="false"
      @focus="focus('second')"
      :class="{ 'border-left': selectedCard === 'second' }"
      class="question mx-auto pa-5"
      max-width="700"
      outlined
      @click="question = false"
    >
      <v-card-text v-if="question">
        <div class="text-h4">Question</div>
        <v-text-field
          color="purple darken-2"
          value="variant 1"
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

        <v-text-field
          color="purple darken-2"
          value="variant 1"
          required
        ></v-text-field>
        <v-btn> Add variant </v-btn>
      </v-card-text>
    </v-card>
  </v-container>
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
.question::v-deep {
}
</style>
