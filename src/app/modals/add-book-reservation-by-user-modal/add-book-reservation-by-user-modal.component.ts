
import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Reserver } from 'src/app/model/reserver';
import { BookService } from 'src/app/service/book.service';
import { LocationService } from 'src/app/service/location.service';
import { ModalService } from 'src/app/service/modal.service';
import { UserService } from 'src/app/service/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-book-reservation-by-user-modal',
  templateUrl: './add-book-reservation-by-user-modal.component.html',
  styleUrls: ['./add-book-reservation-by-user-modal.component.css']
})
export class AddBookReservationByUserModalComponent {
 id: any;
  isError!: boolean;
  error_msg!: string;
  reserver: Reserver = new Reserver();
  form: any;
  isUserHasLessBooks = false;
  isUserHasLessReservations = false;
  today = new Date();
  day = this.today.getDate();
  month = this.today.getMonth();
  year = this.today.getFullYear();
  todate:any;
  fromdate:any;
  entity: any;
  user = Number(localStorage.getItem("userId"));


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
  set bookDetailsId(value: number) {
    this.id = value;
    this.buildForm();
    this.changeDetectorRef.detectChanges();
  }
  
  constructor(public activeModal: NgbActiveModal, private formBuilder: FormBuilder, private userService: UserService, private changeDetectorRef: ChangeDetectorRef, private bookService: BookService) {
   

     this.fromdate= new Date();
    this.todate = new Date(this.year,this.month,this.day+3);
    this.checkUserPurchased();
  }
  get fc() {
    return this.form.controls;
  }
  saveReservation() {
    let reservationDate = this.form.controls['reservationDate'].value;
    this.reserver.bookDetailsId = this.id;
    this.reserver.reservationDate = reservationDate;
    this.reserver.phone = this.user;
    this.bookService.addReservation(this.reserver).subscribe((res) => {

      this.activeModal.close(true);
      this.Toast.fire({
        icon: 'success',
        title: 'Successfully reserved book'
      })
    },
      (error) => {
        this.isError = true
        this.error_msg = error
        this.activeModal.close(true);
        this.Toast.fire({
          icon: 'error',
          title: error
        })
      });
  }

  checkUserPurchased(){
    this.bookService.countCurrentBorrowings(this.user).subscribe((res)=>{
      if(res){
        this.isUserHasLessBooks = true;
        this.bookService.countCurrentReservations(this.user).subscribe((res)=>{
          if(res){
            this.isUserHasLessReservations = true 
          }
          else{
            this.isUserHasLessReservations = false; 
          }  
        },
        (error)=>{
          console.log(error);
          this.isUserHasLessReservations = false;
        })
      }
      else{
        this.isUserHasLessBooks = false; 
      }
      
    },
    (error)=>{
      console.log(error);
      this.isUserHasLessBooks = false;
    })
    
  }
  buildForm() {
    this.form = this.formBuilder.group({
      reservationDate: ['', [Validators.required]]
    });
  }
}
