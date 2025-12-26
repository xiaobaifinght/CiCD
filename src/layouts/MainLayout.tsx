import React ,{FC,useEffect} from "react";
import { Outlet } from "react-router-dom";
import { Layout } from "antd";
import styles from './MainLayout.module.scss'
import Logo from "../components/Logo";
import UserInfo from "../components/Userinfo";
import useLoadUserData from "../hooks/useLoadUserData";
import useNavPage from "../hooks/useNavPage";
import { useNavigate } from "react-router-dom";
const {Header,Content,Footer} = Layout
const MainLayout:FC=()=> {
  const{waitingUserData} = useLoadUserData()
  // useNavPage(waitingUserData)
  const navigate = useNavigate()
  console.log('父组件mainlayout执行');
  useEffect(()=>{
    navigate('/login')
    console.log('父effect执行');
  },[])
  return (<>
    <Layout>
        <Header className={styles.header}>
          <div className={styles.left}>
              <Logo></Logo>
          </div>
          <div className={styles.right}>
              <UserInfo></UserInfo>
          </div>
        </Header>
        {/* {!waitingUserData && */}
        <Layout className={styles.main}>
            <Content >
                <Outlet></Outlet>
            </Content>
        </Layout>
        {/* }  */}
        <Footer className={styles.footer}>
          云大问卷 
        </Footer>
    </Layout>
    
  
    
    </>
  );
}

export default MainLayout;