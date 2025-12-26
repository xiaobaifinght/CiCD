import { FC, useEffect } from "react";
import { Button, Checkbox, Form,Input, Select, Space } from "antd";
import { QuestionRadioDefaultProps, QuestionRadioPropsType } from "./interface";
import { nanoid } from "nanoid";
import { OptionType } from "./interface";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";

const PropComponent:FC =(props:QuestionRadioPropsType)=>{
    const {value,onchange,disable,title,isVertical,options=[]} = {...QuestionRadioDefaultProps,...props}
    useEffect(()=>{
        form.setFieldsValue({value,title,isVertical,options})
    },[value,title,isVertical,options])
    const [form] = Form.useForm()
    function valueChange(){
        if(onchange){
            const newValue = form.getFieldsValue as QuestionRadioPropsType

            // 当删除选项时，会将option中的text设置为undefind,不会删除其中的选项，需要手动过滤
            if(newValue.options)
            {
                newValue.options.filter((item) => !(item.text == null))

            // 为newvalue中的option设置value
            newValue.options.forEach(item => {
                if(item.value)return
                item.value = nanoid(5)
            })
            }
            
          
            onchange(newValue)
        }
    }
    return (
        <Form layout={isVertical?'vertical':'horizontal'}
           onValuesChange={valueChange}
           disabled={disable}  
           form={form}
           initialValues={{value,title,isVertical,options}}
        
        >
            <Form.Item label='标题' name='title' rules={[{required:true,message:'请输入标题'}]}>
                <Input></Input>
            </Form.Item>

            <Form.Item label='选项'>
                <Form.List name='options'>
                    {/* fields就是options的内容 */}
                    {(fields,{add,remove})=>(
                        <>
                         {/* 遍历所有选项可删除 */}
                         {fields.map(({key,name},index)=>{
                                return (
                                    <Space key={key} align="baseline">
                                        <Form.Item 
                                          name={[name,'text']}
                                          rules={[
                                        {
                                            required:true,message:'请输入选项文字'
                                        },
                                        {
                                            // 验证 ，text是input的value值自定义规则判断
                                            validator: (_,text)=>{
                                                const {options =[]} = form.getFieldsValue()
                                                let num = 0
                                                options.forEach( (item: OptionType) => {
                                                    if(item.text === text)
                                                        num++
                                                });
                                                if(num>1)
                                                {
                                                    return Promise.reject(new Error('和其他选项重复'))
                                                }
                                                return Promise.resolve()
                                            }
                                        }]}>
                                          <Input placeholder="请输入选项文字"></Input>
                                    
                                        </Form.Item>

                                        {index>1 &&<MinusCircleOutlined onClick={()=>remove(name)}/>}
                                    </Space>
                                )
                         })}
                        <Form.Item>
                            <Button type='link' onClick={()=>add({text:'',value:''})} icon={<PlusOutlined/>}>添加</Button>
                        </Form.Item>
                        
                        </>
                    )

                    }
                </Form.List>


            </Form.Item>

            <Form.Item label='默认选中' name='value'>
                <Select value={value} options={options.map(item =>{
                    const {text,value} =item
                    return {value,label:text}
                })}></Select>
            </Form.Item>

            <Form.Item valuePropName="checked" name='isVertical'>
                <Checkbox>竖向排列</Checkbox>
            </Form.Item>
        </Form>
    )
}
export default PropComponent