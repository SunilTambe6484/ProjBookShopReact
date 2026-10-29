import { Form, Formik, FormikHelpers } from "formik";
import { bookCreationDTO } from "./book.model";
import { categoryDTO } from "../categories/categories.model";
import { bookShopDTO } from "../bookshops/bookShops.model";
import { authorDTO } from "../authors/authors.model";
import * as Yup from 'yup';
import { useState } from "react";
import ManytoManySelector, { ManytoManyModel } from "../forms/ManytoManySelector";
import TextField from "../forms/TextField";
import DateField from "../forms/DateField";
import ImageField from "../forms/ImageField";
import MarkDownField from "../forms/MarkDownField";
import Button from "../utilities/Button";
import { Link } from "react-router-dom";
import CheckboxField from "../forms/CheckboxField";

export default function BookForm(props:bookFormProps)
{

    
    const [selectedCategory, setSelectedCategory] = useState(mapToModel(props.selectedCategories));
    const [selectedBookShop, setSelectedBookShop] = useState(mapToModel(props.selectedBookshops));
    const [selectedAuthor, setSelectedAuthor] = useState(mapToModel(props.selectedAutors));

    const [UnselectedCategory, setUnSelectedCategory] = useState(mapToModel(props.nonSelectedCategories));
    const [UnselectedBookShop, setUnSelectedBookShop] = useState(mapToModel(props.nonSelectedBookshops));
    const [UnselectedAuthor, setUnSelectedAuthor] = useState(mapToModel(props.nonSelectedAuthors));
    

    function mapToModel(items: { id: number, name: string }[]): ManytoManyModel[]{
       
        return items?.map(item => {
            
            return { key: item.id, value: item.name }
        });
    }




    return (
        <Formik
            initialValues={props.model}
            onSubmit={(values, actions) => {
                values.categoryIds = selectedCategory.map(item => item.key);
                values.shopIds = selectedBookShop.map(item => item.key);
                values.authorIds = selectedAuthor.map(item=>item.key);
                props.onSubmit(values, actions)
            }}
            validationSchema={Yup.object({
                title: Yup.string().required('This field is required')
            })}
>

{(formikProps) => (
                    <Form>

                    <TextField display="Title" field="title" type="text" />            
                    <DateField display="Publish Date" field="publishedDate" />                  
                    <MarkDownField display="Summary" field="summary" />
                    <ImageField display="Image" field="cover" url={props.model.coverUrl}/>
                    <CheckboxField displayName="Is Available" field="isAvailable" />
                    
                    <ManytoManySelector
                        display="Categories"
                        unSelected={UnselectedCategory}
                        selected={selectedCategory}
                        onChange={(selected, nonSelected) => {
                            setSelectedCategory(selected);
                            setUnSelectedCategory(nonSelected);
                        }}
                    />

                       <ManytoManySelector
                        display="Book Shops"
                        unSelected={UnselectedBookShop}
                        selected={selectedBookShop}
                        onChange={(selected, nonSelected) => {
                            setSelectedBookShop(selected);
                            setUnSelectedBookShop(nonSelected);
                        }}
                    />
                       <ManytoManySelector
                        display="Book Author"
                        unSelected={UnselectedAuthor}
                        selected={selectedAuthor}
                        onChange={(selected, nonSelected) => {
                            setSelectedAuthor(selected);
                            setUnSelectedAuthor(nonSelected);
                        }}
                    />





                    <Button className="btn btn-primary" disabled={formikProps.isSubmitting}
                        type='submit'>Save Changes</Button>
                    <Link className="btn btn-secondary" to="/">Cancel</Link>
                </Form>
            )}



    
</Formik>
    )
}

interface bookFormProps {
    model: bookCreationDTO;
    onSubmit(values: bookCreationDTO, actions: FormikHelpers<bookCreationDTO>): void;
    selectedCategories: categoryDTO[];
    nonSelectedCategories: categoryDTO[];
    selectedBookshops: bookShopDTO[];
    nonSelectedBookshops: bookShopDTO[];
    selectedAutors: authorDTO[];
    nonSelectedAuthors:authorDTO[];
}