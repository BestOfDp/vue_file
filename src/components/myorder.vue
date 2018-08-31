<template>
  <div>
    <el-button type="success" @click="get()">刷新</el-button>
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
          <div style="width: 95%;float: left;margin-left: 4%;margin-top: 2%">
            <el-table
              :data="todos.slice((currentPage-1)*pagesize,currentPage*pagesize)"
              stripe style="width:100%" border>
              <el-table-column label="书名" prop="book_title" align="center"></el-table-column>
              <el-table-column label="作者" prop="book_author" align="center"></el-table-column>
              <el-table-column label="信息" prop="book_publish" align="center"></el-table-column>
              <el-table-column label="操作" align="center">
                <template slot-scope="scope">
                  <el-button type="danger" @click="drop(scope.$index, scope.row)">取消订阅</el-button>
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
    created() {
      this.axios.get(global.url + '/v1/book/', {
        headers: {
          'Authorization': 'Bearer ' + sessionStorage.getItem('token'),
        }
      }).then(response => {
        this.todos = response.data.data
      })
    },
    name: "myorder",
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
      }
      ,
      handleCurrentChange: function (currentPage) {
        this.currentPage = currentPage;
      },
      get() {
        this.axios.get(global.url + '/v1/book/', {
          headers: {
            'Authorization': 'Bearer ' + sessionStorage.getItem('token'),
          }
        }).then(response => {
          this.todos = response.data.data
          if (this.todos == undefined) {
            this.todos = []
          }
        })
      },
      drop(index, row) {
        this.axios.post(global.url + '/v1/book/order/', {
          bid: row.book_id,
          type: 0
        }, {
          headers: {
            'Authorization': 'Bearer ' + sessionStorage.getItem('token'),
          }
        }).then(response => {
          if (response.data.status === 200) {
            this.$notify({
              title: '取消成功',
              message: '订阅取消成功',
              type: 'success',
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
              title: '取消失败',
              message: h('div', null, newDatas),
              offset: 100
            });
          }
        })
      }
    }
  }
</script>

<style scoped>

</style>
