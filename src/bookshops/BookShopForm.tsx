import { Form, Formik, FormikHelpers } from "formik";
import { bookShopCreationDTO } from "./bookShops.model";
import * as Yup from 'yup';
import TextField from "../forms/TextField";
import Button from "../utilities/Button";
import { Link } from "react-router-dom";
import coordinateDTO from "../utilities/coordinates.model";
import MapField from "../forms/MapField";
export default function BookShopForm(props:bookShopFormProps)
{
    function transformCoordinates(): coordinateDTO[] | undefined {
        if (props.model.latitude && props.model.longitude){
            const response: coordinateDTO = {lat: props.model.latitude,
            lng: props.model.longitude}
            return [response];
        }
        
        return undefined;
    }

    return (
        <Formik
            initialValues={props.model}
            onSubmit={props.onSubmit}
            validationSchema={Yup.object({
                name: Yup.string().required('This field is required')
            })}
        >
            {(formikProps) => (
                <Form>
                    <TextField  display="Name" field="name" type="text" />

                    <div style={{marginBottom: '1rem'}}>
                    <MapField latField="latitude" lngField="longitude" 
                         coordinates={transformCoordinates()}
                        /> 
                    </div>

                    <Button className="btn btn-primary" disabled={formikProps.isSubmitting} type="submit">
                        Save Changes
                    </Button>
                    <Link className="btn btn-secondary" to="/bookshops">Cancel</Link>
                </Form>
            )}
        </Formik>
    )
}
interface bookShopFormProps {
    model: bookShopCreationDTO;
    onSubmit(values: bookShopCreationDTO, actions: FormikHelpers<bookShopCreationDTO>): void;
}