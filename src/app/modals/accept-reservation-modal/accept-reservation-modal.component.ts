import { ChangeDetectorRef, Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { BookService } from 'src/app/service/book.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-accept-reservation-modal',
  templateUrl: './accept-reservation-modal.component.html',
  styleUrls: ['./accept-reservation-modal.component.css']
})
export class AcceptReservationModalComponent {
  id:any;
  isError!:boolean;
  isAdd!:boolean;
  error_msg!:string;
  form:any;
  Toast:any = Swal.mixin({
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
  set reservationId(value: number) { 
    this.id = value; 
    this.changeDetectorRef.detectChanges();
  }
 
  constructor(public activeModal: NgbActiveModal,private changeDetectorRef: ChangeDetectorRef, private bookService: BookService) {
   
  }
  acceptReservation(){
   this.bookService.acceptReservation(this.id).subscribe((res)=>{
        this.activeModal.close(true);
        this.Toast.fire({
          icon: 'success',
          title: 'Successfully accepted request!!'
        })
      },
      (error)=>{
        this.isError = true
       this.error_msg = error
       this.activeModal.close(true);
       this.Toast.fire({
         icon: 'error',
         title: 'Something went wrong !!'
       })
      });
  } 
}
