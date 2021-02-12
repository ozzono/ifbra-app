<template>
  <div class="text-center">
    <v-text-field
      v-model="date"
      class="date-field"
      @click:append="dialog = true"
      :readonly="readonly"
      @click="dialog = true"
      :label="label"
      append-icon="mdi-calendar"
      return-masked-value
      v-mask="'##/##/####'"
    />
    <v-dialog v-model="dialog" width="20em">
      <v-card>
        <v-card-title>{{ label }}</v-card-title>
        <v-card-text>
          <v-row justify="center">
            <v-date-picker
              @change="showDate"
              v-model="picker"
              locale="pt-br"
              :max="setMaxDate()"
            />
          </v-row>
        </v-card-text>

        <v-divider />

        <v-card-actions class="text-center">
          <v-spacer />
          <v-btn color="primary" text @click="dialog = false">
            Fechar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  data: () => ({
    date: "",
    dialog: false,
    focused: false,
    picker: new Date().toISOString().substr(0, 10)
  }),
  props: ["label", "setMax", "maxDate", "defaultDate", "readonly"],
  methods: {
    showDate() {
      this.date = this.picker
        .split("-")
        .reverse()
        .join("/");
    },
    setMaxDate() {
      if (this.setMax) {
        if (this.maxDate != undefined) {
          return this.maxDate;
        } else {
          return new Date().toISOString().substr(0, 10);
        }
      }
    }
  },
  watch: {
    date: function() {
      this.$emit("inner-date", this.date);
    }
  },
  created() {
    if (this.defaultDate == undefined) {
      return;
    }
    if (this.defaultDate.length > 0) {
      this.picker = this.defaultDate;
    }
  }
};
</script>
