
import { useSelector } from "react-redux"
import { StoreType } from "../store"
import type { ComponentsStateType } from "../store/componentsReducer"
// 获取componnents state 信息
function useGetComponentsInfo() {
    const components = useSelector((state:StoreType) => state.components.present) as ComponentsStateType
    const { componentList,selectId,copiedComponent } = components 
    const selectComponent = componentList.find(c => c.fe_id === selectId)

  return {
    componentList,
    selectId,
    selectComponent,
    copiedComponent
  }
}
export default useGetComponentsInfo