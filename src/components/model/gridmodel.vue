<template>
  <v-sheet class="mx-auto mt-4" max-width="960" align="center">
    <v-row no-gutters v-for="row in 10" :key="row - 1">
      <v-col v-for="col in 10" :key="col - 1">
        <v-btn
          block
          outlined
          tile
          :key="(row - 1).toString() + (col - 1).toString()"
          v-on:click="sendMessage(row - 1, col - 1)"
        >
          {{ getGrid((row - 1) + "" + (col - 1)) }}
        </v-btn>
      </v-col>
    </v-row>
  </v-sheet>
</template>

<script>
export default {
  name: "gridmodel",
  data() {
    return {
      col1: "",
      row1: ""
    };
  },
  props: {
    playerName: {
      type: String,
      require: true
    }
  },
  methods: {
    fetchData: function() {
      console.log("fetching data");
      this.$store.dispatch("fetchData");
    },
    getGrid(value) {
      if (this.playerName === "player1") {
        const vl = this.$store.getters.getGrid1[Number(value)];
        if (vl === 0) {
          return "~";
        } else if (vl === 1) {
          if (vl === 3 /* check if it is allowed to show setted ships */) {
            return "~";
          } else {
            return "x";
          }
        } else if (vl === 2) {
          return "x";
        } else if (vl === 3) {
          return "0";
        }
      } else {
        const vl = this.$store.getters.getGrid2[Number(value)];
        if (vl === 0) {
          return "~";
        } else if (vl === 1) {
          if (vl === 3 /* check if it is allowed to show setted ships */) {
            return "~";
          } else {
            return "x";
          }
        } else if (vl === 2) {
          return "x";
        } else if (vl === 3) {
          return "0";
        }
      }
    },
    sendMessage: function(row, col) {
      if (this.$store.getters.getGameState === "IDLE") {
        console.log("sending message: " + row + " " + col);
        this.$store.commit("SENDING_MESSAGE", row + " " + col + " test test");
        this.fetchData();
      } else {
        if (this.row1 === "") {
          this.row1 = row;
          this.col1 = col;
        } else {
          const message = this.row1 + " " + this.col1 + " " + row + " " + col;
          console.log("sending message: " + message);
          this.$store.commit("SENDING_MESSAGE", message);
          this.row1 = "";
          this.col1 = "";
          this.fetchData();
        }
      }
    }
  },
  mounted() {
    this.fetchData();
  }
};
</script>
