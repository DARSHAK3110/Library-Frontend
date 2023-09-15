import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Book } from 'src/app/model/book';
import { BookService } from 'src/app/service/book.service';
import { LocationService } from 'src/app/service/location.service';
import { isbnValidator } from 'src/app/validator/isbn.validators';
import { NoSpaceValidator } from 'src/app/validator/noSpace.validator';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-edit-book',
  templateUrl: './add-edit-book.component.html',
  styleUrls: ['./add-edit-book.component.css']
})
export class AddEditBookComponent {
  id: any;
  isError!: boolean;
  isAdd!: boolean;
  error_msg!: string;
  book: Book = new Book();
  authors:any;
  form: any;
  authorSelected:any;
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
  set bookId(value: number) {

    this.id = value;
    this.buildForm();
    this.changeDetectorRef.detectChanges();
  }

  constructor(public activeModal: NgbActiveModal,public locationService:LocationService, private formBuilder: FormBuilder, private bookService: BookService, private changeDetectorRef: ChangeDetectorRef) {
    locationService.getAllAuthors().subscribe((res: any) => {
      this.authors = res.content;
      this.authorSelected = res.content[0].authorId;
    },
      (error) => {
        this.Toast.fire({
          icon: 'error',
          title: error
        })
      }
    )
  }
  get fc() {
    return this.form.controls;
  }
  saveBook() {
    let title = this.form.controls['title'].value;
    let author = this.form.controls['author'].value;
    let isbn = this.form.controls['isbn'].value;
    this.book.title = title;
    this.book.authorId = author;
    if (this.id == 0) {
      this.book.isbn = isbn;
    }
    if (this.book.bookDetailsId === undefined) {
      this.bookService.addBook(this.book).subscribe((res) => {
        this.activeModal.close(true);
        this.Toast.fire({
          icon: 'success',
          title: 'Successfully Added!'
        })
      },
        (error) => {
          this.isError = true
          this.error_msg = error
          this.changeDetectorRef.detectChanges();
        });

    }
    else {
      this.bookService.updateBook(this.book, this.id).subscribe((res) => {
        this.activeModal.close(true);
        this.Toast.fire({
          icon: 'success',
          title: 'Successfully Updated!'
        })
      },
        (error) => {
          this.isError = true
          this.error_msg = error
          this.changeDetectorRef.detectChanges();
        });

    }

  }

  buildForm() {
    this.form = this.formBuilder.group({
      title: ['', [Validators.required, Validators.maxLength(16)]],
      author: ['', [Validators.required,Validators.min(0)]],
      isbn: ['', [Validators.required, Validators.min(1000000000000), Validators.max(9999999999999), isbnValidator.isbnValidations]],
    });

    if (this.id > 0) {
      this.isAdd = false;
      this.form.get('isbn').disable();      
      this.bookService.getBook(this.id).subscribe((res:any) => {
        this.book = res;
        this.form.patchValue({
          "title": this.book.title,
          "author": this.book.authorId,
          "isbn": this.book.isbn
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
