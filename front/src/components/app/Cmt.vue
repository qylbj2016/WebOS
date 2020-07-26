<template>
  <div class="about_wrapper">
    <div class="banner_wrapper">
      <img class="banner" src="@/assets/img/banner.jpg" />
    </div>
    <div class="cmt_wrapper">
      <div
        class="cmt_item"
        v-for="(item, index) in cmts.slice((curpage - 1) * 6, curpage * 6)"
        :key="item + index"
      >
        <el-avatar shape="square" :size="50" :src="item.userHead"></el-avatar>
        <div class="cmt_dls">
          <div class="cmt_top">
            <div class="user_info">
              <span class="user_name">{{ item.userName }}</span>
              <span class="cmt_time">发表于: {{ item.time }}</span>
            </div>
            <span>{{ item.cid + 1 }} 楼</span>
          </div>
          <div class="cmt_pt" v-if="item.parent">
            <span>
              回复
              <i>@{{ cmts.find(it => it.cid === item.parent).userName }}</i>
              发表的:
            </span>
            <p
              v-html="parse(cmts.find(it => it.cid === item.parent).comment)"
            ></p>
          </div>
          <div class="cmt_cd">
            <p v-html="parse(item.comment)"></p>
          </div>
          <div class="cmt_opts">
            <span class="hot_num"
              >已有{{ item.likeList.split("+").length - 1 }}人点赞</span
            >
            <span class="opts_btns">
              <el-button
                type="primary"
                v-if="item.likeList.split('+').find(it => it === name)"
                size="small"
                @click="thumbUp({ cid: item.cid, opt: 'sub', idx: index })"
                round
                >取赞</el-button
              >
              <el-button
                :type="!canWrite ? 'primary' : 'danger'"
                v-else
                @click="thumbUp({ cid: item.cid, opt: 'add', idx: index })"
                size="small"
                round
                :disabled="canWrite"
                >点赞</el-button
              >
              <el-button
                :type="!canWrite ? 'primary' : 'danger'"
                size="small"
                @click="reply(item.userName, item.cid)"
                round
                :disabled="canWrite"
              >
                <span v-if="canWrite">回复</span>
                <a v-if="!canWrite" href="#ipt">回复</a>
              </el-button>
            </span>
          </div>
        </div>
      </div>
      <el-pagination
        v-if="cmts.length"
        background
        layout="prev, pager, next"
        :page-size="6"
        :total="cmts.length"
        :current-page="curpage"
        @current-change="pageChange"
        @prev-click="prev_click"
        @next-click="next_click"
      ></el-pagination>
      <p class="no_cmt" v-else>暂无评论，快来抢沙发吧 ~~</p>
    </div>
    <div class="cmt_area">
      <div class="user_info">
        <el-avatar shape="square" :size="50" :src="head"></el-avatar>
        <div>{{ name }}</div>
      </div>
      <div class="area_wrapper">
        <div class="area_top">
          <div class="emoji">
            <img @click.stop="showTheEmoji()" :src="icon" alt="表情" />
            <ul v-if="status" class="emoji_box">
              <li
                class="emoji_item"
                v-for="(item, index) in emoji"
                :key="item + index"
                @click="addEmoji(item)"
              >
                <img :src="item.url" :alt="item.encode" />
              </li>
            </ul>
          </div>
          <div v-if="p">
            <span>to:{{ p }}楼</span>
            <el-button
              type="danger"
              @click="() => (p = 0)"
              icon="el-icon-close"
              size="mini"
              circle
            ></el-button>
          </div>
        </div>
        <el-input
          type="textarea"
          :placeholder="tips"
          v-model="textarea"
          maxlength="300"
          show-word-limit
          :disabled="canWrite"
          id="ipt"
        ></el-input>
        <div class="area_opts">
          <el-button
            type="primary"
            :disabled="canWrite"
            size="small"
            round
            @click="submit()"
            >提交留言</el-button
          >
          <el-checkbox v-model="checked"
            >同时提醒开发者查收您的留言</el-checkbox
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { emoji, parse } from "../../utils/emoji";
export default {
  data() {
    return {
      emoji,
      p: 0,
      checked: false,
      status: false,
      icon: "/emoji/silent.svg",
      textarea: "",
      url: "@/assets/img/banner.jpg",
      curpage: 1
    };
  },
  computed: {
    ...mapState({
      cmts: state => state.cmts.cmts,
      name: state => state.user.name,
      head: state => state.user.head,
      canWrite: state => state.user.name === "游客",
      tips: state =>
        state.user.name === "游客" ? "游客登录不支持评论" : "请输入内容"
    })
  },
  created() {
    this.getCmts();
  },
  mounted() {
    this.$emit("remove");
  },
  methods: {
    parse,
    ...mapActions(["getCmts", "writeCmt", "thumbUp"]),
    showTheEmoji() {
      this.status = !this.status;
      this.icon = this.status ? "/emoji/kiss.svg" : "/emoji/silent.svg";
    },
    addEmoji(item) {
      this.textarea += item.encode;
    },
    reply(n, cid) {
      if (n === this.name) {
        alert("不能给自己回复哦");
      } else {
        this.p = cid + 1;
      }
    },
    prev_click(p) {
      this.curpage = p - 1;
    },
    next_click(p) {
      this.curpage = p + 1;
    },
    pageChange(p) {
      this.curpage = p;
    },
    submit() {
      if (this.textarea !== "") {
        this.writeCmt({
          len: this.cmts.length,
          parent: this.p,
          text: this.textarea,
          head: this.head,
          name: this.name,
          contact: this.checked
        });
        this.p = 0;
        this.textarea = "";
        this.$message({
          message: "评论成功",
          type: "success"
        });
      } else {
        this.$message.error("消息不能为空");
      }
    }
  }
};
</script>

