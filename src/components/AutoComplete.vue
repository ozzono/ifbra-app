<template>
    <div>
      <v-row
        align="center"
      >
        <v-col cols="12">
          <v-autocomplete
            :items="innerItems"
            chips
            small-chips
            :label="innerLabel"
            :multiple="allowMultiple"
            dense
            :clearable="allowMultiple"
          ></v-autocomplete>
            <!-- outlined -->
            <!-- dense -->
        </v-col>
      </v-row>
    </div>
</template>

<script>
  export default {
    data: () => ({
      value: null,
    }),
    props:{
        innerItems: Object,
        innerLabel: String,
        allowMultiple: Boolean,
    }
  }
</script>