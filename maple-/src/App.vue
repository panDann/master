<template>
  <v-app>
    <v-toolbar app>
      <v-toolbar-title class="headline text-uppercase">
        <span>Vuetify</span>
        <span class="font-weight-light">MATERIAL DESIGN</span>
      </v-toolbar-title>
       <v-form v-model="valid">
      <v-text-field
          v-model="name"
          label="Name"
          type="search"
          required
          height="30px"
          prepend-icon="fas fa-lock"
        ></v-text-field>
      </v-form>
    </v-toolbar>

    <v-content>
    </v-content>
  </v-app>
</template>

<script>

export default {
  name: 'App',
  components: {
  },
  data () {
    return {
      //
      name:""
    }
  }
}
</script>
