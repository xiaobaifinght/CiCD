import { useKeyPress } from "ahooks";
import { removeSelectComponent,copySelectComponent,pasteCopiedComponent,
    selectPreComponent,
    selectNextComponent
 } from "../store/componentsReducer";
import { useDispatch } from "react-redux";
import {ActionCreators as UndoActionCreators } from "redux-undo";

function isActiveElementValid(){
  // 判断当前页面上获得焦点的元素是否允许触发快捷键操作，防止在输入框等地方误触发全局快捷键。
    const activeEle = document.activeElement

    // 在 HTML 文档中，document.body 代表 <body> 元素本身。当页面上没有任何可聚焦元素（如输入框、按钮等）获得焦点时，焦点就会在 body 上
    if(activeEle === document.body) return true
    // div：标签名为 div 的元素[role="button"]：属性选择器，表示属性 role 的值为 "button"
    if (activeEle?.matches('div[role="button"]')) return true
    return false
}
// 绑定键盘快捷键
function useBindCanvasKeyPress(){
    const dispatch = useDispatch()
    // 删除组件
        useKeyPress(['backspace','delete'],()=>{
            if(isActiveElementValid())
            dispatch(removeSelectComponent())
        })

    // 复制组件

        useKeyPress(['ctrl.c'],()=>{
            if(isActiveElementValid())
            dispatch(copySelectComponent())
        })
    // 粘贴组件

        useKeyPress(['ctrl.v'],()=>{
             if(isActiveElementValid())
            dispatch(pasteCopiedComponent())
        })

    // 选中上一个
        useKeyPress('uparrow',()=>{
             if(isActiveElementValid())
            dispatch(selectPreComponent())
        })

    // 选中下一个
    useKeyPress('downarrow',()=>{
         if(isActiveElementValid())
        dispatch(selectNextComponent())
    })


    // 撤销
  useKeyPress(
    ['ctrl.z', 'meta.z'],
    () => {
      if (!isActiveElementValid()) return
      dispatch(UndoActionCreators.undo())
    },
    {
      exactMatch: true, // 严格匹配
    }
  )

  // 重做
  useKeyPress(['ctrl.shift.z', 'meta.shift.z'], () => {
    if (!isActiveElementValid()) return
    dispatch(UndoActionCreators.redo())
  })
}
export default useBindCanvasKeyPress