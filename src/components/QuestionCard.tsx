import React,{FC} from "react";
import styles from './QuestionCard.module.scss'
import { Button, Divider, message, Popconfirm, Space, Tag, Modal } from 'antd'
import Edit from "../pages/question/Edit";
import { CopyOutlined, DeleteOutlined, EditOutlined, ExclamationCircleOutlined, LineChartOutlined, StarOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import {Link} from 'react-router-dom'
import { useRequest } from "ahooks";
import { duplicateQuestionService, updateQuestionService } from "../services/question";
type PropsType={
    _id:string
    title:string
    isPublished:boolean
    isStar:boolean
    answerCount:number
    createdAt:string
}
const {confirm} = Modal
const QuestionCard:FC<PropsType>=(props)=>{
    const nav= useNavigate()
    // console.log(props);
    
    const {_id,title, isStar,createdAt, answerCount, isPublished} = props
    const [starState,setStarState] = React.useState(isStar)
    const{run:update,loading:updateLoading} = useRequest(async ()=>{
        const data = await updateQuestionService(_id,{isStar:!isStar})
        return data

    },
    {
        manual:true,
        onSuccess:()=>{
            setStarState(!starState)
            message.success('修改成功')
        },
       
    })


    const {run:duplicate,loading:duplicateLoading} = useRequest(async ()=>{
        const data = await duplicateQuestionService(_id)    
        return data
    },
    {
        manual:true,
        onSuccess:(res)=>{
            message.success('复制成功')
            nav(`/question/edit/${res.id}`)
        },
       
    })
    
    const{run:delRequest,loading:delLoading} = useRequest(async ()=>{
        const data = await updateQuestionService(_id,{isDelete:true})
        return data
    },
    {
        manual:true,
        onSuccess:()=>{
            message.success('删除成功')
           
        },
     
    })
    const del = ()=>{
        confirm({
            title:'确定删除',
            icon:<ExclamationCircleOutlined></ExclamationCircleOutlined>,
            okText:'确定',
            cancelText:'取消',
            onOk:delRequest
        })
     
    }
    return <>
        <div className={styles.container}>
            <div className={styles.title}>
                <div className={styles.left}>
                    <Link to={ isPublished ?`/question/stat/${_id}`:`/question/edit/${_id}`}>
                        <Space>
                            {starState && <StarOutlined style={{color:'red'}}></StarOutlined>}
                            {title}
                        </Space>
                    </Link>
                </div>
                <div className={styles.right}>
                    <Space>
                        {isPublished?<Tag color="processing">已发布</Tag >:<Tag>未发布</Tag>}
                        <span>答卷{answerCount}</span>
                        <span>{createdAt}</span>
                    </Space> 
                    
                </div>
            </div>
            <Divider style={{margin:'12px'}}></Divider>
            <div className={styles['button-container']}>
                <div className={styles.left}>
                    

                    <Space>
                        <Button type="text" size="small" icon={<EditOutlined></EditOutlined>}
                            onClick={()=>nav(`/question/edit/${_id}`)}>编辑问卷</Button>
                         <Button type="text" size="small" icon={<LineChartOutlined></LineChartOutlined>}
                           onClick={()=>nav(`/question/stat/${_id}`)}
                            disabled ={!isPublished}
                        >数据统计</Button>
                    </Space>
                </div>
                <div className={styles.right}>
                    

                    <Space>
                        <Button type="text" icon={<StarOutlined></StarOutlined> } size='small' onClick={update} disabled={updateLoading}>{ starState? '取消标星':"标星"}</Button>
                        <Popconfirm 
                            title= '确认复制？'
                            onConfirm={duplicate}
                            okText='确认'
                            cancelText='取消'>
                            <Button type="text" icon={<CopyOutlined/> } size='small'>复制</Button>
                        </Popconfirm>
                        
                        <Button type="text" icon={<DeleteOutlined/> } size='small' onClick={del}> 删除</Button>
                    </Space>
                </div>
            </div>
        </div>
    </>
}
export default QuestionCard