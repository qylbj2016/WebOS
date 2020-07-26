<template>
  <div
    class="main_wrapper"
    @dragover.stop.prevent="() => true"
    @contextmenu.prevent.stop="e => rightClick({ x: e.pageX, y: e.pageY })"
  >
    <Draggable
      v-model="$store.state.apps.preApps"
      class="icons_wrapper"
      @update="updateApps({ op: 'sort' })"
    >
      <Icon
        v-for="(item, index) in preApps"
        :key="item.name + index"
        :appInfo="item"
        @dblclick.native="newTask(item)"
      />
      <ul class="icon_menu" v-if="menuStatus === 2" :style="menuPosition">
        <li class="menu_item" @click="newTask(curApp)">打开</li>
        <li class="menu_item" @click="updateApps({ op: 'del', it: curApp })">
          移除
        </li>
      </ul>
    </Draggable>
    <Tips v-if="dotips" />
    <Window
      v-for="(item, index) in taskArr"
      :style="style"
      :key="item + index"
      :task="item"
      draggable="true"
    />
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import Draggable from "vuedraggable";
import Icon from "./Icon";
import Window from "./Window";
import Tips from "../app/Tips";
import { objToArr } from "../../utils/tools";
export default {
  components: {
    Icon,
    Window,
    Draggable,
    Tips
  },
  computed: {
    ...mapState({
      tasks: state => state.task.tasks,
      preApps: state => state.apps.preApps,
      curApp: state => state.status.curApp,
      menuStatus: state => state.status.menuStatus,
      menuPosition: state => state.status.menuPosition,
      borderColor: state => state.config.curData.borderColor,
      dotips: state => state.status.dotips
    }),
    taskArr() {
      return objToArr(this.tasks);
    },
    style() {
      return {
        backgroundColor: this.borderColor
      };
    }
  },
  methods: {
    ...mapMutations([
      "addTask",
      "showTheWindow",
      "updateApps",
      "changeData",
      "rightClick",
      "showTips"
    ]),
    newTask(task) {
      if (!task.canAllowMore && this.tasks[task.appId]) {
        this.showTheWindow({ task: this.tasks[task.appId][0], status: true });
      } else {
        task.width ? "" : (task.width = "800px");
        task.height ? "" : (task.height = "600px");
        task.windowIsShowing = true;
        this.addTask(task);
      }
    }
  },
};
</script>

<style lang="scss">
.main_wrapper {
  width: 100%;
  height: calc(100vh - 45px);
  position: relative;
  .icons_wrapper {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: stretch;
    flex-wrap: wrap;
    height: 100%;
    width: 0;
    .icon_menu {
      position: fixed;
      cursor: pointer;
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
}
</style>
