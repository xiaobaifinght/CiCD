import React ,{FC, useEffect} from "react";
import { useParams } from "react-router-dom";
import { getQuestionService } from "../../../services/question";
import style from './index.module.scss';
import EditCanvas from "./EditCanvas";
import { useDispatch } from "react-redux";
import { setSelectId } from "../../../store/componentsReducer";
import RightPanel from "./RightPanel";
import LeftPanel from "./LeftPanel";
import EditHeader from "./EditHeader";
import useLoadQuestionData from "../../../hooks/useLoadQuestionData";
const Edit:FC=()=> {
    // 获取动态路由id的参数,当路由传递值时，该页面通过useparams来解构
    const {id=''} = useParams()
    const {loading} = useLoadQuestionData()
     const dispatch = useDispatch()
    function clearSelect() {
      dispatch(setSelectId(''))
    }
  return (
    <div className={style.container}>
      <EditHeader></EditHeader>
       <div className={style['content-wrapper']}>
         <div className={style.content}>
            <div className={style.left}>
                <LeftPanel></LeftPanel>
            </div>
            <div className={style.main} onClick={clearSelect}>
              <div className={style['canvas-wrapper']}>
                <EditCanvas loading={loading}/>
              </div>
            </div>
            <div className={style.right}>
                <RightPanel></RightPanel>
            </div>
         </div>

       </div>
    </div>
  );
}

export default Edit;