import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Floor } from 'src/app/model/floor';
import { LocationService } from 'src/app/service/location.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-auto-delete-floor-modal',
  templateUrl: './auto-delete-floor-modal.component.html',
  styleUrls: ['./auto-delete-floor-modal.component.css']
})
export class AutoDeleteFloorModalComponent {
  id: any;
  isError!: boolean;
  isAdd!: boolean;
  error_msg!: string;
  floor: Floor = new Floor();
  form: any;
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
  set floorId(value: number) {
    this.id = value;
    this.buildForm();
    this.changeDetectorRef.detectChanges();
  }

  constructor(public activeModal: NgbActiveModal, private formBuilder: FormBuilder, private locationService: LocationService, private changeDetectorRef: ChangeDetectorRef) { }
  get fc() {
    return this.form.controls;
  }
  deleteFloor() {
    let floorNo = this.form.controls['floorNo'].value;
    this.floor.floorNo = floorNo;
    this.floor.floorId = this.id;
      this.locationService.addFloorAuto(this.floor).subscribe(() => {
        this.activeModal.close(true);
        this.Toast.fire({
          icon: 'success',
          title: "successfully added!"
        })
      },
        (error) => {
          this.isError = true
           this.error_msg = error
        });
  }

  buildForm() {
    this.form = this.formBuilder.group({
      floorNo: ['', [Validators.required, Validators.min(0)]]
    });
  }
  } 

