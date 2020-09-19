<template>
  <div id="app">
    <nav class="navbar navbar-dark bg-dark">
      <a class="navbar-brand" href="#"> </a>
      <button class="btn btn-success" v-on:click="gameStart">Start</button>
    </nav>
    <div style="font-size: 42px;" title="foobar">💶:{{ money }}</div>

    <div style="font-size: 42px;" title="foobar">🤖:{{ foobar }}</div>

    <div style="font-size: 42px;" title="idle">💤:{{ foobarIddle }}</div>
    <div style="font-size: 42px;" title="Foo">💎:{{ foo }}</div>
    <div style="font-size: 42px;" title="Bar">🛢️:{{ bar }}</div>

    <button class="btn btn-primary" v-on:click="mineFoo" title="Mine foo">
      ⛏️ 💎
    </button>
    <button class="btn btn-primary mx-4" v-on:click="mineBar" title="Mine Bar">
      ⛏️ 🛢️
    </button>
    <button class="btn btn-primary mx-4" v-on:click="build" title="Build Robot">
      🧱 🤖
    </button>
    <button class="btn btn-primary mx-4" v-on:click="sell" title="Sell Robot">
      Sell 🤖
    </button>
    <button class="btn btn-primary mx-4" v-on:click="sell" title="Buy Robot">
      Buy 🤖
    </button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      money: 0,
      foobar: 2,
      foobarIddle: 2,
      foo: 0,
      bar: 0
    };
  },
  methods: {
    gameStart: function(){
      this.money= 0
      this.foobar= 2
      this.foobarIddle=2
      this.foo= 0
      this.bar= 0
    },
    mineFoo: function() {
      if (this.foobarIddle > 0) {
        this.foo += 1;
        this.foobarIddle -= 1;
      }
    },
    mineBar: function() {
      if (this.foobarIddle > 0) {
        this.bar += 1;
        this.foobarIddle -= 1;
      }
    },
    build: function() {
      if (this.foobarIddle > 0) {
        this.foo += 1;
        this.foobarIddle -= 1;
      }
    },
    sell: function() {
      if (this.foobarIddle > 0) {
        this.foo += 1;
        this.foobarIddle -= 1;
      }
    },
    buy: function() {
      if (this.foobarIddle > 0) {
        this.bar += 1;
        this.foobarIddle -= 1;
      }
    }
  }
};
</script>
