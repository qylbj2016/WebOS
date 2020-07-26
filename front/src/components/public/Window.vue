<template>
  <el-container
    class="window_wrapper"
    v-show="task.windowIsShowing"
    :style="initStyle"
    draggable="true"
    @dragstart.native="e => onresizestart(e)"
    @drag.native="e => onresize(e)"
    @dragend.native="ondragend()"
    @mousemove.native="e => changecursor(e)"
  >
    <div
      class="drag_wrapper"
      draggable="true"
      @dragstart.stop="e => ondragstart(e)"
      @drag.stop="e => ondrag(e.clientX, e.clientY)"
      @dragend.stop="ondragend()"
    ></div>
    <el-header height="auto">
      <div class="w_title">
        <el-avatar shape="square" :size="20" :src="task.icon"></el-avatar>
        <span>{{
          task.taskId === 0 ? task.name : `${task.name}-${task.taskId}`
        }}</span>
      </div>
      <div class="w_btns">
        <el-button
          icon="el-icon-remove-outline"
          size="mini"
          @click="changeWindowStatus('min')"
        ></el-button>
        <el-button
          v-if="task.canScale"
          :icon="btnIcon"
          size="mini"
          @click="changeWindowStatus('max')"
        ></el-button>
        <el-button
          icon="el-icon-close"
          size="mini"
          @click="changeWindowStatus('close')"
        ></el-button>
      </div>
    </el-header>
    <el-main
      v-loading="loading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
    >
      <AppStore v-if="task.appId === '001'" @remove="() => (loading = false)" />
      <Cmt v-else-if="task.appId === '002'" @remove="() => (loading = false)" />
      <About
        v-else-if="task.appId === '021'"
        @remove="() => (loading = false)"
      />
      <Setting
        ref="child"
        v-else-if="task.appId === '003'"
        @remove="() => (loading = false)"
      />
      <iframe
        :id="task.name + task.taskId"
        v-else
        width="100%"
        height="99%"
        :src="task.src"
      ></iframe>
    </el-main>
  </el-container>
</template>

