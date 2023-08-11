import { ChangeDetectorRef, Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { BookService } from 'src/app/service/book.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-remove-book-from-cart-modal',
  templateUrl: './remove-book-from-cart-modal.component.html',
  styleUrls: ['./remove-book-from-cart-modal.component.css']
})
export class RemoveBookFromCartModalComponent {
  id:any;
  isError!:boolean;
  isBooks!:boolean;
  error_msg!:string;
  form:any;

  entity:any;
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
  set bookDetailsId(value: number) 
  { 
    this.id = value; 
    this.changeDetectorRef.detectChanges();
  }

  constructor(private bookService: BookService,public activeModal: NgbActiveModal,private changeDetectorRef: ChangeDetectorRef) {
  }


  deleteBook(){
   
      this.bookService.deleteBookFromCart(this.id).subscribe((res)=>{
        this.activeModal.close(true);
        this.Toast.fire({
          icon: 'success',
          title: 'Successfully deleted book from cart'
        })
      },
      (error)=>{
        this.isError = true
        this.error_msg = error;
        this.activeModal.close(true);
      this.Toast.fire({
        icon: 'error',
        title: 'Something not right!!'
      })
    });
    
    
  } 
}
