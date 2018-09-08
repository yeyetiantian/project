<template>
  <div class="pmap-container" v-show="areaFlag">
    <div class="pmap-ctrl p-20">
      <div class="flex-box">
        <input type="text" id="suggestId" placeholder="请输入地址" class="flex-grow font-30">
        <mu-icon value="search" @click="search()"></mu-icon>
      </div>
    </div>
    <progress-map v-model="progress.range" @move="handMove" :color="progress.color" :option="progressOption" v-show="progress.show"></progress-map>
    <progress-map v-model="progressE.range" @move="handMoveE" :color="progressE.color" :option="progressOption" v-show="progressE.show"></progress-map>
    <div id="container"></div>
    <div class="map-foot p-20">
      <div class="flex-box-btew">
        <mu-raised-button label="取消" @click="close"></mu-raised-button>
        <mu-raised-button label="清除" @click="clearHand"></mu-raised-button>
        <mu-raised-button label="新增" primary @click="saveHand"></mu-raised-button>
      </div>
    </div>
  </div>
</template>
<script>
  import progressMap from '../util/progressMap.vue'
  export default{
    components:{progressMap},
    props: {
      value: {
        type: String,
      },
      areaFlag: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return{
        id:this.value,
        map:null,
        currentOverlay:{
          marker:null,
          circle:null
        },
        editOverlay:{},
        ac:null,//自动完成对象
        local:null,//智能搜索对象
        zoom:15,
        progressOption:{
          min: 500,
          max: 1500,
          param:10
        },
        progress:{
          show:false,
          range: 500,
          color:'red'
        },
        progressE:{
          show:false,
          range: 500,
          color:'blue'
        },
        circleOption1:{
          strokeColor:"blue",
          strokeWeight:2,
          strokeOpacity:0.3
        },
        circleOption2:{
          strokeColor:"red",
          strokeWeight:2,
          strokeOpacity:0.3
        },
        locations:[
          /*{
            fanwei: 600,
            id: "6DE3D39C48EC860FE05011AC02003042",
            jingdu: 121.479282,
            weidu: 31.237318,
          },
          {
            fanwei: 500,
            id: "6DE3D39C48EC860FE05011AC02003043",
            jingdu: 121.469282,
            weidu: 31.237318,
          }*/
        ]
      }
    },
    watch: {
      value(val){
        this.id = val
      },
      areaFlag(val){
        this.$nextTick(function (){
          if(val){
            this.reset()
          }
        })
      }
    },
    methods: {
      initMap (BMap) {
        this.map = null
        this.map = new BMap.Map('container');
        this.map.centerAndZoom('上海',this.zoom);
        this.map.disableDoubleClickZoom()
        this._input()
        this.clearHand()
        //单击获取点击的经纬度
        this.map.addEventListener('click',this.handClick);
      },
      reset () {
        const {$map, initMap} = this
        $map().then(initMap)
      },
      //建立搜索
      _input(){
        //建立一个自动完成的对象
        if(this.ac) this.ac.dispose();
        this.ac = new BMap.Autocomplete({
          "input" : "suggestId",
          "location" : this.map
        });
        this.ac.addEventListener("onconfirm", (e) =>{    //鼠标点击下拉列表后的事件
          this.search()
        });
      },
      //获取智能搜索的结果
      search(){
        if(!this.local){
          this.local= new BMap.LocalSearch(this.map, { //智能搜索
            onSearchComplete: this._search
          });
        }
        this.local.search(document.getElementById('suggestId').value);
      },
      // 智能搜索的回调
      _search(){
        this.map.panTo(this.local.getResults().getPoi(0).point);
      },
      close(){
        this.$emit('close', false)
      },
      handMove(range){
        this.progress.range = range
        this.drawLocations()
        this.map.removeOverlay(this.currentOverlay.circle)
        this.currentOverlay.circle.setRadius(range)
        this.map.addOverlay(this.currentOverlay.circle);
      },
      handMoveE(range){
        this.progressE.range = range
        this.drawLocations()
        if(this.currentOverlay.marker){
          this.map.removeOverlay(this.currentOverlay.marker)
          this.map.removeOverlay(this.currentOverlay.circle)
          this.map.addOverlay(this.currentOverlay.marker);
          this.map.addOverlay(this.currentOverlay.circle);
        }
      },
      // 点击事件
      handClick(e){
        if(e.overlay){
          /*if(typeof e.overlay._index === "number"){
            this.editOverlay = this.locations[e.overlay._index]
            this.progressE.range = this.editOverlay.fanwei
            this.progressE.show = true
            this.progress.show = false
          }else{
            this.progressE.show = false
            this.progress.show = true
          }*/
          return
        }
        this.drawLocations()
        // e.preventDefault()
        // 清除地图上的点和圈
        this.map.removeOverlay(this.currentOverlay.marker)
        this.map.removeOverlay(this.currentOverlay.circle)
        if(!this.currentOverlay.circle){
          // 创建点和圆
          this.currentOverlay.marker = new BMap.Marker(e.point); // 创建点
          this.currentOverlay.circle = new BMap.Circle(e.point,this.progressOption.min,this.circleOption2); //创建圆
        }else{
          this.currentOverlay.marker.setPosition(e.point)
          this.currentOverlay.circle.setCenter(e.point)
        }
        // 在地图上绘制点和圆
        this.map.addOverlay(this.currentOverlay.marker);
        this.map.addOverlay(this.currentOverlay.circle);
        // 显示圆的控件
        this.progressE.show = false
        this.progress.show = true
      },
      clearHand(){
        // 清除地图上的点和圈
        this.map.removeOverlay(this.currentOverlay.marker)
        this.map.removeOverlay(this.currentOverlay.circle)
        this.currentOverlay.marker = null
        this.currentOverlay.circle = null
        this.progress.show = false
        this.progress.range = this.progressOption.min
        this.drawLocations()
      },
      // 保存位置信息
      saveHand(){
        if(!this.currentOverlay.circle){
          alert('请选择位置和范围')
          return
        }
        let p = this.currentOverlay.circle.getCenter()
        this.$ajax.post('location/add',{
          id:this.id,
          jingdu:p.lng,
          weidu:p.lat,
          fanwei:this.currentOverlay.circle.getRadius()
        })
          .then(result=>{
            this.$emit('close', false)
          })
      },
      // 获取已存在的位置
      getLocation(){
        this.$ajax.post('location/find',{})
          .then(result=>{
            this.locations = result.data.data
            this.drawLocations()
          })
      },
      drawLocations(){
        this.locations.forEach((n, i)=>{
          if(n.fanwei){
            let point = new BMap.Point(n.jingdu, n.weidu);
            if(!n.circle){
              let marker = new BMap.Marker(point)
              let circle = new BMap.Circle(point,n.fanwei,this.circleOption1)
              marker._index = i
              this.$set(n,'marker',marker)
              this.$set(n,'circle',circle)
            }else{
              this.map.removeOverlay(n.marker);
              this.map.removeOverlay(n.circle);
            }
            this.map.addOverlay(n.marker);
            this.map.addOverlay(n.circle);
          }
        })
      }
    },
    mounted () {
      this.$nextTick(function (){
        this.reset()
      })
    },
    created () {
    }
  }
</script>
<style lang="less" type="text/less">
  .pmap-container{
    width: 100vw;height: 100vh;
    position: absolute;
    z-index: 10000;
    top:0;left: 0;
  }
  .pmap-ctrl{
    width: 100%;
    position: absolute;
    top:0;left:0;
    z-index: 100;
    background-color: rgba(255,255,255,0.9);
    .mu-text-field-content{
      padding-bottom: 0;
    }
  }
  #container{
    width: 100%;height: 100%;
  }
  #suggestId{
    border: 0;outline: 0;
    border-bottom: 1px solid #333;
    padding:0.1333333rem 0 ;
  }

  .map-foot{
    width: 100%;
    position: absolute;
    bottom:0;left:0;
    z-index: 100;
    background-color: rgba(255,255,255,0.2);
  }
</style>
