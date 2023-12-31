import { ChangeDetectorRef, Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { BookService } from 'src/app/service/book.service';
import { LocationService } from 'src/app/service/location.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-delete-author',
  templateUrl: './delete-author.component.html',
  styleUrls: ['./delete-author.component.css']
})
export class DeleteAuthorComponent {
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
  set authorId(value: number) { 
    this.id = value; 
    this.changeDetectorRef.detectChanges();
  }
 
  constructor(public activeModal: NgbActiveModal,private changeDetectorRef: ChangeDetectorRef, private locationService: LocationService) {
   
  }
  deleteAuthor(){
   this.locationService.deleteAuthor(this.id).subscribe((res)=>{
        this.activeModal.close(true);
        this.Toast.fire({
          icon: 'success',
          title: 'Successfully deleted author'
        })
      },
      (error)=>{
        this.isError = true
       this.error_msg = error
       this.changeDetectorRef.detectChanges();
      });
  } 
}
