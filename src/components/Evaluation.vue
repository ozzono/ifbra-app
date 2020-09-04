<template>
  <div class="form">
    <v-flex>
      <v-container>
        <v-row align="center" dense class="d-flex">
          <v-col>
            <h2 class="text-center">Avaliação Médica e Funcional</h2>
          </v-col>
        </v-row>
        <v-row align="center" dense class="d-flex">
          <v-col md="3" cols="6">
            <!-- small col -->
            <DatePicker innerLabel="Data da Avaliação"></DatePicker>
          </v-col>
        </v-row>
        <v-row align="center" dense class="d-flex">
          <v-col md="3" cols="6">
            <CheckList
              :innerItems="evaluatorType"
              innerLabel="Tipo de avaliador"
              @selected-items="type = $event"
              ref="checklist"
            />
          </v-col>
          <v-col md="8" cols="5" class="d-flex">
            <v-text-field
              v-model="name"
              justify-start
              label="Nome do avaliador"
              @keydown.enter="addEval()"
            />
          </v-col>
          <v-col md="1" cols="1" class="d-flex">
            <v-btn @click="addEval()" icon align="center">
              <v-icon>mdi-plus-box</v-icon>
            </v-btn>
          </v-col>
        </v-row>
        <v-row
          v-for="evaluator in allEvaluators"
          :key="evaluator.id"
          align="center"
          dense
          outlined
          class="d-flex"
        >
          <v-col md="3" cols="6" class="d-flex">
            <v-text-field
              :value="evaluator.type"
              label="Tipo de avaliador"
              rows="1"
              disabled
              auto-grow
              class="align-start"
            />
          </v-col>
          <v-col md="8" cols="5" class="d-flex">
            <v-text-field
              :value="evaluator.name"
              label="Nome do avaliador"
              rows="1"
              disabled
              auto-grow
              class="align-start"
            />
          </v-col>
          <v-col md="1" cols="1" class="d-flex">
            <v-btn @click="removeEvaluator(evaluator.id)" icon align="center">
              <v-icon>mdi-minus-box</v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-flex>
  </div>
</template>

<script>
/* eslint-disable no-console */
import { mapActions, mapGetters } from "vuex";
export default {
  data: () => ({
    evaluatorType: ["Médico", "Assistente Social"],
    name: "",
    type: "",
    count: 0
  }),
  components: {
    CheckList: () => import("@/components/CheckList"),
    DatePicker: () => import("@/components/DatePicker")
  },
  methods: {
    ...mapActions(["addEvaluator", "removeEvaluator"]),
    addEval() {
      const evaluator = {
        id: this.count++,
        type: this.type,
        name: this.name
      };
      this.addEvaluator(evaluator);
      this.name = "";
      this.$refs.checklist.clear();
    }
  },
  computed: mapGetters(["allEvaluators"])
};
</script>
