<template>
  <div class=" flex flex-wrap">
    <input type="file" class=" hidden" multiple ref="inputDom" @change="handleFileChange">
    <!-- 上传的文件展示 -->
    <div v-for="(url,index) in urlList" :key="index" class=" w-1/3 h-32 p-1 relative">
        <img :src="url" alt="" class=" w-full h-full rounded" @click="showImgPreview(index)" v-if="uploadType == 'img'">
        <div class=" h-8 text-center absolute bottom-1 left-1 right-1 bg-gray-500 opacity-80 text-white leading-8 text-xs" v-if="index == 0 && uploadType == 'img'">默认封面</div>
        <video :src="url" controls="controls" class="w-full h-full rounded" v-if="uploadType == 'video'"/>
        <app-icon name='icon-fahangnft' class="delete-icon absolute -top-1 right-0.5 w-1/6 rounded-full bg-white" size='22px' color='#f68585' @click.native="deleteImg(index)"></app-icon>
    </div>
    <!-- 上传按钮 -->
    <div v-if="fileList.length < maxCount" @click="upload" class=" h-32 w-1/3 text-zx-blue-light p-1">
        <div class=" h-full w-full bg-zx-btn-disabled-bg relative">
          <app-icon name='icon-shanchu' class="upload-icon" size="25px" color='#A7B5CD'></app-icon>
        </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue"
import { ImagePreview } from 'vant'
export default Vue.extend({
    props: {
        fileList: Array,
        maxCount: Number,
        uploadType: {
            default: 'img',
            type: String
        },
    },
    components:{
        'app-icon':()=>import('@/components/common/Icon.vue')
    },
    methods: {
        upload():void{
            const dom = this.$refs.inputDom as HTMLInputElement
            dom.click()
        },
        handleFileChange(e:any):void{
            const dom = this.$refs.inputDom as HTMLInputElement
            const file = e.target.files[e.target.files.length-1] 
            const type_name = file.name.substring(file.name.lastIndexOf('.'),file.name.length)
            if(this.acceptType.indexOf(type_name) == -1) {
               this.$toast('请上传指定类型文件~')
               dom.value = ''
               return
            }
            //目标文件列表由父组件传递,所以改变需要让父组件改
            this.$emit('fileChange',e.target.files)
            dom.value = ''
        },
        deleteImg(index:number):void{
            this.$emit('deleteFile',index)
        },
        showImgPreview(index:number):void{
            ImagePreview({images:this.urlList,startPosition:index})
        }
    },
    computed: {
        urlList():Array<any>{
            return this.fileList.map((item:any)=>{
                if(item.fileUrl) {
                    return item.fileUrl
                }else {
                    return window.URL.createObjectURL(item)
                }
            })
        },
        acceptType(){
            switch(this.uploadType){
                case 'img':
                    return ['.png','.jpg','.jpeg','.PNG','.JPG','.JPEG'];
                case 'video':
                    return ['.mp4','.mov','.avi','.MP4','.MOV','.AVI'];
                default:
                    return []
            }
        }
    }
})
</script>

<style>
.delete-icon {
    transform: rotate(45deg);
}
.upload-icon {
    position:absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%) rotate(45deg);
}

</style>