<style lang="scss">
.about_wrapper {
  box-sizing: border-box;
  width: 100%;
  padding: 1rem;
  position: relative;
  .banner_wrapper {
    width: 100%;
    padding-top: 30%;
    position: relative;
    .banner {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      border-radius: 2px;
    }
  }
  .cmt_wrapper {
    width: 90%;
    box-sizing: border-box;
    margin: auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    .cmt_item {
      margin-top: 1.5rem;
      display: flex;
      .cmt_dls {
        flex: 1;
        padding-left: 2%;
        &:after {
          content: " ";
          display: inline-block;
          width: 100%;
          border: 0.5px solid #999;
        }
        .cmt_top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          .user_info {
            .user_name {
              margin-right: 1rem;
              letter-spacing: 1px;
              color: blue;
              font-size: 1.1rem;
            }
            .cmt_time {
              color: #333;
            }
          }
        }
        .cmt_pt {
          margin-top: 1rem;
          background-color: #aaa;
          padding: 1rem;
          border-radius: 2px;
          span {
            letter-spacing: 1px;
            i {
              color: blue;
            }
          }
          p {
            margin: 1rem 0;
            font-size: 1.2rem;
          }
        }
        .cmt_cd {
          padding: 1.5rem 1rem;
          p {
            font-size: 1.3rem;
          }
        }
        img {
          width: 1.1em;
          height: 1.1em;
          margin: 0 0.4em;
        }
        .cmt_opts {
          display: flex;
          justify-content: space-between;
          align-items: center;
          .hot_num {
            color: #333;
            height: 100%;
            font-size: 1.1rem;
          }
          .opts_btns {
            right: 0;
          }
        }
      }
    }
    .el-pagination {
      margin-top: 2rem;
      text-align: center;
    }
    .no_cmt {
      text-align: center;
      padding: 3rem 0 0;
      font-size: 1.2rem;
    }
  }
  .cmt_area {
    display: flex;
    width: 90%;
    margin: auto;
    margin-top: 3rem;
    background-color: #777;
    padding: 3rem;
    border-radius: 3px;
    .user_info {
      display: flex;
      flex-direction: column;
      align-items: center;
      div {
        margin-top: 0.5rem;
        color: purple;
      }
    }
    .area_wrapper {
      flex: 1;
      padding-left: 2%;
      .area_top {
        display: flex;
        justify-content: space-between;
        align-items: center;
        .emoji {
          position: relative;
          border-top-left-radius: 4px;
          border-top-right-radius: 4px;
          width: 30px;
          height: 30px;
          background-color: #fff;
          padding: 2px;
          cursor: pointer;
          .emoji_box {
            position: absolute;
            display: flex;
            bottom: 2px;
            left: 36px;
            width: 250px;
            flex-wrap: wrap;
            .emoji_item {
              background-color: #ddd;
              box-sizing: border-box;
              padding: 2px;
              width: 25px;
              height: 25px;
            }
          }
          img {
            width: 100%;
            height: 100%;
            border-radius: 50%;
          }
        }
        span {
          letter-spacing: 1px;
          font-size: 1.2rem;
          vertical-align: middle;
          padding-right: 0.5rem;
          color: #fff;
        }
      }
      .el-textarea {
        textarea {
          border-top-left-radius: 0;
        }
      }
      .area_opts {
        margin-top: 0.6rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
    }
  }
}
</style>
