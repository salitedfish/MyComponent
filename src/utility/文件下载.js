//下面是当返回回来是二进制数据时才需要，请求时也要加responseType:blob
let blob = new Blob(['//二进制数据']);
let url = window.URL.createObjectURL(blob)

//下面是buffer转base64，一般是图片
function arrayBufferToBase64(buffer) {
    var binary = '';
    var bytes = new Uint8Array(buffer);
    var len = bytes.byteLength;
    for (var i = 0; i < len; i++) {
        binary += String.fromCharCode(bytes[i]);
    }
      return window.btoa(binary);
    }
const url= arrayBufferToBase64(data);


//下面是下载
let link = document.createElement('a')
link.download = '//下载文件名'
link.style.display = 'none'
link.href = url
document.body.appendChild(link)
link.click()
URL.revokeObjectURL(link.href)
document.body.removeChild(link)