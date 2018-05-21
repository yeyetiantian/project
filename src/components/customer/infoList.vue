<template>
  <div class="customerBox">
    <div class="searchBox">
      <mu-text-field hintText="名称" icon="search"/>
      <span class="addCur font-36 p-r-20 p-l-20"><mu-icon-button icon="add_circle" to="customer/add"/>客户</span>
    </div>
    <mt-index-list>
      <mt-index-section v-for="x in indexList" :key="x.type" :index="x.type">
        <mt-cell-swipe
          v-for="c in x.list"
          :key="c.custid"
          class="p-t-20 p-b-20"
          :to="'./customer/info/'+c.custid"
          :right="[{content: '修改',style: { background: 'blue', color: '#fff' },handler:function() {edit(c.custid)}}]"
        >
          <span slot="title" class="titlle p-l-25">
            <i>{{c.custname}}</i>
            <i class="color_999">{{c.custposition}}</i>
          </span>
          <span style="width: 7em;height: 1em;overflow: hidden;text-align: right">{{c.orgCfname}}</span>
          <img slot="icon" src="">
        </mt-cell-swipe>
      </mt-index-section>
    </mt-index-list>
  </div>

</template>

<script>
  import checkCh from '../../assets/js/py'
    export default {
      name: "infoList",
      data (){
        return{
          indexList:[],
        }
      },
      methods: {
        list(){
          this.$ajax.post('/customer/list',{})
            .then(result => {
              result.data.data.forEach((n,i)=>{
                let Initials = checkCh(n.custname).substring(0,1).toUpperCase();
                if(this.indexList.length>0){
                  let flag=true
                  this.indexList.forEach((m,j)=>{
                    if(m.type === Initials){
                      m.list.push(n);
                      flag=false
                    }
                  })
                  if(flag){
                    this.indexList.push({
                      type:Initials,
                      list:[n]
                    })
                  }
                }else {
                  this.indexList.push({
                    type:Initials,
                    list:[n]
                  })
                }
              })
              this.indexList.sort((x,y)=>{
                if (x.type.charCodeAt(0) < y.type.charCodeAt(0)) {
                  return -1;
                } else if (x.type.charCodeAt(0) > y.type.charCodeAt(0)) {
                  return 1;
                } else {
                  return 0;
                }
              });
            })
        },
        edit(id){
          this.$router.push('customer/edit/'+id)
        }
      },
      created(){
        this.list()
      }
    }
</script>

<style lang="less">
@import "../../assets/less/set.less";
.customerBox{
  .searchBox{
    position: absolute;z-index: 2;
    top: 0;
  }
}
.mint-cell-swipe-button{
  display: flex;
  align-items: center;
}
.mint-cell-title{
  display: flex;
  align-items:initial;
  span:last-child{
    flex-grow: 1;
  }
  img{
    width: 1.12rem;
    height: 1.12rem;
    border-radius: 0.1067rem;
  }
}
.mint-indexsection .mint-cell{
  border-bottom: 1px solid @bdcolor;
}
.titlle{
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}


.mint-indexlist{
  height: 100%;
  padding-top: 2rem!important;
}
</style>
