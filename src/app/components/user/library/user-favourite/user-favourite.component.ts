import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { take } from 'rxjs';
import { BookService } from 'src/app/service/book.service';
import { LocationService } from 'src/app/service/location.service';
import { ModalService } from 'src/app/service/modal.service';

@Component({
  selector: 'app-user-favourite',
  templateUrl: './user-favourite.component.html',
  styleUrls: ['./user-favourite.component.css']
})
export class UserFavouriteComponent {
  displayedColumns: string[] = ['index', 'title', 'author', 'isbn', 'availableCopies', 'totalCopies', 'actions'];
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

  constructor(private bookService: BookService, private locationService: LocationService, changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, private modalService: ModalService) {
    this.getFavouriteItems();
  }

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  pageChanged(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    this.getFavouriteItems();
  }

  getFavouriteItems() {
    this.bookService.getBooksFromFavourite(this.currentPage, this.pageSize, this.search).subscribe(
      (locationDto: any) => {
        console.log(locationDto.content)
        this.books = locationDto.content;
        this.dataSource = new MatTableDataSource(locationDto.content);
        this.totalRows = locationDto.totalElements;
      }, (error) => {
        console.log(error);
      }
    )
  }

  removeBookFromFavourite(bookId: number) {
    this.modalService.onRemoveBookFromFavourite(bookId).pipe(take(1)).subscribe(result => {
      this.getFavouriteItems();
    }, (error) => {
      console.log(error);
    })
  }

  reservationBook(bookDetailsId: number) {
    this.modalService.onAddReservationByUser(bookDetailsId).pipe(take(1)).subscribe(result => {
    }
      , (error) => {
        console.log(error);
      })
  }
}
