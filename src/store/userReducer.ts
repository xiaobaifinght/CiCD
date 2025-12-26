import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type userStateType ={
    username:string,
    nickname:string,
}

const INIT_STATE:userStateType ={
    username: "",
    nickname: "",
}
const userSlice = createSlice({
    name: "user",
    initialState:INIT_STATE,
    reducers:{
        loginReducer(state:userStateType,action:PayloadAction<userStateType>){
            return action.payload
        },

        logoutReducer(state:userStateType){
            return INIT_STATE
        }
    }

})

export const { loginReducer, logoutReducer } = userSlice.actions;
 const userReducer = userSlice.reducer
 export default userReducer;