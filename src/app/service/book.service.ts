import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Book } from '../model/book';
import { BookStatus } from '../model/book-status';
import { Reserver } from '../model/reserver';
import { Borrower } from '../model/borrower';
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookService {

 
  url: string = String("http://localhost:8091/library/api/v1");
  constructor(private httpClient: HttpClient) {
  }
  getBookByIsbn(isbn: any) {
    throw new Error('Method not implemented.');
  }
  checkOrphanBooksByLocation(locationId: number, page: any) {
    if (page === 'location') {
      return this.httpClient.get(`${this.url}/bookstatuses/locationcounter/${locationId}`);
    }
    else if (page === 'shelf') {
      return this.httpClient.get(`${this.url}/bookstatuses/shelfcounter/${locationId}`);
    }
    else if (page === 'section') {
      return this.httpClient.get(`${this.url}/bookstatuses/sectioncounter/${locationId}`);
    }
    else {
      return this.httpClient.get(`${this.url}/bookstatuses/floorcounter/${locationId}`);
    }
  }

  getBookstatusesatus(id: any) {
    return this.httpClient.get(`${this.url}/bookstatuses/bookstatus/${id}`);
  }
  sendFile(file: any, isbn: any) {
    var f = new FormData();
    f.append("file", file);
    return this.httpClient.post(this.url + "bookdetails/excel/" + isbn, f).pipe(catchError(this.handleError));
  }
  private handleError(error: HttpErrorResponse) {
    console.log(error);
    return throwError(() => error);
  }
  getBooks(currentPage: number, pageSize: number, search: string) {
    return this.httpClient.get(`${this.url}/bookdetails`, { params: new HttpParams().set("search", search).set("pageSize", pageSize).set("pageNumber", currentPage) });
  }
  getBooksByUser(currentPage: number, pageSize: number, search: string) {
    return this.httpClient.get(`${this.url}/bookdetails`, { params: new HttpParams().set("search", search).set("pageSize", pageSize).set("pageNumber", currentPage).set("user", true) });
  }
  getBooksFromCart(currentPage: number, pageSize: number, search: string) {
    return this.httpClient.get(`${this.url}/cart`, { params: new HttpParams().set("search", search).set("pageSize", pageSize).set("pageNumber", currentPage) });
  }
  getBook(id: any) {
    return this.httpClient.get(`${this.url}/bookdetails/book/${id}`);
  }

  updateBook(book: any, id: number) {
    return this.httpClient.put(`${this.url}/bookdetails/book/${id}`, book);
  }
  addBook(book: Book) {
    return this.httpClient.post(`${this.url}/bookdetails`, book);
  }
  addBookDetailsToCart(id: any) {
    return this.httpClient.post(`${this.url}/cart`, id);
  }
  getBookStatuses(currentPage: number, pageSize: number, search: string, id: number, filter: number) {
    return this.httpClient.get(`${this.url}/bookstatuses/book/${id}`, { params: new HttpParams().set("availability", filter).set("search", search).set("pageSize", pageSize).set("pageNumber", currentPage) });
  }

  getBookStatusesByLocations(currentPage: number, pageSize: number, id: any, page: any) {
    if (page === 'location') {
      return this.httpClient.get(`${this.url}/bookstatuses/location/${id}`, { params: new HttpParams().set("pageSize", pageSize).set("pageNumber", currentPage) });
    }
    else if (page === 'section') {
      return this.httpClient.get(`${this.url}/bookstatuses/section/${id}`, { params: new HttpParams().set("pageSize", pageSize).set("pageNumber", currentPage) });
    }
    else if (page === 'shelf') {
      return this.httpClient.get(`${this.url}/bookstatuses/shelf/${id}`, { params: new HttpParams().set("pageSize", pageSize).set("pageNumber", currentPage) });
    }
    else {
      return this.httpClient.get(`${this.url}/bookstatuses/floor/${id}`, { params: new HttpParams().set("pageSize", pageSize).set("pageNumber", currentPage) });
    }
  }

  deleteBook(id: any) {
    return this.httpClient.delete(`${this.url}/bookstatuses/bookstatus/${id}`);
  }

  deleteBookDetails(id: any) {
    return this.httpClient.delete(`${this.url}/bookdetails/book/${id}`);
  }
  getLocation(id: any) {
    return this.httpClient.get(`${this.url}/locations/location/${id}`);
  }



  addReservation(reserver: Reserver) {
    return this.httpClient.post(`${this.url}/reservations`, reserver);
  }

  checkIn(borrower: Borrower) {
    return this.httpClient.post(`${this.url}/borrowings`, borrower);
  }

  getBorrowingByBookStatus(value: number) {
    return this.httpClient.get(`${this.url}/borrowings/bookstatus/${value}`)
  }

  checkOut(id: any) {
    return this.httpClient.delete(`${this.url}/borrowings/bookborrowing/${id}`);
  }

  updateBookStatus(bookHeader: Book, id: any) {
    return this.httpClient.put(`${this.url}/bookdetails/book/${id}`, bookHeader);
  }
  addBookStatus(book: Book) {
    return this.httpClient.post(`${this.url}/bookstatuses`, book);
  }

  getReservations(currentPage: number, pageSize: number, search: string) {
    return this.httpClient.get(`${this.url}/reservations`, { params: new HttpParams().set("search", search).set("pageSize", pageSize).set("pageNumber", currentPage).set("user",false) });
  }

  getReservationsByUser(currentPage: number, pageSize: number, search: string) {
    return this.httpClient.get(`${this.url}/reservations`, { params: new HttpParams().set("search", search).set("pageSize", pageSize).set("pageNumber", currentPage).set("user",true) });
  }

  rejectReservation(id: any) {
    return this.httpClient.post(`${this.url}/reservations/status/${id}`,false);
  }
  
  acceptReservation(id: any) {
    return this.httpClient.post(`${this.url}/reservations/status/${id}`,true);
  }
  getBorrowings(currentPage: number, pageSize: number, search: string) {
    return this.httpClient.get(`${this.url}/borrowings`, { params: new HttpParams().set("search", search).set("user",false).set("pageSize", pageSize).set("pageNumber", currentPage) });
  }

  getBorrowingsByUser(currentPage: number, pageSize: number, search: string) {
    return this.httpClient.get(`${this.url}/borrowings`, { params: new HttpParams().set("search", search).set("user",true).set("pageSize", pageSize).set("pageNumber", currentPage) });
  }
  deleteBookFromCart(id: any) {
    return this.httpClient.delete(`${this.url}/cart/cartitem/${id}`);
  }

}
