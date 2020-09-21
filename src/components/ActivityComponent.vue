<template>
  <div class="col-6 col-md-3" style="border: 2px solid #eee">
    <div
      class="row text-center justify-content-center p-2"
      style="border-bottom: 1px solid #000; min-height: 60px;"
    >
      <div class="col-4">
        <button
          v-if="canRemove"
          v-show="!isIddle"
          type="button"
          class="btn btn-outline-info"
          v-on:click="removeRobot"
        >
          -
        </button>
      </div>
      <div class="col-4">
        <h3>{{ icon }}</h3>
      </div>
      <div class="col-4">
        <button
          v-if="canAdd"
          v-show="!isIddle"
          type="button"
          class="btn btn-outline-primary"
          v-on:click="addRobot"
        >
          +
        </button>
      </div>
    </div>
    <template v-for="i in activity">
      <Robot :key="i" :isIddle="isIddle" />
    </template>
  </div>
</template>

<script>
import Robot from "./RobotComponent";

export default {
  name: "activity",
  props: {
    icon: String,
    activity: Number,
    robotIddle: Number,
    isIddle: Boolean
  },
  components: {
    Robot,
  },
  computed: {
    canRemove() {
      return 0 < this.activity;
    },
    canAdd() {
      return 0 < this.robotIddle;
    }
  },
  methods: {
    addRobot() {
      this.isMoving = true;
      this.isIddle = false;
      this.$emit("addRobot");
    },
    removeRobot() {
      this.isMoving = true;
      this.isIddle = true;
      this.$emit("removeRobot");
    }
  }
};
</script>
