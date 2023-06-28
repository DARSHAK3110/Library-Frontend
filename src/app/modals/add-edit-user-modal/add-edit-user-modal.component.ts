import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/service/user.service';
import { NoSpaceValidator } from 'src/app/validator/noSpace.validator';
import { phoneNumberValidator } from 'src/app/validator/phoneNumber.validators';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-edit-user-modal',
  templateUrl: './add-edit-user-modal.component.html',
  styleUrls: ['./add-edit-user-modal.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddEditUserModalComponent {

  id:any;
  isError!:boolean;
  isAdd!:boolean;
  error_msg!:string;
  user:User = new User();
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
  set userId(value: number) {
   
    this.id = value; 
    this.buildForm();
    this.changeDetectorRef.detectChanges();
  }
 
  constructor(public activeModal: NgbActiveModal, private formBuilder: FormBuilder, private userService: UserService,private changeDetectorRef: ChangeDetectorRef) {
   
  }
  get fc(){
    return this.form.controls;
  }
  saveUser(){
    let firstName = this.form.controls['firstName'].value;
    let lastName = this.form.controls['lastName'].value;
    let phoneNumber = this.form.controls['phoneNumber'].value;
    let password = this.form.controls['password'].value;
    this.user.firstName = firstName;
    this.user.lastName = lastName;

    if(this.id == 0){
      this.user.phoneNumber = phoneNumber;
      this.user.password = password;
    }
    this.user.role = "USER"
    if(this.user.userId === undefined){
      
      this.userService.addUser(this.user).subscribe((res)=>{
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
      this.userService.updateUser(this.user, phoneNumber).subscribe((res)=>{
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
      firstName: ['', [Validators.required, NoSpaceValidator.noSpaceValidators]],
      lastName: ['', [Validators.required, NoSpaceValidator.noSpaceValidators]],
      phoneNumber: ['',[Validators.required, Validators.min(1000000000), Validators.max(9999999999), phoneNumberValidator.phoneNumberValidations]],
      password: ['',[Validators.required, Validators.minLength(6), Validators.maxLength(8)]]
    });


    if(this.id>0){
      this.isAdd = false;
      this.form.get('phoneNumber').disable();
      this.form.get('password').disable();
      this.userService.getUser(this.id).subscribe((res)=>{
        this.user = res;
        this.form.patchValue({
          "firstName": this.user.firstName,
          "lastName": this.user.lastName,
          "password": this.user.password,
          "phoneNumber": this.user.phoneNumber
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
  }
}
