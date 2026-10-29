import './ManytoManySelector.css'
export default function ManytoManySelector(props:ManytoManyProps)
{

    function selected(item:ManytoManyModel)
    {
        if(props.selected && props.unSelected){
        const selectedItems =  [...props.selected,item];
        const unSelectedItems = props.unSelected.filter(value=>value!==item);
        props.onChange(selectedItems,unSelectedItems);
        }

    }
    function selectAll()
    {
        if(props.selected && props.unSelected){
        const selected = [...props.selected,...props.unSelected];
        const unSelected :ManytoManyModel[]=[];
        props.onChange(selected,unSelected);
        }

    }
    function DeSelectAll()
    {
        if(props.selected && props.unSelected){
        const selected :ManytoManyModel[]=[]; 
        const unSelected =[...props.unSelected,...props.selected];
        props.onChange(selected,unSelected);
        }
    }
    function UnSelected(item:ManytoManyModel)
    {
        if(props.selected && props.unSelected){
        const UnSelectedItems =  [...props.unSelected,item];
        const SelectedItems = props.selected.filter(value=>value!==item);
        props.onChange(SelectedItems,UnSelectedItems);
        }

    }




    return (
        <>
        <div className="m-1">
<label>{props.display}</label>

<div className="outer-selector">
<ul>
{props.unSelected && props.unSelected.map(item=>
    <li key={item.key} onClick={()=>selected(item)}>{item.value}</li>
)}
</ul>
<div className='selector-buttons'>
    <button type="button" onClick={selectAll}>Select All</button>
    <button type="button" onClick={DeSelectAll}>DeSelect All</button>
</div>
<ul>
{props.selected && props.selected.map(item=>
    <li key={item.key} onClick={()=>UnSelected(item)}>{item.value}</li>
)}
</ul>
</div>

        </div>
        
        
        
        </>

    )

}
interface ManytoManyProps{
    selected:ManytoManyModel[] | undefined;
    unSelected:ManytoManyModel[] | undefined;
    display:string;
    onChange(selectedItems:ManytoManyModel[],unSelectedItems:ManytoManyModel[]):void

}
export interface ManytoManyModel{
    key:number;
    value:string;
}