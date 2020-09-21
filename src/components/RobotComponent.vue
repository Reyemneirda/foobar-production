<template>
  <div class="col-12" v-bind:class="waiting" style="font-size: 30px;">
    🤖 <span v-if="activityCounter > 0">{{ activityCounter }}</span>
  </div>
</template>
<script>
export default {
  name: "robot",
  data: function() {
    return {
      isMoving: false,
      waiting: !this.isIddle || this.isMoving ? "task-waiting" : "",
      activityCounter: 0
    };
  },
  props: {
    activity: Number,
    isIddle: Boolean
  },
  methods: {
    countDownTimer(timeForActivity) {
        this.activityCounter = timeForActivity;
      if (timeForActivity > 0) {
        setTimeout(() => {
          timeForActivity -= 1;
          this.countDownTimer(timeForActivity);
          console.log("cD");
        }, 1000);
      }
    }
  },
  watch: {
    isMoving() {
      this.waiting = !this.isIddle && this.isMoving ? "task-waiting" : "";
    },
    isIddle() {
      this.isIddle = !this.isIddle;
    }
  },
  created: function() {
    if (this.isIddle) {
      return false;
    }
    // console.log("New robot created ", this);
    this.countDownTimer(5);
    this.isMoving = true;
    setTimeout(() => {
      this.isMoving = false;
    }, 5000);
  }
};
</script>
