import React, { FC, useEffect, useState } from 'react'
import { Tabs } from 'antd'
import { FileTextOutlined, SettingOutlined } from '@ant-design/icons'
import ComponentProp from './ComponentProp'
import useGetComponentsInfo from '../../../hooks/useGetComponentsInfo'
import PageSetting from './PageSetting'
// TS 枚举
enum TAB_KEYS {
  PROP_KEY = 'prop',
  SETTING_KEY = 'setting',
}

const RightPanel: FC = () => {
  // 使用 useState 来管理当前激活的 Tab 键
  // 初始值为属性面板
  
  const [activeKey, setActiveKey] = useState(TAB_KEYS.PROP_KEY)
  const { selectId } = useGetComponentsInfo()

  useEffect(() => {
    if (selectId) setActiveKey(TAB_KEYS.PROP_KEY)
    else setActiveKey(TAB_KEYS.SETTING_KEY)
  }, [selectId])

  const tabsItems = [
    {
      key: TAB_KEYS.PROP_KEY,
      label: (
        <span>
          <FileTextOutlined />
          属性
        </span>
      ),
      children: <ComponentProp />,
    },
    {
      key: TAB_KEYS.SETTING_KEY,
      label: (
        <span>
          <SettingOutlined />
          页面设置
        </span>
      ),
      children: <PageSetting />,
    },
  ]

  // Tab组件实现导航切换
  return <Tabs activeKey={activeKey} items={tabsItems} onChange={(tabKey) => setActiveKey(tabKey as TAB_KEYS)}></Tabs>
}

export default RightPanel
