import { useSelector, UseSelector } from "react-redux";
import { StoreType } from "../store";

const useGetUserInfo = () => {
    const userInfo = useSelector((state: StoreType) => state.user)
    const { username, nickname } = userInfo
    return {
        username,
        nickname
    };
}
export default useGetUserInfo;