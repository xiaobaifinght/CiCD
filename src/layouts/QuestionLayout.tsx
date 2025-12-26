import React ,{FC} from "react";
import { Outlet } from "react-router-dom";

import useLoadUserData from "../hooks/useLoadUserData";
import useNavPage from "../hooks/useNavPage";
const QuestionLayout:FC=()=> {
  const{waitingUserData} = useLoadUserData()
  useNavPage(waitingUserData)
  return (<>
  
    <div > 
        <div >
       
        </div>
        <div >
            <Outlet></Outlet>
            {/* outlet是将子目录页面映射到这地方 */}
        </div>
    </div>
    </>
  );
}

export default QuestionLayout;