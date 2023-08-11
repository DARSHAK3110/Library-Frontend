import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Reserver } from 'src/app/model/reserver';
import { User } from 'src/app/model/user';
import { BookService } from 'src/app/service/book.service';
import { UserService } from 'src/app/service/user.service';
import { phoneNumberValidator } from 'src/app/validator/phoneNumber.validators';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-reservation-modal',
  templateUrl: './add-reservation-modal.component.html',
  styleUrls: ['./add-reservation-modal.component.css']
})
export class AddReservationModalComponent {
  id:any;
  isError!:boolean;
  isAdd!:boolean;
  error_msg!:string;
  reserver:Reserver = new Reserver();
  form:any;
  isReserverCheked:any = false;
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
  set bookDetailsId(value: number) { 
    this.id = value; 
    this.buildForm();
    this.changeDetectorRef.detectChanges();
  }
 
  constructor(public activeModal: NgbActiveModal, private formBuilder: FormBuilder, private userService: UserService,private changeDetectorRef: ChangeDetectorRef, private bookService: BookService) {
   
  }
  get fc(){
    return this.form.controls;
  }
  saveReservation(){
    let reserverPhoneNumber = this.form.controls['reserverPhoneNumber'].value;
    let reservationDate = this.form.controls['reservationDate'].value;
    this.reserver.phone = reserverPhoneNumber;
    this.reserver.bookDetailsId = this.id;
    this.reserver.reservationDate = reservationDate;

   console.log(this.reserver);
   
      
      this.bookService.addReservation(this.reserver).subscribe((res)=>{
        this.activeModal.close(true);
      },
      (error)=>{
        this.isError = true
        this.error_msg = error
        
      });

    
    


  }
  checkUser(){
    this.userService.getUser(this.form.controls['reserverPhoneNumber'].value).subscribe((res)=>{
      this.isReserverCheked = true;
      console.log(res);
      
    },
    (error)=>{
      console.log(error);
      this.form.controls['reserverPhoneNumber'].value = null;
      this.isReserverCheked = false;
    })

    
  }
  buildForm(){
    this.form =  this.formBuilder.group({
      reserverPhoneNumber: ['',[Validators.required, Validators.min(1000000000), Validators.max(9999999999), phoneNumberValidator.phoneNumberValidations]],
      reservationDate: ['',[Validators.required]]
    });
    
  }
}
