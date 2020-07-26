<template>
  <div class="footer_wrapper">
    <div class="blur" :style="bgStyle"></div>
    <div class="taskbar">
      <div class="shipit">
        <img
          src="@/assets/img/logo.jpg"
          alt="开始"
          @click.stop="showShipitmenu(!shipitmenu)"
        />
        <div class="menu" v-if="shipitmenu" @click.stop="() => {}">
          <div class="icons">
            <div
              @click="addTask(item)"
              class="icon_item"
              v-for="item in apps"
              :key="item.name"
            >
              <img :src="item.icon" :alt="item.name" />
              <span>{{ item.name }}</span>
            </div>
          </div>
          <div class="options">
            <div
              @click="open(item)"
              class="option_item"
              v-for="(item, index) in options"
              :key="item.name + index"
            >
              <span>{{ item.name }}</span>
            </div>
            <el-divider></el-divider>
            <el-button id="logoff" type="danger" size="mini" @click="logoff"
              >注销</el-button
            >
          </div>
        </div>
      </div>
      <div class="tasks">
        <div v-for="(v, k, i) in tasks" :key="v + i" class="task_item">
          <el-avatar shape="square" size="medium" :src="v[0].icon" />
          <ul class="task_list">
            <li
              v-for="(item, index) in v"
              :key="item + index"
              @click="showTheWindow({ task: item })"
            >
              <span>{{
                index === 0 ? item.name : `${item.name}-${index}`
              }}</span>
              <el-button
                type="danger"
                icon="el-icon-close"
                plain
                size="mini"
                @click.stop.native="delTask(item)"
              ></el-button>
            </li>
          </ul>
        </div>
      </div>
      <div class="statusbar">
        <div class="timebox" @click.stop="showCalendar(!calendar)">
          <span>{{ date.time }}</span>
          <span>{{ date.date }}</span>
        </div>
        <div
          v-if="calendar"
          class="calendar_wrapper"
          @click.stop="showCalendar(true)"
        >
          <el-calendar v-model="value"></el-calendar>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";
export default {
  data() {
    return {
      value: new Date(),
      icons: ["004", "005", "007", "008", "009", "012", "014", "019"],
      options: [
        {
          name: "系统设置",
          appId: "003"
        },
        {
          name: "关于系统",
          appId: "021"
        },
        {
          name: "操作说明"
        },
        {
          name: "留言区",
          appId: "002"
        }
      ]
    };
  },
  computed: {
    ...mapState({
      tasks: state => state.task.tasks,
      calendar: state => state.status.calendar,
      shipitmenu: state => state.status.shipitmenu,
      curBgIdx: state => state.config.curBgIdx,
      bgArr: state => state.config.bgArr,
      date: state => state.init.date,
      allApps: state => state.apps.apps,
      name: state => state.user.name
    }),
    bgStyle() {
      return { backgroundImage: `url( ${this.bgArr[this.curBgIdx]})` };
    },
    apps() {
      let temp = [];
      this.allApps.forEach(item => {
        if (this.icons.indexOf(item.appId) >= 0) {
          temp.push(item);
        }
      });
      return temp;
    }
  },
  methods: {
    ...mapMutations([
      "showTheWindow",
      "showCalendar",
      "showShipitmenu",
      "delTask",
      "addTask",
      "showTips"
    ]),
    ...mapActions(["updatePreData"]),
    open(item) {
      item.appId
        ? this.addTask(this.allApps.find(it => it.appId === item.appId))
        : this.showTips(true);
    },
    logoff() {
      this.$confirm("是否确定需要注销并返回登录页面?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "注销成功!"
          });
          if (this.name === "游客") {
            this.updatePreData({
              borderColor: "#BBB",
              fontColor: "#000",
              light: 100,
              sleeptime: 300,
              snpwd: "",
              scale: 1,
              isSnpwd: 0,
              haveTips: 1
            });
          }
          this.$router.push("/");
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消注销"
          });
        });
    }
  }
};
</script>

