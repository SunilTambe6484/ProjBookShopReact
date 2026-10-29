import { ErrorMessage, Field } from "formik";

export default function TextField(props:textFieldProps)
{
    return (
        <>
        <div className="m-1">
            <label htmlFor={props.field}>{props.display}</label>
            
            <Field type={props.type} name={props.field}
            id={props.field} className="form-control"/>

            <ErrorMessage name={props.field}>
                {
                msg=>
                <div className="text-danger">{msg}</div>
                }
            </ErrorMessage>
        </div>
        </>
    )

}
interface textFieldProps{
    field:string;
    display:string;
    type:"text" | "password";

  
}
// TextField.defaultProps={
//     type:"text"
// }