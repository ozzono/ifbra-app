<template>
  <div class="form" :class="`${!theme.dark ? theme.color : ''}`">
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
            <DatePicker
              innerLabel="Data da Avaliação"
              @date-change="setDate($event)"
            ></DatePicker>
          </v-col>
        </v-row>
        <v-row align="center" dense class="d-flex">
          <v-col md="3" cols="12">
            <CheckList
              :inner-items="evaluatorType"
              inner-label="Tipo de avaliador"
              @selected-items="type = $event"
              ref="evalType"
              :inner-hint="hintTypeEval"
              :allow-clean="true"
            />
          </v-col>
          <v-col md="8" cols="10" class="d-flex">
            <v-text-field
              v-model="name"
              justify-start
              label="Nome do avaliador"
              @keydown.enter="addEval()"
              :hint="hintEvalName"
              :persistent-hint="hintEvalName.length > 0"
              ref="evalName"
            />
          </v-col>
          <v-col
            md="1"
            cols="2"
            class="d-flex justify-center align-center text-center"
          >
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
          <v-col md="1" cols="1" class="d-flex justify-center">
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
    count: 0,
    hintTypeEval: "",
    hintEvalName: "",
    requiredRule: val => {
      (val || "").length || "Campo obrigatório";
    }
  }),
  components: {
    CheckList: () => import("@/components/CheckList"),
    DatePicker: () => import("@/components/DatePicker")
  },
  methods: {
    ...mapActions(["addEvaluator", "removeEvaluator", "setDate"]),
    addEval() {
      if (this.name.length === 0) {
        this.hintEvalName = "Insira o nome do avaliador";
        this.$refs.evalName.focus();
        return;
      } else {
        this.hintEvalName = "";
      }
      if (this.type.length === 0) {
        this.hintTypeEval = "Insira tipo de avaliador";
        this.$refs.evalType.innerFocus();
        return;
      } else {
        this.hintTypeEval = "";
      }
      const evaluator = {
        id: this.count++,
        type: this.type,
        name: this.name
      };
      this.addEvaluator(evaluator);
      this.name = "";
      this.$refs.evalType.clear();
    },
    required: val => [(val || "").length > 0 || "Campor obrigatório"]
  },
  computed: mapGetters(["allEvaluators", "evalDate", "theme"])
};
</script>
