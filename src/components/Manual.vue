<template>
  <v-card flat tile>
    <!-- :flat="flat[item.ref]" -->
    <v-card
      flat
      tile
      :class="
        `d-flex flex-row align-center
        ${theme.dark ? '' : theme.color}`
      "
      v-for="(item, n) in info"
      :key="n"
      @click="newTab(item.ref)"
    >
      <ManualIcon
        :left="true"
        :ref="item.ref"
        :icon="item.icon"
        :url="item.url"
      />
      <LighterTextField
        :title="item.title"
        :subtitle="item.subtitle"
        :text="[...item.text, 'Clique para abrir.']"
        comment=""
      />
    </v-card>
  </v-card>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data: () => ({
    tab: null,
    info: [
      {
        ref: "manual",
        url:
          "https://www.iets.org.br/IMG/pdf/if-br_manualaplicacao_-_pesquisa_de_campo_etapa_2.2_-_meta_2_.pdf",
        title: "Manual de Preenchimento da Avaliação",
        subtitle:
          "Conjunto de orientações para preenchimento dos formulários da avaliação.",
        text: [
          "Esse manual foi organizado pelo IETS, Instituto de Estudos do Trabalho e Sociedade, com fomento e participação do Ministério dos Direitos Humanos e da Secretaria Nacional de Promoção dos Direitos da Pessoa Idosa (SNDPI)."
        ],
        icon: "mdi-book-open-variant"
      },
      {
        ref: "mmfdh",
        url:
          "https://www2.camara.leg.br/atividade-legislativa/comissoes/comissoes-permanentes/cpd/audiencias-publicas/audiencias-publicas-2019/apresentacao-liliane-cristina-bernardes-mdh",
        title: "Análise Biopsicossocial da Deficiência",
        subtitle:
          "Abordagem com descrição e histórico da análise biopsicossocial da deficiência no Brasil.",
        text: [
          "Documento publicado pelo Ministério da Mulher, Família e dos Direitos Humanos junto à Secretaria Nacional dos Direitos da Pessoa com Deficiência, SNDPD, com apanhado histórico e detalhamento da análise biopsicossocial a partir da utilização do índice de funcionalidade brasileiro."
        ],
        icon: "mdi-account-search"
      },
      {
        ref: "portaria",
        url:
          "https://www.in.gov.br/materia/-/asset_publisher/Kujrw0TZC2Mb/content/id/30050742/do1-2014-01-30-portaria-interministerial-n-1-de-27-de-janeiro-de-2014-30050738",
        title: "Portaria Interministerial",
        subtitle:
          "Portaria Interministerial Nº 1 de 2014 que regulou a aplicação do índice",
        text: [
          "Publicação conjunta do SDH, MPS, MF, MOG e AGU que aprova o instrumento destinado à avaliaçãodo segurado da Previdência Social e à identificaçãodos graus de deficiência, bem comodefine impedimento de longo prazo."
        ],
        icon: "mdi-file-document"
      }
    ],
    flat: []
  }),
  components: {
    LighterTextField: () => import("@/components/LighterTextField"),
    ManualIcon: () => import("@/components/ManualIcon")
  },
  computed: mapGetters(["theme"]),
  methods: {
    newTab(ref) {
      this.$refs[ref][0].newTab();
    }
  }
};
</script>
