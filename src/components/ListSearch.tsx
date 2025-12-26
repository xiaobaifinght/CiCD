import React,{ChangeEvent, FC, useEffect, useState} from "react";
import { Input } from "antd";
import { LIST_SEARCH_PARAM_KEY } from "../constant";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
const {Search} = Input
const ListSearch:FC =()=>{
    const [value, setValue] = useState('')
    const nav = useNavigate()
    const {pathname} = useLocation()
    const [searchParams] = useSearchParams()
    function handleSearch(val:string){
            // 跳转页面并设置url参数
            nav({
                pathname,
                search:`${LIST_SEARCH_PARAM_KEY}=${value}`

            })
            
    }
    // 将url参数设置到search组件的value
    useEffect(()=>{
        console.log('keywoed',searchParams.get(LIST_SEARCH_PARAM_KEY));
        
        setValue(searchParams.get(LIST_SEARCH_PARAM_KEY)||'')
    },[searchParams])
    const handleChange =(e:ChangeEvent<HTMLInputElement>)=>{
            setValue(e.target.value)
    }

    return <>
    {/* onchange是当输入框值发生变化会执行函数 */}
        <Search 
         onSearch={handleSearch}
         onChange={handleChange}
         placeholder="请输入关键字"
         allowClear
         size="large"
         value={value}
         style={{width:'200px'}}
         ></Search>

    </>
} 
export default ListSearch