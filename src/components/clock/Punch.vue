<template>
  <div class="punch p-b-40">
    <div class="map bgG">
      <div class="clock-big flex-box-cen" :class="distance&&distance<100?'':'no'">
        <div class="clock-small">
          <span class="font-30 m-b-50" >{{distance&&distance<100?'您已进入打卡范围':'目前不在打卡范围'}}</span>
          <span class="font-24 flex-box-btew flex-box-star" ><mu-icon value="location_on"></mu-icon><i style="width: 3.85333rem">{{form.curAddress}}</i></span>
        </div>
      </div>
      <Map @loca="getlocation"></Map>
    </div>
    <form class="form font-28 m-t-20">
      <div class="item">
        <label>当前位置：</label>
        <mu-text-field hintText="当前位置" v-model="form.clockAddress" @focus="$event.target.blur()"></mu-text-field>
      </div>
      <div class="item">
        <label>拜访客户：</label>
        <mu-select-field v-model="form.clockId" hintText="客户名称" >
          <mu-menu-item v-for="(x,i) in planList" :key="x.planId" :value="x.planId" :title="x.custname" ></mu-menu-item>
        </mu-select-field>
        <!-- <div class="flex-box-btew flex-box-star">
         --<mu-select-field v-model="serviceSelect" hintText="客户名称" :error-text="formRule.planName.text" @change="checkfun('planName')">
             <mu-menu-item v-for="(x,i) in serviceTypeList" :key="i" :value="i" :title="x" />
           </mu-select-field>-->
          <!--<mu-raised-button class="m-l-20" label="添加" icon="person" primary to="/customer/add"/>
        </div>-->
      </div>
      <div class="item flex-box-star">
        <label>楼照：</label>
        <div class="img-box">
          <div class="img m-r-10" v-for="(x,i) in imgList" :key="'img_'+i">
            <img :src="$ajax.defaults.baseURL+''+x.filePath" @click="open($ajax.defaults.baseURL+''+x.filePath)">
          </div>
          <div class="img">
            <mu-icon value="add_a_photo"></mu-icon>
            <up @onsucccess="upimg" :image="true"></up>
          </div>
          <div class="error color_red">{{formRule.clockImage.text}}</div>
        </div>
      </div>
      <div class="item">
        <label>备注：</label>
        <mu-text-field v-model="form.clockDescri" hintText="多行文本输入，默认 3行，最大6行" multiLine :rows="3" :rowsMax="6" :error-text="formRule.clockDescri.text" @change="checkfun('clockDescri')"></mu-text-field>
      </div>
      <div class="p-l-50 p-r-50 m-t-40">
        <mu-raised-button :label="time + ' 正常打卡'" @click="clockAdd" primary fullWidth class="p-t-20 p-b-20 "></mu-raised-button>
      </div>
    </form>
    <mu-dialog :open="dialog" @close="dialog = false" dialogClass="imgDilog">
      <img :src="diaImg" alt="" @click="dialog = false">
    </mu-dialog>
  </div>
</template>

