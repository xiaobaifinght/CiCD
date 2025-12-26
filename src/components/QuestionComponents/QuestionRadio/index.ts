import Component from './Component'
import PropComponent from './PropComponent'
import { QuestionRadioDefaultProps } from './interface'
import StatComponent from './StatComponent'
export * from './interface'

// Paragraph 组件的配置
export default {
  title: '单选',
  type: 'questionRadio', // 要和后端统一好
  Component,
  PropComponent,
  defaultProps: QuestionRadioDefaultProps,
  StatComponent
}
