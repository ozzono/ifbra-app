<template>
  <v-menu
    ref="menu"
    v-model="menu"
    :close-on-content-click="false"
    :nudge-right="40"
    transition="scale-transition"
  >
    <template v-slot:activator="{ on }">
      <v-text-field
        v-model="dateFormatted"
        :label="innerLabel"
        append-icon="mdi-calendar"
        @blur="date = parseDate(dateFormatted)"
        v-on="on"
      ></v-text-field>
    </template>
    <v-date-picker
      v-model="date"
      no-title
      @input="menu = false"
      locale="pt-BR"
      scrollable
      show-current
    ></v-date-picker>
  </v-menu>
</template>

<script>
export default {
  data: vm => ({
    date: new Date(70).toISOString().substr(0, 10),
    dateFormatted: vm.formatDate(new Date(70).toISOString().substr(0, 10)),
    menu: false
  }),
  computed: {
    computedDateFormatted() {
      return this.formatDate(this.date);
    }
  },
  props: ["innerLabel"],
  watch: {
    date() {
      this.dateFormatted = this.formatDate(this.date);
      this.$emit("date-change", this.date);
    }
  },

  methods: {
    formatDate(date) {
      if (!date) return null;
      return date
        .split("-")
        .reverse()
        .join("/");
    },
    parseDate(date) {
      if (!date) return null;
      const [day, month, year] = date.split("/");
      this.$emit(
        "date",
        `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`
      );
      return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
    }
  }
};
</script>
