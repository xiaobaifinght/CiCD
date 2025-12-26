import React, { FC } from 'react'
import { useDispatch } from 'react-redux'
import useGetComponentsInfo from '../../../hooks/useGetComponentsInfo'
import { getComponentConfigByType } from '../../../components/QuestionComponents'
import { ComponentPropsType } from '../../../components/QuestionComponents'
import { changeComponentProps } from '../../../store/componentsReducer'
const NoProp: FC = () => {
  return <div style={{ textAlign: 'center' }}>未选中组件</div>
}

const ComponentProp: FC = () => {
  const dispatch = useDispatch()

  const { selectComponent } = useGetComponentsInfo()
 
  if (selectComponent == null) return <NoProp />
// selectcomponent是从redux中获取的
  const { type, props,isLock,isHidden } = selectComponent
  const componentConf = getComponentConfigByType(type)
  if (componentConf == null) return <NoProp />


    function changeProps(newProps:ComponentPropsType){
        // 没有选中的组件，直接退出
            if(selectComponent === null)return
            const {fe_id = ''} = selectComponent || {}
            dispatch(changeComponentProps({fe_id,newProps}))
    }
  const { PropComponent } = componentConf
  return <PropComponent {...props} disabled={isLock || isHidden} onchange={changeProps}/>
}

export default ComponentProp
