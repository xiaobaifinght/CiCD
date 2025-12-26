import instance, { ResDataType } from "./ajax";

// 获取用户信息
export async function getUserInfoService():Promise<ResDataType>{
    const url = '/api/user/info'
    const resData = await instance.get(url) as ResDataType
    return resData

}

// 注册
export async function registerService(name:string,password:string,nickname?:string):Promise<ResDataType>{
    const url = '/api/user/register'
    const data = await instance.post(url,{name,password,nickname:nickname||name}) as ResDataType
    return data
}

// 登录
export async function loginService(name:string,password:string):Promise<ResDataType>{
    const url = '/api/user/login'
    const data = await instance.post(url,{name,password}) as ResDataType
    return data
}