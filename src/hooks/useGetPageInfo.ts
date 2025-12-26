import { useSelector } from 'react-redux'
import type { StoreType } from '../store'
import type { PageInfoType } from '../store/pageInfoReducer'

function useGetPageInfo() {
  const pageInfo = useSelector<StoreType>(state => state.pageInfo) as PageInfoType
  return pageInfo
}

export default useGetPageInfo
