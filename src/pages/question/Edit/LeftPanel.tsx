
import {Children, FC} from 'react'
import { Tabs } from 'antd'
import ComponentLib from './ComponentLib'
import { AppstoreOutlined, BarsOutlined } from '@ant-design/icons'
import Layers from './Layer'
const LeftPanel:FC =()=>{
    const tabsItem = [
        {
            // 该项显示组件库(有选择，输入和文本三种类型组件库)
            key:'componentLib',
            label:(
                <span>
                    <AppstoreOutlined></AppstoreOutlined>
                组件库
                </span>
            ),
            children:<ComponentLib></ComponentLib>

        },
        {
            // 图层，用于和画布产生联动
            key:'layer',
            label:(
                <span>
                    <BarsOutlined></BarsOutlined>
                    图层
                </span>
            ),
            children:<Layers></Layers>
        }
    ]
        return(
            //tabs是标签页，选中一个标签切换页面
            <Tabs defaultActiveKey='componentLib' items={tabsItem}></Tabs>
        )
}
export default LeftPanel