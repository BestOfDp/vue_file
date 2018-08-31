<template>
  <div id="app" style="position:absolute; left:0; top:0; width:100%;height:100%;">
    <div style="text-align: center">
      <div style="margin-top: 1%;">
        <router-link to="/" style="color: white"><span style="color:purple;font-size: 48px;font-family: Consolas;">InTheBloodHorse</span>
        </router-link>
      </div>
      <div v-if="flag" style="margin-top: -4.5%;margin-left: 60%">
        <el-dropdown @command="handleCommand">
      <span class="el-dropdown-link">
        <img :src=url class="round_icon">
      </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="toMy">个人中心</el-dropdown-item>
            <el-dropdown-item command="drop">退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
    <router-view @showName="update"></router-view>
  </div>
</template>

<script>
  import global from '../Global'

  export default {
    name: 'App',
    created() {
      if (sessionStorage.getItem('id')) {
        this.value = sessionStorage.getItem('name');
        this.id = sessionStorage.getItem('id');
        this.url = global.url + '/static/headimage/' + sessionStorage.getItem('url');
        this.flag = true
      }
    },
    data() {
      return {
        options: [],
        value: '',
        flag: false,
        url: "",
        id: 0
      }
    },
    methods: {
      update(data) {
        this.value = sessionStorage.getItem('name');
        this.id = sessionStorage.getItem('id');
        this.url = global.url + '/static/headimage/' + sessionStorage.getItem('url');
        this.flag = true
      },
      handleCommand(command) {
        if (command === "drop") {
          sessionStorage.clear();
          this.flag = false;
          this.$router.push({path: '/'});
        }
        else {
          this.$router.push({path: '/user/'});
        }
      }
    }
  }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    /*margin-top: 60px;*/
  }

  a:link, a:visited {
    text-decoration: none; /*超链接无下划线*/
  }

  .round_icon {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    -moz-border-radius: 50%;
    -webkit-border-radius: 50%;
  }
</style>
