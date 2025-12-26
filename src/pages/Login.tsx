import React ,{FC, useEffect} from "react";
import { Link ,useNavigate} from "react-router-dom";
import { Space, Typography,Form, Input, Button,Checkbox, message } from "antd";
import { UserAddOutlined } from "@ant-design/icons";
import { REGISTER_PATHNAME } from "../router";
import styles from './Login.module.scss'
import Password from "antd/es/input/Password";
import { useRequest } from "ahooks";
import { loginService } from "../services/user";
import { MANAGE_INDEX_PATHNAME } from "../router";
import { setToken } from "../utils/user-token";
const {Title} = Typography
const USERNAME_KEY = 'USERNAME'
const PASSWORD_KEY = "PASSWORD"

function rememberUser(username:string,password:string){

  
  localStorage.setItem(USERNAME_KEY,username)
  localStorage.setItem(PASSWORD_KEY,password)
}
function deleteUserFromStorage()
{
    localStorage.removeItem(USERNAME_KEY)
    localStorage.removeItem(PASSWORD_KEY)
}
function getUserFromStorage()
{
  return{
   username: localStorage.getItem(USERNAME_KEY),
   password: localStorage.getItem(PASSWORD_KEY)
  }
}


const Login:FC=()=> {
  const [form] = Form.useForm()
  const nav = useNavigate()
     const onFinish =(val:any)=>{
        
          const {remember,username,password} = val
          login({username,password})
          if(remember){
    
            
            rememberUser(val.username||'',val.password||'')
          }
          else
          deleteUserFromStorage()
    }
    useEffect(()=>{
   
        form.setFieldsValue( getUserFromStorage())
    },[])

    const {run:login} = useRequest(async (val:any)=>{
        const {username,password} = val
        const data = await loginService(username,password)
        return data
      },
        {
          manual:true,
          onSuccess:(res)=>{
            const {token} = res
            setToken(token)
           message.success('登录成功')
           nav(MANAGE_INDEX_PATHNAME)
          },
         
        })
  return (
     <div className={styles.container}>
          <div>
            <Space>
              <Title level={2}><UserAddOutlined></UserAddOutlined></Title>
    
              <Title level={2}>用户登录</Title>
            </Space>
          </div>
    
          <div>
            <Form onFinish={onFinish} labelCol={{span:6}} wrapperCol={{span:16}}
              form={form}
              initialValues={{remember:true}}
            >
              <Form.Item label='用户名' name='username'>
                  <Input></Input>
              </Form.Item>
    
              <Form.Item label='密码' name='password'>
                  <Input.Password></Input.Password>
              </Form.Item>
              <Form.Item name='remember' valuePropName="checked" wrapperCol={{offset:6,span:16}}>
                <Checkbox>记住我</Checkbox>
              </Form.Item>
              <Form.Item  wrapperCol={{offset:6,span:16}}>
                  <Space>
                    <Button type="primary" htmlType="submit">登录</Button>
                  </Space>
                  <Link to={REGISTER_PATHNAME}>注册新用户</Link>
              </Form.Item>
            </Form>
          </div>
        </div>
  );
}

export default Login;