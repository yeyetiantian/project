<template>
  <mu-popup position="right" :open="areaFlag" @close="close">
    <div class="pmap-container">
      <div class="pmap-ctrl p-30">
        <div class="flex-box m-b-20">
          <input v-model="currentValue" type="text" id="suggestId" placeholder="请输入地址" class="flex-grow font-30">
          <mu-icon value="search" :class="currentValue===''?'color_999':'color_blue'" @click="Geocoder(currentValue)"></mu-icon>
        </div>
        <div class="text-right">
          <mu-raised-button label="取消" @click="close"/>
          <mu-raised-button label="确定" @click="confirm" primary/>
        </div>
      </div>
      <div id="container"></div>
      <div class="center-ctrl">
        <mu-icon value="location_on" class="color_blue font-40" :class="moveOn"></mu-icon>
        <span></span>
      </div>
    </div>
  </mu-popup>
</template>
<script>
  export default{
    props: {
      value: {
        type: String
      },
      point: {
        type: Object
      },
      areaFlag: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return{
        currentValue:this.value,
        currentPoint:this.point,
        map:null,
        ac:null,
        moveOn:'',
        location:null,
        loading:false,
        zoom:15
      }
    },
    watch: {
      value (val) {
        this.currentValue = val
      },
      point (val) {
        this.currentPoint = val
      },
      areaFlag(val){
        this.$nextTick(function (){
          if(val)this.reset()
        })
      }
    },
    methods: {
      initMap (BMap) {
        this.map = new BMap.Map('container');
        this.map.centerAndZoom('上海',this.zoom);
        this.map.removeEventListener("dragging");
        this.map.removeEventListener("dragend");
        this.map.addEventListener("dragging", ()=>{
          this.moveOn='on'
        });
        this.map.addEventListener("dragend",()=>{
          this.moveOn='';
          this.getCenter()
        });
        this._input();
        if(this.currentValue){
          document.getElementById('suggestId').value=this.currentValue;
          this.Geocoder(this.currentValue)
        }

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
          let _value=e.item.value
          let address=_value.province +  _value.city +  _value.district +  _value.street +  _value.business;
          this.currentValue=address;
          this.Geocoder(address)
        });
      },
      getCenter(){
        let center = this.map.getCenter();
        this.getLocation(center)
      },
      reset () {
        const {$map, initMap} = this
        $map().then(initMap)
      },
      //逆地址解析
      getLocation(point){
        let myGeo = new BMap.Geocoder();
        myGeo.getLocation(point, (rs)=>{
          if (rs) {
            this.currentValue=rs.address
            this.currentPoint=point
          }else{
            alert("您选择地址没有解析到结果!");
          }
        });
      },
      //获取智能搜索的结果
      Geocoder(_value){
        let self=this;
        let local = new BMap.LocalSearch(this.map, { //智能搜索
          onSearchComplete: myFun
        });
        function myFun(){
          let pp = local.getResults().getPoi(0).point;    //获取第一个智能搜索的结果
          self.currentPoint=pp;
          self.map.panTo(pp);
        }
        local.search(_value);
      },
      close(){
        this.$emit('close', false)
      },
      confirm(){
        this.$emit('input', this.currentValue);
        this.$emit('confim', this.currentPoint);
        this.$emit('close', false)
      }
    },
    mounted () {
      this.$nextTick(function (){
        this.reset()
      })
    },
    created () {
     // map.getCenter
    }
  }
</script>
<style lang="less" type="text/less">
  .pmap-container{
    width: 100vw;height: 100vh;
    position: relative;
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
  .center-ctrl{
    width: 0.53333rem;
    height: 0.53333rem;
    position: absolute;
    top:0;left:0;right:0;bottom:0;
    margin: auto;
    z-index: 100;
    display: flex;
    flex-direction: column;
    align-items: center;
    i{
      display: block;
      margin-top: -0.26667rem;
      transition: all 0.3s ease;
      &.on{
        transform: translateY(-8px);
      }
    }
    span{
      display: block;
      width: 0.26667rem;
      height: 0.26667rem;
      background-color: rgba(0,0,0,.6);
      border-radius: 100%;
      transform: rotateX(-60deg);
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
</style>

