<template>
  <el-form
    :model="ruleForm"
    :rules="rules"
    ref="ruleForm"
    label-width="100px"
    class="demo-ruleForm"
  >
    <el-form-item label="邮箱" prop="mail">
      <el-input v-model="ruleForm.mail"></el-input>
    </el-form-item>
    <el-form-item label="新密码" prop="pwd">
      <el-input type="password" v-model="ruleForm.pwd" show-password></el-input>
    </el-form-item>
    <el-form-item label="确认密码" prop="checkPass">
      <el-input
        type="password"
        v-model="ruleForm.checkPass"
        show-password
      ></el-input>
    </el-form-item>
    <el-form-item id="code_ipt" label="验证码" prop="code">
      <el-input v-model="ruleForm.code"></el-input>
      <el-button v-if="!time" @click="sendCode">发送验证码</el-button>
      <el-button type="danger" v-if="time">{{ time }}</el-button>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
      <el-button @click="resetForm('ruleForm')">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  data() {
    var validateMail = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入您的邮箱"));
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
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else if (
        !new RegExp(
          "^.*(?=.{6,16})(?=.*\\d)(?=.*[A-Z]{1,})(?=.*[a-z]{1,}).*$"
        ).test(value)
      ) {
        callback(new Error("密码请包含大小写字母和数字,最少6位,最多16位"));
      } else {
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.pwd) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    var code = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("验证码不能为空"));
      } else if (value.length !== 6) {
        callback(new Error("验证码为6位，请您核对"));
      } else {
        callback();
      }
    };
    return {
      time: 0,
      timer: null,
      ruleForm: {
        mail: "",
        pwd: "",
        checkPass: "",
        code: ""
      },
      rules: {
        mail: [{ required: true, validator: validateMail, trigger: "blur" }],
        pwd: [{ required: true, validator: validatePass, trigger: "blur" }],
        checkPass: [
          { required: true, validator: validatePass2, trigger: "blur" }
        ],
        code: [{ required: true, validator: code, trigger: "blur" }]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$axios
            .post("http://localhost:3000/forget", {
              ...this.ruleForm
            })
            .then(res => {
              this.$message({
                type: res.data.code === 200 ? "success" : "error",
                message: res.data.msg
              });
            });
        } else {
          return false;
        }
      });
    },
    sendCode() {
      if (this.ruleForm.mail) {
        this.$axios
          .get(`http://localhost:3000/sendCode?mail=${this.ruleForm.mail}`)
          .then(res => {
            this.$message({
              type: res.data.code === 200 ? "success" : "error",
              message: res.data.msg
            });
          });
        this.time = 60;
        clearInterval(this.timer);
        this.timer = setInterval(() => {
          this.time--;
          if (this.time === 0) {
            clearInterval(this.timer);
          }
        }, 1000);
      }
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>

<style lang="scss">
.demo-ruleForm {
  #code_ipt {
    .el-form-item__content {
      display: flex;
      .el-input {
        flex: 3;
      }
      .el-button {
        flex: 1;
      }
    }
  }
}
</style>
