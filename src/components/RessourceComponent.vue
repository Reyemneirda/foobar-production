<template>
  <a
    class="nav-link disabled"
    href="#"
    tabindex="-1"
    style="font-size: 42px;"
    title="title"
    >{{ icon }}:{{ amount }}
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
    }
  }
};
</script>
