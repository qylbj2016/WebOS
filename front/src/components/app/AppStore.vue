<template>
  <el-tabs tab-position="left">
    <el-tab-pane v-for="item in type" :key="item" :label="item">
      <Icon
        v-for="(it, idx) in sApps[item]"
        :key="it + idx"
        :appInfo="it"
        @dblclick.native="updateApps({ op: 'add', it })"
      />
      <div class="empty" v-if="!sApps[item]">
        <img src="/img/empty.svg" alt="Empty" />
        <span>没有任何该类应用</span>
      </div>
    </el-tab-pane>
  </el-tabs>
</template>
<script>
import Icon from "../public/Icon";
import { mapState, mapMutations } from "vuex";
export default {
  components: {
    Icon
  },
  data() {
    return {
      type: ["办公", "音频", "游戏", "其他"]
    };
  },
  mounted() {
    this.$emit("remove");
  },
  computed: {
    ...mapState({
      sApps: state => {
        let temp = {};
        state.apps.sApps.forEach(item => {
          if (temp[item.type]) {
            temp[item.type].push(item);
          } else {
            temp[item.type] = [item];
          }
        });
        return temp;
      }
    })
  },
  methods: {
    ...mapMutations(["updateApps"])
  }
};
</script>
<style lang="scss">
.el-tabs {
  width: 100%;
  height: 100%;
  .el-tab-pane {
    display: flex;
    .empty {
      margin: auto;
      margin-top: 120px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      img {
        width: 120px;
        height: 120px;
      }
      span {
        color: #555;
        letter-spacing: 1.2px;
      }
    }
  }
}
</style>
