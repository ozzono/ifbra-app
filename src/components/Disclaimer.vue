<template>
  <v-card>
    <v-card-title class="d-flex justify-center">
      <h1>Alerta de Privacidade "LGPD"</h1>
    </v-card-title>
    <v-card-text>
      <div>
        <h3>Este Aviso de Privacidade inclui os seguintes tópicos:</h3>
        <ul>
          <li>
            Que dados pessoais coletamos a seu respeito:
            <ul>
              <li>Essa página não coleta nem salva dados;</li>
              <li>
                Todos os dados inseridos são descartados após fechar a página ou
                recarregá-la;
              </li>
            </ul>
          </li>
          <li>
            Como usamos seus dados pessoais:
            <ul>
              <li>Os dados são usados apenas para gerar o documento PDF;</li>
            </ul>
          </li>
          <li>
            Como protegemos seus dados pessoais:
            <ul>
              <li>
                Seus dados estão protegidos pois não são coletados nem
                armazenados;
              </li>
            </ul>
          </li>
          <li>
            Nosso contato & seus direitos:
            <ul>
              <li>
                Nosso contato:
                <a href="mailto:ifbra@outlook.com">ifbra@outlook.com</a>
              </li>
              <li>
                Você tem o direito de não fornecer dados pessoais, seja em razão
                da navegação ou em razão do preenchimento de dados sensíveis,
                necessários para calcular o IFBr-A.
              </li>
            </ul>
          </li>
          <li>
            Nossa Política de Cookies:
            <ul>
              <li>Essa página não utiliza cookies;</li>
            </ul>
          </li>
          <li>
            Como serão feitas mudanças nesta Política de Privacidade e na
            Política de Cookies:
            <ul>
              <li>
                Esta página não sofrerá mudanças no que se refere a Política de
                Privacidade ou Política de Cookies;
              </li>
              <li>
                Está página é de uso gratuito e de código aberto conforme
                licença
                <a
                  href="https://github.com/ozzono/adbtools/blob/master/LICENSE"
                  target="_blank"
                >
                  GNU General Public License v3.0</a
                >;
              </li>

              <li>
                O código dessa página está aberto e disponível para consulta no
                <a href="https://github.com/ozzono/ifbra-app" target="_blank">
                  GitHub</a
                >;
              </li>
            </ul>
          </li>
        </ul>
        <i v-if="isDialog">
          Esta mensagem aperecerá automaticamente sempre que a página carregar.
        </i>
      </div>
    </v-card-text>
    <v-divider />
    <v-card-actions v-if="isDialog">
      <v-spacer />
      <v-btn color="primary" text @click="$emit('close-dialog')">
        Ciente
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: ["isDialog"]
};
</script>
