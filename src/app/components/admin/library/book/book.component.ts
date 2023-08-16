import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { take } from 'rxjs';
import { BookService } from 'src/app/service/book.service';
import { LocationService } from 'src/app/service/location.service';
import { ModalService } from 'src/app/service/modal.service';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent {
  displayedColumns: string[] = ['index', 'title', 'author', 'isbn', 'availableCopies','totalCopies','totalReserved','acceptedReserved','actions'];
  books: any;
  dataSource: any;

  search: string = "";
  deleteUserResult: boolean = true;

  bookId!: number;
  operationStatus!: boolean;
  isLoading = false;
  totalRows = 0;
  pageSize = 2;
  currentPage = 0;
  pageSizeOptions: number[] = [2, 5, 10];

  constructor(private bookService: BookService,private locationService: LocationService,changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, private modalService: ModalService) {
    this.getBooks();
    
  }
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  pageChanged(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    this.getBooks();
  }

  getBooks() {
    this.bookService.getBooks(this.currentPage, this.pageSize, this.search).subscribe(
      (locationDto: any) => {
        this.books = locationDto.content;
        
        this.dataSource = new MatTableDataSource(locationDto.content);
        this.totalRows = locationDto.totalElements;
      }, (error) => {
      console.log(error);
      }
    )
  }

  addEditBookDetails(bookId: number) {
    this.modalService.onAddEditBook(bookId).pipe(take(1)).subscribe(result => {
        this.getBooks();
    }, (error) => {
      console.log(error);
    })
  }

  deleteBookDetails(bookId: number) {
    this.modalService.onDeleteBook(bookId).pipe(take(1)).subscribe(result => {
        this.getBooks();
    }, (error) => {
      console.log(error);
    })
  }

  reservationBook(bookDetailsId: number){
     this.modalService.onAddReservation(bookDetailsId).pipe(take(1)).subscribe(result => {
      this.getBooks();
    }
, (error) => {
      console.log(error);
    })
   }
}
