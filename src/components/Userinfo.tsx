import React,{FC, use} from "react";
import { Link , useNavigate} from "react-router-dom";
import { LOGIN_PATHNAME } from "../router";
import { UserOutlined } from "@ant-design/icons";
import { Button, message } from "antd";

import { removeToken } from "../utils/user-token";
import useGetUserInfo from "../hooks/useGetUserInfo";
import { useDispatch } from "react-redux";
import { logoutReducer } from "../store/userReducer";

const UserInfo:FC = ()=>{
    // const {data} = useRequest(getUserInfoService)
   

    const{username,nickname} = useGetUserInfo()
    const dispatch = useDispatch()
    const nav = useNavigate()
    function logout(){
        removeToken() // 清除token
        dispatch(logoutReducer()) // 清除redux中的用户信息
        message.success('退出成功')
        nav(LOGIN_PATHNAME) // 跳转到登录页
    }
    const UserInfo=(
        <>
            <span>
                <UserOutlined></UserOutlined>
                {nickname}
            </span>
            <Button type="link" onClick={logout}>退出</Button>
        </>
    )

    const Login = (
        <>
        <Link to={LOGIN_PATHNAME}>登录</Link>
        </>
    )
    return <>
        {username? UserInfo : Login}
    </>
}
export default UserInfo