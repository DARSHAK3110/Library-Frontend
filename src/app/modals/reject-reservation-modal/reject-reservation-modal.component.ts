import { ChangeDetectorRef, Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { BookService } from 'src/app/service/book.service';
import { UserService } from 'src/app/service/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reject-reservation-modal',
  templateUrl: './reject-reservation-modal.component.html',
  styleUrls: ['./reject-reservation-modal.component.css']
})
export class RejectReservationModalComponent {
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
 
  constructor(private userService:UserService,public activeModal: NgbActiveModal,private changeDetectorRef: ChangeDetectorRef, private bookService: BookService) {
   
  }
  rejectReservation(){
   this.bookService.rejectReservation(this.id).subscribe((res:any)=>{
    this.userService.getUser(Number(res.message)).subscribe((res:any)=>{
      this.bookService.sendMail(this.id,res.email,false).subscribe((res:any)=>{
        console.log("complete");
        
      })
    })
        this.activeModal.close(true);
        this.Toast.fire({
          icon: 'success',
          title: 'Successfully rejected request!!'
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
