<template>
  <div>
    <div v-if="getGameState() == shipSetting">
      <br>
      <playername1 v-bind:player-name="player1" />
      <gridmodel1 v-bind:player-name="player1" />
      <shipsetting v-bind:player-name="player1" />
      <br>
    </div>
    <div v-if="getGameState() == idle">
      <br>
      <playername1 v-bind:player-name="player1" />
      <gridmodel1 v-bind:player-name="player1" />
      <br>
      <playername2 v-bind:player-name="player2" />
      <gridmodel2 v-bind:player-name="player1" />
      <br>
    </div>
  </div>
</template>

<script>
import gridmodel1 from "@/components/model/gridmodel";
import gridmodel2 from "@/components/model/gridmodel";
import playername1 from "@/components/model/playername";
import playername2 from "@/components/model/playername";
import shipsetting from "@/components/model/shipsetting";
export default {
  name: "Game",
  components: { gridmodel1, gridmodel2, playername1, playername2, shipsetting},
  data() {
    return {
      player1:"player1",
      player2:"player2",
      idle:"IDLE",
      shipSetting:"SHIPSETTING"
    };
  },
  methods:{
    getGameState(){
      return this.$store.getters.getGameState
    },
    fetchData: function() {
      this.$store.dispatch("fetchData");
    }
  },
  mounted() {
    this.fetchData();
  }
};
</script>
