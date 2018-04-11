<template>
  <div>
    <div class="searchBox ">
      <mu-text-field hintText="日期 / 班组名 / 项目名称" icon="search"/>
      <span class="addCur font-36 p-r-20 p-l-20"><mu-icon-button icon="add_circle" to="customer/add"/>客户</span>
    </div>
    <mt-index-list>
      <mt-index-section v-for="x in indexList" :index="x">
        <mt-cell-swipe
          v-for="c in 5"
          class="p-t-20 p-b-20"
          :to="'./customer/info/'+c"
          :right="[
            {
              content: '修改',
              style: { background: 'blue', color: '#fff' },
              handler: () => edit(c)
            }
         ]"
        >
          <span slot="title" class="titlle p-l-25">
            <i>标题文字</i>
            <i class="color_999">描述信息</i>
          </span>
          <span>icon 是图片</span>
          <img slot="icon" src="">
        </mt-cell-swipe>
      </mt-index-section>
    </mt-index-list>
  </div>

</template>

<script>
    export default {
      name: "infoList",
      data (){
        return{
          indexList:['A','B','C','D','E','F','G','H','I','G','K'],
        }
      },
      methods: {
        edit(id){
          this.$router.push('customer/edit/'+id)
        }
      }
    }
</script>

<style lang="less">
@import "../../assets/less/set.less";
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
  height: 16.1866rem;
}
</style>