<style lang="scss">
.footer_wrapper {
  height: 100%;
  box-sizing: border-box;
  position: relative;
  .blur {
    position: absolute;
    width: 100%;
    height: 100%;
    background-attachment: fixed;
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    filter: blur(15px);
  }
  .taskbar {
    z-index: 100;
    display: flex;
    height: 100%;
    box-sizing: border-box;
    background-color: rgba(0, 0, 0, 0.7);
    border-top: 0.5px solid rgba(0, 0, 0, 0.2);
    div,
    button,
    span {
      background-color: transparent;
    }
    .shipit {
      position: relative;
      img {
        width: 39px;
        height: 39px;
        padding: 2px 10px 3px;
        border-radius: 50%;
      }
      .menu {
        display: flex;
        position: absolute;
        box-sizing: border-box;
        bottom: 45px;
        background-color: rgba(0, 0, 0, 0.5);
        padding: 0.6rem;
        border-radius: 3px 3px 0 0;
        .icons {
          background-color: rgba(255, 255, 255, 1);
          min-width: 17rem;
          border-radius: 4px;
          padding: 1rem 0.5rem;
          .icon_item {
            border-radius: 2px;
            display: flex;
            align-items: center;
            padding: 1px 0.8rem;
            cursor: pointer;
            img {
              border-radius: 0;
              padding-right: 0.4rem;
              padding-left: 0;
              margin-right: 0.3rem;
            }
            &:hover {
              box-shadow: 0 0 1px 1px rgba(64, 158, 255, 0.8);
              background-color: #bbb;
            }
          }
        }
        .options {
          min-width: 8rem;
          box-sizing: border-box;
          border-radius: 4px;
          display: flex;
          padding: 2rem 1rem;
          flex-direction: column;
          align-items: center;
          position: relative;
          .el-divider {
            background-color: #555;
          }
          .option_item {
            color: rgba(255, 255, 255, 0.8);
            margin-bottom: 1rem;
            cursor: pointer;
          }
          #logoff {
            position: absolute;
            bottom: 1rem;
          }
        }
      }
    }
    .tasks {
      flex: 4;
      padding: 0 1rem;
      display: flex;
      .task_item {
        box-sizing: border-box;
        position: relative;
        margin-right: 0.5rem;
        padding: 3px 1.2rem;
        background-color: transparent;
        &:hover {
          background-color: rgba(255, 255, 255, 0.2);
          .task_list {
            display: block;
          }
        }
        .task_list {
          display: none;
          min-width: 100%;
          position: absolute;
          bottom: 45px;
          left: -50%;
          transform: translateX(50%);
          li {
            position: relative;
            width: 120px;
            bottom: 0;
            left: -45px;
            background-color: rgba(255, 255, 255, 0.4);
            min-width: 100%;
            box-sizing: border-box;
            text-align: center;
            border: 0.5px solid rgba(0, 0, 0, 0.6);
            border-bottom: none;
            cursor: pointer;
            font-size: 1rem;
            display: flex;
            justify-content: space-around;
            padding: 0.4rem 0.5rem;
            span {
              padding: 2px 1px 2px 1px;
            }
            .el-button {
              z-index: 10;
              padding: 1px;
            }
          }
        }
      }
    }
    .statusbar {
      flex: 1;
      position: relative;
      .timebox {
        color: #ccc;
        width: 28%;
        float: right;
        display: flex;
        flex-direction: column;
        align-items: center;
        height: 100%;
        cursor: pointer;
        box-sizing: border-box;
        &:hover {
          border-left: 0.8px solid rgba(0, 0, 0, 0.2);
          border-right: 0.8px solid rgba(0, 0, 0, 0.2);
        }
        span {
          height: 50%;
          line-height: 22.5px;
          font-size: 0.8rem;
        }
      }
      .calendar_wrapper {
        position: absolute;
        width: 390px;
        right: 0;
        bottom: 45px;
        .el-calendar {
          width: 100%;
          background-color: rgba(255, 255, 255, 0.4);
          .el-calendar-table:not(.is-range) td.next,
          .el-calendar-table:not(.is-range) td.prev {
            color: #444;
          }
          .el-calendar-table thead th {
            color: #000;
          }
          .el-button {
            color: #111;
          }
          .el-calendar-day {
            height: 45px;
          }
        }
      }
    }
  }
}
</style>
