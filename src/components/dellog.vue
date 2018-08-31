<template>
  <div>
    <el-button type="success" @click="getDelLog()">刷新</el-button>
    <el-container style="height: 90%;border: 10px solid #eee;margin-top: 2%">
      <el-container>
        <el-main>
          <div style="float: left;margin-left: 25%">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage"
              :page-sizes="[10, 20, 50, 100]"
              :page-size="pagesize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="todos.length"
            >
            </el-pagination>
          </div>
          <div style="width: 95%;float: left;margin-left: 4%;margin-top: 1%">
            <el-table :data="todos.slice((currentPage-1)*pagesize,currentPage*pagesize)" stripe
                      style="width: 100%" border>
              <el-table-column prop="del_time" label="删除日期" align="center" width="250px">
              </el-table-column>
              <el-table-column prop="title" label="文件名" align="center" width="300px">
              </el-table-column>
              <el-table-column prop="format" label="格式" align="center" width="100px">
              </el-table-column>
              <el-table-column prop="username" label="Owner" align="center" width="100px">
              </el-table-column>
              <el-table-column label="操作" align="center">
                <template slot-scope="scope">
                  <el-button
                    type="success"
                    @click="beshow(scope.$index, scope.row)">恢复
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
  import global from '../../Global'

  export default {
    name: "dellog",
    created() {
      this.axios.post(global.url + '/v1/file/', {
        public: 3,
      }, {
        headers: {
          'Authorization': 'Bearer ' + sessionStorage.getItem('token'),
        }
      }).then(response => {
        console.log(response.data.data)
        if (response.data.status == 200) {
          this.todos = response.data.data;
          if (this.todos == undefined) {
            this.todos = []
          }
        } else {
          var msg = new Array();
          var data = eval(response.data.error);
          for (var e in data) {
            msg.push(data[e]);
          }
          let newDatas = [];
          const h = this.$createElement;
          for (let i in msg) {
            newDatas.push(h('p', null, msg[i].join(',')));
          }
          this.$notify.error({
            title: '查询失败',
            message: h('div', null, newDatas),
          });
        }
      })
    },
    data() {
      return {
        currentPage: 1,
        pagesize: 10,
        todos: []
      }
    },
    methods: {
      handleSizeChange: function (size) {
        this.pagesize = size;
      },
      handleCurrentChange: function (currentPage) {
        this.currentPage = currentPage;
      },
      beshow(index, row) {
        this.axios.post(global.url + '/v1/file/recover/', {
          file_id: row.id,
        }, {
          headers: {
            'Authorization': 'Bearer ' + sessionStorage.getItem('token'),
          }
        }).then(response => {
          if (response.data.status == 200) {
            this.$notify({
              type: 'success',
              title: '恢复成功',
              message: '恢复文件成功',
              offset: 100
            });
            this.todos.splice(index, 1);
          } else {
            var msg = new Array();
            var data = eval(response.data.error);
            for (var e in data) {
              msg.push(data[e]);
            }
            let newDatas = [];
            const h = this.$createElement;
            for (let i in msg) {
              newDatas.push(h('p', null, msg[i].join(',')));
            }
            this.$notify.error({
              title: '查询失败',
              message: h('div', null, newDatas),
            });
          }
        })
      },
      getDelLog() {
        this.axios.post(global.url + '/v1/file/', {
          public: 3,
        }, {
          headers: {
            'Authorization': 'Bearer ' + sessionStorage.getItem('token'),
          }
        }).then(response => {
          if (response.data.status == 200) {
            this.todos = response.data.data;
            if (this.todos == undefined) {
              this.todos = []
            }
          } else {
            var msg = new Array();
            var data = eval(response.data.error);
            for (var e in data) {
              msg.push(data[e]);
            }
            let newDatas = [];
            const h = this.$createElement;
            for (let i in msg) {
              newDatas.push(h('p', null, msg[i].join(',')));
            }
            this.$notify.error({
              title: '查询失败',
              message: h('div', null, newDatas),
            });
          }
        })
      },
    }
  }
</script>

<style scoped>

</style>
