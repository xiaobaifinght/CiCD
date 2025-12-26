import React,{FC, use, useEffect, useRef, useState} from "react";
import styles from './List.module.scss'
import QuestionCard from '../../components/QuestionCard';
import { useSearchParams } from "react-router-dom";
import ListSearch from "../../components/ListSearch";
import { getQuestionListService } from "../../services/question";
import { useDebounceFn, useRequest } from "ahooks";
import { Empty, Spin } from "antd";
import useLoadQuestionListData from "../../hooks/useLoadQuestionListData";
import { LIST_PAGE_SIZE, LIST_SEARCH_PARAM_KEY } from "../../constant";
import { useMemo } from "react";
const List:FC=()=>{

    // 获取url参数
    // const [ searchParam] = useSearchParams()
    // console.log('keyword' , searchParam.get('keyword'));
    

    const [searchParams] = useSearchParams()
    const [page,setPage] = useState(1)
    const [total,setTotal] = useState(0)
    const [list,setList] = useState([])
    const haveMore = total > list.length
    const keyword=searchParams.get(LIST_SEARCH_PARAM_KEY) || ''
    // keyword发生变化需要从第一页开始加载
    useEffect(()=>{
        setPage(1)
        setList([])
        setTotal(0)
       
    },[keyword])
    // 发送list请求
    const {run:load,loading} = useRequest(async ()=>{
            const data = await getQuestionListService({
                keyword,
                page,
                pageSize:LIST_PAGE_SIZE
            })
            return data
    },
    {
        manual:true,
        onSuccess:(data)=>{
            const{total:t,list:l} = data
            
            setTotal(t)
            setList(list.concat(l))
            setPage(page+1) 
        }
    })
    // 触发加载数据使用防抖防止短时间内多次触发请求
    const containerRef = useRef<HTMLDivElement>(null)
    const{run:loadMore} = useDebounceFn(
        // 对该函数进行防抖
        ()=>{
        // 当页面滚动到最底部时，加载数据
        const elemet = containerRef.current
        if(!elemet) return
        const {bottom} = elemet.getBoundingClientRect()
        if(bottom<= document.body.clientHeight){
            load()
        }
        },
        {wait:1000}
    )


//   当页面初次加载或者keyword发生变化时，加载数据
    useEffect(()=>{
        loadMore()
        
    },[searchParams])

    
//    当页面滚动加载，组件第一次挂在时，添加事件监听函数
    useEffect(()=>{
        if(haveMore)
            window.addEventListener('scroll',loadMore)
        return ()=>{
            window.removeEventListener('scroll',loadMore)
        }
    },[searchParams,haveMore])
    
    const loadMoreContent = useMemo(()=>{
        if(loading) return <Spin />
        if(!total) return <Empty description="暂无数据"></Empty>
        if(!haveMore) return <div >没有更多数据了</div>
        return <span>开始加载下一页</span>
    },[loading,haveMore,total])
    return <>
    <div className={styles.header}>
        <div className={styles.left}>
            <h3>我的问卷</h3>
        </div>
        <div className={styles.right}> <ListSearch></ListSearch></div>
    </div>
    <div className={styles.content}>
       {list.length>0 && list.map((q:any)=>{
            return <QuestionCard key={q._id} {...q}></QuestionCard>
        })}
    </div>
    <div className={styles.footer} >
        <div ref={containerRef}>{loadMoreContent}</div> 

    </div>

    </>
}
export default List