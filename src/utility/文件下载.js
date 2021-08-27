let blob = new Blob(['//二进制数据']);
let url = window.URL.createObjectURL(blob)
//上面是当返回回来是二进制数据时才需要
let link = document.createElement('a')
link.download = '//下载文件名'
link.style.display = 'none'
link.href = url
document.body.appendChild(link)
link.click()
URL.revokeObjectURL(link.href)
document.body.removeChild(link)