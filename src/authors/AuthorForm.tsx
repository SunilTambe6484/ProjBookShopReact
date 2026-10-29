import { Form, Formik, FormikHelpers } from "formik";
import { authorCreationDTO } from "./authors.model"
import TextField from "../forms/TextField";
import Button from "../utilities/Button";
import DateField from "../forms/DateField";
import ImageField from "../forms/ImageField";
import MarkDownField from "../forms/MarkDownField";

export default function AuthorForm({model,onSubmit}:authorFormProps)
{
    return (
        <>
        <Formik initialValues={model} onSubmit={(values,actions)=>{
            onSubmit(values,actions);
        }}>
        {({isSubmitting})=>(
       <Form>
        <TextField type="text" field="name" display="Name"/>
        <DateField display="Date of Birth" field="dateOfBirth" />
        <ImageField display="Author Picture" field="picture" url={model.pictureURL} />
        <MarkDownField display="Author BioGraphy" field="biography" /> 

        <Button className="btn btn-primary" type="submit" disabled={isSubmitting}>Save Changes</Button>
       </Form>
        )}
        </Formik>
        </>
    )
}
interface authorFormProps
{
    model:authorCreationDTO;
    onSubmit(values:authorCreationDTO,action:FormikHelpers<authorCreationDTO>):void;
}