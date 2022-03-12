<script>
export default {
  name: "CustomOption",

  props: {
    option: {
      required: true,
      type: Number,
      default: 1,
    },
  },

  data: () => ({
    attrs: {
      color: "darken-2",
      required: true,
      class: "input-option",
      disabled: true,
    },
  }),
};
</script>

<template>
  <div>
    <div v-if="option === 1">
      <v-text-field v-bind="attrs" label="Short answer"> </v-text-field>
    </div>
    <div v-if="option === 2">
      <v-text-field label="Detailed answer" v-bind="attrs"> </v-text-field>
    </div>
    <div v-if="option === 6">
      <v-text-field
        label="Day, month, year"
        v-bind="attrs"
        append-icon="mdi-calendar-range"
      >
      </v-text-field>
    </div>
    <div v-if="option === 7">
      <v-text-field
        label="Time"
        class="input-date"
        append-icon="mdi-clock-time-five-outline"
        v-bind="attrs"
      >
      </v-text-field>
    </div>
  </div>
</template>

<style scoped>
.input-date {
  max-width: 180px;
}

.input-option {
  max-width: 500px;
}
</style>
