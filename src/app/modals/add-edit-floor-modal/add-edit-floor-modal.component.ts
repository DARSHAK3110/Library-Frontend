<<<<<<< HEAD
import { STRING_TYPE } from '@angular/compiler';
=======
>>>>>>> f3fada5b62d9fa1a028be3efc3a59e35705b164d
import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Floor } from 'src/app/model/floor';
import { LocationService } from 'src/app/service/location.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-edit-floor-modal',
  templateUrl: './add-edit-floor-modal.component.html',
  styleUrls: ['./add-edit-floor-modal.component.css']
})
export class AddEditFloorModalComponent {
<<<<<<< HEAD
  id: any;
  isError!: boolean;
  isAdd!: boolean;
  error_msg!: string;
  floor: Floor = new Floor();
  form: any;
  Toast: any = Swal.mixin({
=======
  id:any;
  isError!:boolean;
  isAdd!:boolean;
  error_msg!:string;
  floor:Floor = new Floor();
  form:any;
  Toast:any = Swal.mixin({
>>>>>>> f3fada5b62d9fa1a028be3efc3a59e35705b164d
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
<<<<<<< HEAD
    this.id = value;
    this.buildForm();
    this.changeDetectorRef.detectChanges();
  }

  constructor(public activeModal: NgbActiveModal, private formBuilder: FormBuilder, private locationService: LocationService, private changeDetectorRef: ChangeDetectorRef) { }
  get fc() {
    return this.form.controls;
  }
  saveFloor() {
    let floorNo = this.form.controls['floorNo'].value;
    this.floor.floorNo = floorNo
    if (this.id === 0) {
      this.locationService.addFloor(this.floor).subscribe(() => {
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
    else {
      this.floor.floorId = this.id;
      this.locationService.updateFloor(this.floor, this.id).subscribe(() => {
        this.activeModal.close(true);
        this.Toast.fire({
          icon: 'success',
          title: "successfully updated!"
        })
      },
        (error) => {
          this.isError = true
          this.error_msg = error
        });

    }
  }

  buildForm() {
    this.form = this.formBuilder.group({
      floorNo: ['', [Validators.required, Validators.min(0)]]
    });

    if (this.id > 0) {
      this.isAdd = false;
      this.locationService.getFloor(this.id).subscribe((res: any) => {
        this.id = res.floorId;

        this.form.patchValue({
          "floorNo": res.floorNo,
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
=======
   
    this.id = value; 
    this.buildForm();
    this.changeDetectorRef.detectChanges();
  }
 
  constructor(public activeModal: NgbActiveModal, private formBuilder: FormBuilder, private locationService: LocationService,private changeDetectorRef: ChangeDetectorRef) {
    
   
  }
  get fc(){
    return this.form.controls;
  }
  saveFloor(){
    let floorNo = this.form.controls['floorNo'].value;
    this.floor.floorNo = floorNo
    if(this.id === 0){
      this.locationService.addFloor(this.floor).subscribe((res)=>{
        this.activeModal.close(true);
      },
      (error)=>{
        this.isError = true
        // this.error_msg = error
        this.Toast.fire({
          icon: 'error',
          title: error
        })
      });

    }
    else{
this.floor.floorId = this.id;
      this.locationService.updateFloor(this.floor, this.id).subscribe((res)=>{
        this.activeModal.close(true);
      },
      (error)=>{
        this.isError = true
        // this.error_msg = error
        this.Toast.fire({
          icon: 'error',
          title: error
        })
      });

    }
    


  }

  buildForm(){
    this.form =  this.formBuilder.group({
      floorNo: ['', [Validators.required, Validators.min(-1)]]
    });


    if(this.id>0){
      this.isAdd = false;
      this.locationService.getFloor(this.id).subscribe((res:any)=>{
        this.id = res.floorId;
        
        this.form.patchValue({
           "floorNo": res.floorNo,
         })
      },
      error=>{
        this.Toast.fire({
          icon: 'error',
          title: error
        })
      }
      )
    }   
>>>>>>> f3fada5b62d9fa1a028be3efc3a59e35705b164d
  }

}
