<template>
  <div class="snsaver">
    <label for="snpwd" class="ipt" v-if="dopwd">
      <span>{{ tips }}</span>
      <el-input
        id="snpwd"
        @input="v => check(v)"
        v-model="snpwd"
        placeholder="请输入锁屏密码"
      ></el-input>
    </label>
    <el-button class="btn" size="small" type="success" round @click="show">{{
      btnVal
    }}</el-button>
    <div class="time">
      <div class="time_item">{{ t.time }}</div>
      <div class="time_item">{{ t.date }}</div>
    </div>
    <el-carousel indicator-position="none" :interval="4000">
      <el-carousel-item v-for="item in snsaver" :key="item">
        <img :src="item" />
      </el-carousel-item>
    </el-carousel>
  </div>
</template>
<script>
import { snsaver } from "../../utils/urls";
import { mapState, mapMutations } from "vuex";
export default {
  data() {
    return {
      snsaver,
      dopwd: false,
      btnVal: "结束锁屏",
      snpwd: "",
      tips: " ",
      timer: null
    };
  },
  computed: {
    ...mapState({
      isSnpwd: state => ~~state.config.curData.isSnpwd,
      pwd: state => state.config.curData.snpwd,
      t: state => state.init.date
    })
  },
  methods: {
    ...mapMutations(["showSnsaver", "initStime"]),
    check(v) {
      if (v === this.pwd) {
        this.showSnsaver(false);
        this.initStime();
      } else {
        this.tips = "锁屏密码错误";
      }
    },
    show() {
      if (this.isSnpwd) {
        this.dopwd = !this.dopwd;
        this.btnVal = this.dopwd ? "继续睡眠" : "结束锁屏";
        if (this.dopwd) {
          this.snpwd = "";
        } else {
          this.tips = "";
        }
      } else {
        this.showSnsaver(false);
        this.initStime();
      }
    }
  }
};
</script>

<style lang="scss">
.snsaver {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  min-width: 1260px;
  min-height: 700px;
  .ipt {
    position: absolute;
    width: 250px;
    height: 60px;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -80%);
    z-index: 100;
    width: 200px;
    span {
      color: red;
      padding-left: 1px;
    }
    .el-input {
      opacity: 0.8;
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      margin-top: 3px;
    }
  }
  .btn {
    position: absolute;
    top: 2rem;
    right: 4rem;
    opacity: 0.8;
    z-index: 100;
  }
  .time {
    z-index: 100;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, 60%);
    display: flex;
    flex-direction: column;
    align-items: center;
    .time_item {
      font-size: 3rem;
      font-weight: 700;
      color: rgba(255, 255, 255, 0.6);
      letter-spacing: 3px;
      text-shadow: 2px 2px 2px #000;
    }
  }
  .el-carousel {
    height: 100%;
    width: 100%;
    .el-carousel__container {
      height: 100%;
      width: 100%;
      z-index: 10;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>
