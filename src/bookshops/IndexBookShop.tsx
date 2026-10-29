import { getbookShopUrl } from "../endpoints";
import IndexEntity from "../utilities/IndexEntity";
import { bookShopDTO } from "./bookShops.model";

export default function IndexBookShop()
{
    return (
        <IndexEntity<bookShopDTO> 
            url={getbookShopUrl} createURL="/bookshops/create" title="Book Shop"
            entityName="Book Shop"
        >
            {(entities, buttons) => <>
                <thead>
                    <tr>
                        <th></th>
                        <th>Name</th>
                    </tr>
                </thead>
                <tbody>
                    {entities?.map(entity => <tr key={entity.id}>
                        <td>
                            {buttons(`/bookshops/edit/${entity.id}`, entity.id)}
                        </td>
                        <td>
                            {entity.name}
                        </td>
                    </tr>)}
                </tbody>
            </>}
        </IndexEntity>
    )
}