<style lang="less">
    @import "../../styles/common.less";
</style>
<template>
    <div>
    <Table border :columns="columns" :data="data"></Table>
        <Page :current="page" :page-size="pageSize" :total="total" size="small" show-elevator show-sizer class="margin-top-10" @on-change="pageChange" @on-page-size-change="pageSizeChange"></Page>
    </div>
</template>
<script>
  /* eslint-disable indent */

  export default {
    data () {
      return {
        page:1,
        pageSize:10,
        total: 0,
        columns: [
          {
            title: '用户名',
            key: 'username'
          },
          {
            title: '姓名',
            key: 'name'
          },
          {
            title: '角色',
            key: 'role'
          },
          {
            title: '操作',
            key: 'action',
            width: 150,
            align: 'center',
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'primary',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.show(params.index);
                    }
                  }
                }, '修改')
              ]);
            }
          }
        ],
        data: [
          {
            name: 'John Brown',
            role: 18,
            address: 'New York No. 1 Lake Park'
          },
          {
            name: 'Jim Green',
            role: 24,
            address: 'London No. 1 Lake Park'
          },
          {
            name: 'Joe Black',
            role: 30,
            address: 'Sydney No. 1 Lake Park'
          },
          {
            name: 'Jon Snow',
            role: 26,
            address: 'Ottawa No. 2 Lake Park'
          }
        ]
      };
    },
    methods: {
      load(){
        this.$API.getUsers(this.page, this.pageSize).then(data => {
//          this.data.
          let res=[];
          data.content.forEach((user)=>{
            let username=user.username;
            let role='';
            if(user.userRoleRefs){
              user.userRoleRefs.forEach(roleRef=>{
                if(role){
                  role=role+','+roleRef.role.name;
                }else {
                  role=roleRef.role.name;
                }
              });
            }
            res.push({
              id: user.id,
              username: username,
              name: username,
              role: role
            });
          });
          this.data=res;
          this.total=data.totalElements;
        });
      },
      pageChange(page){
        this.page=page;
        this.load();
      },
      pageSizeChange(pageSize){
        this.pageSize=pageSize;
        this.load();
      },
      show (index) {
        this.$Modal.info({
          title: 'User Info',
          content: `Name：${this.data6[index].name}<br>Age：${this.data6[index].age}<br>Address：${this.data6[index].address}`
        });
      },
      remove (index) {
        this.data6.splice(index, 1);
      }
    },
      mounted(){
        this.load();
      }
  };
</script>