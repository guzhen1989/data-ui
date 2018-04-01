<style lang="less">
    @import "../../styles/common.less";
</style>
<template>
    <div>
        <Card style="width:50%;margin-left: 25%;">
            <Row style="height:30px;line-height: 30px;">
                <Col span="8"><p style="text-align: right">用户名：</p></Col>
                <Col span="16"><Input v-model="username" placeholder="用户名" style="width: 200px;"></Input></Col>
            </Row>
            <Row>
                <Col span="8"><p style="text-align: right">姓名：</p></Col>
                <Col span="16"><Input v-model="name" placeholder="姓名"></Input></Col>
            </Row>
            <Row>
                <Col span="8"><p style="text-align: right">密码：</p></Col>
                <Col span="16"><Input v-model="password" type="password" placeholder="密码"></Input></Col>
            </Row>
            <Row>
                <Col span="8"><Button type="primary">保存</Button></Col>
                <Col span="16"><Button>取消</Button></Col>
            </Row>
        </Card>
      </div>
</template>
<script>
  /* eslint-disable indent */

  export default {
    data () {
      return {
        username:'',
        name:'',
        password: ''
      };
    },
    methods: {
    },
      mounted(){
      }
  };
</script>