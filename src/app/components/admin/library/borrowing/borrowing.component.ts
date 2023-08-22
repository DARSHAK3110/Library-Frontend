import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import * as moment from 'moment';
import { take } from 'rxjs';
import { BookService } from 'src/app/service/book.service';
import { LocationService } from 'src/app/service/location.service';
import { ModalService } from 'src/app/service/modal.service';
import Swal from 'sweetalert2';

const today = new Date();
const day = today.getDate();
const month = today.getMonth();
const year = today.getFullYear();
@Component({
  selector: 'app-borrowing',
  templateUrl: './borrowing.component.html',
  styleUrls: ['./borrowing.component.css']
})
export class BorrowingComponent {
 
  
    displayedColumns: string[] = ['index','borrower','title', 'borrowingDate','expireDate', 'returnDate'];
    reservations: any;
    dataSource: any ;
    filterSelector:any;
    search: string = "";
    bookId!: number;
    operationStatus!: boolean;
    isLoading = false;
    totalRows = 0;
    pageSize = 2;
    currentPage = 0;
    isFilterSelected = false;
    pageSizeOptions: number[] = [2, 5, 10];
    filterDate = new FormGroup({
      start: new FormControl(new Date(year, month,day-1)),
      end: new FormControl(new Date(year, month, day+3)),
    });

    filterReturnDate = new FormGroup({
      start: new FormControl(new Date(year, month,day)),
      end: new FormControl(new Date(year, month, day+3)),
    });
   
  
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
    
    filterSelected(value:any){

      this.isFilterSelected = true;
      this.filterChanged();
     }
    filterChanged(){
      let startDate = moment(this.filterDate.value.start).format("YYYY-MM-DD");
      let endDate = moment(this.filterDate.value.end).format("YYYY-MM-DD");
      if(this.filterDate.value.start == null){
        startDate = moment(new Date(2020,0o1,0o1)).format("YYYY-MM-DD"); 
       }
      if(this.filterDate.value.end == null){
       endDate = moment(new Date(year,month,day)).format("YYYY-MM-DD"); 
      }
      console.log(this.filterSelector);
      
        this.bookService.getBorrowingsWithDate(this.currentPage, this.pageSize, this.search, startDate, endDate,this.filterSelector).subscribe(
          (borrowingDto: any) => {  
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
    getBorrowings() {
      this.filterDate.patchValue({
        "end": null,
        "start": null,
      })
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
