import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import * as _moment from 'moment';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';


import { end } from '@popperjs/core';
import { take } from 'rxjs';
import { BookService } from 'src/app/service/book.service';
import { LocationService } from 'src/app/service/location.service';
import { ModalService } from 'src/app/service/modal.service';
import Swal from 'sweetalert2';

const today = new Date();
const day = today.getDate();
const month = today.getMonth();
const year = today.getFullYear();

const moment = _moment;

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css'],
})
export class ReservationComponent {
  displayedColumns: string[] = ['index','reserver','title','totalCopies','totalReserved','availableCopies','acceptedReserved', 'reservationDate','actions'];
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
    this.maxDate =  new Date(year, month, day+7);
    this.getReservations();
    
  }
  filterChanged(){
    let startDate = moment(this.filterDate.value.start).format("YYYY-MM-DD");
   let endDate = moment(this.filterDate.value.end).format("YYYY-MM-DD");
   if(this.filterDate.value.end == null){
    endDate = moment(new Date(year,month,day+7)).format("YYYY-MM-DD"); 

    this.filterDate.value.end = new Date();
   }
   this.bookService.getReservationsByFilter(this.currentPage, this.pageSize, this.search, startDate, endDate).subscribe(
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
    this.bookService.getReservations(this.currentPage, this.pageSize, this.search).subscribe(
      (reservationDto: any) => {
        console.log(reservationDto.content);
        
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

  acceptReservation(reservationId:number,isbn:number){
    this.modalService.onAcceptReservation(reservationId,isbn).pipe(take(1)).subscribe(result => {
      this.getReservations();
    }, (error) => {
      console.log(error);
    })
  }

  
  rejectReservation(reservationId:number){
    this.modalService.onRejectReservation(reservationId).pipe(take(1)).subscribe(result => {
      this.getReservations();
    }, (error) => {
      console.log(error);
    })
  }
}
