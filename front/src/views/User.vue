<template>
  <div class="user_wrapper">
    <div class="user">
      <router-view />
    </div>
    <footer class="record">
      <p>COPYRIGHT 2020 Cinco. ALL RIGHTS RESERVED.</p>
      <p>鲁ICP备19015585号</p>
    </footer>
  </div>
</template>
<style lang="scss">
.user_wrapper {
  width: 100vw;
  height: 100vh;
  background: linear-gradient(#eaafc8, #654ea3);
  background: url("http://image.cinco.site/webos/20200602/ImF1iYamz0DW.jpg?imageslim");
  background-repeat: no-repeat;
  background-position: center center;
  background-size: 100% 100%;
  position: relative;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 880px;
  .user {
    width: 500px;
    padding: 4rem calc(88px - 4rem) 3rem 0;
    border-radius: 5px;
    background-color: rgba(207, 194, 194, 0.5);
    margin-bottom: 50px;
  }
  .record {
    position: absolute;
    bottom: 50px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    p {
      text-align: center;
      color: rgb(0, 0, 0);
      letter-spacing: 1px;
      text-shadow: 1px 1px 0px rgb(223, 112, 112);
      margin-bottom: 5px;
    }
  }
}
</style>
