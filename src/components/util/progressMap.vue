<template>
  <div class="progress" ref="progress">
    <p :style="{backgroundColor:bgColor}"></p>
    <b>{{min}}</b>
    <i @touchstart="progressMoveStart" @touchmove="progressMove" @touchend="progressMoveEnd"></i>
  </div>
</template>

<script>
  export default {
    name: "progressMap",
    props: {
      value: {},
      color:{
        type:String
      },
      option:{
        type:Object
      }
    },
    data() {
      return {
        bgColor:this.color || 'blue',
        star:0,
        len:0,
        end:0,
        min: this.option.min || 500,
        max: this.option.max || 1500,
        param:this.option.param ||10,
        i_h:0,
        p_h:0,
        first:true
      }
    },
    watch:{
      value(val){
        if (val === this.min) {
          this.len = - this.i_h / 2
          this.end = this.len
          this.setProgress()
        }
      }
    },
    methods:{
      progressMoveStart(e){
        e.preventDefault()
        this.star = e.touches[0].clientY
        if(this.first){
          this.first = false
          this.setHeight()
        }
      },
      progressMove(e){
        e.preventDefault()
        let t =  this.end + (e.touches[0].clientY - this.star) / this.p_h * 100
        if (t <= - this.i_h / 2) t = - this.i_h / 2
        if (t >= 100 - this.i_h / 2) t = 100 - this.i_h / 2
        this.len = t
        this.setProgress()
        this.$emit('move',parseInt(this.len + this.i_h / 2) * this.param + this.min)
      },
      progressMoveEnd(e){
        e.preventDefault()
        this.end = this.len
      },
      // 设置progress
      setProgress(){
        let progress = this.$refs.progress
        let i = progress.getElementsByTagName('i')[0], p = progress.getElementsByTagName('p')[0], b = progress.getElementsByTagName('b')[0]
        p.style.height = this.len + this.i_h / 2 + '%'
        b.style.top = this.len + '%'
        b.innerHTML = parseInt(this.len + this.i_h / 2) * this.param + this.min
        i.style.top = this.len + '%'
      },
      setHeight(){
        let progress = this.$refs.progress
        let i = progress.getElementsByTagName('i')[0], p = progress.getElementsByTagName('p')[0], b = progress.getElementsByTagName('b')[0]
        this.p_h = progress.offsetHeight
        this.i_h = i.offsetHeight / this.p_h * 100
      }
    }
  }
</script>

<style lang='less' scoped>
  @width:0.26667rem;
  .progress{
    position: fixed;
    top:0;bottom:0;
    right:0.5rem;
    margin: auto;
    width: @width;
    height: 40%;
    border-radius: @width / 2;
    z-index: 1000;
    background: #eee;
    box-shadow: 0 0 2px 2px rgba(0,0,0,.4);
    p{
      width: 100%;
      height: 0;
      border-radius: @width / 2;
      background: blue;
    }
    i{
      position: absolute;
      top:-@width*1.5;
      left:-@width*1;
      display: block;
      width: @width * 3;
      height: @width * 3;
      border-radius: 50%;
      background: #ff9600;
    }
    b{
      display: inline-block;
      position: absolute;
      right:@width*3;
      top:-@width*1.5;
      padding: 0 5px;
      background: rgba(255,255,255,0.5);
      box-shadow: 0 0 1px 1px rgba(0,0,0,.3);
      margin-top: @width/2;
    }
  }
</style>