<script>
import { mapMutations } from "vuex";
import AppStore from "../app/AppStore";
import Cmt from "../app/Cmt";
import Setting from "../app/Setting";
import About from "../app/About";
export default {
  components: {
    AppStore,
    Cmt,
    Setting,
    About
  },
  props: { task: Object },
  data() {
    return {
      btnIcon: "el-icon-zoom-in",
      status: 1, // 正常 1  最大化 2
      dragPos: {
        x: 0,
        y: 0
      },
      loading: true,
      memory: null,
      initStyle: {
        width: this.task.width,
        height: this.task.height,
        left: this.$getViewportSize().width / 2 - 400 + "px",
        top: this.$getViewportSize().height / 2 - 350 + "px",
        right: "auto",
        bottom: "auto",
        cursor: "default"
      }
    };
  },
  created() {
    this.ondragend();
  },
  mounted() {
    if (document.getElementById(`${this.task.name}${this.task.taskId}`)) {
      document.getElementById(
        `${this.task.name}${this.task.taskId}`
      ).onload = () => {
        this.loading = false;
      };
    }
  },
  methods: {
    ...mapMutations(["showTheWindow", "changeData", "delTask"]),
    changeWindowStatus(op) {
      if (op === "min") {
        this.showTheWindow({ task: this.task, status: false });
      } else if (op === "max") {
        if (this.status === 1) {
          (this.memory = JSON.parse(JSON.stringify(this.initStyle))),
            (this.initStyle.width = "100%"),
            (this.initStyle.height = "calc(100% - 45px)"),
            (this.initStyle.top = "0px"),
            (this.initStyle.left = "0px"),
            (this.status = 2),
            (this.btnIcon = "el-icon-zoom-out");
        } else {
          (this.initStyle.width = this.memory.width),
            (this.initStyle.height = this.memory.height),
            (this.status = 1),
            (this.initStyle.top = this.memory.top),
            (this.initStyle.left = this.memory.left),
            (this.btnIcon = "el-icon-zoom-in");
        }
      } else {
        this.task.appId === "003" || this.task.appId === "020"
          ? this.$refs.child.close(this.task)
          : this.delTask(this.task);
      }
    },
    changecursor(e) {
      if (!this.task.canScale) return;
      let x = e.clientX,
        y = e.clientY,
        { left, top, right, bottom } = e.currentTarget.getBoundingClientRect();
      if (x - left < 8 && y - top < 8) {
        this.initStyle.cursor = "nw-resize";
      } else if (right - x < 8 && bottom - y < 8) {
        this.initStyle.cursor = "se-resize";
      } else if (x - left < 8 && bottom - y < 8) {
        this.initStyle.cursor = "sw-resize";
      } else if (right - x < 8 && y - top < 8) {
        this.initStyle.cursor = "ne-resize";
      } else {
        if (x - left < 8) {
          this.initStyle.cursor = "w-resize";
        } else if (right - x < 8) {
          this.initStyle.cursor = "e-resize";
        } else if (y - top < 8) {
          this.initStyle.cursor = "n-resize";
        } else if (bottom - y < 8) {
          this.initStyle.cursor = "s-resize";
        } else {
          this.initStyle.cursor = "default";
        }
      }
    },
    onresizestart(e) {
      if (!this.task.canScale) return;
      this.dragPos.x = e.clientX;
      this.dragPos.y = e.pageY;

      switch (this.initStyle.cursor) {
        case "w-resize":
          this.initStyle.left = "auto";
          break;
        case "e-resize":
          this.initStyle.right = "auto";
          break;
        case "n-resize":
          this.initStyle.top = "auto";
          break;
        case "s-resize":
          this.initStyle.bottom = "auto";
          break;
        case "nw-resize":
          this.initStyle.left = "auto";
          this.initStyle.top = "auto";
          break;
        case "se-resize":
          this.initStyle.right = "auto";
          this.initStyle.bottom = "auto";
          break;
        case "sw-resize":
          this.initStyle.bottom = "auto";
          this.initStyle.left = "auto";
          break;
        case "ne-resize":
          this.initStyle.top = "auto";
          this.initStyle.right = "auto";
          break;
      }
    },
    onresize(e) {
      if (!this.task.canScale) return;
      let { width, height } = e.currentTarget.getBoundingClientRect(),
        { left, top, bottom, right } = this.initStyle,
        w = width,
        h = height,
        wh = this.$getViewportSize();
      switch (this.initStyle.cursor) {
        case "w-resize":
          w = wh.width - e.clientX - Number.parseInt(right);
          break;
        case "e-resize":
          w = e.clientX - Number.parseInt(left);
          break;
        case "n-resize":
          h = wh.height - e.clientY - Number.parseInt(bottom);
          break;
        case "s-resize":
          h = e.clientY - Number.parseInt(top);
          break;
        case "nw-resize":
          h = wh.height - e.clientY - Number.parseInt(bottom);
          w = wh.width - e.clientX - Number.parseInt(right);
          break;
        case "se-resize":
          h = e.clientY - Number.parseInt(top);
          w = e.clientX - Number.parseInt(left);
          break;
        case "sw-resize":
          h = e.clientY - Number.parseInt(top);
          w = wh.width - e.clientX - Number.parseInt(right);
          break;
        case "ne-resize":
          h = wh.height - e.clientY - Number.parseInt(bottom);
          w = e.clientX - Number.parseInt(left);
          break;
      }
      if (w > 200 && h > 300) {
        this.initStyle.width = w + "px";
        this.initStyle.height = h + "px";
      }
    },
    ondragstart(e) {
      let { top, left } = e.currentTarget.getBoundingClientRect();
      this.dragPos.x = e.clientX - left + 8;
      this.dragPos.y = e.clientY - top + 8;
    },
    ondrag(x, y) {
      if (x && y) {
        this.initStyle.left = x - this.dragPos.x + "px";
        this.initStyle.top = y - this.dragPos.y + "px";
      }
    },
    ondragend() {
      let { left, top } = this.initStyle;
      left === "auto"
        ? (this.initStyle.left = this.$tool("left"))
        : (this.initStyle.right = this.$tool("right"));
      top === "auto"
        ? (this.initStyle.top = this.$tool("top"))
        : (this.initStyle.bottom = this.$tool("bottom"));
      this.initStyle.cursor = "default";
    },
    $tool(n) {
      let wh = this.$getViewportSize(),
        res,
        { left, top, right, bottom, width, height } = this.initStyle;
      switch (n) {
        case "left":
          res =
            wh.width - Number.parseInt(width) - Number.parseInt(right) + "px";
          break;
        case "right":
          res =
            wh.width - Number.parseInt(width) - Number.parseInt(left) + "px";
          break;
        case "top":
          res =
            wh.height -
            Number.parseInt(height) -
            Number.parseInt(bottom) +
            "px";
          break;
        case "bottom":
          res =
            wh.height - Number.parseInt(height) - Number.parseInt(top) + "px";
          break;
      }
      return res;
    }
  }
};
</script>

<style lang="scss">
.window_wrapper {
  position: fixed;
  background-color: #ccc;
  border-radius: 4px;
  padding: 6px 8px;
  box-shadow: 0 0 4px 0.5px #111;
  cursor: resize;
  .drag_wrapper {
    top: 8px;
    right: 8px;
    left: 8px;
    bottom: 8px;
    cursor: move;
    position: absolute;
  }
  .el-header {
    display: flex;
    justify-content: space-between;
    padding: 0 0 6px;
    box-sizing: border-box;
    .w_title {
      height: 28px;
      line-height: 28px;
      margin-left: 2px;
      span {
        vertical-align: middle;
        margin-right: 7px;
        color: #555;
      }
    }
    .w_btns {
      z-index: 10;
      .el-button {
        cursor: default;
        margin: 0;
      }
    }
  }
  .el-main {
    z-index: 10;
    border-radius: 2px;
    box-sizing: border-box;
    box-shadow: 0px 0px 2px 1px #444;
    cursor: default;
    iframe {
      box-sizing: border-box;
      border: 1px solid #666;
      outline: none;
    }
  }
}
</style>
