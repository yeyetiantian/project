<template>
  <div class="bgW planDate">
    <div class="bgL color_white font-36 p-t-30 p-l-40 p-r-40 p-b-20">
      项目名称：XXXXXXXXXX项目 <br>合同编号： BQ18-SH00061-GZ001
    </div>
    <div class="form font-30 planLogSave">
      <div class="bgG p-l-40 p-r-40 p-t-35 p-b-30">
        <div class="item flex-box-star m-b-30">
          <label style="width: 5em">施工前后：</label>
          <div class="flex-box">
            <mu-radio label="施工前" name="group" nativeValue="simple1"  class="m-r-30"/>
            <mu-radio label="施工后" name="group" nativeValue="simple2" />
          </div>
        </div>
        <div class="item flex-box-star">
          <label style="width: 5em">班组：</label>
          <span>李军</span>
        </div>
      </div>
      <div class="p-l-40 p-r-40 p-t-35 p-b-30">
        <div class="item flex-box-star">
          <label style="width: 5em">现场照片：</label>
          <div class="img-box">
            <div class="img m-r-10">
              <img src="../../assets/img/img.png" alt="">
            </div>
            <div class="img">
              <mu-icon value="add_a_photo"/>
            </div>
          </div>
        </div>
        <div class="item flex-box-star">
          <label style="width: 5em"></label>
          <div class="img-box">
            <div class="img m-r-10">
              <img src="../../assets/img/img.png" alt="">
            </div>
            <div class="img">
              <mu-icon value="add_a_photo"/>
            </div>
          </div>
        </div>
        <div class="item">
          <label style="width: 5em">施工人数：</label>
          <mu-text-field hintText="施工人数" />
        </div>
        <div class="item">
          <label style="width: 5em">描述：</label>
          <mu-text-field hintText="文字描述现场情况及状况" multiLine :rows="3" :rowsMax="6"/>
        </div>
      </div>
    </div>
    <mu-raised-button label="保存" primary fullWidth class="p-t-50 p-b-50 font-50 m-t-50" />
  </div>
</template>

<script>
    export default {
        name: "addlogSave",
        data() {
            return {
              name:'i'
            }
        }
    }
</script>

<style lang='less'>
  .planDate{
    height: 100%;
    .form{
      .item{
        >:last-child{
          max-width: none;
        }
      }
      .mu-radio{
        width: auto;
      }
    }
  }
</style>
