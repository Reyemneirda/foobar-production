<template>
  <a
    class="nav-link disabled"
    href="#"
    tabindex="-1"
    style="font-size: 42px;"
    title="title"
    >{{ icon }}:{{ amount }}
    <span v-if="amountPerTick && amountPerTick!= '0'" :style="colorAmount"
      >({{ amountPerTick }})</span
    >
  </a>
</template>
<script>
export default {
  name: "resource",
  props: {
    icon: {
      type: String,
      required: true
    },
    amount: {
      type: Number,
      required: true
    },
    colorAmount: {
      type: String
    },
    amountPerTick: {
      type: String
    }
  }
};
</script>
