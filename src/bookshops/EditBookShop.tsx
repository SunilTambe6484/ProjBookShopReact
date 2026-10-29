import { getbookShopUrl } from "../endpoints";
import EditEntity from "../utilities/EditEntity";
import BookShopForm from "./BookShopForm";
import { bookShopCreationDTO, bookShopDTO } from "./bookShops.model";

export default function EditBookShop()
{
    return (
        <EditEntity<bookShopCreationDTO, bookShopDTO>
            url={getbookShopUrl} indexURL="/bookshops" entityName="Book Shop"
        >
            {(entity, edit) => 
                <BookShopForm model={entity}
                 onSubmit={async values => await edit(values)}
                />
            }
        </EditEntity>
    )
}