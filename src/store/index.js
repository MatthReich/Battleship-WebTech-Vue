import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

const game = {
  grid1: {},
  grid2: {},
  shipSetting1: {},
  shipSetting2: {},
  gameState: {},
  playerState: {},
  player1: {},
  player2: {}
};

let sct = new WebSocket("ws://localhost:9000/websocket");

sct.onopen = function() {
  console.log("Connect to Server");
};
sct.onclose = function() {
  console.log("Connection Closed!");
};
sct.onerror = function(error) {
  console.log("Error Occured: " + error);
};
sct.onmessage = function(message) {
  const object = JSON.parse(message.data);
  console.log("Reseived Message");
  console.log(object);
  this.$store.commit("SET_GAME_VALUES", object);
};

export default new Vuex.Store({
  state: {
    loadingStatus: "notLoading",
    gameValues: game,
    websocket: sct
  },
  mutations: {
    SET_LOADING_STATUS(state, status) {
      state.loadingStatus = status;
    },
    SET_GAME_VALUES(state, object) {
      const grid_01 = new Array(100);
      const grid_02 = new Array(100);
      for (var i = 0; i < 100; i++) {
        grid_01[i] = object[0].grid1.cells[i].valueY;
        grid_02[i] = object[1].grid2.cells[i].valueY;
      }
      state.gameValues.grid1 = grid_01;
      state.gameValues.grid2 = grid_02;
      state.gameValues.shipSetting1 = object[2].arraysInt.shipSetting;
      state.gameValues.shipSetting2 = object[2].arraysInt.shipSetting2;
      state.gameValues.gameState = object[3].gameState;
      state.gameValues.playerState = object[4].playerState;
      state.gameValues.player1 = object[5].players.player1;
      state.gameValues.player2 = object[5].players.player2;
      console.log("fetch successful");
    },
    SENDING_MESSAGE(state, message) {
      console.log("message received getter: " + message);
      this.state.websocket.send(message);
    }
  },
  actions: {
    fetchData(context) {
      context.commit("SET_LOADING_STATUS", "loading");
      axios.get("http://localhost:9000/json").then(response => {
        context.commit("SET_LOADING_STATUS", "notLoading");
        context.commit("SET_GAME_VALUES", response.data);
      });
    }
  },
  getters: {
    getGrid1(state) {
      return state.gameValues.grid1;
    },
    getGrid2(state) {
      return state.gameValues.grid2;
    },
    getPlayer1(state) {
      return state.gameValues.player1;
    },
    getPlayer2(state) {
      return state.gameValues.player2;
    },
    getShip1(state){
      return state.gameValues.shipSetting1;
    },
    getShip2(state){
      return state.gameValues.shipSetting2;
    },
    getGameState(state){
      return state.gameValues.gameState;
    }
  },
  modules: {}
});
