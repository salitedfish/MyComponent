import { AES,enc } from 'crypto-js'

interface USR<U> {
    app:string;
    timeStamp:number;
    userInfo?:U;
    token?:string | undefined;
    encode?:boolean;
    /** 1s,1m,1h,1d */
    expire?:string | undefined;
}


/**获取app相关的本地数据 */
const getStore =<T> (storeName:string) =>{
    const store =  localStorage.getItem(storeName)
    const time = new Date().getTime()
    if(!store){
        throw new Error('没有相关数据')
    }
    let data = JSON.parse(store) as USR<T> 
    if(data.token){
        data.token = data.encode?decodeToken(data.token,data.app):data.token
    }
    if(time>data.timeStamp){
        localStorage.removeItem(data.app)
        return undefined
    }
    return data
}

/**设置app相关的数据 */
const setStore =<T> (data:USR<T>) =>{
    const token = ecodeToken(data)
    const input = {
        app:data.app,
        timeStamp:new Date().getTime(),
        userInfo:data.userInfo?data.userInfo:{},
        token:token,
        encode:data.encode?data.encode:false,
        expire:data.expire?setExpire(data.expire):undefined
    }
    localStorage.setItem(input.app,JSON.stringify(input))
    return input
}

/**更新用户信息 */
const updateUserInfo=<T>(app:string, userInfo:T)=>{
    const store =  localStorage.getItem(app)
    if(store){
        const data = JSON.parse(store) as USR<T> 
        const newData = {
            app:data.app,
            timeStamp:data.timeStamp,
            userInfo:userInfo,
            token:data.token,
            encode:data.encode,
            /** 1s,1m,1h,1d */
            expire:data.expire
        }

        localStorage.setItem(app,JSON.stringify(newData))
    }else{
        throw new Error('没有找到相关数据')
    }

}


const ecodeToken = (data:USR<any>) =>{
    if(!data.token) return undefined
    if(!data.encode) return data.token
    const encodeToken =  AES.encrypt(data.token,data.app).toString()
    return encodeToken
}

const decodeToken = (token:string,secret:string) =>{
   const bytes =  AES.decrypt(token, secret);
   return bytes.toString(enc.Utf8)
}

const setExpire = (expireInput:string)=>{
    const t = expireInput.charAt(expireInput.length-1)
    const n = parseInt(expireInput.split(t)[0])
    const d = 1000  
    switch(t.toLowerCase()){
        case 's':
            return n*d
        case "m":
            return n*60*d
        case "h":
            return n*60*60*d
        case "d":
            return n*60*60*24*d
    }
}


export {setStore,getStore,updateUserInfo}