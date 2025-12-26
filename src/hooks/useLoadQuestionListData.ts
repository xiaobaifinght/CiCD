import { useRequest } from "ahooks";
import { useSearchParams } from "react-router-dom";
import { LIST_SEARCH_PARAM_KEY,LIST_PAGE_SIZE,LIST_PAGE_PARAM_KEY,LIST_PAGE_SIZE_PARAM_KEY } from "../constant";
import { getQuestionListService } from "../services/question";
type SearchType ={
    isStar:boolean
    isDelete:boolean
}
function useLoadQuestionListData(opt:Partial<SearchType>={}){

    const [searchParams] =  useSearchParams()
      const {isDelete,isStar} = opt
   
    
    const {data,error,loading,refresh} = useRequest(async ()=>{
            const keyword = searchParams.get(LIST_SEARCH_PARAM_KEY) || ''
            const page =parseInt( searchParams.get(LIST_PAGE_PARAM_KEY) || '') || 1
            const pageSize =parseInt( searchParams.get(LIST_PAGE_SIZE_PARAM_KEY) || '') || LIST_PAGE_SIZE
            const  data = await getQuestionListService({keyword,isDelete,isStar,page,pageSize})  
            return data
    },
    {
        refreshDeps:[searchParams]
    }
)
    return {data,error,loading,refresh}
}

export default useLoadQuestionListData