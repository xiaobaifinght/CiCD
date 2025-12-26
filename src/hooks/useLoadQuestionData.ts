import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getQuestionService } from "../services/question";
import {useRequest}  from 'ahooks'
import { useDispatch } from "react-redux";
import { resetComponents, setSelectId } from "../store/componentsReducer";
import { resetPageInfo } from "../store/pageInfoReducer";
/**
 * @abstract 用于加载components组件数据
 * @description: 对于config里的title是default值，但是没用到，因为后端完整传递过来了 
 */
function useLoadQuestionData(){

    // useparams是获取动态路由的参数
    const {id=''} = useParams()
    const dispatch = useDispatch()

    const{run ,loading,error,data} = useRequest( async(id:string)=>{
            const data = await getQuestionService(id)
            return data
        },
    {
        manual: true,

    })
    // 判断data变化，存储新的store
    useEffect(()=>{
        if(data){
    const {
      title = '',
      desc = '',
      js = '',
      css = '',
      isPublished = false,
      componentList = [],
    } = data
           let selectId = ''
           if(componentList.length >0){
              selectId = componentList[0].fe_id// 设置第一个组件为选中状态
           }
            dispatch(resetComponents({componentList,selectId,copiedComponent:null}))
              // 把 pageInfo 存储到 redux store
    dispatch(resetPageInfo({ title, desc, js, css, isPublished }))
        }
    },[data])

    // 判断id变化，发送 Ajax请求
    useEffect(()=>{
        if(id){
            run(id)
           
        }
    },[id])
    return {
        loading,       
        error
    }
}
export default useLoadQuestionData