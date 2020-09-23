<template>
  <v-menu
    ref="menu"
    v-model="menu"
    :close-on-content-click="false"
    transition="scale-transition"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-text-field
        v-model="dateFormatted"
        :label="innerLabel"
        append-icon="mdi-calendar"
        readonly
        v-bind="attrs"
        v-on="on"
      ></v-text-field>
    </template>
    <v-date-picker
      locale="pt-BR"
      ref="picker"
      v-model="date"
      @change="save"
    ></v-date-picker>
  </v-menu>
</template>

<script>
export default {
  name: "DatePicker",
  data: vm => ({
    date: new Date().toISOString().substr(0, 10),
    dateFormatted: vm.formatDate(new Date().toISOString().substr(0, 10)),
    menu: false
  }),
  watch: {
    menu(val) {
      val && setTimeout(() => (this.$refs.picker.activePicker = "YEAR"));
    },
    date() {
      this.dateFormatted = this.formatDate(this.date);
      // this.$emit("date-change", this.date);
    }
  },
  methods: {
    save(date) {
      this.$refs.menu.save(date);
      this.$emit("date-change", date);
    },
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
      return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
    }
  },
  props: {
    innerLabel: String
  }
};
</script>
