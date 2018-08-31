<template>
  <div>
    <el-container style="height: 90%;border: 10px solid #eee;margin-top: 2%">
      <el-container>
        <el-main>
          <div>
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
            <div style="margin-left: 10%;float: left;margin-top: 0.5%">
              <div v-if="value2" style="float: left;font-family: Arial;color: #409eff">私人文件</div>
              <div v-if="!value2" style="float: left;font-family: Arial;color: #409eff">公共文件</div>
            </div>
            <div style="float: left;margin-left: 1%;margin-top: 0.5%">
              <el-switch
                v-model="value2"
                active-color="#13ce66"
                inactive-color="#AAAAAA"
                @change="getFile">
              </el-switch>
            </div>
          </div>
          <div style="width: 95%;float: left;margin-left: 4%;margin-top: 1%">
            <el-table :data="todos.slice((currentPage-1)*pagesize,currentPage*pagesize)" stripe
                      style="width: 100%" border>
              <el-table-column prop="create_time" label="日期" align="center">
              </el-table-column>
              <el-table-column prop="title" label="文件名" align="center">
              </el-table-column>
              <el-table-column prop="format" label="格式" align="center" width="100px">
              </el-table-column>
              <el-table-column prop="username" label="Owner" align="center" width="100px">
              </el-table-column>
              <el-table-column label="操作" align="center">
                <template slot-scope="scope">
                  <el-button
                    size="mini"
                    type="success">
                    <a
                      :href=get_download_url(scope)
                      :download=scope.row.url style="color: white">下载</a>
                  </el-button>
                  <el-button
                    size="mini"
                    type="warning"
                    @click="openedit(scope.$index, scope.row)">编辑
                  </el-button>
                  <el-button
                    size="mini"
                    type="danger"
                    @click="handleDelete(scope.$index, scope.row)">删除
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
    name: "show-data",
    created() {
      if (this.value2 === true) {
        this.value = 2
      } else {
        this.value = 1
      }
      this.axios.post(global.url + '/v1/file/', {
        public: this.value,
      }, {
        headers: {
          'Authorization': 'Bearer ' + sessionStorage.getItem('token'),
        }
      }).then(response => {
        this.todos = response.data.data;
        if (this.todos == undefined) {
          this.todos = []
        }
      })
    },
    data() {
      return {
        value: 0,
        value2: false,
        currentPage: 1,
        pagesize: 10,
        todos: [],
        defaultProps: {
          label: 'format'
        }
      }
    },
    methods: {
      get_download_url(scope) {
        return global.url + '/static/file/' + scope.row.url
      },
      openedit(index, row) {
        if (sessionStorage.getItem('auth_num') <= row.user_auth && row.owner_id != sessionStorage.getItem('id')) {
          this.$notify.error({
            title: '修改失败',
            message: '您没有权限修改他人文件！',
            offset: 100
          });
        } else {
          this.$prompt('请输入文件名', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              inputValue: row.title
            }
          ).then(({value}) => {
            if (value == '') {
              this.$message({
                type: 'error',
                message: '文件名不能为空',
              });
            }
            else {
              this.axios.post(global.url + '/v1/file/update_title/', {
                file_id: row.id,
                title: value,
              }, {
                headers: {
                  'Authorization': 'Bearer ' + sessionStorage.getItem('token'),
                }
              }).then(response => {
                if (response.data.status == 200) {
                  this.$notify({
                    title: '修改成功',
                    message: '文件名修改成功！',
                    type: 'success',
                    offset: 100
                  });
                  row.title = value
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
                    title: '修改失败',
                    message: h('div', null, newDatas),
                  });
                }
              });
            }
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '取消更变'
            });
          });
        }
      }
      ,
      handleDelete(index, row) {
        if (sessionStorage.getItem('auth_num') <= row.user_auth && row.owner_id != sessionStorage.getItem('id')) {
          this.$notify.error({
            title: '修改失败',
            message: '您没有权限删除他人文件！',
            offset: 100
          });
        } else {
          this.$confirm('此操作将删除该文件, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.axios.delete(global.url + '/v1/file/', {
              data: {
                file_id: row.id,
              },
              headers: {
                'Authorization': 'Bearer ' + sessionStorage.getItem('token'),
              }
            }).then(response => {
                if (response.data.status === 200) {
                  this.$message({
                    type: 'success',
                    message: '删除成功!(可以在回收站恢复文件)'
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
                    title: '删除失败',
                    message: h('div', null, newDatas),
                    offset: 100
                  });
                }
              }
            );
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            });
          })
        }
      }
      ,
      handleSizeChange: function (size) {
        this.pagesize = size;
      }
      ,
      handleCurrentChange: function (currentPage) {
        this.currentPage = currentPage;
      },
      getFile: function () {
        if (this.value2 == true) {
          this.value = 2
        } else {
          this.value = 1
        }
        this.axios.post(global.url + '/v1/file/', {
          public: this.value,
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
      }
    }
  }
</script>

<style scoped>

</style>
