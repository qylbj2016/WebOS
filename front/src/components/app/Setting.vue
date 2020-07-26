<template>
  <div class="config_wrapper">
    <div class="setting_box">
      <el-divider content-position="left">显示</el-divider>
      <div class="setting_item">
        <el-carousel
          :initial-index="0"
          :autoplay="false"
          indicator-position="none"
          @change="idx => changeData({ bgIdx: idx })"
          type="card"
          height="200px"
        >
          <el-carousel-item v-for="(item, index) in bgArr" :key="item + index">
            <img :src="item" />
          </el-carousel-item>
        </el-carousel>
        <div class="opts_item">
          <span>屏幕亮度(%):</span>
          <el-slider
            v-model="light"
            :format-tooltip="formatTooltip"
            :min="30"
          ></el-slider>
        </div>
        <div class="opts_item">
          <span>控件大小:</span>
          <el-slider v-model="scale" :step="0.1" :min="1" :max="2"></el-slider>
        </div>
        <div class="opts_item">
          <div class="color_item">
            <span>字体颜色:</span>
            <div class="color_box">
              <el-color-picker
                v-model="fontColor"
                @active-change="c => changeData({ fontColor: c })"
              ></el-color-picker>
            </div>
          </div>
          <div class="color_item">
            <span>边框颜色:</span>
            <div class="color_box">
              <el-color-picker
                v-model="borderColor"
                @active-change="c => changeData({ borderColor: c })"
              ></el-color-picker>
            </div>
          </div>
        </div>
      </div>
      <el-divider content-position="left">其他</el-divider>
      <div class="setting_item">
        <div class="opts_item">
          <span>睡眠时间(min):</span>
          <el-slider
            v-model="sleeptime"
            :step="5"
            :min="5"
            :max="100"
          ></el-slider>
        </div>
        <div class="opts_item">
          <span>锁屏密码:</span>
          <div class="pwd_ipt">
            <el-checkbox v-model="isSnpwd">启用</el-checkbox>
            <div class="snpwd_tips" v-if="!canSave && isSnpwd">
              输入不能为空
            </div>
            <el-input
              v-if="isSnpwd"
              v-model="snpwd"
              @input="check"
              placeholder="请输入内容"
            ></el-input>
          </div>
        </div>
      </div>
    </div>
    <div class="btn_wrapper">
      <el-button type="primary" @click="save()">保存更改</el-button>
      <el-button type="primary" @click="restore()">恢复预设</el-button>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";
export default {
  mounted() {
    this.$emit("remove");
  },
  destroyed() {
    this.restore();
  },
  data() {
    return {
      canSave: true
    };
  },
  computed: {
    ...mapState({
      bgArr: state => state.config.bgArr,
      curData: state => state.config.curData,
      preData: state => state.config.preData
    }),
    bgIdx: {
      get() {
        return this.curData.bgIdx;
      },
      set(val) {
        this.changeData({ bgIdx: val });
      }
    },
    light: {
      get() {
        return this.curData.light;
      },
      set(val) {
        this.changeData({ light: val });
      }
    },
    scale: {
      get() {
        return this.curData.scale;
      },
      set(val) {
        this.changeData({ scale: val });
      }
    },
    sleeptime: {
      get() {
        return this.curData.sleeptime / 60;
      },
      set(val) {
        this.changeData({ sleeptime: val * 60 });
      }
    },
    fontColor: {
      get() {
        return this.curData.fontColor;
      },
      set(val) {
        this.changeData({ fontColor: val });
      }
    },
    borderColor: {
      get() {
        return this.curData.borderColor;
      },
      set(val) {
        this.changeData({ borderColor: val });
      }
    },
    snpwd: {
      get() {
        return this.curData.snpwd;
      },
      set(val) {
        this.changeData({ snpwd: val });
      }
    },
    isSnpwd: {
      get() {
        return !!~~this.curData.isSnpwd;
      },
      set(val) {
        this.changeData({ isSnpwd: val ? 1 : 0 });
      }
    }
  },
  methods: {
    ...mapMutations(["restore", "changeData", "delTask"]),
    ...mapActions(["updatePreData"]),
    check() {
      this.canSave = this.isSnpwd ? (this.snpwd == "" ? false : true) : true;
    },
    formatTooltip(val) {
      return val / 100;
    },
    save() {
      let temp = {};
      for (let prop in this.curData) {
        this.curData[prop] !== this.preData[prop]
          ? (temp[prop] = this.curData[prop])
          : "";
      }
      if (this.canSave) {
        JSON.stringify(temp) !== "{}" ? this.updatePreData(temp) : "";
      } else {
        this.$message({
          type: "error",
          message: "锁屏密码不能为空"
        });
      }
    },
    close(task) {
      if (
        JSON.stringify(this.curData) !== JSON.stringify(this.preData) &&
        this.canSave
      ) {
        this.$confirm(
          "检测到未保存的内容，是否在离开页面前保存修改？",
          "确认信息",
          {
            distinguishCancelAndClose: true,
            confirmButtonText: "保存",
            cancelButtonText: "放弃修改"
          }
        )
          .then(() => {
            this.$message({
              type: "info",
              message: "保存修改"
            });
            this.save();
          })
          .catch(action => {
            this.$message({
              type: "info",
              message:
                action === "cancel" ? "放弃保存并离开页面" : "停留在当前页面"
            });
            action === "cancel" ? this.delTask(task) : "";
          });
      } else {
        this.delTask(task);
      }
    }
  }
};
</script>

<style lang="scss">
.config_wrapper {
  .el-divider {
    width: 95%;
    margin: 2rem auto;
  }
  .setting_box {
    height: 470px;
    overflow: scroll;
    box-shadow: 0 2px 3px 0.5px #777;
    .setting_item {
      width: 75%;
      margin: 0 auto;
      .el-carousel {
        margin: 2rem auto;
        width: 100%;
        .el-carousel__item {
          img {
            width: 100%;
            height: 100%;
          }
          &:nth-child(2n) {
            background-color: #99a9bf;
          }

          &:nth-child(2n + 1) {
            background-color: #d3dce6;
          }
        }
      }
      .opts_item {
        width: 100%;
        display: flex;
        margin-bottom: 1rem;
        span {
          flex: 1;
          letter-spacing: 1px;
          line-height: 38px;
        }
        .el-slider,
        .pwd_ipt {
          flex: 4;
          .snpwd_tips {
            color: red;
            font-size: 12px;
            padding-left: 1px;
          }
        }
        .color_item {
          width: 50%;
          display: flex;
          span {
            flex: 2;
          }
          .color_box {
            flex: 3;
            .el-color-picker__trigger {
              width: 140px;
              .el-icon-close:before {
                content: "v";
              }
            }
          }
        }
      }
    }
  }
  .btn_wrapper {
    position: absolute;
    display: inline-block;
    left: 50%;
    bottom: 2rem;
    transform: translateX(-50%);
    .el-button:nth-child(1) {
      margin-right: 12rem;
    }
  }
}
</style>
