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
  isReserved=false;
  isReserverChecked=false;
  isUserHasLessBooks=false;
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
 
  set reserved(value: boolean) { 
    console.log(value);
    this.isReserved = value; 
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
    this.borrower.phone = borrowerPhoneNumber;
    this.borrower.bookStatusId = this.id?.bookStatusId;
    this.borrower.isReserved = this.isReserved;
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
        this.changeDetectorRef.detectChanges();
      });
  }

  checkUser(){

    this.userService.getUser(this.form.controls['borrowerPhoneNumber'].value).subscribe((res)=>{
      this.isBorrowerCheked = true;
      this.bookService.countCurrentBorrowings(this.form.controls['borrowerPhoneNumber'].value).subscribe((res)=>{
        if(res){
          this.isUserHasLessBooks=true;
          if(this.isReserved){
            this.bookService.checkReserver(this.form.controls['borrowerPhoneNumber'].value,this.id).subscribe((res)=>{
              if(res){
                this.isReserverChecked = true;
               }
              else{
                this.patcher();
                this.isReserverChecked = false; 
              }
            }  
            ,
            (error)=>{
              console.log(error);
              this.patcher();
              this.isUserHasLessBooks = false;
            })
          }
          else{
            this.isReserverChecked = true;
          }  
        }
        else{
          this.patcher();
          this.isUserHasLessBooks = false; 
        }
        
      },
      (error)=>{
        console.log(error);
        this.patcher();
        this.isUserHasLessBooks = false;
      })
      
    },
    (error)=>{
      console.log(error);
      this.isError = true
      this.error_msg = error
      this.patcher();
      this.isBorrowerCheked = false;
    })
  
    
  }
  patcher(){
    this.form.patchValue({
      "reserverPhoneNumber": null,
    })
  }

  buildForm(){
    this.form =  this.formBuilder.group({
      borrowerPhoneNumber: ['',[Validators.required, Validators.min(1000000000), Validators.max(9999999999), phoneNumberValidator.phoneNumberValidations]]
    });  
  }
}
