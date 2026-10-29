import { useEffect, useState } from "react";

export default function Pagination(props:paginationProps)
{
    const[pageLinks,setpageLinks]=useState<paginationModel[]>([]);
    
    function selectedPage(link:paginationModel)
    {
        if(link.page===props.currentPage)
        {
            return;
        }
        if(!link.enabled)
        {
            return;
        }
        props.onChange(link.page);
    }
    function getClassName(link:paginationModel)
    {
        if(link.active)
        {
            return "active pointer";
        }
        if(!link.enabled)
        {
            return "disabled";
        }
        return "pointer";

    }

    useEffect(()=>{
        const prePageEnabled =  props.currentPage!==1;
        const prePage =  props.currentPage-1;
        const links:paginationModel[]=[];
        links.push({
            text:'Previous',
            enabled:prePageEnabled,
            page:prePage,
            active:false
        });
        for(let i=1;i<=props.totalAmountofPages;i++)
        {
            if(i>=props.currentPage-props.radius && i<= props.currentPage + props.radius)
            {
                links.push({
                    text:`${i}`,
                    active:props.currentPage===i,
                    enabled:true,
                    page:i
                
                })
            }

        }
        const nextPageEnabled =  props.currentPage!==props.totalAmountofPages && props.totalAmountofPages>0;
        const nextPage  =  props.currentPage +1;
        links.push({
            text:'Next',
            enabled:nextPageEnabled,
            page:nextPage,
            active:false
        });
        setpageLinks(links);
    },[props.currentPage,props.totalAmountofPages,props.radius])
    

    return <nav>

    <ul className="pagination justify-content-center">
        {pageLinks.map(link=><li key={link.text} onClick={()=>selectedPage(link)} className={`page-item cursor ${getClassName(link)}`}>
            <span className="page-link">{link.text}</span>
        </li>)}
    </ul>
    </nav>

}
interface paginationProps{
currentPage:number;
totalAmountofPages:number;
radius:number;
onChange(page:number):void;

}
interface paginationModel
{
    text:string;
    page:number;
    enabled:boolean;
    active:boolean;
}