<template>
  <div class="punch p-b-40">
    <div class="map bgG">
      <div class="clock-big flex-box-cen" :class="distance&&distance<100?'':'no'">
        <div class="clock-small">
          <span class="font-30 m-b-50" >{{distance&&distance<100?'您已进入打卡范围':'目前不再打卡范围'}}</span>
          <span class="font-24 flex-box-btew flex-box-star" ><mu-icon value="location_on"></mu-icon><i style="width: 3.85333rem">{{activePro.conProaddress}}</i></span>
        </div>
      </div>
      <Map @loca="getlocation"></Map>
    </div>
    <form class="form font-28 m-t-20">
      <div class="item m-b-10">
        <label>当前位置：</label>
        <mu-text-field hintText="当前位置" v-model="form.clockAddress" @focus="$event.target.blur()"></mu-text-field>
      </div>
      <div class="item m-b-10">
        <label>项目名称：</label>
        <mu-select-field v-model="form.conProid" hintText="项目名称" @change="selectPro">
          <mu-menu-item v-for="(x,i) in proList" :key="x.conProid" :value="x.conProid" :title="x.conProname" ></mu-menu-item>
        </mu-select-field>
      </div>
      <div class="item m-b-20">
        <label>施工班组：</label>
        <span>{{activePro.construc}}</span>
      </div>
      <div class="item m-b-20">
        <label>施工编号：</label>
        <span>{{activePro.conProcode}}</span>
      </div>
      <div class="item flex-box-star" style="margin-bottom: 0">
        <label>现场照片：</label>
        <div class="img-box">
          <div class="img m-r-10" v-for="(x,i) in imgList" :key="'img_'+i">
            <img :src="$ajax.defaults.baseURL+''+x.filePath" alt="">
          </div>
          <div class="img">
            <mu-icon value="add_a_photo"></mu-icon>
            <up @onsucccess="upimg" :image="true"></up>
          </div>
          <div class="error color_red">{{formRule.conClockpic.text}}</div>
        </div>
      </div>
      <div class="item">
        <label>备注：</label>
        <mu-text-field v-model="form.conClockproj" hintText="请输入备注"/>
      </div>
      <div class="p-l-50 p-r-50 m-t-20">
        <mu-raised-button :label="`${time} 正常打卡`" primary fullWidth class="p-t-20 p-b-20 " @click="submit" :disabled="!distance||distance>=100"/>
      </div>
    </form>
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
          proList:[],
          location:{},//定位对象
          distance:0,//距离
          imgList:[],
          form:{
            clockAddress:'',
            conProid:'',
            conClockpic:'',
            conClockproj:'',
          },
          activePro:{},
          formRule:{
            conClockpic:{
              text:'',
              msg:'请上传施工照片'
            },
            conProid:{
              text:'',
              msg:'请选择项目'
            },
          }
        }
      },
      watch:{
        'form.conProid'(val){
          this.proList.forEach((n)=>{
            if(n.conProid===Number(val)){
              this.activePro=n
              let pt = new BMap.Point(n.longitude,n.latitude);
              this.distance=this.checkPoint(pt);
            }
          })
        },
        imgList(val){
          let str='';
          val.forEach(n=>{
            str+=n.filePath+','
          });
          this.form.conClockpic=str
        }
      },
      computed:{
        time(){
          return this.$options.filters.formatDate(this.now,'hh:mm');
        }
      },
      methods: {
        getList(){
          this.$ajax.post('/task/conprolist',{})
            .then((result)=>{
              this.proList=result.data.data;
              if(this.proList.length<1){
                alert('请等待分配项目');
                this.$router.push('/build/proList')
              }
            })
        },
        selectPro(obj){
          this.activePro=obj
        },
        getlocation(rs){
          this.location=rs;
          this.form.clockAddress=rs.address;
          if(this.proList.length>0){
            this.$map().then((BMap)=>{
              let flag=true
              this.proList.forEach((n)=>{
                let pt = new BMap.Point(n.longitude,n.latitude);
                let distance=this.checkPoint(pt);
                if(distance&&distance<100){
                  this.distance=distance;
                  this.form.conProid=n.conProid
                  flag=false
                }
              })
              if(flag) this.form.conProid=this.proList[0].conProid
            })
          }
        },
        checkPoint(pt){
          return BMapLib.GeoUtils.getDistance(this.location.point,pt)
        },
        upimg(list){
          this.formRule.conClockpic.text='';
          this.imgList=this.imgList.concat(list);
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
            let flag=true
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
        submit(){
          if(!this.checkfun()){return}
          this.$ajax.post('/constrcard/addsence',this.form)
            .then(result=>{
              this.$toast({
                message: '保存成功',
                iconClass: 'icon icon-success',
                duration: 1000
              });
              setTimeout(()=>{
                this.$router.push('/operate/log')
              },1000)
            })
        }
      },
      created(){
        this.getList();
        setTimeout(()=>{
          this.now=new Date();
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
