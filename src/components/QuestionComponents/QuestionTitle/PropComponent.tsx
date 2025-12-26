import React, { FC, useEffect } from 'react'
import { Form, Input, Select, Checkbox } from 'antd'
import { QuestionTitlePropsType } from './interface'

const PropComponent: FC<QuestionTitlePropsType> = (props: QuestionTitlePropsType) => {
  const { title, level, isCenter,onchange ,disabled} = props
  const [form] = Form.useForm()

  useEffect(() => {
    form.setFieldsValue({
      title,
      level,
      isCenter,
    })
  }, [title, level, isCenter])

  function handleValueChange() {
    if (onchange) {
      // form.getfildsValue是{key:value}
      onchange(form.getFieldsValue())
    }
  }

  return (
    <Form
      form={form}
      layout="vertical"
      onValuesChange={handleValueChange}
      initialValues={{ title, level, isCenter }}
      disabled={disabled}
    >
      <Form.Item
        label="标题内容"
        name="title"
        rules={[{ required: true, message: '请输入标题内容' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item label="层级" name="level">
        <Select
          options={[
            { value: 1, text: 1 },
            { value: 2, text: 2 },
            { value: 3, text: 3 },
          ]}
        ></Select>
      </Form.Item>
      {/* valuePropName 是将checked属性值作为value值 */}
      <Form.Item name="isCenter" valuePropName="checked">
        <Checkbox>居中显示</Checkbox>
      </Form.Item>
    </Form>
  )
}

export default PropComponent
