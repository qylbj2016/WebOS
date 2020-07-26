<template>
  <div class="topbar_wrapper">
    <div class="opts">
      <div class="user">
        <el-avatar size="small" :src="head" />
        <span>{{ name }}</span>
      </div>
      <div class="online">
        <span>网络{{ online ? "在线" : "离线" }}</span>
        <span
          class="point"
          :style="
            online ? { backgroundColor: 'green' } : { backgroundColor: 'red' }
          "
        ></span>
      </div>
      <div class="time">已浏览时长：{{ formatTime(vtime) }}</div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { formatTime } from "../../utils/time";
export default {
  computed: {
    ...mapState({
      name: state => state.user.name,
      head: state => state.user.head,
      vtime: state => state.init.vtime,
      online: state => state.status.online
    })
  },
  methods: {
    formatTime
  }
};
</script>

<style lang="scss">
.topbar_wrapper {
  min-width: 600px;
  z-index: 100;
  width: 50%;
  position: absolute;
  overflow: hidden;
  padding: 0.5rem 0 0.2rem;
  height: 0;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  transition: height 2s ease-in-out;
  &::after {
    z-index: -1;
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    border-radius: 0 0 50% 50%;
    background-color: rgba(255, 255, 255, 0.6);
    transform: perspective(10px) rotateX(-10deg);
  }
  .opts {
    width: 60%;
    margin: 0 auto;
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 0.2rem 0 0.5rem;
    opacity: 0.1;
    transition: opacity 1s ease-in-out;
    span {
      vertical-align: middle;
    }
    .user {
      span {
        margin-left: 0.5rem;
      }
    }
    .online {
      .point {
        display: inline-block;
        width: 0.5rem;
        height: 0.5rem;
        border-radius: 50%;
        margin-left: 0.5rem;
        opacity: 0.5;
      }
    }
  }
}
</style>
