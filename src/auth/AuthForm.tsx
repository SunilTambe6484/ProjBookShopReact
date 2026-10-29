import { Form, Formik, FormikHelpers } from "formik";
import { authenticationModel } from "./authentication.model";
import Button from "../utilities/Button";
import * as Yup from 'yup';
import TextField from "../forms/TextField";
import { Link } from "react-router-dom";

export default function AuthForm(props:authenticationFormProps)
{
    return(
  <Formik initialValues={props.model} onSubmit={props.onSubmit}
  validationSchema={Yup.object({
    email:Yup.string().required('This field is required')
    .email('You have to insert a valid email'),
    password:Yup.string().required('The field is required')
  })}
  
  >
{(formikProps)=>(

   <Form>
    <TextField display="Email" field="email" type="text"/>
    <TextField display="Password" field="password" type="password"/> 
    <Button className="btn btn-primary" disabled={formikProps.isSubmitting} type="submit">{props.buttonTitle}</Button>
    <Link className="btn btn-secondary" to="/">Cancel</Link>
   </Form>

)}

  </Formik>





    )

}
interface authenticationFormProps{
   buttonTitle: string;
    model:  authenticationModel;
    onSubmit(values:authenticationModel,actions:FormikHelpers<authenticationModel>):void;
}