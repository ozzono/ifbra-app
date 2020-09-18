<template>
  <div>
    <v-row>
      <v-col>
        <LighterTextField
          title="Formulário 1"
          subtitle="Identificação do Avaliado e da Avaliação"
          comment="Matriz"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col v-if="allEvaluators.length > 0">
        Data da Avaliação: {{ evalDate }}
      </v-col>
    </v-row>
    <v-row v-for="evaluator in allEvaluators" :key="evaluator.id">
      <v-col cols="4">Tipo de avaliador: {{ evaluator.type }}</v-col>
      <v-col>Nome do avaliador: {{ evaluator.name }}</v-col>
    </v-row>
    <v-divider v-if="allEvaluators.length > 0" />
    <v-row>
      <v-col>Dados do Avaliado</v-col>
    </v-row>
    <v-row>
      <v-col cols="6">Nome: {{ personal.name || "" }} </v-col>
      <v-col>
        Nascimento:
        {{
          (this.personal.birthday || "").length > 0
            ? this.personal.birthday
                .split("-")
                .reverse()
                .join("/")
            : ""
        }}
      </v-col>
      <v-col>Idade: {{ personal.age || "" }} anos</v-col>
    </v-row>
    <v-row>
      <v-col>Matrícula: {{ personal.registry || "" }}</v-col>
      <v-col>Sexo: {{ personal.sex || "" }}</v-col>
      <v-col>Etnia: {{ personal.ethnicity || "" }}</v-col>
    </v-row>
    <v-divider />
    <v-row>
      <v-col>
        Tipo{{ personal.deficiencyType.length > 1 ? "s" : "" || "" }} de
        Deficiência: {{ personal.deficiencyType.join(", ") || "" }}
      </v-col>
      <v-col>
        Diagnóstico Médico:
        {{ personal.CID.join(", ").replace(": ", " - ") || "" }}
      </v-col>
    </v-row>
    <v-row>
      <v-col>Histórico Clínico: {{ personal.history || "" }}</v-col>
    </v-row>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  components: {
    LighterTextField: () => import("@/components/LighterTextField")
  },
  computed: mapGetters(["personal", "allEvaluators"]),
  methods: {
    setBirthday() {
      return (this.personal.birthday || "").length > 0
        ? this.personal.birthday
            .split("-")
            .reverse()
            .join("/")
        : "";
    }
  }
};
</script>

<style></style>
