<template>
  <div class="bgG">
    <div class="scheule p-t-40 p-b-20 p-l-35 p-r-35 font-30">
      <h1 class="font-36 text-bold m-b-25">海天大厦幕墙设计项目</h1>
      <p class="flex-box-btew m-b-15"><span>项目负责人： 王建勇 </span><span>维修</span></p>
      <p class="m-b-15"><span>合同编号： 无</span></p>
      <p class="m-b-15"><span>当前阶段： 立项</span></p>
    </div>
    <mt-navbar v-model="selected" class="m-t-25 scheuletab">
      <mt-tab-item id="1" class="p-20">项目阶段</mt-tab-item>
      <mt-tab-item id="2" class="p-20">收款</mt-tab-item>
      <mt-tab-item id="3" class="p-20">满意度</mt-tab-item>
    </mt-navbar>
    <mt-tab-container v-model="selected" swipeable class="font-28 bgW" >
      <mt-tab-container-item id="1" class="p-20">
        <mu-timeline iconColor="#b3e5fc">
          <mu-timeline-item v-for="(x,i) in lineList" :key="i">
            <div class="timeLineIcon" :class="x.status" slot="icon"></div>
            <div class="flex-box-btew m-b-10" :class="x.status" slot="time">
              <span>{{x.name}}</span>
              <mu-raised-button label="更多" labelPosition="before" icon="more_horiz"/>
            </div>
            <span slot="des" class="p-t-25 p-b-25 p-l-30 p-r-30">{{x.con}}</span>
          </mu-timeline-item>
        </mu-timeline>
        <mu-raised-button label="下一步计划" primary fullWidth class="p-t-20 p-b-20 m-b-25" />
        <mu-text-field hintText="下一步计划的描述文字内容。。。。。。。" multiLine fullWidth :rows="3" :rowsMax="6" :underlineShow	="false" class="p-30 nextCon"/>
        <mu-raised-button label="关闭" fullWidth class="p-t-20 p-b-20" />
      </mt-tab-container-item>
      <mt-tab-container-item id="2">
        <div class="form p-b-40 contact">
          <div class="text-center font-36 p-t-40 p-b-30">
            合同总金额：<span class="font-48 color_red">300,0000</span>
          </div>
          <div v-for="(x,i) in contactList">
            <div class="item bgG p-l-30 p-r-30 p-t-25 p-b-25 m-b-15">
              <label>第{{i+1}}笔：</label>
              <span>100,0000</span>
            </div>
            <div class="item p-l-30 p-r-30 m-b-15">
              <label>开票金额：</label>
              <span>100,0000</span>
            </div>
            <div class="item p-l-30 p-r-30 m-b-15">
              <label>开票日期：</label>
              <span>2018年4月1日 </span>
            </div>
            <div class="item p-l-30 p-r-30 m-b-15">
              <label>到账日期：</label>
              <span>2018年4月1日 </span>
            </div>
            <div class="item p-l-30 p-r-30">
              <label>实际到帐金额：</label>
              <span>100,0000</span>
            </div>
          </div>
          <mu-divider class="m-t-15 m-b-15"/>
          <div class="item p-l-30 p-r-30">
            <label>尾款：</label>
            <span style="color: #47adfc">100,0000</span>
          </div>
          <form class="p-30" v-if="addVisitor">
            <div class="item">
              <label>第{{contactList.length+1}}笔：</label>
              <mu-text-field hintText="300,0000" />
            </div>
            <div class="item">
              <label>开票金额：</label>
              <mu-text-field hintText="300,0000" />
            </div>
            <div class="item">
              <label>开票日期：</label>
              <mu-date-picker hintText="生日" />
            </div>
            <div class="item">
              <label>实际到帐金额：</label>
              <mu-text-field hintText="300,0000" />
            </div>
            <div class="item">
              <label>尾款：</label>
              <div class="flex-box-btew">
                <mu-text-field hintText="300,0000" style="width: 50%"/>
                <mu-raised-button label="设置提醒日期" class="m-l-10 flex-grow" secondary/>
              </div>
            </div>
            <div class="item">
              <label>到账日期：</label>
              <mu-date-picker hintText="2020年3月1日" />
            </div>
          </form>
          <div class="p-l-50 p-r-50 m-t-40">
            <mu-raised-button label="+ 多笔金额" primary fullWidth class="p-t-20 p-b-20" v-if="!addVisitor" @click="addVisitor=true"/>
            <mu-raised-button label="确认保存" primary fullWidth class="p-t-20 p-b-20 " v-if="addVisitor" @click="addContact"/>
            <mu-raised-button label="关闭" fullWidth class="p-t-20 p-b-20 m-t-20" />
          </div>
        </div>
      </mt-tab-container-item>
      <mt-tab-container-item id="3">
        <div class="flex-box-btew m-b-20">
          <span>进行中的项目 30个</span>
          <span class="color_red">需要进一步跟踪的有 3个</span>
        </div>
        <div class="proList">
          <div class="item p-20 m-b-20" v-for="x in 5">
            <div class="flex-box-btew m-b-20">
              <span>海天大厦幕墙设计项目</span>
              <span>新建</span>
            </div>
            <div class="flex-box-btew m-b-20">
              <span>网悲怆</span>
              <span><mu-icon value="grade"/><mu-icon value="grade"/><mu-icon value="grade"/><mu-icon value="grade"/></span>
            </div>
            <div class="flex-box-btew">
              <span>当前阶段：立项</span>
              <span>2018-12-12</span>
            </div>
          </div>
        </div>
      </mt-tab-container-item>
    </mt-tab-container>
  </div>
</template>

<script>
  export default {
    name: "schedule",
    data() {
      return {
        selected: '1',
        lineList:[
          {
            status:'complete',
            name:'前期了解',
            con:'2017/12/1 文字内容详细描述.....'
          },
          {
            status:'complete',
            name:'需求/需求变更',
            con:'2017/12/1 文字内容详细描述.....'
          },
          {
            status:'do',
            name:'立项',
            con:'2017/12/1 文字内容详细描述.....'
          },
          {
            status:'wait',
            name:'预算',
            con:'2017/12/1 文字内容详细描述.....'
          },
          {
            status:'wait',
            name:'招投标',
            con:'2017/12/1 文字内容详细描述.....'
          },
          {
            status:'wait',
            name:'报价',
            con:'2017/12/1 文字内容详细描述.....'
          },
          {
            status:'wait',
            name:'招投标结果',
            con:'2017/12/1 文字内容详细描述.....'
          },
          {
            status:'wait',
            name:'合同',
            con:'2017/12/1 文字内容详细描述.....'
          },
          {
            status:'wait',
            name:'开工令',
            con:'2017/12/1 文字内容详细描述.....'
          },
          {
            status:'wait',
            name:'资料交接归档',
            con:'2017/12/1 文字内容详细描述.....'
          },
          {
            status:'fail',
            name:'终止',
            con:'非正常状态进行项目， 终止项目，要写终止说明。（此处非正常进行的话，显示红色。）'
          },
        ],
        addVisitor:false,
        contactList:[1,1]
      }
    },
    methods: {
      addContact() {
        this.contactList.push(1);
        this.addVisitor=false;
      }
    },
  }
</script>

<style lang="less">
  @import "../../assets/less/set";
.scheule{
  background-color: @bgcolor;
  color: #fff;
}
  .nextCon{
    box-shadow: 1px 1px 2px 0px
    rgba(0, 0, 0, 0.15);
    border-radius: 0.16rem;
    border: solid 1px #e8e8e8;
  }
</style>
