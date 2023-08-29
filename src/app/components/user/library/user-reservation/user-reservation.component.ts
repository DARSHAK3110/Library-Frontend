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
  selector: 'app-user-reservation',
  templateUrl: './user-reservation.component.html',
  styleUrls: ['./user-reservation.component.css']
})
export class UserReservationComponent {
  displayedColumns: string[] = ['index','reserver','title', 'reservationDate','status','assignedBookId'];
  reservations: any;
  dataSource: any;
  maxDate:any;
  search: string = "";
  bookId!: number;
  operationStatus!: boolean;
  isLoading = false;
  totalRows = 0;
  pageSize = 2;
  currentPage = 0;
  pageSizeOptions: number[] = [2, 5, 10];
  filterDate = new FormGroup({
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
    this.maxDate =  new Date(year, month, day+3);
    this.getReservations(); 
  }
  filterChanged(){
    let startDate = moment(this.filterDate.value.start).format("YYYY-MM-DD");
   let endDate = moment(this.filterDate.value.end).format("YYYY-MM-DD");
   if(this.filterDate.value.end == null){
    endDate = moment(new Date(year,month,day+7)).format("YYYY-MM-DD"); 
   }
   this.bookService.getReservationsByUserWithFilter(this.currentPage, this.pageSize, this.search, startDate, endDate).subscribe(
    (reservationDto: any) => {
      
      this.reservations = reservationDto.content;
      this.dataSource = new MatTableDataSource(reservationDto.content);
      this.totalRows = reservationDto.totalElements;
    }, (error) => {
      this.Toast.fire({
        icon: 'error',
        title: 'Something went wrong!!'
      });
    }
  )
  }
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  pageChanged(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    this.getReservations();
  }

  getReservations() {
    this.filterDate.patchValue({
      "end": null,
      "start": null,
    })
    this.bookService.getReservationsByUser(this.currentPage, this.pageSize, this.search).subscribe(
      (reservationDto: any) => {
        this.reservations = reservationDto.content;
        this.dataSource = new MatTableDataSource(reservationDto.content);
        this.totalRows = reservationDto.totalElements;
      }, (error) => {
        this.Toast.fire({
          icon: 'error',
          title: 'Something went wrong!!'
        });
      }
    )
  }
  reservationAgainBook(bookId: number){
    this.modalService.onAddReservationByUser(bookId).pipe(take(1)).subscribe(result => {
      this.getReservations();
    }
      , (error) => {
        console.log(error);
      })
    
  }
}
