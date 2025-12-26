import { FormOutlined } from "@ant-design/icons";
import { Space,Typography } from "antd";
import {Link} from 'react-router-dom'
import React ,{FC, useEffect, useState} from "react";
import styles from './Logo.module.scss'
import useGetUserInfo from "../hooks/useGetUserInfo";
const {Title} = Typography
const Logo:FC=()=> {
  const {username} = useGetUserInfo()
  const [pathname ,setPathname] = useState('/')
  useEffect(()=>{
    if(username){
      setPathname('/manage')
    }
    else{
      setPathname('/')
    }
  },[username])

  return (
    
    
    <div className={styles.container}>
        <Link to={pathname}>
        <Space>
            <Title>
                <FormOutlined></FormOutlined>
            </Title>
            <Title>云大问卷</Title>
        </Space>
         </Link>
    </div>
   
  );
}

export default Logo;