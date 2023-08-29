import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatCalendarCellClassFunction } from '@angular/material/datepicker';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Author } from 'src/app/model/author';
import { Borrower } from 'src/app/model/borrower';
import { BookService } from 'src/app/service/book.service';
import { LocationService } from 'src/app/service/location.service';
import { UserService } from 'src/app/service/user.service';
import { NoSpaceValidator } from 'src/app/validator/noSpace.validator';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-edit-author-modal',
  templateUrl: './add-edit-author-modal.component.html',
  styleUrls: ['./add-edit-author-modal.component.css']
})
export class AddEditAuthorModalComponent {
  id: any;
  isError!: boolean;
  isAdd!: boolean;
  error_msg!: string;
  author: Author = new Author();
  form: any;
  minDate=new Date(1990,0o0,0o1);
  maxDate=new Date();
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
  set authorId(value: number) {
    this.id = value;
    this.buildForm();
    this.changeDetectorRef.detectChanges();
  }

  constructor(public activeModal: NgbActiveModal, private locationService: LocationService, private formBuilder: FormBuilder, private userService: UserService, private changeDetectorRef: ChangeDetectorRef, private bookService: BookService) {

  }
  get fc() {
    return this.form.controls;
  }
  saveAuthor() {
    let authorName = this.form.controls['authorName'].value;
    let authorDOB = this.form.controls['authorDOB'].value;
    this.author.authorName = authorName;
    this.author.authorDOB = authorDOB;

    if (this.id === 0) {
      this.locationService.addAuthor(this.author).subscribe((res) => {
        this.activeModal.close(true);
      },
        (error) => {
          this.isError = true
          this.error_msg = error 
        });

    }
    else {
      this.locationService.updateAuthor(this.author, this.id).subscribe((res) => {
        this.activeModal.close(true);
      },
        (error) => {
          this.isError = true
          this.error_msg = error 
        });
    }
 }
  buildForm() {
    this.form = this.formBuilder.group({
      authorName: ['', [Validators.required, Validators.minLength(3),Validators.maxLength(16)]],
      authorDOB: ['', [Validators.required]]
    });

    if (this.id > 0) {
      this.isAdd = false;
      this.locationService.getAuthor(this.id).subscribe((res: any) => {
        this.author = res;
        this.form.patchValue({
          "authorName": this.author.authorName,
          "authorDOB": this.author.authorDOB

        })
      },
        error => {
          this.Toast.fire({
            icon: 'error',
            title: error
          })
        }
      )
    }
  }
}
