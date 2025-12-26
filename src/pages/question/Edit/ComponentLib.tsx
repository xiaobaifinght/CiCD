import {Typography} from "antd"
import { componentConfGroup, ComponentConfigType } from "../../../components/QuestionComponents"
import { FC } from "react"
import style from './ComponentLib.module.scss'
import { useDispatch } from "react-redux"
import { addComponent } from "../../../store/componentsReducer"
import { nanoid } from 'nanoid'
const {Title} = Typography


// 组件库，每种类型的组件都在一个组里，进行分类展示
const Lib:FC = ()=>{
    const dispatch = useDispatch()
    function genComponent(c:ComponentConfigType){
            const{title,Component,type,defaultProps} =c
            
            function handleClick(){
                    dispatch(addComponent({
                        fe_id:nanoid(),
                        title,
                        type,
                        props:defaultProps
                    }))
            }

            return (
            <div className={style.wrapper} key={type} onClick={handleClick}>
                <div className={style.component}>
                    <Component></Component>
                    
                </div>
                
            </div>


            )
        }
        return(
            <>
            {componentConfGroup.map((item,index)=>{
                const {groupId,components,groupName} = item
                return(
                    <div key={groupId}>
                        <Title level={3} style={{fontSize:'16px', marginTop:index>0?'20px': '0'}}>
                            {groupName}
                            <div>
                                {components.map(component =>{
                                        return genComponent(component)
                                })}
                            </div>
                        </Title>
                        <div>
                            
                        </div>
                    </div>
                )
            })

            }
            </>
        )
}
export default Lib