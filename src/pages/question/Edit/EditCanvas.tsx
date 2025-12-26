
import React,{FC} from 'react';
import QuestionTitle from '../../../components/QuestionComponents/QuestionTitle/Component';
import QuestionInput from '../../../components/QuestionComponents/QuestionInput/Component';
import style from './EditCarvas.module.scss';
import useGetComponentsInfo from '../../../hooks/useGetComponentsInfo';
import { getComponentConfigByType } from '../../../components/QuestionComponents/index';
import { ComponentInfoType, moveComponent } from '../../../store/componentsReducer';
import { MouseEvent } from 'react';
import { useDispatch } from 'react-redux';
import { setSelectId } from '../../../store/componentsReducer';
import classNames from 'classnames';
import useBindCanvasKeyPress from '../../../hooks/useBindCanvasKey';
import { Spin } from 'antd';
import SortableContainer from '../../../components/DragSortable/SortableContainer';
import SortableItem from '../../../components/DragSortable/SortableItem';
const genComponent = (c:ComponentInfoType)=>{
    const {type,props} = c 
      const componentConfig = getComponentConfigByType(type); 
      if(!componentConfig)return null
      const {Component} = componentConfig;
      return <Component {...props}></Component>
}
const EditCanvas:FC<{loading:boolean}> = ({loading}) => {
    const dispatch = useDispatch()
    function handleClick(e:MouseEvent<HTMLDivElement>,id:string){
        // 通过点击组件，修改store中当前选中的组件id，阻止事件冒泡，防止父元素触发点击事件
        e.stopPropagation()
        dispatch(setSelectId(id))
    }
    const {componentList,selectId} = useGetComponentsInfo()

    useBindCanvasKeyPress()

    if(loading){
        return <div style={{textAlign:'center',marginTop:'24px'}}>
            <Spin></Spin>
        </div>
    }

// sortableContainer是一个高阶组件，用于包裹可排序的组件列表,每一个item需要id
    const componentListWithId = componentList.map((c:any) => {
        return {
            ...c,
            id: c.fe_id // 确保每个组件都有一个唯一的id
        }
    })
    function handleDragEnd(oldIndex:number, newIndex:number) {
        dispatch(moveComponent({
            newIndex,
            oldIndex
        }))
    }
    return(
       <SortableContainer items={componentListWithId} onDragEnd={handleDragEnd}>

       
        <div className={style.canvas}>

            {componentList.filter((c:any)=>!c.isHidden).map((c:any) => {
                //jsx只能写html加{js} 不能直接写js代码

                //获取到的c是组件info，存储在store中，后端返回
                    const {fe_id ,isLock} = c 

                    // 通过classnames来拼接动态name
                    const wrapperDefaultClass = style['component-wrapper']
                    const selectClassName = style.selected
                    const isLockClassName = style.Locked
                    const wrapperClassName = classNames({
                        [wrapperDefaultClass]:true,
                        [selectClassName]:c.fe_id === selectId,
                        [isLockClassName] : isLock
                    });

            return(
                <SortableItem key={fe_id} id={fe_id}>
                 <div className={wrapperClassName} onClick={(e) =>handleClick(e,fe_id)}>
                    <div className={style.component}>
                        {genComponent(c)}
                    </div>
                </div>
                </SortableItem>
                )
            
            }
            )}
                                 
        </div>
        </SortableContainer>
        )
}
export default EditCanvas;