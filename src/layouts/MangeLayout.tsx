import React ,{FC, useState} from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import styles from './MangeLayout.module.scss'
import { Button,Space,Divider } from "antd";
import { BarsOutlined, DeleteOutlined, PlusOutlined, StarOutlined } from "@ant-design/icons";
import { createQuestionService } from "../services/question";
import {useRequest} from 'ahooks'
const MangeLayout:FC=()=> {
  // pathname 是获取路由的路径名
  const {pathname} = useLocation()

  const nav = useNavigate()
  // const [loading,setLoading] = useState(false)
  // const handleCreateClick =async ()=>{
  //     setLoading(true)

  //     const data =await createQuestionService()
  //     const {id} = data
  //     nav(`/question/edit/${id}`)
  //     setLoading(false)
  // }

  const {
    loading,
    run:handleCreateClick
  } = useRequest(createQuestionService,{
    manual:true,
    onSuccess(result ){
        nav(`/question/edit/${result.id}`)
    }
  })
  return (<>
  
    <div className={styles.container}> 
        <div className={styles.left}>
          <Space direction="vertical">
              <Button type="primary" size="large" icon={<PlusOutlined/>} disabled={loading}
              onClick={handleCreateClick}>新建问卷</Button>
          

            <Divider style={{borderTop:'transparent'}}></Divider>

            {/* type 等于primary会有选择效果，text就是默认文本 */}
            <Button type={pathname.startsWith('/manage/list')?'default':'text'}
                size="large"
                icon={<BarsOutlined></BarsOutlined>}
                onClick={()=>nav('/manage/list')}
            >
              我的问卷
            </Button >

            <Button type={pathname.startsWith('/manage/star')?'default':'text'}
                size="large"
                icon={<StarOutlined/>}
                onClick={()=>nav('/manage/star')}>
                  星标问卷
            </Button>

             <Button type={pathname.startsWith('/manage/trash')?'default':'text'}
                size="large"
                icon={<DeleteOutlined/>}
                onClick={()=>nav('/manage/trash')}>
                  回收站
            </Button>
          </Space>
        </div>
        <div className={styles.right}>
            <Outlet></Outlet>
        </div>
    </div>
    </>
  );
}

export default MangeLayout;