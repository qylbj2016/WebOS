<template>
  <div class="menu_wrapper" :style="menuPosition">
    <ul class="menu">
      <li class="menu_item" @click="clickFullscreen()">全屏显示</li>
      <li class="menu_item" @click="showDeskTop">显示桌面</li>
      <li class="menu_item" @click="showSnsaver">锁屏</li>
      <li class="menu_item" @click="refreshApps">刷新</li>
      <li class="menu_item" @click="addTask(setting)">系统设置</li>
    </ul>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  computed: {
    ...mapState({
      setting: state =>
        state.apps.preApps.find(item => {
          return item.appId === "003";
        }),
      menuPosition: state => state.status.menuPosition
    })
  },
  methods: {
    ...mapMutations([
      "showSnsaver",
      "clickFullscreen",
      "showDeskTop",
      "addTask",
      "refreshApps"
    ])
  }
};
</script>

<style lang="scss">
.menu_wrapper {
  z-index: 100;
  position: absolute;
  cursor: pointer;
  .menu {
    box-sizing: border-box;
    padding: 5px 5px 5px 10px;
    background-color: #fff;
    box-shadow: 2px 2px 1px 1px #aaa;
    width: 100px;
    .menu_item {
      box-sizing: border-box;
      width: 100%;
      height: 30px;
      line-height: 30px;
      &:not(:last-child)::after {
        content: "";
        display: block;
        width: 100%;
        border: 0.5px solid #aaa;
      }
    }
  }
}
</style>
