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
      console.log(object);
      state.gameValues.grid1 = object;
      state.gameValues.grid2 = object;
      state.gameValues.shipSetting1 = object;
      state.gameValues.shipSetting2 = object;
      state.gameValues.gameState = object;
      state.gameValues.playerState = object;
      state.gameValues.player1 = "test_124";
      state.gameValues.player2 = object;
    },
    SENDING_MESSAGE(state, message) {
      console.log("message received getter: " + message);
      this.state.websocket.send(message);
    }
  },
  actions: {
    fetchData(context) {
      context.commit("SET_LOADING_STATUS", "loading");
      axios.get("http://localhost:9000/about").then(response => {
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
    }
  },
  modules: {}
});
