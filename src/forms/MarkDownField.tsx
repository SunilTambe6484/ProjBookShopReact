import { Field, useFormikContext } from "formik";
import ReactMarkdown from "react-markdown";
import "./MarkdownField.css";

export default function MarkDownField(props:markdownFieldProps)
{

const {values} =  useFormikContext<any>();

    return (
<>

<div className="mb-3 mark-down-outer">
<div>
    <label>{props.display}</label>
    <div>
        <Field as="textarea" name={props.field} className="form-textarea"/>
    </div>
</div>
<div>
    <label>{props.display}</label>
    <div className="markdown-inner">
        <ReactMarkdown>{values[props.field]}</ReactMarkdown>
    </div>
</div>
</div>
</>

    )


}
interface markdownFieldProps{
    field:string;
    display:string;
}