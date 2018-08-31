<template>
  <div>
    <div>
      <el-input v-model="input" placeholder="请输入书名" style="width: 50%" @keyup.enter.native="search()"></el-input>
      <el-button type="primary" @click="search()">查询</el-button>
    </div>
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
          </div>
          <div style="width: 95%;float: left;margin-left: 4%;margin-top: 1%">
            <el-table :data="todos.slice((currentPage-1)*pagesize,currentPage*pagesize)" stripe
                      style="width: 100%" border>
              <el-table-column label="书名" prop="title" align="center"></el-table-column>
              <el-table-column label="作者" prop="author" align="center"></el-table-column>
              <el-table-column label="信息" prop="publish" align="center"></el-table-column>
              <el-table-column label="操作" align="center">
                <template slot-scope="scope">
                  <el-popover
                    placement="right"
                    width="700"
                    trigger="click">
                    <div style="text-align: center">
                      <span style="font-size: 32px;color:green;font-family: 微软雅黑;">书名: {{scope.row.title}}</span>
                    </div>
                    <el-table :data="info" border>
                      <el-table-column width="120px" property="t_index" label="索书号" align="center"></el-table-column>
                      <el-table-column width="100px" property="number" label="条码号" align="center"></el-table-column>
                      <el-table-column width="100px" property="year" label="年卷期" align="center"></el-table-column>
                      <el-table-column width="140px" property="place" label="校区-藏馆地" align="center"></el-table-column>
                      <el-table-column width="130px" property="available" label="书刊状态" align="center"></el-table-column>
                      <el-table-column property="back_place" label="还书地点"
                                       align="center"></el-table-column>
                    </el-table>
                    <el-button type="success" slot="reference" @click="getInfo(scope.$index, scope.row)">查询</el-button>
                  </el-popover>
                  <el-button type="warning" @click="order(scope.$index, scope.row)">订阅</el-button>
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
    name: "books",
    data() {
      return {
        currentPage: 1,
        pagesize: 10,
        input: '',
        todos: [],
        info: []
      }
    },
    methods: {
      handleSizeChange: function (size) {
        this.pagesize = size;
      }
      ,
      handleCurrentChange: function (currentPage) {
        this.currentPage = currentPage;
      },
      getInfo(index, row) {
        this.axios.post(global.url_spider + '/getInfo/', {
          id: row.id
        }).then(response => {
          if (response.data == "NO") {
            this.$notify({
              title: '注意',
              message: '此书刊可能正在订购中或者处理中',
              type: 'warning',
              offset: 100
            });
            this.info = []
          } else {
            this.info = response.data
          }
        })
      },
      order(index, row) {
        this.axios.post(global.url + '/v1/book/order/', {
          bid: row.id,
          type: 1
        }, {
          headers: {
            'Authorization': 'Bearer ' + sessionStorage.getItem('token'),
          }
        }).then(response => {
          if (response.data.status === 200) {
            this.$notify({
              title: '订阅成功',
              message: '订阅成功，请留意邮箱',
              type: 'success',
              offset: 100
            });
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
              title: '订阅失败',
              message: h('div', null, newDatas),
              offset: 100
            });
          }
        })
      },
      search() {
        if (this.input == '') {
          this.$notify.error({
            title: '查询失败',
            message: '关键字不能为空',
            offset: 100
          });
        } else {
          this.axios.post(global.url + '/v1/book/', {
            keyword: this.input
          }, {
            headers: {
              'Authorization': 'Bearer ' + sessionStorage.getItem('token'),
            }
          }).then(response => {
            if (response.data.status == 200) {
              this.todos = response.data.data
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
                offset: 100
              });
            }
          })
        }
      }
    }
  }
</script>

<style scoped>

</style>
