import React ,{FC} from "react";
import styles from './List.module.scss'
import QuestionCard from '../../components/QuestionCard';
import { Empty, Table, Typography , Button,Space,Modal,Spin,message} from "antd";
import { useState } from "react";
import { ExclamationCircleFilled } from "@ant-design/icons";
import useLoadQuestionListData from "../../hooks/useLoadQuestionListData"
import ListSearch from "../../components/ListSearch";
import { useRequest } from "ahooks";
import { updateQuestionService ,deleteQuestionService} from "../../services/question"; 
const {Title} = Typography

const {confirm} = Modal
const Trash:FC=()=> {
    const {data={},loading,refresh} = useLoadQuestionListData({isDelete:true})
  
    const {list=[],total=0} = data

  const [selectIds,setSelectIds]  =useState<string[]>([])

  // 假恢复数据
  const {run:recoverRequest,loading:recoverLoading} = useRequest(async ()=>{
    for await (const id of selectIds)
      await updateQuestionService(id,{isDelete:false})
  },
  {
      manual:true,
      debounceWait:500,// 防抖,可以设置request的防抖时间
      onSuccess:()=>{
          message.success('恢复成功')
          refresh() // 刷新数据
          setSelectIds([]) // 清空选中
      },
   
  })

  // 彻底删除
  const{run:deleteReq} = useRequest(async ()=>{
    await deleteQuestionService(selectIds)
  },
  {
      manual:true,
      onSuccess:()=>{
          message.success('彻底删除成功')
          refresh() // 刷新数据
          setSelectIds([]) // 清空选中
      },
   
  })
  const column = [
    {
        title:'标题',
        dataIndex:'title'
        // key:'title' 循环列的key，他会默认取dataindex值
    },
    {
      title:'是否发布',
      dataIndex:'isPublished',
      // val就是list数据中的isPublished的值
      render: (val:boolean)=>val?'是':'否'
    },
    {
      title:'答卷',
      dataIndex:'answerCount'
    },
    {
      title:'创建时间',
      dataIndex:'createdAt'
    }  ]
    const del=()=>{
      confirm({
        title:'确定彻底删除?',
        icon:<ExclamationCircleFilled></ExclamationCircleFilled>,
        onOk:deleteReq
        
      })
    }
    const TableElem = (
       <>
      <div style={{ marginBottom: '16px' }}>
        <Space>
          <Button type="primary" disabled={selectIds.length === 0} onClick={recoverRequest}>
            恢复
          </Button>
          <Button danger disabled={selectIds.length === 0} onClick={del}>
            彻底删除
          </Button>
        </Space>
      </div>
      <div style={{ border: '1px solid #e8e8e8' }}>
        <Table
          dataSource={list}
          columns={column}
          pagination={false}
          rowKey={(q:any) => q._id}
          rowSelection={{
            type: 'checkbox',
            onChange: selectedRowKeys => {
              // a as b显示指明类型
              setSelectIds(selectedRowKeys as string[])
            },
          }}
        />
      </div>
    </>
    )
    

     return <>
    <div className={styles.header}>
        <div className={styles.left}>
            <Title level={3}>回收站</Title>
        </div>
        <div className={styles.right}> <ListSearch></ListSearch></div>
    </div>
    <div className={styles.content}>
        {loading && <div style={{textAlign:'center'}}><Spin></Spin></div>}
      {
       !loading&& list.length === 0 && <Empty description='暂无数据'></Empty>
      }
        {list.length>1 && TableElem}
    </div>
    <div className={styles.footer}> 分页

    </div>

    </>
}

export default Trash;