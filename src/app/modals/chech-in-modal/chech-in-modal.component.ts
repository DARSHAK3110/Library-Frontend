import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Borrower } from 'src/app/model/borrower';
import { BookService } from 'src/app/service/book.service';
import { UserService } from 'src/app/service/user.service';
import { phoneNumberValidator } from 'src/app/validator/phoneNumber.validators';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-chech-in-modal',
  templateUrl: './chech-in-modal.component.html',
  styleUrls: ['./chech-in-modal.component.css']
})
export class ChechInModalComponent {
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
    this.buildForm();
    this.changeDetectorRef.detectChanges();
  }
 
  constructor(public activeModal: NgbActiveModal, private formBuilder: FormBuilder, private userService: UserService,private changeDetectorRef: ChangeDetectorRef, private bookService: BookService) { 
  }
  get fc(){
    return this.form.controls;
  }
  checkedIn(){
    let borrowerPhoneNumber = this.form.controls['borrowerPhoneNumber'].value;
    let borrowingDate = this.form.controls['borrowingDate'].value;
    this.borrower.phone = borrowerPhoneNumber;
    this.borrower.bookStatusId = this.id;
    this.borrower.borrowingDate = borrowingDate;
      this.bookService.checkIn(this.borrower).subscribe((res)=>{
        this.activeModal.close(true);
        this.Toast.fire({
          icon: 'success',
          title: "successfully checkedIn!"
        })
      },
      (error)=>{
        this.isError = true
        this.error_msg = error
      });
  }
  checkUser(){
    this.userService.getUser(this.form.controls['borrowerPhoneNumber'].value).subscribe((res)=>{
      this.isBorrowerCheked = true;
    },
    (error)=>{
      this.isError = true
      this.form.controls['borrowerPhoneNumber'].value = null;
      this.isBorrowerCheked = false;
      this.error_msg = error
    })
  }
  buildForm(){
    this.form =  this.formBuilder.group({
      borrowerPhoneNumber: ['',[Validators.required, Validators.min(1000000000), Validators.max(9999999999), phoneNumberValidator.phoneNumberValidations]],
      borrowingDate: ['',[Validators.required]]
    });  
  }
}
