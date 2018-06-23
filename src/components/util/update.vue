<template>
  <form ref="upload" class="formUp"  enctype="multipart/form-data">
    <input type='file' name='myfiles' @change="onchange" multiple :accept="image?imgType:''">
  </form>
</template>
<script>
export default{
  props:{
    max:{
      type:String,
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
      maxNum:this.max||'9'
    }
  },
  methods: {
    onchange(){
      let formData = new FormData();
      let file=this.$refs.upload.myfiles;
      if(this.image){
        if(!this.isImg(this.$refs.upload.myfiles.value))return
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
        formData.append("myfiles", files[i]);
      }
      let config = {headers:{'Content-Type':'multipart/form-data'}};  //添加请求头
      this.$ajax.post('/filesUpload',formData,config)
        .then(result=>{
          this.$emit('onsucccess',result.data);
          this.$refs.upload.myfiles.value=''
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

