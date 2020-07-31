<template>
  <div>
    <v-flex>
      <v-container class="grey lighten-5">
        <v-row align="center" dense class="flex">
          <FormHeader
            title="Formulário 3"
            subtitle="Aplicação do Instrumento"
            comment="Matriz"
          />
        </v-row>
        <div class="form3">
          <v-row align="center" dense class="flex">
            <v-col :cols="ContentCols">
              Domínios e Atividades
            </v-col>
            <v-col class="text-center" :cols="SelectCols * 2">
              <Tooltip
                desc="Pontuação INSS"
                :content="INSSDesc"
                comment="Para mais detalhes, consulte o manual do IF-BrA"
              />
            </v-col>
            <v-col class="text-center" :cols="CheckListCols">
              <Tooltip
                desc="Barreira Ambiental"
                :content="BarreirasDesc"
                comment="Para mais detalhes, consulte o manual do IF-BrA"
              />
            </v-col>
          </v-row>
          <div text-wrap v-for="(dominio, i) in Dominios" :key="i">
            {{ i + 1 }}. {{ dominio.Desc }}
            <v-row
              align="center"
              dense
              class="flex"
              v-for="(subdominio, j) in dominio.SubDominios"
              :key="j"
            >
              <v-col class="align-start" :cols="ContentCols">
                <v-textarea
                  :value="subdominio.Detalhe"
                  :label="i + 1 + '.' + (j + 1) + ' ' + subdominio.Desc"
                  rows="1"
                  disabled
                  auto-grow
                  class="align-start"
                ></v-textarea>
              </v-col>
              <v-col class="align-start justify-md-end" :cols="SelectCols">
                <CheckList
                  :inner-items="INSS"
                  inner-label="Médico"
                  :make-outlined="true"
                />
              </v-col>
              <v-col class="align-start justify-md-end" :cols="SelectCols">
                <CheckList
                  :inner-items="INSS"
                  inner-label="Social"
                  :make-outlined="true"
                />
              </v-col>
              <v-col class="align-start" :cols="CheckListCols">
                <CheckList
                  inner-label="Barreira Ambiental"
                  :inner-items="Barreiras"
                  :allow-multiple="true"
                  :make-outlined="true"
                />
              </v-col>
            </v-row>
            <hr />
          </div>
        </div>
      </v-container>
    </v-flex>
  </div>
</template>
<script>
import Dominios from "@/assets/json/form3.json";
import FormHeader from "@/components/forms/FormHeader";
import CheckList from "@/components/CheckList";
import Tooltip from "@/components/Tooltip";
import INSSDesc from "@/assets/json/inss.json";
import BarreirasDesc from "@/assets/json/barreiras.json";
export default {
  data: () => ({
    ContentCols: 5,
    SelectCols: 2,
    CheckListCols: 3,
    Barreiras: ["P e T", "Amb", "A e R", "At", "SS e P"],
    Dominios: Object.values(Dominios),
    INSSDesc: Object.values(INSSDesc),
    BarreirasDesc: Object.values(BarreirasDesc),
    INSS: ["25", "50", "75", "100"]
  }),
  components: {
    FormHeader: FormHeader,
    CheckList: CheckList,
    Tooltip: Tooltip
  }
};
</script>

<style>
:disabled {
  color: black !important;
}
v-textarea {
  border-style: none;
}
</style>
