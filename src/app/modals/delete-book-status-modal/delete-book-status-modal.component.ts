import { ChangeDetectorRef, Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { BookService } from 'src/app/service/book.service';
import { LocationService } from 'src/app/service/location.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-delete-book-status-modal',
  templateUrl: './delete-book-status-modal.component.html',
  styleUrls: ['./delete-book-status-modal.component.css']
})
export class DeleteBookStatusModalComponent {
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
  set bookStatusId(value: number) 
  { 
    this.isBooks = false;
    this.id = value; 
    this.changeDetectorRef.detectChanges();
  }
 
  set bookDetailsId(value: number) { 
    this.isBooks = true;
    this.id = value; 
    this.changeDetectorRef.detectChanges();
  }
  constructor(private bookService: BookService,public activeModal: NgbActiveModal,private changeDetectorRef: ChangeDetectorRef, private locationService: LocationService) {
   
  }
  deleteBook(){
    if(this.isBooks){
      this.bookService.deleteBookDetails(this.id).subscribe((res)=>{
        this.activeModal.close(true);
        this.Toast.fire({
          icon: 'success',
          title: 'Successfully deleted book details'
        })
      },
      (error)=>{
        this.isError = true
        this.error_msg = error;
        this.activeModal.close(true);
      this.Toast.fire({
        icon: 'error',
        title: 'Some book not available at library now!!'
      })
    });
    }else{   
      this.bookService.deleteBook(this.id).subscribe((res)=>{
        this.activeModal.close(true);
        this.Toast.fire({
          icon: 'success',
          title: 'Successfully deleted book'
        })
      },
      (error)=>{
        this.isError = true
        this.error_msg = error;
        
        this.activeModal.close(true);
      this.Toast.fire({
        icon: 'error',
        title: 'Book not available at library now!!'
      })
    });
    }
    
  } 
}
