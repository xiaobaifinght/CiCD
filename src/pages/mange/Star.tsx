import React ,{FC} from "react";
import styles from './List.module.scss'
import QuestionCard from '../../components/QuestionCard';
import { Empty, Typography ,Spin, Pagination} from "antd";
import { useState } from "react";
import useLoadQuestionListData from "../../hooks/useLoadQuestionListData";
import ListSearch from "../../components/ListSearch";
import ListPage from "../../components/ListPage";
const {Title} = Typography

const Star:FC=()=> {
      const {data={},loading} = useLoadQuestionListData({isStar:true})
  
    const {list=[],total=0} = data
    
    
     return <>
    <div className={styles.header}>
        <div className={styles.left}>
            <Title level={3}>标星问卷</Title>
        </div>
        <ListSearch></ListSearch>
    </div>
    <div className={styles.content}>
       {loading && <div style={{textAlign:'center'}}><Spin></Spin></div>}
      {
       !loading&& list.length === 0 && <Empty description='暂无数据'></Empty>
      }
        {(!loading&& list.length>0) && list.map((q:any)=>{
            return <QuestionCard key={q._id} {...q}></QuestionCard>
        })}
    </div>
    <div className={styles.footer}>
        <ListPage total={total}></ListPage>
    </div>

    </>

}

export default Star;