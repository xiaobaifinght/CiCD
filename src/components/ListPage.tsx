import { Pagination } from "antd";
import { FC, use, useEffect, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { LIST_PAGE_PARAM_KEY, LIST_PAGE_SIZE, LIST_PAGE_SIZE_PARAM_KEY } from "../constant";
 type ListPageProps = {

    total:number
    }
 const ListPage:FC<ListPageProps> = ({total}) => {
    const [pageSize,setPageSize] = useState(LIST_PAGE_SIZE)
    const [currentPage,setCurrentPage] = useState(1)
    const navigate = useNavigate()
    const location = window.location
    const {pathname} = useLocation()
    const [searchParams] = useSearchParams()
    
    
    useEffect(()=>{
       const page = parseInt(searchParams.get('page') || '') || 1
       const pageSize = Number(searchParams.get('pageSize')) || LIST_PAGE_SIZE
       setCurrentPage(page)
       setPageSize(pageSize)
    },[searchParams])
    const handlePageChange = (page:number,pageSize:number) => {
       
        searchParams.set(LIST_PAGE_PARAM_KEY,page.toString())
        searchParams.set(LIST_PAGE_SIZE_PARAM_KEY,pageSize.toString())
        navigate(
            {
                pathname:location.pathname,
                search:searchParams.toString()
            }
        )
    }
    return(
        <Pagination total={total} pageSize={pageSize} current={currentPage} onChange={handlePageChange} />
    )
 }
 export default ListPage;