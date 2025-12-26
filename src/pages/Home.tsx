import React ,{FC,useLayoutEffect} from "react";
import { Button,Typography } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { MANAGE_INDEX_PATHNAME } from "../router";
import styles from './Home.module.scss'
// typography是文章排版
const {Title, Paragraph} = Typography
const Home:FC=()=> {
    const nav = useNavigate()
    
    useLayoutEffect(()=>{
      console.log('子组件home useLayoutEffect执行');
  },[])
    console.log('子组件home执行');


  return (

    <div className={styles.container}>
      <div className={styles.info}>
        <Title > 问卷调查 | 在线投票</Title>
        <Paragraph>已经累计创建问卷100份 ，发布问卷90份， 收到答卷980份</Paragraph>

        <div>
            <Button type="primary" onClick={()=>nav(MANAGE_INDEX_PATHNAME)}>
                开始使用
            </Button>
        </div>
      </div>
    </div>
  )
}

export default Home;

