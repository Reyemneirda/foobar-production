<template>
  <div id="app">
    <template v-if="!gameStarted">
      <div class="container-fluid text-center mt-5">
        <h1>Foobar Production !</h1>
        <p>Get 20 🤖 and it's won !</p>
        <button class="btn btn-success m-auto p-auto" v-on:click="gameStart">
          Start
        </button>
      </div>
    </template>
    <template v-if="gameStarted && !gameWon">
      <nav class="navbar navbar-dark bg-dark">
        <Ressource icon="💶" title="Euros" v-bind:amount="money" />
        <Ressource icon="🤖" title="Robot" v-bind:amount="robot" />
        <Ressource
          icon="💎"
          title="Foo"
          v-bind:amount="foo"
          :colorAmount="fooAmountColor"
          :amountPerTick="fooAmountPerTick"
        />
        <Ressource
          icon="🛢️"
          title="Bar"
          v-bind:amount="bar"
          :colorAmount="barAmountColor"
          :amountPerTick="barAmountPerTick"
        />
        <Ressource
          icon="🖥️"
          title="Foobar"
          v-bind:amount="foobar"
          :colorAmount="foobarAmountColor"
          :amountPerTick="foobarAmountPerTick"
        />
      </nav>
      <div class="container-fluid p-4">
        <div class="row">
          <h4>{{ message }}</h4>
        </div>
        <div class="row">
          <Activity
            icon="💤"
            :activity="robotIddle"
            :robotIddle="robotIddle"
            :isIddle="true"
          />
          <Activity
            icon="⛏️ 💎"
            :activity="miningFooRobot"
            :robotIddle="robotIddle"
            :isIddle="false"
            :progressStart="0"
            :contentProgress="100"
            @addRobot="addMineFoo"
            @removeRobot="--miningFooRobot"
          />
          <Activity
            icon="⛏️ 🛢️"
            :activity="miningBarRobot"
            :robotIddle="robotIddle"
            :isIddle="false"
            @addRobot="addMineBar"
            @removeRobot="--miningBarRobot"
          />
          <Activity
            icon="🧱 🖥️"
            :activity="buildingRobot"
            :robotIddle="robotIddle"
            :isIddle="false"
            @addRobot="addBuilding"
            @removeRobot="--buildingRobot"
          />
        </div>
        <div class="row py-5">
          <div class="col">
            <div
              class="btn-group special"
              role="group"
              aria-label="Basic example"
            >
              <button
                v-if="!selling"
                class="btn btn-info py-3"
                @click="setSellQuantity('reduce')"
              >
                -
              </button>
              <button
                class="btn btn-light btn-block mx-auto py-3 px-5"
                v-on:click="sell"
                style="width: 100%;"
                title="Sell Robot"
                id="sell"
                ref="sell"
              >
                <div v-if="!selling">Sell {{ sellQuantity }} 🖥️</div>
                <div v-if="selling">
                  <ClipLoader
                    :loading="selling"
                    :color="'blue'"
                    :size="'25px'"
                  ></ClipLoader>
                </div>
              </button>
              <button
                v-if="!selling"
                class="btn btn-info"
                @click="setSellQuantity('increment')"
              >
                +
              </button>
            </div>
          </div>
          <div class="col">
            <button
              class="btn btn-primary btn-block mx-auto py-3"
              v-on:click="buy"
              title="Buy Robot"
            >
              Buy 🤖 (cost 3 💶 and 6 💎 )
            </button>
          </div>
        </div>
      </div>
    </template>
    <template v-if="gameWon">
      <h1>You've won !</h1>
    </template>
  </div>
</template>

<script>
import Ressource from "./components/RessourceComponent";
import Activity from "./components/ActivityComponent";
import ClipLoader from "vue-spinner/src/ClipLoader.vue";
import { mapMutations, mapState } from "vuex";

