// 用户登录后，访问登录和注册页面会被重定向到问卷
// 未登录用户访问问卷页面会被重定向到登录页面

import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useGetUserInfo from "./useGetUserInfo";
import { isLoginOrRegister, isNoNeedUserInfo } from "../router";
import { MANAGE_INDEX_PATHNAME ,LOGIN_PATHNAME} from "../router";
const useNavPage = (waitingUserData:boolean) => {
    const {pathname} = useLocation()
    const {username} = useGetUserInfo()
    const nav = useNavigate()
    useEffect(()=>{
        // 还在获取user数据
        if(waitingUserData){return }

        // 用户已登录
        if(username){
            // 如果是登录或注册页面，跳转到问卷页面
            if(isLoginOrRegister(pathname)){
                nav(MANAGE_INDEX_PATHNAME)
            }
            return
        }
        else{
            // 用户未登录
            // 如果是问卷页面，跳转到登录页面
            if(!isNoNeedUserInfo(pathname)){
                nav(LOGIN_PATHNAME)
            }
            return
        }
            
    },[waitingUserData, pathname, username]);
}
export default useNavPage;