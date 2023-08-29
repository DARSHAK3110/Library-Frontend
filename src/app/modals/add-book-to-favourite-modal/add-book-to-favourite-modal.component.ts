import { ChangeDetectorRef, Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { BookService } from 'src/app/service/book.service';
import { LocationService } from 'src/app/service/location.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-book-to-favourite-modal',
  templateUrl: './add-book-to-favourite-modal.component.html',
  styleUrls: ['./add-book-to-favourite-modal.component.css']
})
export class AddBookToFavouriteModalComponent {
  id:any;
  isError!:boolean;
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
  constructor(private bookService: BookService,public activeModal: NgbActiveModal,private changeDetectorRef: ChangeDetectorRef, private locationService: LocationService) {
   
  }
  addBookToFavourite(){
    console.log(this.id+"a");
    
      this.bookService.addBookDetailsToFavourite(this.id).subscribe((res)=>{
        this.activeModal.close(true);
        this.Toast.fire({
          icon: 'success',
          title: 'Successfully added book to favourite'
        })
      },
      (error)=>{
        this.isError = true
        this.error_msg = error;
     
      this.Toast.fire({
        icon: 'error',
        title: `Can't add now cotact admin!!`
      })
    });
  } 
}
