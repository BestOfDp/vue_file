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
          </div>
          <div style="width: 95%;float: left;margin-left: 4%;margin-top: 1%">
            <el-table :data="todos.slice((currentPage-1)*pagesize,currentPage*pagesize)" stripe
                      style="width: 100%" border>
              <el-table-column label="用户名" prop="name" align="center"></el-table-column>
              <el-table-column label="班级" prop="class_name" align="center"></el-table-column>
              <el-table-column label="姓名" prop="t_name" align="center"></el-table-column>
              <!--<el-table-column label="角色" prop="auth" align="center"></el-table-column>-->
              <el-table-column label="操作" align="center">
                <template slot-scope="scope">
                  <el-button type="warning" @click="editauth(scope.$index, scope.row,0)" v-if="scope.row.auth[0]==1">
                    取消管理员
                  </el-button>
                  <el-button type="success" @click="editauth(scope.$index, scope.row,1)" v-if="scope.row.auth[0]==0">
                    成为管理员
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
    name: "editauth",
    created() {
      this.axios.get(global.url + '/v1/user/all_user/', {
        headers: {
          'Authorization': 'Bearer ' + sessionStorage.getItem('token'),
        }
      }).then(response => {
        this.todos = response.data.data;
      })
    },
    data() {
      return {
        currentPage: 1,
        pagesize: 10,
        todos: [],
        flag: true
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
      editauth(index, row, num) {
        this.axios.post(global.url + '/v1/user/auth/', {
          uid: row.id,
          type: num
        }, {
          headers: {
            'Authorization': 'Bearer ' + sessionStorage.getItem('token'),
          }
        }).then(response => {
          this.todos = response.data
        });
        this.$notify({
          title: '修改成功',
          message: '修改权限成功',
          offset: 100,
          type: 'success'
        });
        this.todos.splice(index, 1);
      }
    }
  }
</script>

<style scoped>

</style>
