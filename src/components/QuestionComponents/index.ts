
import { FC } from "react";
import QuestionInputConfig, { QuestionInputPropsType } from "./QuestionInput";
import QuestionTitleConfig,{ QuestionTitlePropsType } from "./QuestionTitle";
import QuestionParagraphConfig,{QuestionParagraphPropsType} from "./QuestionParagraph";
import QuestionInfoConfig,{QuestionInfoPropsType} from './QuestionInfo'
import QuestionTextareaConfig,{QuestionTextareaPropsType} from "./QuestionTextarea";
import QuestionCheckboxConfig,{QuestionCheckboxPropsType,QuestionCheckboxStatPropsType} from "./QuestionCheckbox";
import QuestionRadioConfig,{QuestionRadioPropsType,QuestionRadioStatPropsType} from "./QuestionRadio";
// 各个组件的props类型
export type ComponentPropsType = QuestionInputPropsType & QuestionTitlePropsType &
 QuestionParagraphPropsType &
 QuestionInfoPropsType &
 QuestionTextareaPropsType &
 QuestionRadioPropsType &
 QuestionCheckboxPropsType


 // 统一，各个组件的统计属性类型
type ComponentStatPropsType = QuestionRadioStatPropsType | QuestionCheckboxStatPropsType

// 组件的配置类型
export type ComponentConfigType = {
    title :string
    type: string
    defaultProps: ComponentPropsType   
    Component:FC<ComponentPropsType>
    PropComponent:FC<ComponentPropsType>
    StatComponent?:FC<ComponentStatPropsType>
}

// 所有组件的配置列表(包含component组件函数)
const componentConfigList: ComponentConfigType[] = [
    QuestionInputConfig,
    QuestionTitleConfig,
    QuestionParagraphConfig,
    QuestionInfoConfig,
    QuestionTextareaConfig,
    QuestionRadioConfig,
    QuestionCheckboxConfig,
]

// 通过type获取某个组件配置
export function getComponentConfigByType(type:string){
    return componentConfigList.find(item => item.type === type )
}


// 组件分组(文本显示，用户输入，用户选择三种类型)
export const componentConfGroup =[
    {
        groupId :'textGroup',
        groupName:'文本显示',
        components:[QuestionTitleConfig,QuestionParagraphConfig,QuestionInfoConfig]
    },
    {
        groupId: 'inputGroup',
         groupName: '用户输入',
        components: [QuestionInputConfig,QuestionTextareaConfig],
    },
     {
    groupId: 'chooseGroup',
    groupName: '用户选择',
    components: [QuestionRadioConfig, QuestionCheckboxConfig],
  },
]

