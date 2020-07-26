<template>
  <div class="tips_wrapper">
    <div class="tips_item">
      <img :src="steps[active - 1].src" :alt="steps[active - 1].desp" />
    </div>
    <el-steps :active="active" align-center finish-status="success">
      <el-step
        v-for="(item, index) in steps"
        :key="item + index"
        :title="item.title"
      ></el-step>
    </el-steps>
    <div class="btns">
      <el-button @click="pre" size="small">上一步</el-button>
      <el-button @click="close">关闭提示</el-button>
      <el-button @click="next" size="small">下一步</el-button>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapActions} from "vuex";
export default {
  data() {
    return {
      checked: true,
      active: 1,
      steps: [
        {
          title: "应用",
          src: "http://image.cinco.site/webos/20200603/0dAqCzyuxt4O.jpg?imageslim"
        },
        {
          title: "设置",
          src: "http://image.cinco.site/webos/20200603/EBlShdgnrqxX.jpg?imageslim"
        },
        {
          title: "留言",
          src: "http://image.cinco.site/webos/20200603/B1sVK1wiWMpd.jpg?imageslim"
        },
        {
          title: "其他",
          src: "http://image.cinco.site/webos/20200603/HYfikLjws53F.jpg?imageslim"
        }
      ]
    };
  },
  methods: {
    ...mapMutations(["showTips"]),
    ...mapActions(["updatePreData"]),
    next() {
      let temp = this.active + 1;
      temp <= 4 ? (this.active = temp) : "";
    },
    pre() {
      let temp = this.active - 1;
      temp >= 1 ? (this.active = temp) : "";
    },
    close() {
      this.showTips(false);
    }
  }
};
</script>

<style lang="scss">
.tips_wrapper {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
  background-color: rgba(128, 128, 128, 0.8);
  display: flex;
  flex-direction: column;
  align-items: center;
  img {
    width: 800px;
    height: 500px;
    border-radius: 3px;
    margin: 6rem 0 1.5rem;
  }
  .el-button:nth-last-child(2) {
    margin: 0 5rem;
  }
  .el-steps {
    width: 700px;
    margin-bottom: 1rem;
  }
  .opts {
    display: flex;
    .el-checkbox {
      margin-top: 1rem;
      color: rgba(240, 35, 35, 0.8);
    }
    .close {
      height: 19px;
      line-height: 19px;
      margin-top: 14px;
      margin-left: 4rem;
      cursor: pointer;
    }
  }
  .btns{
    display: flex;
    justify-content: space-between;
  }
}
</style>
