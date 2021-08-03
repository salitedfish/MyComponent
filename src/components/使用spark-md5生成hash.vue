<template>
  <div></div>
</template>

<script>
import SparkMD5 from 'spark-md5'
export default {
    async mounted(){
        
        const file = 'input获取到的文件'

        const ab = await file.arrayBuffer();//将文件读取成buffer数组
        // const fileMd5 = md5(Buffer.from(ab));
        let chunkSize = 104857600;//如果文件文件大于1m，则需要分块
        let chunks = Math.ceil(file.size / chunkSize);
        let currentChunk = 0;
        let spark = new SparkMD5.ArrayBuffer();
        //循环将每块文件块计算hash
        while(currentChunk<chunks){
            const start = currentChunk * chunkSize,
            end = start + chunkSize >= file.size ? file.size : start + chunkSize;
            spark.append(Buffer.from(ab).slice(start,end))
            currentChunk ++
        }
        // spark.append(Buffer.from(ab))
        const fileMd5 = spark.end()
        console.log(fileMd5)
    }
}
</script>

<style>

</style>