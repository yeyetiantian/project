<template>
  <form ref="upload" class="formUp"  enctype="multipart/form-data">
    <input type='file' :name='options.name' @change="onchange" multiple :accept="image?imgType:''">
  </form>
</template>
<script>
export default{
  props:{
    max:{
      type:String,
    },
    option:{
      type:Object,
    },
    image:{
      type:Boolean,
      deafult:false
    }
  },
  data () {
    return{
      files:null,
      imgType:'image/jpeg,image/jpg,image/png',
      maxNum:this.max||'9',
      options:this.option||{url:'/filesUpload',name:'myfiles'}
    }
  },
  methods: {
    onchange(){
      let formData = new FormData();
      let file=this.$refs.upload[this.options.name];
      if(this.image){
        if(!this.isImg(this.$refs.upload[this.options.name].value))return
      }
      let files=file.files;
      if(files.length>Number(this.maxNum)){
        this.$toast({
          message: `图片最多上传${this.maxNum}张`,
          iconClass: 'icon icon-success',
          duration: 2000
        });
        return
      }
      for(let i in files){
        formData.append(this.options.name, files[i]);
      }
      let config = {
        headers:{'Content-Type':'multipart/form-data'},
        baseURL:(this.options.name==='file'?this.$ajax.defaults.baseURL1:this.$ajax.defaults.baseURL)
      };  //添加请求头
      this.$ajax.post(this.option.url,formData,config)
        .then(result=>{
          this.$emit('onsucccess',result.data);
          this.$refs.upload[this.options.name].value=''
        })
    },
    isImg(value){
      let suffix=value.toLowerCase().split('.');
      suffix=suffix[suffix.length-1];
      if(suffix==='jpg'||suffix==='png'||suffix==='jpeg'){
        return true
      }else{
        this.$toast({
          message: '请选择格式为*.jpg、*.png、*.jpeg 的图片',
          iconClass: 'icon icon-success',
          duration: 2000
        });
        return false
      }
    }
  },
  created () {
  }
}
</script>
<style lang="less" type="text/less" scoped>
  .formUp{
    width: 100%;
    height: 100%;
    position: absolute;
    top:0;left:0;
    z-index: 10;
    opacity: 0;
    overflow: hidden;
    input{
      width: 100%;
      height: 100%;
    }
  }
</style>