<script>
  import Map from '../util/map.vue'
  import up from '../util/update.vue'
    export default {
      name: "Punch",
      components: {
        Map,up
      },
      data() {
        return {
          now:new Date(),
          serviceTypeList:['政府','业主','材料商'],
          serviceSelect:0,
          dialog:false,
          diaImg:'',
          planList:[],
          imgList:[],
          selectPlan:{},
          curShow:false,
          location:{},//定位对象
          distance:0,//距离
          form:{
            clockDescri:'',
            clockAddress:'',
            clockState:'正常打卡',
            clockId:'',
            clockName:'',
            curAddress:'',
            clockDate:'',
            clockImage:''
          },
          formRule:{
            clockDescri:{
              text:'',
              msg:'请输入备注'
            },
            clockName:{
              text:'',
              msg:'请选择客户名称'
            },
            clockImage:{
              text:'',
              msg:'请上传打卡照片'
            }
          }
        }
      },
      watch:{
        'form.clockId'(val){
          this.planList.forEach((n)=>{
            if(n.planId===Number(val)){
              this.form.clockName=n.custname;
              this.form.curAddress=n.planDetailaddress;
              let pt = new BMap.Point(n.longitude,n.latitude);
              this.distance=this.checkPoint(pt);
            }
          })
        },
        distance(val){
          if(val&&val<100){
            this.form.clockState='正常打卡'
          }else{
            this.form.clockState='非正常打卡'
          }
        },
        imgList(val){
          let str='';
          val.forEach(n=>{
            str+=n.filePath+','
          });
          this.form.clockImage=str.substring(0,src.length-1)
        }
      },
      computed:{
        time(){
          let value=this.now;
          let hour=value.getHours(), second=value.getMinutes();
          hour=hour>9?hour:'0'+hour;
          second=second>9?second:'0'+second;
          return ''+hour+':'+second
        }
      },
      methods: {
        open(src){
          this.dialog=true;
          this.diaImg=src
        },
        getList(){
          this.$ajax.post('/plan/daylist',{})
            .then((result)=>{
              this.planList=result.data.data;
              if(this.planList.length<1){
                alert('请先去添加计划');
                this.$router.push('/plan/add')
              }
            })
        },
        getlocation(rs){
          this.location=rs;
          this.form.clockAddress=rs.address;
          if(this.planList.length>0){
            this.$map().then((BMap)=>{
              let flag=true
              this.planList.forEach((n)=>{
                let pt = new BMap.Point(n.longitude,n.latitude);
                let distance=this.checkPoint(pt);
                if(distance&&distance<100){
                  this.distance=distance;
                  this.form.clockId=n.planId
                  this.form.clockName=n.custname
                  this.form.curAddress=n.planDetailaddress
                  flag=false
                }
              })
              this.form.clockId=this.planList[0].planId
              this.form.clockName=this.planList[0].custname
              this.form.curAddress=this.planList[0].planDetailaddress
            })
          }
        },
        checkPoint(pt){
          return BMapLib.GeoUtils.getDistance(this.location.point,pt)
        },
        upimg(list){
          this.formRule.clockImage.text='';
          this.imgList=this.imgList.concat(list);
        },
        //执行打卡
        clockAdd(){
          if(!this.checkfun())return;
          this.$ajax.post('/clock/add',this.form)
            .then((result)=>{
              this.$toast({
                message: '打卡成功',
                iconClass: 'icon icon-success',
                duration: 1000
              });
              setTimeout(()=>{
                this.$router.push('/clock/record')
              },1000)
            })
        },
        checkfun(key){
          if(key){
            if(this.formRule[key].rule&&!(this.formRule[key].rule.test(this.form[key]))){
              this.formRule[key].text=this.formRule[key].msg
            }else if(!this.form[key]){
              this.formRule[key].text=this.formRule[key].msg
            }else{
              this.formRule[key].text=''
            }
          }else{
            let flag=true;
            for (let i in this.formRule){
              if(!this.form[i]){
                this.formRule[i].text=this.formRule[i].msg
                flag =false
              }else{
                this.formRule[i].text=''
              }
            }
            return flag
          }
        },
        selecOrg(x){
          this.form.clockName=x.planName;
        }
      },
      created(){
        this.getList();
        setTimeout(()=>{
          this.now=new Date();
          this.form.clockDate=this.$options.filters.formatDate(this.now,'YY-MM-DD hh:mm');
        },1000*5)
      }
    }
</script>

<style lang="less">
  .punch{
    .map{
      height: 7.10667rem;
      position: relative;
    }
    .clock-big{
      width: 6.48rem;
      height: 6.48rem;
      border-radius: 50%;
      border: solid 1px rgba(3, 169, 244, 0.8);
      position: absolute;top:0;right:0;left:0;bottom:0;
      margin: auto;z-index: 1;
      .clock-small{
        width: 5.97333rem;
        height: 5.97333rem;
        border-radius: 50%;
        background-color: rgba(3, 169, 244, 0.8);
        display: flex;
        flex-direction: column;
        justify-content: center;
        color: #fff;
        align-items: center;
      }
      &.no{
        .clock-big{
          border-color: transparent;
        }
        .clock-small{
          background-color: rgba(255,255,255,.8);
          color: #43abfc;
          border: solid 1px rgba(3, 169, 244, 0.8);
        }
      }
    }
  }

</style>
