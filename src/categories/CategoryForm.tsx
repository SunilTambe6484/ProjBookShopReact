import { ErrorMessage, Field, Form, Formik, FormikHelpers } from "formik";
import { categoryCreationDTO } from "./categories.model"

import * as Yup from 'yup';

export default function CategoryForm({model,onSubmit}:categoryformProps)
{

    const validationSchema = Yup.object({
        name: Yup.string()
          .required("Category Name is required")
          .min(3, "Category Name must be at least 3 characters"),
      });
    
      return (
        <Formik
          initialValues={model}
          validationSchema={validationSchema}
          onSubmit={(values, actions) => {
            onSubmit(values, actions);
          }}
        >
          {({ isSubmitting,isValid }) => (
            <Form>
              <div className="form-group">
                <label className="form-leble" htmlFor="name">Category Name:</label>
                <Field
                  type="text" className="form-control"
                  name="name"
                  id="name"
                  placeholder="Enter category name"
                />
                <ErrorMessage name="name" component="div" className="text-danger" />
              </div>
    
              <div>
                <button className="btn btn-primary" type="submit" disabled={!isValid || isSubmitting}>
                  {isSubmitting ? "Submitting..." : "Submit"}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      );
}
interface categoryformProps
{
    model:categoryCreationDTO;
    onSubmit(values:categoryCreationDTO,action:FormikHelpers<categoryCreationDTO>):void;

}