<template>
  <div class="map-container">
    <div id="container"></div>
    <div class="resetLocation flex-box-cen" @click="getLocation" v-if="locationFlag"><mu-icon :value="loading?'cached':'location_on'" color="red"/><span>重新定位</span></div>
  </div>
</template>
<script>
  export default{
    props: {
      locationFlag: {
        type: Boolean,
        default: true
      }
    },
    data () {
      return{
        map:null,
        location:null,
        geolocation:null,
        loading:false,
        zoom:15
      }
    },
    watch: {
      value (val) {
        this.currentValue = val
      }
    },
    methods: {
      initMap (BMap) {
        this.map = new BMap.Map('container');
        this.map.centerAndZoom('上海',this.zoom);
        this.geolocation=new BMap.Geolocation();
        if(this.locationFlag)this.getLocation()
      },
      getLocation(){
        this.loading=true;
        let self=this;
        this.geolocation.getCurrentPosition(function(r){
          if(this.getStatus() == 0){
            let mk = new BMap.Marker(r.point);
            self.map.addOverlay(mk);
            self.map.panTo(r.point);
            self.loading=false;
            self.Geocoder(r.point)
          }
          else {
            alert('failed'+this.getStatus());
          }
        });
      },
      Geocoder(pt){
        let geoc = new BMap.Geocoder();
        geoc.getLocation(pt, (rs)=>{
          this.$emit('loca',rs) ;
        });
      },
      reset () {
        const {$map, initMap} = this
        $map().then(initMap)
      },
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
<style lang="less" type="text/less" scoped>
  .map-container{
    width: 100%;height: 100%;
    position: relative;
    .resetLocation{
      position: absolute;
      bottom: 0.2rem;
      left: 0.2rem;
      background-color: #ffffff;
      box-shadow: 0px 2px 2px 0px
      rgba(176, 176, 176, 0.75);
      border-radius: 18px;
      z-index: 10;
      padding: 0 0.2rem;
    }
  }
  #container{
    width: 100%;height: 100%;
  }
</style>

