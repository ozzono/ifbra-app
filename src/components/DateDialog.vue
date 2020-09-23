<template>
  <div>
    <v-row class="hover-pointer" @click="dialogShow(true)">
      <!-- <v-card tile flat :class=" `d-flex flex-row justify-space-between  ${ !theme.dark ? theme.color : 'default-grey' }` " @click="dialogShow(true)" > -->
      <v-col class="d-flex justify-center">
        <v-text-field
          class="hover-pointer"
          readonly
          @focus="dialogShow(true)"
          v-model="textDate"
          :label="label"
        />
      </v-col>
      <v-col class="d-flex justify-center" cols="3">
        <v-btn
          height="4rem"
          text
          tile
          block
          depressed
          dark
          :class="`${theme.dark ? '' : 'black--text'}`"
        >
          <v-icon>mdi-calendar</v-icon>
        </v-btn>
      </v-col>
      <!-- </v-card> -->
    </v-row>

    <v-dialog v-model="dialog" width="20rem" @keyup.esc="log(false)">
      <v-card class="text-center" flat tile>
        <v-btn tile text block @click="dialogShow(false)">
          Fechar
        </v-btn>
        <v-card flat tile>
          <v-date-picker
            ref="picker"
            locale="pt-BR"
            v-model="date"
            :max="new Date().toISOString().substr(0, 10)"
          />
        </v-card>
        <v-btn tile depressed text @click="dialogShow(false)" width="100%">
          fechar
        </v-btn>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
/* eslint-disable no-console */
export default {
  name: "DateDialog",
  data: () => ({
    dialog: false,
    date: new Date().toISOString().substr(0, 10),
    textDate: ""
  }),
  methods: {
    dialogShow(show) {
      this.dialog = show;
      this.forceBlur();
    },
    log: m => console.log(m),
    forceBlur() {
      let el = this.$el.querySelector(":focus");
      if (el) el.blur();
    }
  },
  watch: {
    textDate: function() {
      this.$emit("date-change", this.textDate);
    },
    dialog: "forceBlur",
    date() {
      this.$emit("date", this.date);
      this.textDate = this.date
        .split("-")
        .reverse()
        .join("/");
    }
  },
  computed: mapGetters(["theme"]),
  mounted() {
    // Close modal with 'esc' key
    document.addEventListener("keydown", e => {
      if (e.keyCode == 27) {
        this.dialogShow(false);
      }
    });
    if ((parseInt(this.startYear, 10) || 0) > 0) {
      this.date = new Date(parseInt(this.startYear, 10))
        .toISOString()
        .substr(0, 10);
      // this.$refs.picker.activePicker = "YEAR";
    }
  },
  props: ["label", "startYear"]
};
</script>

<style scoped>
.left-1-pad {
  padding-left: 1rem;
}
.right-1-pad {
  padding-right: 1rem;
}
.hover-pointer:hover {
  cursor: pointer;
}
</style>
