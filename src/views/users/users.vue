<style lang="less">
    /*@import "./home.less";*/
    @import "../../styles/common.less";
</style>
<template>
    <div>
    <Row>

    </Row>
    <Table border :columns="columns7" :data="data6"></Table>
    </div>
</template>
<script>
    /* eslint-disable indent */

    export default {
    data () {
      return {
        columns7: [
          {
            title: '姓名',
            key: 'name',
            render: (h, params) => {
              return h('div', [
                h('Icon', {
                  props: {
                    type: 'person'
                  }
                }),
                h('strong', params.row.name)
              ]);
            }
          },
          {
            title: '角色',
            key: 'role'
          },
          {
            title: 'Action',
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
                }, '查看'),
                h('Button', {
                  props: {
                    type: 'error',
                    size: 'small'
                  },
                  on: {
                    click: () => {
                      this.remove(params.index);
                    }
                  }
                }, '删除')
              ]);
            }
          }
        ],
        data6: [
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
        this.$API.getUsers(1, 10).then(data => {
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
              name: username,
              role: role
            });
          });
          this.data6=res;
        });
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