import { bookCreationDTO } from "../books/book.model";

export function formatDate(date: Date){
    date = new Date(date);
    const format = new Intl.DateTimeFormat("en", {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    });

    const [
        {value: month},,
        {value: day},,
        {value: year}
    ] = format.formatToParts(date);

    return `${month}/${day}/${year}`;
}

export function convertBookToFormData(book: bookCreationDTO){
    const formData = new FormData();

    formData.append('title', book.title);

    if (book.summary){
        formData.append('summary', book.summary);
    }

   
    formData.append('isAvailable', String(book.isAvailable));

    if (book.publishedDate){
        formData.append('publishedDate', formatDate(book.publishedDate));
    }

    if (book.cover){
        formData.append('cover', book.cover);
    }

    formData.append('categoryIds', JSON.stringify(book.categoryIds));
    formData.append('shopIds', JSON.stringify(book.shopIds));
    formData.append('authorIds', JSON.stringify(book.authorIds));

    return formData;
}



