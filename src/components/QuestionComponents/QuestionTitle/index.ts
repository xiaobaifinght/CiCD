import { QuestionTitleDefaultProps } from './interface';
import Component from './Component'
import PropComponent from './PropComponent';
export * from './interface';
// title组件的配置
export default {
    title:'标题',
    type:'questionTitle',
    Component,
    PropComponent,
    defaultProps: QuestionTitleDefaultProps
}