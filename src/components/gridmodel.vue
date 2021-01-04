<template>
  <v-sheet class="mx-auto mt-4" max-width="960" align="center">
    <v-row no-gutters v-for="row in 10" :key="row - 1">
      <v-col v-for="col in 10" :key="col - 1">
        <v-btn
          block
          outlined
          tile
          :key="(row - 1).toString() + (col - 1).toString()"
          :color="col.color"
          v-on:click="sendMessage((row-1) + ' ' + (col-1) + ' test test')"
          v-bind:text="true"
        >
          {{ getPlayer1() }}
        </v-btn>
      </v-col>
    </v-row>
  </v-sheet>
</template>

<script>
export default {
  name: "gridmodel",
  methods: {
    getPlayer1() {
      return this.$store.getters.getPlayer1;
    },
    sendMessage: function(message) {
      console.log("sending message: " + message);
      this.$store.dispatch("fetchData");
      this.$store.commit("SENDING_MESSAGE", message);
    }
  }
};
</script>
