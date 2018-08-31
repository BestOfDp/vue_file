<!--<template>-->
  <!--<div>-->
    <!--<span style="font-size: 30px;margin-left: -30%;color: #6f7180">-->
     <!--{{title}}-->
    <!--</span>-->
    <!--<div style="margin-top: 1%">-->
      <!--<div style="width: 50%;float: left;margin-left: 10%">-->
        <!--<video-player class="video-player vjs-custom-skin"-->
                      <!--ref="videoPlayer"-->
                      <!--:playsinline="true"-->
                      <!--:options="playerOptions">-->
        <!--</video-player>-->
      <!--</div>-->
      <!--<div style="width: 40%;float: left">-->
        <!--<div style="margin-left: 10%">-->
          <!--<span style="font-size: 30px">{{todos.video.title}}</span>-->
          <!--&lt;!&ndash;<el-tag>标签一</el-tag>&ndash;&gt;-->
          <!--&lt;!&ndash;<el-tag type="success">标签二</el-tag>&ndash;&gt;-->
          <!--&lt;!&ndash;<el-tag type="info">标签三</el-tag>&ndash;&gt;-->
          <!--&lt;!&ndash;<el-tag type="warning">标签四</el-tag>&ndash;&gt;-->
        <!--</div>-->
        <!--<div style="width: 100%">-->
          <!--<el-pagination-->
            <!--@size-change="handleSizeChange"-->
            <!--@current-change="handleCurrentChange"-->
            <!--:current-page="currentPage"-->
            <!--:page-sizes="[5]"-->
            <!--:page-size="pagesize"-->
            <!--layout="total, prev, pager, next"-->
            <!--:total="todos.file.length"-->
          <!--&gt;-->
          <!--</el-pagination>-->
          <!--<div style="margin-top: 1%;margin-left: 10%;margin-right: 10%">-->
            <!--<el-table :data="todos.file.slice((currentPage-1)*pagesize,currentPage*pagesize)" stripe-->
                      <!--border>-->
              <!--<el-table-column width="50%" label="#" align="center">-->
                <!--<template slot-scope="scope">-->
                  <!--<el-button style="margin-left: -30%" size="mini" @click="gotoNew(scope.row)">{{scope.row.ji}}-->
                  <!--</el-button>-->
                <!--</template>-->
              <!--</el-table-column>-->
              <!--<el-table-column prop="title" label="标题" align="center">-->
                <!--<template slot-scope="scope">-->
                  <!--<el-button size="mini" style="color: #3a8ee6" @click="gotoNew(scope.row)">{{scope.row.title}}-->
                  <!--</el-button>-->
                <!--</template>-->
              <!--</el-table-column>-->
            <!--</el-table>-->
          <!--</div>-->
        <!--</div>-->
      <!--</div>-->
    <!--</div>-->
  <!--</div>-->
<!--</template>-->

<!--<script>-->
  <!--export default {-->
    <!--name: "play",-->
    <!--created() {-->
      <!--this.axios.post('http://120.77.200.249:81/getplay_video/', {-->
        <!--id: this.$route.params.videoid-->
      <!--}).then(response => {-->
        <!--this.todos = response.data;-->
        <!--this.playerOptions.sources[0].src = "../../static/video/"-->
          <!--+ this.todos.video.title + "/"-->
          <!--+ this.todos.file[this.$route.params.playid - 1].title-->
          <!--+ "." + this.todos.file[this.$route.params.playid - 1].format;-->
        <!--this.title = this.todos.file[this.$route.params.playid - 1].title-->
      <!--});-->
    <!--},-->
    <!--data() {-->
      <!--return {-->
        <!--playerOptions: {-->
          <!--playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度-->
          <!--autoplay: false, //如果true,浏览器准备好时开始回放。-->
          <!--muted: false, // 默认情况下将会消除任何音频。-->
          <!--loop: false, // 导致视频一结束就重新开始。-->
          <!--preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）-->
          <!--language: 'zh-CN',-->
          <!--aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）-->
          <!--fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。-->
          <!--sources: [{-->
            <!--type: "",-->
            <!--src: "" //url地址-->
          <!--}],-->
          <!--poster: "../../static/flask/images/OA办公.png", //你的封面地址-->
          <!--// width: document.documentElement.clientWidth,-->
          <!--notSupportedMessage: '此视频暂无法播放，请稍后再试', //允许覆盖Video.js无法播放媒体源时显示的默认信息。-->
          <!--controlBar: {-->
            <!--timeDivider: true,-->
            <!--durationDisplay: true,-->
            <!--remainingTimeDisplay: false,-->
            <!--fullscreenToggle: true  //全屏按钮-->
          <!--}-->
        <!--},-->
        <!--pages: 1,-->
        <!--todos: [],-->
        <!--currentPage: 1,-->
        <!--pagesize: 5,-->
        <!--now_num: 0,-->
        <!--title: ''-->
      <!--}-->
    <!--},-->
    <!--methods: {-->
      <!--handleSizeChange: function (size) {-->
        <!--this.pagesize = size;-->
      <!--}-->
      <!--,-->
      <!--handleCurrentChange: function (currentPage) {-->
        <!--this.currentPage = currentPage;-->
      <!--},-->
      <!--gotoNew(row) {-->
        <!--this.$router.push({path: '/play/' + this.$route.params.videoid + '/' + row.ji + '/'});-->
        <!--this.playerOptions.sources[0].src = "../../static/video/"-->
          <!--+ this.todos.video.title + "/"-->
          <!--+ this.todos.file[row.ji - 1].title-->
          <!--+ "." + this.todos.file[row.ji - 1].format;-->
        <!--this.title = this.todos.file[this.$route.params.playid - 1].title-->

        <!--this.axios.post('http://120.77.200.249:81/getLast/', {-->
          <!--id: this.todos.file[this.$route.params.playid - 1].owner_id,-->
          <!--user_id: sessionStorage.getItem('id'),-->
          <!--new_id: this.$route.params.playid-->
        <!--})-->
      <!--}-->
    <!--}-->
  <!--}-->
<!--</script>-->

<!--<style scoped>-->
  <!--.video-js .vjs-big-play-button {-->
  <!--}-->
<!--</style>-->
