<template>
  <div>
    <img-slide-check v-if="showImgSlideCheck" @success="checkSuccess()" @fail="checkFail"></img-slide-check>
  </div>
</template>

<script>
export default {
  components:{
    ImgSlideCheck:()=>import('./components/ImgSlideCheck.vue')
  },
  data(){
    return {
      showImgSlideCheck: true
    }
  },
  methods:{
    checkSuccess(){
      alert('验证成功')
      this.showImgSlideCheck = false
    },
    checkFail(){
      alert('验证失败，请重试')
    }
  }
}
</script>

<style>

</style>
