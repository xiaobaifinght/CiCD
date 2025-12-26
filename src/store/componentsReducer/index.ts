// 组件列表数据(自定义的组件list)

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ComponentPropsType } from '../../components/QuestionComponents';
import { getNextSelectedId, insertNewComponent } from './utils';
import cloneDeep from 'lodash.clonedeep'
import { nanoid } from 'nanoid';
import { arrayMove, arraySwap } from '@dnd-kit/sortable';
// 单个组件信息类型
export type ComponentInfoType = {
    fe_id: string;
    type: string;
    // 组件的标题和下面title不同，后端传来
    title: string;
    isHidden?:boolean
    isLock?:boolean  

    // 组件的props参数里面有title等属性
    props: ComponentPropsType;
}

// (组件列表)  state 类型
export type ComponentsStateType = {
    componentList: ComponentInfoType[]
    selectId:string
    copiedComponent:ComponentInfoType |null
}

const initialState: ComponentsStateType = {
    componentList: [],
    copiedComponent:null,
    selectId: '' // 当前选中的组件ID
};

const componentsSlice = createSlice({
    name: 'components',
    initialState,
 //   使用的是 Redux Toolkit 的 createSlice，它内部用 Immer，允许你在 reducer 里“直接修改” state
 // （比如 state.componentList.push(...) 或 state.selectId = ...），实际上 Immer 会自动帮你生成不可变的新 state

    reducers:{
        // 重置所有组件
        resetComponents: (state: ComponentsStateType,action:PayloadAction<ComponentsStateType>) => {
           return action.payload;
        },
        // 修改为当前选中的组件ID
        setSelectId: (state: ComponentsStateType, action: PayloadAction<string>) => {
            state.selectId = action.payload;
        },

        // 添加组件到list中
        addComponent:(state:ComponentsStateType,action:PayloadAction<ComponentInfoType>) =>{
              
            //   componentlist是引用数据类型，对其修改，会直接对原对象list上修改
              const newComponent = action.payload 
              insertNewComponent(state,newComponent)
                
        },

        // 修改组件属性
        changeComponentProps: (state:ComponentsStateType,action:PayloadAction<{fe_id:string,newProps: ComponentPropsType}>)=>{
                const {fe_id,newProps} = action.payload
                const component = state.componentList.find(c=>c.fe_id === fe_id )
                if(component)
                component.props = {
                ...component.props,
                ...newProps
            }
        },

        // 删除选中的组件
        removeSelectComponent:(state:ComponentsStateType)=>{
                const {componentList,selectId} =  state
                const index = componentList.findIndex(item => item.fe_id === selectId)
                componentList.splice(index,1)
                state.selectId = getNextSelectedId(selectId,componentList)
                
                
        },

        // 隐藏或者显示组件
        changeComponentHidden: (state:ComponentsStateType,action:PayloadAction<{fe_id:string,isHidden:boolean}>)=>{
                const {componentList,selectId} = state
                const {fe_id,isHidden} =action.payload
                const curComponent = componentList.find(c =>c.fe_id === fe_id )
                let newSelectId = ''
                // 如果是隐藏
                if(isHidden)
                {
                    newSelectId = getNextSelectedId(fe_id,componentList)
                }
                else{
                    // 是显示
                    newSelectId = fe_id
                }
                state.selectId = newSelectId
                if(curComponent)
                {
                    // 将当前组件isHidden属性修改
                    curComponent.isHidden = isHidden
                }
        },

        // 切换禁用与否
        toggleComponentLock:(state:ComponentsStateType,action:PayloadAction<{fe_id:string}>)=>{
                const {componentList} = state
                const {fe_id} = action.payload
                const curComponent = componentList.find(c =>c.fe_id === fe_id)
                if(curComponent)
                    curComponent.isLock = !curComponent.isLock
                
        },
        // 拷贝当前选中的组件
        copySelectComponent:(state:ComponentsStateType)=>{
                const {selectId,componentList} = state
                const curComponent = componentList.find(c=>c.fe_id === selectId)
                if(curComponent)
                {
                    state.copiedComponent = cloneDeep(curComponent)
                }
        },

        // 粘贴组件
        pasteCopiedComponent :(state:ComponentsStateType)=>{
                
                let newComponent = state.copiedComponent 

                if(!newComponent) return
                newComponent.fe_id = nanoid()

                insertNewComponent(state,newComponent)
        },

        // 选中上一个
        selectPreComponent:(state:ComponentsStateType)=>{
            const {selectId,componentList} = state
            const index = componentList.findIndex(c => c.fe_id === selectId)
            // 第一个或者没有目标组件
            if(index <=0)return

            state.selectId = componentList[index-1].fe_id

        },

        // 选中下一个
        selectNextComponent: (state:ComponentsStateType)=>{
            const {selectId,componentList} = state
            const index = componentList.findIndex(c => c.fe_id === selectId)
            // 最后一个或者没有组件
            if(index === componentList.length-1 || index<0)return

            state.selectId = componentList[index+1].fe_id

        },

        //修改组件标题
        changeComponentTitle: (state:ComponentsStateType,action:PayloadAction<{fe_id:string;title:string}>)=>{ 
            const {fe_id,title} = action.payload
            // component是引用数据类型，是state中的一个Compont,直接修改其属性,等于修改了state
            const component = state.componentList.find(c => c.fe_id === fe_id)
            if(component){
                component.title = title
              
            }
            
    },

    // 移动组件到指定位置
        moveComponent: (state:ComponentsStateType,action:PayloadAction<{oldIndex:number,newIndex:number}>)=>{
            const {oldIndex,newIndex} = action.payload
            let {componentList} = state
            state.componentList = arrayMove(componentList, oldIndex, newIndex)
        },


}
})

export const{resetComponents,setSelectId ,addComponent,changeComponentProps,removeSelectComponent,
    changeComponentHidden,
    toggleComponentLock,
    copySelectComponent,
    pasteCopiedComponent,
    selectPreComponent,
    selectNextComponent,
    changeComponentTitle,
    moveComponent
 } = componentsSlice.actions

export default componentsSlice.reducer