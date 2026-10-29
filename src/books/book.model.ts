import { authorDTO } from "../authors/authors.model";
import { bookShopDTO } from "../bookshops/bookShops.model";
import { categoryDTO } from "../categories/categories.model";

export interface bookCreationDTO
{
  title:string;
  summary:string;
  cover?:File;
  coverUrl?:string;
  isAvailable?:boolean;
  publishedDate?:Date;
  authorIds?:number[];
  categoryIds?:number[];
  shopIds?:number[];
}
export interface bookDTO
{
  id:number
  title:string;
  summary:string;
  isAvailable?:boolean;
  publishedDate:Date;
  cover:string;
  categories:categoryDTO[];
  shops:bookShopDTO[];
  authors:authorDTO[];
}
export interface BookPostGetDTO
{
  categories: categoryDTO[];
    bookShops: bookShopDTO[];
    authors:authorDTO[];
}
export interface BookPutGetDTO {
  book: bookDTO;
  selectedCategories: categoryDTO[];
  unSelectedCategories: categoryDTO[];

  selectedBookShop: bookShopDTO[];
  unSelectedBookShop: bookShopDTO[];

  unSelectedAuthors: authorDTO[];
  selectedAuthors: authorDTO[];
}

export interface homeDTO {
  books: bookDTO[];

}
