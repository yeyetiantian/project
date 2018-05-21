<template>
  <mu-popup position="bottom" popupClass="areaBox" :open="areaFlag" @close="Close">
    <mu-appbar title="地区选择">
      <mu-flat-button slot="right" label="关闭" color="white" @click="Close"/>
      <mu-flat-button slot="right" label="确认" color="white" @click="confirm"/>
    </mu-appbar>
    <mt-picker :slots="addressSlots" @change="onValuesChange"></mt-picker>
  </mu-popup>
</template>
<script>
  import areaJson from '../../assets/js/area'
  export default{
    props: {
      value: {
        type: String,
        default: '北京市-市辖区-东城区'
      },
      areaFlag: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return{
        currentValue: this.value,
        Values: this.value?this.value.split('-'):[],
        flag:this.areaFlag,
        provinceId:110000,
        cityId:110100,
        countyId:110101,
        /*addressSlots:[
          {
            flex: 1,
            values: Object.values(areaJson[100000]),
            defaultIndex:0,
            className: 'slot1',
            textAlign: 'center'
          },
          {
            divider: true,
            content: '-',
            className: 'slot2'
          },
          {
            flex: 1,
            values: Object.values(areaJson[110000]),
            className: 'slot3',
            textAlign: 'center'
          },
          {
            divider: true,
            content: '-',
            className: 'slot4'
          },
          {
            flex: 1,
            values: Object.values(areaJson[110100]),
            className: 'slot5',
            textAlign: 'center'
          }
        ]*/
      }
    },
    methods: {
      onValuesChange(picker, values) {
        let prov=areaJson[100000];
        for (let i in prov) {
          if(prov[i]===values[0]){
              this.provinceId=i
          }
        }
        let city=areaJson[this.provinceId]
        for (let i in city) {
          if(city[i]===values[1]){
              this.cityId=i
          }
        }
        let cont=areaJson[this.cityId]
        for (let i in cont) {
          if(cont[i]===values[2]){
              this.countyId=i
          }
        }
        picker.setSlotValues(1, Object.values(city));
        picker.setSlotValues(2, Object.values(cont));
        this.currentValue=values[0]+'-'+values[1]+'-'+values[2]
      },
      Close(){
        this.$emit('close', false)
      },
      confirm(){
        this.$emit('input', this.currentValue);
        this.$emit('close', false)
      }
    },
    computed:{
      addressSlots(){
        let slots=[],indexProv = 0,indexCity = 0,indexCount = 0,listProv=areaJson[100000],listCity=areaJson[110000],listCount=areaJson[110100];
        if(this.Values.length>0){
          indexProv = Object.values(listProv).indexOf(this.Values[0]);
          for (let i in listProv) {
            if(listProv[i]===Object.values(listProv)[indexProv]){
              listCity=areaJson[i]
            }
          }
          indexCity = Object.values(listCity).indexOf(this.Values[1]);
          for (let i in listCity) {
            if(listCity[i]===Object.values(listCity)[indexCity]){
              listCount=areaJson[i]
            }
          }
          indexCount = Object.values(listCount).indexOf(this.Values[2]);
        }
        slots.push({
          flex: 1,
          values: Object.values(listProv),
          defaultIndex:indexProv,
          className: 'slot1',
          textAlign: 'center'
        });
        slots.push({
          divider: true,
          content: '-',
          className: 'slot2'
        });
        slots.push({
          flex: 1,
          values: Object.values(listCity),
          defaultIndex:indexCity,
          className: 'slot3',
          textAlign: 'center'
        });
        slots.push({
          divider: true,
          content: '-',
          className: 'slot4'
        });
        slots.push({
          flex: 1,
          values: Object.values(listCount),
          defaultIndex:indexCount,
          className: 'slot5',
          textAlign: 'center'
        });
        return slots
      }
    },
    watch: {
      value (val) {
        this.currentValue = val
        this.Values = val.split('-')
      },
      currentValue (val) {}
    },
    created () {
    }
  }
</script>
<style lang="less" type="text/less">
  .areaBox{
    width: 100%;
  }
</style>

