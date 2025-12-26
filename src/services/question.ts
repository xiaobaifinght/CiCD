import axios from "axios";
import { ResDataType } from "./ajax";
// 有craco配置文件：所有api开头url自动拼接上http://localhost:3002
import instance from "./ajax";

type SearchOptType = {
    keyword:string
    isStar:boolean
    isDelete:boolean
    page:number
    pageSize:number
}
// 获取单个问卷信息
export async function getQuestionService(id:string): Promise<ResDataType> {
        const url = `/api/question/${id}`
        const resData= await instance.get(url) as ResDataType
        return resData
}


// 创建问卷
export async function createQuestionService():Promise<ResDataType> {
    let url = '/api/question'
    const data =  await instance.post(url) as ResDataType
    return data
}

// 获取问卷列表
export async function getQuestionListService(opt:Partial<SearchOptType>):Promise<ResDataType> {
    
    const url= '/api/question'
    
    const data = (await instance.get(url,{params:opt})) as ResDataType
    return data
}
// 更新单个问卷
export async function updateQuestionService(id:string,opt:{[key:string]:any}):Promise<ResDataType> {
    const url = `/api/question/${id}`
    const data = (await instance.patch(url,opt)) as ResDataType
    return data
    
}

// 复制问卷
export async function duplicateQuestionService(id: string): Promise<ResDataType> {
  const url = `/api/question/duplicate/${id}`
  const data = (await axios.post(url)) as ResDataType
  return data
}

//批量删除问卷
export async function deleteQuestionService(ids: string[]): Promise<ResDataType> {
  const url = `/api/question`
  const data = (await axios.delete(url,{data:{ids}})) as ResDataType
  return data
}