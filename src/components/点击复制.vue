<template>
  <div>
      <div ref="btn" @click="handleClickCopy(name)" class="copyBtn ml-1" >
         <img src="@/assets/icons/copy.png" class=" max-h-5" alt="" v-if="needCopy">
      </div>
  </div>
</template>

<script lang="ts">
import ClipboardJS from "clipboard";

export default {
    methods:{
      async handleClickCopy(text: string | number) {
      // this.$util.cliboard(text);
      // this.$toast("复制成功");

      // const clipboardObj = navigator.clipboard
      // await  clipboardObj.writeText(text.toString())
      let clipboard = new ClipboardJS('.copyBtn', {
          text: function() {
                  return text.toString();
                }
          });
      clipboard.on("success", (e)=>{
        this.$toast("复制成功~");
        e.clearSelection();
      });

      clipboard.on("error", ()=>{
        this.$toast("复制失败~");
      });
      
    },
    }
}
</script>

<style>

</style>