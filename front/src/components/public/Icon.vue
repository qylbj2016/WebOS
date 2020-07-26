<template>
  <div
    class="icon_wrapper"
    @contextmenu.stop.prevent="
      e => rightClickApp({ app: appInfo, x: e.pageX, y: e.pageY })
    "
  >
    <div class="img_wrapper">
      <img :src="appInfo.icon" :alt="appInfo.name" />
    </div>
    <div class="name_wrapper">
      <span>{{ appInfo.name }}</span>
    </div>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  props: { appInfo: Object },
  methods: {
    ...mapMutations(["rightClickApp"])
  }
};
</script>

<style lang="scss">
.icon_wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 80px;
  margin: 0.5rem 0;
  padding: 0.5rem 0 0;
  border-radius: 2px;
  &:hover,
  :active {
    background-color: rgba(0, 0, 0, 0.1);
  }
  .img_wrapper {
    img {
      width: 56px;
      height: 56px;
      border-radius: 1px;
    }
  }
  .name_wrapper {
    span {
      height: 1rem;
      line-height: 1rem;
      cursor: default;
    }
  }
}
</style>
