<template>
  <div>
    <EmptyFormAlert
      text="Os dados dos avaliadores aparecerão uma vez que forem preenchidos no formulário principal."
      :show="Object.keys(allEvaluators).length == 0"
    />
    <v-row>
      <v-col v-if="allEvaluators.length > 0">
        Data da Avaliação:
        {{
          evalDate
            .split("-")
            .reverse()
            .join("/")
        }}
      </v-col>
    </v-row>
    <v-row v-for="evaluator in allEvaluators" :key="evaluator.id">
      <v-col>Nome do avaliador:<br />{{ evaluator.name }}</v-col>
      <v-col cols="3">Tipo de avaliador:<br />{{ evaluator.type }}</v-col>
      <v-col cols="3">
        Registro Profissional:<br />{{ evaluator.registry.value }}
      </v-col>
    </v-row>
    <v-divider v-if="allEvaluators.length > 0" />
    <v-row>
      <v-col>
        <LighterTextField
          text=""
          title="Formulário 1"
          subtitle="Identificação do Avaliado e da Avaliação"
          comment="Matriz"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col>Dados do Avaliado</v-col>
    </v-row>
    <v-row>
      <v-col cols="6">Nome: {{ personal.name || "" }} </v-col>
      <v-col>
        Nascimento:
        {{
          this.personal.birthday.length > 0
            ? this.personal.birthday
                .split("-")
                .reverse()
                .join("/")
            : ""
        }}
      </v-col>
      <v-col>
        Idade: {{ personal.age.length > 0 ? `${personal.age} anos` : "" }}
      </v-col>
    </v-row>
    <v-row>
      <v-col>Matrícula: {{ personal.registry || "" }}</v-col>
      <v-col>Sexo: {{ personal.sex || "" }}</v-col>
      <v-col>Etnia: {{ personal.ethnicity || "" }}</v-col>
    </v-row>
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
    LighterTextField: () => import("@/components/LighterTextField"),
    EmptyFormAlert: () => import("@/components/print/EmptyFormAlert")
  },
  computed: mapGetters(["evalDate", "personal", "allEvaluators"])
};
</script>

<style></style>
