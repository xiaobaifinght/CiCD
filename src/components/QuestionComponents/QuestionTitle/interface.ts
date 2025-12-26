export type QuestionTitlePropsType = {
    title?: string;
    level?: 1|2|3|4|5;
    isCenter?: boolean;

    onchange?:(props:QuestionTitlePropsType)=>void
    disabled?:boolean
}

export const QuestionTitleDefaultProps: QuestionTitlePropsType = {
    title: '一级标题',
    level: 1,
    isCenter: false
}