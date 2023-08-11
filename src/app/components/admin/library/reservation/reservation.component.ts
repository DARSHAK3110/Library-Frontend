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
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent {
  displayedColumns: string[] = ['index','reserver','title', 'reservationDate','actions'];
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
   
    this.getReservations();
    
  }
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  pageChanged(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    this.getReservations();
  }

  getReservations() {
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

  acceptReservation(reservationId:number){
    this.modalService.onAcceptReservation(reservationId).pipe(take(1)).subscribe(result => {
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
