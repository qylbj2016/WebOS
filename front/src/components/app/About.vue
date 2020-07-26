<template>
  <el-collapse v-model="activeName" accordion>
    <el-collapse-item title="初衷 Original Intention" name="1">
      <div>
        往实在了说就是在工作之前码一下代码，毕竟面试和简历上吹的牛逼迟早是要兑现的。
      </div>
      <div>
        往大了说就是通过这次毕业设计，检阅大学四年来的成果，实现该系统并对未来WebOS做一个畅想。
      </div>
    </el-collapse-item>
    <el-collapse-item title="前端 Interaction Design" name="2">
      <div>Vue全家桶 + Element-UI + SCSS</div>
    </el-collapse-item>
    <el-collapse-item title="后端 Backend development " name="3">
      <div>Koa2 + Sequelize</div>
    </el-collapse-item>
    <el-collapse-item title="其他 Other Technologies" name="4">
      <div>数据存储：Mysql + Redis</div>
      <div>云服务器：centos7 + ngnix + pm2</div>
    </el-collapse-item>
    <el-collapse-item title="作者 About Me" name="5">
      <div>WeChat: qylbj2016</div>
      <div>blog: <a href="http://localhost:3000">localhost:3000</a></div>
      <div>
        GitHub:
        <a href="https://github.com/qylbj2016">https://github.com/qylbj2016</a>
      </div>
      <div>一只缓慢前行的前端小白，爱篮球、爱摄影、爱音乐、爱生活。</div>
    </el-collapse-item>
  </el-collapse>
</template>
<script>
export default {
  data() {
    return {
      activeName: "5"
    };
  },
  mounted() {
    this.$emit("remove");
  }
};
</script>
<style lang="scss">
.el-collapse {
  padding: 0.4rem;
  border-radius: 4px;
  .el-collapse-item__header {
    padding: 0.8rem;
  }
  .el-collapse-item__content {
    padding: 0 0.8rem 0.6rem 0.8rem;
    a {
      color: #303133;
    }
  }
}
</style>
