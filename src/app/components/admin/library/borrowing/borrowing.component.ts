import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { take } from 'rxjs';
import { BookService } from 'src/app/service/book.service';
import { LocationService } from 'src/app/service/location.service';
import { ModalService } from 'src/app/service/modal.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-borrowing',
  templateUrl: './borrowing.component.html',
  styleUrls: ['./borrowing.component.css']
})
export class BorrowingComponent {
 
  
    displayedColumns: string[] = ['index','borrower','title', 'borrowingDate', 'returnDate'];
    reservations: any;
    dataSource: any;
  
    search: string = "";
    bookId!: number;
    operationStatus!: boolean;
    isLoading = false;
    totalRows = 0;
    pageSize = 2;
    currentPage = 0;
    pageSizeOptions: number[] = [2, 5, 10];
  
   
  
    Toast: any = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 5000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })
    constructor(private bookService: BookService,private locationService: LocationService,changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, private modalService: ModalService) {
      this.getBorrowings();
      
    }
    @ViewChild(MatPaginator)
    paginator!: MatPaginator;
  
    pageChanged(event: PageEvent) {
      this.pageSize = event.pageSize;
      this.currentPage = event.pageIndex;
      this.getBorrowings();
    }
  
    getBorrowings() {
      this.bookService.getBorrowings(this.currentPage, this.pageSize, this.search).subscribe(
        (borrowingDto: any) => {
          console.log(borrowingDto.content);
          
          this.reservations = borrowingDto.content;
          this.dataSource = new MatTableDataSource(borrowingDto.content);
          this.totalRows = borrowingDto.totalElements;
        }, (error) => {
          this.Toast.fire({
            icon: 'error',
            title: 'Something went wrong!!'
          });
        }
      )
    }
}