export default {
  data() {
    return {
      money: 0,
      foobar: 0,
      robot: 2,
      robotIddle: 2,
      foo: 0,
      bar: 0,
      message: null,
      buildingRobot: 0,
      miningFooRobot: 0,
      miningBarRobot: 0,
      inQueue: 0,
      gameWon: false,
      sellQuantity: 1,
      selling: false,
      fooAmountColor: "",
      fooAmountPerTick: "0",
      barAmountColor: "",
      barAmountPerTick: "0",
      foobarAmountColor: "",
      foobarAmountPerTick: "0"
    };
  },
  components: {
    Ressource,
    Activity,
    ClipLoader
  },
  computed: {
    ...mapState("gameManager", ["gameStarted", "gameWon"])
  },
  mounted() {
    setInterval(this.gameLoop, 1000);
  },
  
  methods: {
    ...mapMutations("gameManager", ["startGame"]),
    gameStart() {
      this.startGame();
      this.gameWon = false;
      this.money = 0;
      this.foobar = 0;
      this.robot = 2;
      this.robotIddle = 2;
      this.foo = 0;
      this.bar = 0;
      this.message = null;
      this.buildingRobot = 0;
      this.miningFooRobot = 0;
      this.miningBarRobot = 0;
    },
    gameLoop() {
      if (this.gameStarted == false) {
        return false;
      }
      if (this.robot == 20) {
        this.message = "You've won !";
        this.gameWon = true;
        return false;
      }
      this.robotIddle =
        this.robot -
        (this.buildingRobot + this.miningFooRobot + this.miningBarRobot);
      this.mineFoo();
      this.mineBar();
      this.build();
      this.setAmounts();
    },
    setAmounts() {
      var fooChildren = this.$root.$children[0].$children[1].$children.filter(
        x => x.$el.className == "col-12 task-waiting"
      );
      var fooMineIddle = fooChildren.length;
      var fooActiveMiner = this.miningFooRobot - fooMineIddle;

      var barChildren = this.$root.$children[0].$children[2].$children.filter(
        x => x.$el.className == "col-12 task-waiting"
      );
      var barMineIddle = barChildren.length;
      var barActiveMiner = this.miningBarRobot - barMineIddle;

      var foorbarChildren = this.$root.$children[0].$children[3].$children.filter(
        x => x.$el.className == "col-12 task-waiting"
      );
      var foobarMineIddle = foorbarChildren.length;
      var activeBuilders = this.buildingRobot - foobarMineIddle;

      this.fooAmountPerTick = fooActiveMiner - activeBuilders;
      this.barAmountPerTick = barActiveMiner - activeBuilders;
      this.foobarAmountPerTick = activeBuilders;

      if (this.fooAmountPerTick > 0) {
        this.fooAmountPerTick = "+" + this.fooAmountPerTick.toString();
        this.fooAmountColor = "color:green;";
      } else if (this.fooAmountPerTick < 0) {
        this.fooAmountPerTick = this.fooAmountPerTick.toString();
        this.fooAmountColor = "color:red;";
      } else {
        this.fooAmountPerTick = "0";
      }
      if (this.barAmountPerTick > 0) {
        this.barAmountPerTick = "+" + this.barAmountPerTick.toString();
        this.barAmountColor = "color:green;";
      } else if (this.barAmountPerTick < 0) {
        this.barAmountPerTick = this.barAmountPerTick.toString();
        this.barAmountColor = "color:red;";
      } else {
        this.barAmountPerTick = "0";
      }
      if (this.foobarAmountPerTick > 0) {
        this.foobarAmountPerTick = "+" + this.foobarAmountPerTick.toString();
        this.foobarAmountColor = "color:green;";
      } else if (this.foobarAmountPerTick < 0) {
        this.foobarAmountPerTick = this.foobarAmountPerTick.toString();
        this.foobarAmountColor = "color:red;";
      } else {
        this.foobarAmountPerTick = "0";
      }
    },
    randomIntFromInterval(min, max) {
      return Math.floor(Math.random() * (max - min + 1) + min);
    },
    removeFromActivity(activity) {
      activity -= 1;
      console.log(activity);
      console.log(this.robotIddle);
    },
    addMineFoo() {
      this.miningFooRobot += 1;
    },
    mineFoo() {
      var children = this.$root.$children[0].$children[1].$children.filter(
        x => x.$el.className == "col-12 task-waiting"
      );
      var mineIddle = children.length;
      var activeMiner = this.miningFooRobot - mineIddle;
      if (activeMiner < 1) {
        return false;
      }

      setTimeout(() => {
        this.foo += 1 * activeMiner;
      }, 1000);
    },
    addMineBar() {
      this.miningBarRobot += 1;
    },
    mineBar() {
      var children = this.$root.$children[0].$children[2].$children.filter(
        x => x.$el.className == "col-12 task-waiting"
      );
      var mineIddle = children.length;
      var activeMiner = this.miningBarRobot - mineIddle;
      if (activeMiner < 1) {
        return false;
      }
      var timeForActivity = this.randomIntFromInterval(500, 2000);
      setTimeout(() => {
        this.bar += 1 * activeMiner;
      }, timeForActivity);
    },
    addBuilding() {
      this.buildingRobot += 1;
    },
    build() {
      var children = this.$root.$children[0].$children[3].$children.filter(
        x => x.$el.className == "col-12 task-waiting"
      );
      var mineIddle = children.length;
      var activeBuilders = this.buildingRobot - mineIddle;
      if (activeBuilders > 0 && this.foo > 1 && this.bar > 1) {
        var chance = Math.random();
        var success = chance > 0.4 ? true : false;
        setTimeout(() => {
          if (success) {
            this.foo -= 1 * activeBuilders;
            this.bar -= 1 * activeBuilders;
            this.foobar += 1 * activeBuilders;
          } else {
            this.foo -= 1 * activeBuilders;
          }
        }, 2000);
      }
      if (this.foo < 0) {
        this.foo = 0;
      }
      if (this.bar < 0) {
        this.bar = 0;
      }
    },
    setSellQuantity(action) {
      console.log(action);
      if (action == "increment") {
        if (this.sellQuantity >= 5) {
          this.sellQuantity == 5;
        } else {
          this.sellQuantity++;
        }
      }

      if (action == "reduce") {
        if (this.sellQuantity <= 1) {
          this.sellQuantity == 1;
        } else {
          this.sellQuantity--;
        }
      }
    },
    sell() {
      if (this.foobar <= 0) {
        return false;
      }
      this.selling = true;
      var amount = this.sellQuantity;
      setTimeout(() => {
        this.foobar -= amount;
        this.money += 1 * amount;
        this.selling = false;
      }, 10000);
      if (this.foobar <= 0) {
        this.foobar = 0;
      }
    },
    buy() {
      if (this.money < 3 || this.foo < 6) {
        return false;
      }
      this.money -= 3;
      this.foo -= 6;
      this.robot += 1;
      if (this.foo < 0) {
        this.foo = 0;
      }
      if (this.money < 0) {
        this.money = 0;
      }
    }
  }
};
</script>
