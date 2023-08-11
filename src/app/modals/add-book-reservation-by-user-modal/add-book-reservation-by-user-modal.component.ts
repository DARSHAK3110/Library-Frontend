import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Reserver } from 'src/app/model/reserver';
import { BookService } from 'src/app/service/book.service';
import { LocationService } from 'src/app/service/location.service';
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

  entity: any;
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

  }
  get fc() {
    return this.form.controls;
  }
  saveReservation() {
    let reservationDate = this.form.controls['reservationDate'].value;
    this.reserver.bookDetailsId = this.id;
    this.reserver.reservationDate = reservationDate;
    this.reserver.phone = Number(localStorage.getItem("userId"));

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
        this.Toast.fire({
          icon: 'error',
          title: `Can't reserve now cotact admin!!`
        })
      });
  }

  buildForm() {
    this.form = this.formBuilder.group({
      reservationDate: ['', [Validators.required]]
    });
  }
}
