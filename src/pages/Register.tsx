import React ,{FC} from "react";
import { useNavigate,Link } from "react-router-dom";
import { Space, Typography,Form, Input, Button,message } from "antd";
import { UserAddOutlined } from "@ant-design/icons";
import { LOGIN_PATHNAME } from "../router";
import styles from './Login.module.scss'
import { useRequest } from "ahooks";
import { registerService } from "../services/user";
const {Title} = Typography
const Register:FC=()=> {
    const nav = useNavigate()
    const {run:register} = useRequest(async (val:any)=>{
        const {username,password,nickname} = val
        await registerService(username,password,nickname)
      },
        {
          manual:true,
          onSuccess:()=>{
           message.success('注册成功')
           nav(LOGIN_PATHNAME)
          },
         
        })
    const onFinish =(val:any)=>{
         register(val)
          
    }
  return (
    <div className={styles.container}>
      <div>
        <Space>
          <Title level={2}><UserAddOutlined></UserAddOutlined></Title>

          <Title level={2}>注册新用户</Title>
        </Space>
      </div>

      <div>
        <Form onFinish={onFinish} labelCol={{span:6}} wrapperCol={{span:16}}>
          <Form.Item label='用户名' name='username'
          rules={[{required:true},
            {type:'string' , min:5,max:20},
          {
            pattern:/^\w+$/
          }]}
           >
              <Input></Input>
          </Form.Item>

          <Form.Item label='密码' name='password' rules={[{required:true,message:'请输入密码'

          }]}>
              <Input.Password></Input.Password>
          </Form.Item>
          <Form.Item label='确认密码' name='confirm'
          dependencies={['password']}//依赖于password，更改重新验证
            rules={[
              ({getFieldValue})=>({
                  validator(_, value){
                    if(!value || getFieldValue('password') == value)
                      return Promise.resolve()
                    else
                    return Promise.reject(new Error('两次输入不同'))
                  }
              })
            ]}

          >
              <Input.Password></Input.Password>
          </Form.Item>

          <Form.Item label='昵称' name='nickname'>
              <Input></Input>
          </Form.Item>

          <Form.Item  wrapperCol={{offset:6,span:16}}>
              <Space>
                <Button type="primary" htmlType="submit">注册</Button>
              </Space>
              <Link to={LOGIN_PATHNAME}>已有账户，登录</Link>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default Register;