import{useEffect, useState}from'react';
import useGetUserInfo from './useGetUserInfo';
import { useRequest } from 'ahooks';
import { get } from 'http';
import { getUserInfoService } from '../services/user';
import { useDispatch } from 'react-redux';
import { loginReducer } from '../store/userReducer';
function useLoadUserData(){
    const [waitingUserData, setWaitingUserData] = useState(true);
    const{username}= useGetUserInfo()
    const dispatch = useDispatch()
    const {run} = useRequest(getUserInfoService,{
        manual:true,
       
        onSuccess:(res)=>{
        const {username, nickname} = res
        dispatch(loginReducer({
            username,
            nickname
        }))
            
        },
        onFinally:()=>{
            setWaitingUserData(false)
        }
    }
    
     
    )
    useEffect(()=>{
        if(username){
            setWaitingUserData(false)
            return
        }
        run() 
    },[username])

    return{
        waitingUserData
    }
}
export default useLoadUserData;