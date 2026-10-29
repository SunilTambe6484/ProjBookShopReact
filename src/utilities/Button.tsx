export default function Button(props:buttonProps)
{
    return  <>
      <button type={props.type}
      disabled={props.disabled}
      className={props.className}
      onClick={props.onClick}

      >       
        
        {props.children}</button>
    </>

}
interface buttonProps{
    type:"button" | "submit";
    disabled:boolean;
    className:string;
    onClick?():void;
    children:React.ReactNode;
}
// Button.defaultProps={
//     type:"button",
//     disabled:false,
//     className:"btn btn-primary"
// }