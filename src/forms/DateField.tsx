import { useFormikContext } from "formik";


export default function DateField(props: dateFieldProps) {
    const { values, setFieldValue, touched, errors } = useFormikContext<any>();
  
    return (
      <div className="m-1">
        <label htmlFor={props.field}>{props.display}</label>
  
        <input
          type="date"
          className="form-control"
          id={props.field}
          name={props.field}
          value={
            values[props.field]
              ? new Date(values[props.field]).toISOString().split("T")[0] // Convert Date to YYYY-MM-DD
              : ""
          }
          onChange={(e) => {
            const value = e.currentTarget.value;
            if (value) {
              setFieldValue(props.field, new Date(value + "T00:00:00")); // Set as Date object
            } else {
              setFieldValue(props.field, undefined); // Clear the value
            }
          }}
        />
  
        {touched[props.field] && errors[props.field] ? (
          <div className="text-danger">{errors[props.field]?.toString()}</div>
        ) : null}
      </div>
    );
  }
  
  interface dateFieldProps {
    field: string;
    display: string;
  }