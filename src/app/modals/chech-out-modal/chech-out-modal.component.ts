import { ChangeDetectorRef, Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Borrower } from 'src/app/model/borrower';
import { BookService } from 'src/app/service/book.service';
import { UserService } from 'src/app/service/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-chech-out-modal',
  templateUrl: './chech-out-modal.component.html',
  styleUrls: ['./chech-out-modal.component.css']
})
export class ChechOutModalComponent {
  isExpired=false;
  id:any;
  isError!:boolean;
  isAdd!:boolean;
  error_msg!:string;
  borrower:Borrower = new Borrower();
  form:any;
  isBorrowerCheked:any = false;
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
  set bookStatusId(value: number) { 
    this.id = value; 
    this.getBorrowing(value);
    this.changeDetectorRef.detectChanges();
  }
 
  constructor(public activeModal: NgbActiveModal,  private userService: UserService,private changeDetectorRef: ChangeDetectorRef, private bookService: BookService) {
   
  }
  get fc(){
    return this.form.controls;
  }
  checkedOut(){
   this.bookService.checkOut(this.id).subscribe((res)=>{
        this.activeModal.close(true);
        this.Toast.fire({
          icon: 'success',
          title: "successfully checkedOut!"
        })
      },
      (error)=>{
        this.isError = true
        this.error_msg = error
        this.changeDetectorRef.detectChanges();
      });
  } 

  getBorrowing(value: number) {
   this.bookService.getBorrowingByBookStatus(value).subscribe((res: any)=>{
    this.borrower = res;
    let date = new Date(this.borrower.borrowingDate);
    if(date.setDate(date.getDate()+7) < Date.now()){
      this.isExpired = true;
    }
    this.id = res.bookBorrowingId;
   },
   (error)=>{

   })
  }
}
