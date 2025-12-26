import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userReducer";
import { userStateType } from "./userReducer";
import { ComponentsStateType } from "./componentsReducer";
import componentsReducer from "./componentsReducer";
import pageInfoReducer, { PageInfoType } from "./pageInfoReducer";
import undoable, { excludeAction, StateWithHistory } from "redux-undo";
export type StoreType ={
    user:userStateType
    components:StateWithHistory<ComponentsStateType>
    pageInfo:PageInfoType
}
const store = configureStore({
    reducer:{
        user:userReducer,

        // 使用undo,redo实现撤销和恢复
        components:undoable( componentsReducer,{
            limit:20,// 限制撤销的历史记录数量
            filter:  excludeAction(
                [
                    'components/resetComponent',
                    'components/setSelectId',
                    'components/selectPreComponent',
                    'components/selectNextComponent',
                ]
            )
        }), // 使用redux-undo对组件列表进行撤销和恢复

       pageInfo: pageInfoReducer, // 页面信息
        
    }
})

export default store;