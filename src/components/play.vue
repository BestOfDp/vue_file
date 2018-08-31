<!--<template>-->
  <!--<div>-->
    <!--<div>-->
      <!--<el-input v-model="input" placeholder="请输入视频名" style="width: 50%" @keyup.enter.native="search()"></el-input>-->
      <!--<el-button type="primary" @click="search()">查询</el-button>-->
      <!--<el-button type="success" @click="getPlay()">刷新</el-button>-->
      <!--<el-row style="margin-left: 6.5%">-->
        <!--<el-col :span="5" v-for="item in todos" :key="o" :offset="2" style="margin-top: 5%">-->
          <!--<el-card :body-style="{ padding: '0px' }">-->
            <!--<img :src=item.url class="image" style="height: 150px">-->
            <!--<div style="padding: 10px;">-->
              <!--<span>{{item.title}}</span>-->
              <!--<br>-->
              <!--<span style="font-size: 10px">播放量&nbsp&nbsp&nbsp</span><span style="color: #5daf34;font-size: large">{{item.play_num}}</span>-->
              <!--<el-button type="text" class="button" @click="delVideo(item.id)" v-if="auth==2">删除</el-button>-->
              <!--<div class="bottom clearfix">-->
                <!--<time class="time">{{ item.addtime }}</time>-->
                <!--<el-button type="text" class="button" @click="goToPlay(item.id)">播放</el-button>-->
              <!--</div>-->
            <!--</div>-->
          <!--</el-card>-->
        <!--</el-col>-->
      <!--</el-row>-->
    <!--</div>-->
  <!--</div>-->
<!--</template>-->

<!--<script>-->
  <!--import global from '../../Global'-->

  <!--export default {-->
    <!--name: "play",-->
    <!--created() {-->
      <!--this.auth = sessionStorage.getItem('auth');-->
      <!--this.axios.get('http://120.77.200.249:81/getVideo/').then(response => {-->
        <!--this.todos = response.data-->
      <!--})-->
    <!--},-->
    <!--data() {-->
      <!--return {-->
        <!--todos: [],-->
        <!--auth: 0,-->
        <!--input: ''-->
      <!--}-->
    <!--},-->
    <!--methods: {-->
      <!--goToPlay(id) {-->
        <!--this.axios.post('http://120.77.200.249:81/getLast/', {-->
          <!--id: id,-->
          <!--user_id: sessionStorage.getItem('id')-->
        <!--}).then(response => {-->
          <!--this.$router.push({path: '/play/' + id + '/' + response.data + '/'});-->
        <!--});-->
      <!--},-->
      <!--getPlay() {-->
        <!--this.axios.get('http://120.77.200.249:81/getVideo/').then(response => {-->
          <!--this.todos = response.data-->
        <!--})-->
      <!--},-->
      <!--delVideo(id) {-->
        <!--this.axios.post('http://120.77.200.249:81/delVideo/', {-->
          <!--id: id-->
        <!--}).then(response => {-->
          <!--this.todos = response.data-->
        <!--})-->
      <!--},-->
      <!--search() {-->
        <!--if (this.input == '') {-->
          <!--this.$notify.error({-->
            <!--title: '查询失败',-->
            <!--message: '视频名不能为空',-->
            <!--offset: 100-->
          <!--});-->
        <!--} else {-->
          <!--this.axios.post('http://120.77.200.249:81/searchVideo/', {-->
            <!--name: this.input-->
          <!--}).then(response => {-->
            <!--this.todos = response.data;-->
          <!--})-->
        <!--}-->
      <!--}-->
    <!--}-->
  <!--}-->


<!--</script>-->

<!--<style scoped>-->
  <!--.time {-->
    <!--font-size: 13px;-->
    <!--color: #999;-->
  <!--}-->

  <!--.bottom {-->
    <!--margin-top: 13px;-->
    <!--line-height: 12px;-->
  <!--}-->

  <!--.button {-->
    <!--padding: 0;-->
    <!--float: right;-->
  <!--}-->

  <!--.image {-->
    <!--width: 100%;-->
    <!--display: block;-->
  <!--}-->

  <!--.clearfix:before,-->
  <!--.clearfix:after {-->
    <!--display: table;-->
    <!--content: "";-->
  <!--}-->

  <!--.clearfix:after {-->
    <!--clear: both-->
  <!--}-->
<!--</style>-->
