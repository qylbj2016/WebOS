<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
import { mapMutations } from "vuex";
export default {
  methods: {
    ...mapMutations(["updateOnlineStatus"])
  },
  mounted() {
    window.addEventListener("online", this.updateOnlineStatus);
    window.addEventListener("offline", this.updateOnlineStatus);
  },
  beforeDestroy() {
    window.removeEventListener("online", this.updateOnlineStatus);
    window.removeEventListener("offline", this.updateOnlineStatus);
  }
};
</script>

<style lang="scss">
@import url("//unpkg.com/element-ui@2.13.0/lib/theme-chalk/index.css");
</style>
