export type QuestionInputPropsType = {
    title?:string;
    placeholder?: string;
    
    onchange?: (props:QuestionInputPropsType)=>void;
    disabled?:boolean
}

export const QuestionInputDefaultProps: QuestionInputPropsType = {

    // props里的title其实是组件里的内容
    placeholder: '请输入内容',
    title: '输入框标题'
}
