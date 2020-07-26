<template>
  <div class="home_wrapper" @click="clearMenu()" :style="bgStyle">
    <Omenu v-if="menuStatus === 1" />
    <Snsaver v-if="snsaver" />
    <el-container class="home">
      <el-header
        class="header"
        height="10px"
        @contextmenu.native.stop.prevent="() => {}"
      >
        <Topbar />
      </el-header>
      <el-main>
        <Main />
      </el-main>
      <el-footer height="45px" @contextmenu.native.stop.prevent="() => {}">
        <Taskbar />
      </el-footer>
    </el-container>
  </div>
</template>
<script>
import screenfull from "screenfull";
import Snsaver from "../components/public/Snsaver";
import Omenu from "../components/public/Omenu";
import Topbar from "../components/public/Topbar";
import Main from "../components/public/Main";
import Taskbar from "../components/public/Taskbar";
import { Loading } from "element-ui";
import { mapState, mapMutations, mapActions } from "vuex";
export default {
  data() {
    return {
      timer: null,
      loadingInstance: Loading.service({
        fullscreen: true,
        loadingText: "正在加载中"
      })
    };
  },
  components: {
    Snsaver,
    Topbar,
    Main,
    Taskbar,
    Omenu
  },
  methods: {
    ...mapActions(["initData"]),
    ...mapMutations(["clearMenu", "setTime", "showSnsaver", "initTasks"])
  },
  computed: {
    ...mapState({
      snsaver: state => state.status.snsaver,
      curData: state => state.config.curData,
      bgArr: state => state.config.bgArr,
      isFullScreen: state => state.status.screenfull,
      menuStatus: state => state.status.menuStatus,
      stime: state => state.init.stime,
      sleeptime: state => state.config.curData.sleeptime
    }),
    bgStyle() {
      return {
        backgroundImage: `url( ${this.bgArr[this.curData.bgIdx]})`,
        filter: `brightness(${this.curData.light / 100})`,
        zoom: this.curData.scale,
        color: this.curData.fontColor
      };
    }
  },
  watch: {
    isFullScreen() {
      screenfull.toggle();
    }
  },
  async created() {
    this.timer = setInterval(() => {
      this.setTime();
      this.stime > this.sleeptime ? this.showSnsaver(true) : "";
    }, 1000);
    let res = await this.initData();
    if (res) {
      this.$message({
        showClose: true,
        message: res,
        type: "warning"
      });
      this.$router.push("/");
    }
    await this.$nextTick(() => {
      this.loadingInstance.close();
    });
  },
  beforeRouteLeave(to, from, next) {
    clearInterval(this.timer);
    this.initTasks();
    this.$destroy();
    next();
  }
};
</script>

<style lang="scss">
.home_wrapper {
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
  position: relative;
  .home {
    padding: 0;
    .header {
      width: 100%;
      position: absolute;
      z-index: 100;
      &:hover {
        .topbar_wrapper {
          height: 50px;
          .opts {
            opacity: 1;
          }
        }
      }
    }
  }
  .el-main,
  .el-footer {
    padding: 0;
  }
}
</style>
