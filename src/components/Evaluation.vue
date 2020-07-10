<template>
  <div class="form">
    <v-flex>
      <v-container class="grey lighten-5">
        <v-row align="center" dense class="d-flex">
          <v-col>
            <h2 class="text-center">Avaliação Médica e Funcional</h2>
          </v-col>
        </v-row>
        <v-row align="center" dense class="d-flex">
          <v-col md="3" cols="6"> <!-- small col -->
            <DatePicker innerLabel="Data da Avaliação"></DatePicker>
          </v-col>
          <v-col md="9" cols="6" class="d-flex">
            <v-text-field justify-start label="Avaliadores" />
            <v-btn icon justify-end align-self="center">
              <v-icon>mdi-plus-box</v-icon>
            </v-btn>
          </v-col>
        </v-row>
        <v-card>
          <v-row align="center" dense class="flex">
            <v-col cols="3">
              <CheckList :innerItems="avaliadores" innerLabel="Tipo de avaliador" />
            </v-col>
            <v-col cols="9">
                <v-text-field label="Avaliadores"  append-icon="mdi-account-edit"/>
            </v-col>
          </v-row>
        </v-card>
      </v-container>
    </v-flex>
  </div>
</template>

<script>
import DatePicker from "@/components/DatePicker"
import CheckList from "@/components/CheckList"
export default {
  data: ()=>({
    avaliadores:["Médico","Assistente Social"],
  }),
  components:{
    CheckList:CheckList,
    DatePicker:DatePicker,
  }
}
</script>