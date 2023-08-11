import { BookStatus } from "./book-status";

export class Book {
    bookDetailsId!:number;
    title!:string;
    isbn!:number;
    author!:string;
    authorId!:number;
    availableCopies!:number;
    totalCopies!:number;
    bookStatus!:BookStatus;
}
