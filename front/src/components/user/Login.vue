<template>
  <div class="login_wrapper">
    <img class="title" src="/img/zt.png" />
    <el-form
      :model="ruleForm"
      status-icon
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="登录邮箱" prop="mail">
        <el-input v-model="ruleForm.mail" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="pwd">
        <el-input
          type="password"
          v-model="ruleForm.pwd"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')"
          >提交</el-button
        >
        <el-button @click="resetForm('ruleForm')">重置</el-button>
        <div class="visitor" @click="visited">游客模式</div>
      </el-form-item>
      <el-form-item class="user_op_wrapper">
        <router-link to="forget">忘记密码</router-link>
        <router-link to="register">注册账号</router-link>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  data() {
    var validateMail = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入邮箱"));
      } else if (
        !new RegExp(
          "^[0-9a-zA-Z_.-]+[@][0-9a-zA-Z_.-]+([.][a-zA-Z]+){1,2}$",
          "i"
        ).test(value)
      ) {
        callback(new Error("邮箱格式不正确"));
      } else {
        callback();
      }
    };
    var validatePwd = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入您的密码"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        mail: "",
        pwd: ""
      },
      rules: {
        mail: [{ validator: validateMail, trigger: "blur" }],
        pwd: [{ validator: validatePwd, trigger: "blur" }]
      }
    };
  },
  methods: {
    ...mapMutations(["toHome"]),
    login(data) {
      this.$axios.post("http://localhost:3000/login", data).then(res => {
        if (res.data.code === 200) {
          this.$message({
            message: "登录成功,欢迎您的访问",
            type: "success"
          });
          this.toHome(true);
          this.$router.push("/home");
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.login(this.ruleForm);
        } else {
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    visited() {
      this.$confirm("您确定要以游客的身份登录吗？", "确认信息", {
        distinguishCancelAndClose: true,
        confirmButtonText: "登录",
        cancelButtonText: "离开"
      })
        .then(() => {
          this.login({
            mail: "wtt",
            pwd: "xk"
          });
        })
        .catch(action => {
          this.$message({
            type: "info",
            message:
              action === "cancel"
                ? "请您输入账号密码或者游客方式登录"
                : "停留在当前页面"
          });
        });
    }
  }
};
</script>

<style lang="scss">
.title {
  width: 500px;
  height: 160px;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  top: 80px;
  z-index: 100;
}
.visitor {
  position: absolute;
  right: 0;
  top: 0;
  cursor: pointer;
  margin-right: calc(100px - 2rem);
}
.user_op_wrapper {
  a {
    position: absolute;
    color: #666;
    font-size: 0.8rem;
    &:first-child {
      left: 0;
      margin-left: 3rem;
    }
    &:last-child {
      right: 0;
      margin-right: calc(12px + 7rem);
    }
    &:hover {
      color: red;
    }
  }
}
</style>
