import { message } from "antd";
import axios from "axios";
import { getToken } from "../utils/user-token";
// 封装axios
const instance = axios.create({
    timeout:10 * 1000
})

// 拦截器
instance.interceptors.response.use(res => {
        const ResData = res.data||{} as ResType
        const {data,errno,msg} = ResData
        if(errno !== 0 ){
            if(msg)
            message.error(msg)

            throw new Error(msg)
        }
        // 返回一个promise对象
        return data 
})

instance.interceptors.request.use(config => {
    // 在请求发送之前做些什么
    // 通过token来判断用户是否登录
    config.headers['Authorization'] = `Bearer ${getToken()}`
    return config
},
error => {
    // 在请求错误时做些什么
    return Promise.reject(error)
})
export default instance
export type ResType = {
    errno:number
    data?:ResDataType
    msg?:string
}

export type ResDataType={
    [index:string] :any
}