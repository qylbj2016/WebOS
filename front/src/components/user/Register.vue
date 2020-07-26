<template>
  <div class="register_wrapper">
    <el-upload
      class="avatar-uploader"
      :action="domain"
      :show-file-list="false"
      :http-request="uploadIMG"
      :before-upload="beforeAvatarUpload"
    >
      <img :src="imageUrl" class="avatar" />
    </el-upload>
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="昵称" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="mail">
        <el-input v-model="ruleForm.mail"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="pwd">
        <el-input
          type="password"
          v-model="ruleForm.pwd"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPass">
        <el-input
          type="password"
          v-model="ruleForm.checkPass"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item label="年龄" prop="age">
        <el-input v-model.number="ruleForm.age"></el-input>
      </el-form-item>
      <el-form-item label="性别" prop="sex">
        <el-radio-group v-model="ruleForm.sex">
          <el-radio label="男"></el-radio>
          <el-radio label="女"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')"
          >立即创建</el-button
        >
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    var checkName = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("昵称不能为空"));
      } else if (value.length > 10) {
        return callback(new Error("昵称不能超过10个字符"));
      } else {
        this.$axios
          .get(`http://localhost:3000/ename?name=${this.ruleForm.name}`)
          .then(res => {
            res.data.isExisted
              ? callback(new Error("昵称已被注册"))
              : callback();
          });
      }
    };
    var checkAge = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("年龄不能为空"));
      }
      setTimeout(() => {
        if (!Number.isInteger(value)) {
          callback(new Error("请输入数字值"));
        } else {
          callback();
        }
      }, 1000);
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
        this.$axios
          .get(`http://localhost:3000/euser?mail=${this.ruleForm.mail}`)
          .then(res => {
            let tips =
              res.data.isExisted === "pending"
                ? "该邮箱还未验证，请到邮箱里查找验证邮件"
                : "邮箱已注册";
            res.data.isExisted ? callback(new Error(tips)) : callback();
          });
      }
    };
    return {
      domain: "https://upload-z1.qiniup.com",
      qiniuaddr: "image.cinco.site",
      imageUrl: "/img/prehead.png",
      ruleForm: {
        name: "",
        pwd: "",
        checkPass: "",
        age: "",
        mail: "",
        sex: ""
      },
      rules: {
        name: [{ required: true, validator: checkName, trigger: "blur" }],
        pwd: [{ required: true, validator: validatePass, trigger: "blur" }],
        checkPass: [
          { required: true, validator: validatePass2, trigger: "blur" }
        ],
        age: [{ required: true, validator: checkAge, trigger: "blur" }],
        mail: [{ required: true, validator: validateMail, trigger: "blur" }],
        sex: [{ required: true, message: "请选择您的性别", trigger: "change" }]
      }
    };
  },
  methods: {
    uploadIMG(req) {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data"
        },
        withCredentials: false
      };
      let filetype = req.file.type === "image/png" ? "png" : "jpg";
      // 重命名要上传的文件
      const keyname =
        "cincosite" + Math.floor(Math.random() * 100000) + "." + filetype;
      // 从后端获取上传凭证token
      return this.$axios.get("http://localhost:3000/upToken").then(res => {
        const formdata = new FormData();
        formdata.append("file", req.file);
        formdata.append("token", res.data);
        formdata.append("key", keyname);
        // 获取到凭证之后再将文件上传到七牛云空间
        this.$axios.post(this.domain, formdata, config).then(res => {
          this.imageUrl = "http://" + this.qiniuaddr + "/" + res.data.key;
        });
      });
    },
    beforeAvatarUpload(file) {
      const isIMG = file.type === "image/jpeg" || "image/png";
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isIMG) {
        this.$message.error("上传头像图片只能是 JPG 或 PNG 格式!");
      } else if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      } else {
        this.imageUrl = URL.createObjectURL(file);
      }
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$axios
            .post("http://localhost:3000/register", {
              ...this.ruleForm,
              head: this.imageUrl
            })
            .then(res => {
              if (res.data.code === 200) {
                this.$message({
                  message: res.data.msg,
                  type: "success"
                });
              } else if (res.data.code === 201) {
                this.$message({
                  message: res.data.msg,
                  type: "warning"
                });
              } else {
                this.$message.error(res.data.msg);
              }
            });
        } else {
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>

<style lang="scss">
.register_wrapper {
  width: 100%;
  .avatar-uploader {
    display: inline-block;
    margin-left: 53%;
    transform: translateX(-50%);
    margin-bottom: 3rem;
  }
}
.avatar-uploader .el-upload {
  border: 1px solid #777;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: red;
}
.avatar-uploader-icon {
  font-size: 20px;
  color: #8c939d;
  width: 100px;
  height: 100px;
  line-height: 100px;
  text-align: center;
}
.avatar {
  width: 100px;
  height: 100px;
  display: block;
}
</style>
