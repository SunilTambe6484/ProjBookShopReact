
import { useFormikContext } from "formik";
import { ChangeEvent, useState } from "react";


export default function ImageField(props:imageFieldProps)
{
 const [base64Url,setBase64Url]=useState('');
const [imageUrl,setImageUrl]=useState(props.url);
const {values} = useFormikContext<any>();

    const SelectImage=(e:ChangeEvent<HTMLInputElement>)=>{
        if(e.currentTarget.files)
        {
            const file = e.currentTarget.files[0];
            if(file)
            {
                toConvertIntoBase64String(file).then((base64String: string) => setBase64Url(base64String))
                .catch(error=>console.error(error));
                values[props.field]=file;
                setImageUrl('');
                
           }
           else{
            setBase64Url('');
           }
        }
    }
    const toConvertIntoBase64String =(file:File)=>{
        return new Promise<string>((resolve,reject)=>{
            const reader =  new FileReader();
            reader.readAsDataURL(file);
            reader.onload =  ()=>resolve(reader.result as string);
            reader.onerror =  (error)=> reject(error);
        })
    }
    return (
     <div className="m-1">
        <label>{props.display}</label>
        <input type="file" onChange={SelectImage}/>
      {base64Url?
      <div>
        <img src={base64Url} alt="selected File" />
      </div> : null}
      <div>
        {imageUrl?
        <div>
            <img src={imageUrl} alt="Edited File" />
            </div> : null
            
            }      
        
    
      </div>
     </div>

    )

}
interface imageFieldProps
{
    field:string;
    display:string;
    url?:string;
}
