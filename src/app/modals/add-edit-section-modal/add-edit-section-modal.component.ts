import { ChangeDetectorRef, Component, ViewEncapsulation } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
<<<<<<< HEAD
=======
import { Floor } from 'src/app/model/floor';
>>>>>>> f3fada5b62d9fa1a028be3efc3a59e35705b164d
import { Section } from 'src/app/model/section';
import { LocationService } from 'src/app/service/location.service';
import { NoSpaceValidator } from 'src/app/validator/noSpace.validator';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-edit-section-modal',
  templateUrl: './add-edit-section-modal.component.html',
  styleUrls: ['./add-edit-section-modal.component.css']
})
export class AddEditSectionModalComponent {
  id: any;
  isError!: boolean;
  floorSelected: any;
  floors: any;
  isAdd!: boolean;
  error_msg!: string;

  section: Section = new Section();
  form: any;
  selectedValue: any;
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
  set sectionId(value: number) {
<<<<<<< HEAD
=======

>>>>>>> f3fada5b62d9fa1a028be3efc3a59e35705b164d
    this.id = value;
    this.buildForm();
    this.changeDetectorRef.detectChanges();
  }

  constructor(public activeModal: NgbActiveModal, private formBuilder: FormBuilder, private locationService: LocationService, private changeDetectorRef: ChangeDetectorRef) {
    locationService.getAllFloors().subscribe((res: any) => {
      this.floors = res.content;
<<<<<<< HEAD
      this.floorSelected = res.content[0]?.floorNo;
    },
      (error) => {
        this.Toast.fire({
          icon: 'error', 
          title: 'There are no floors'
=======
    },
      (error) => {
        this.Toast.fire({
          icon: 'error',
          title: error
>>>>>>> f3fada5b62d9fa1a028be3efc3a59e35705b164d
        })

      }
    )
  }
  get fc() {
    return this.form.controls;
  }
  saveFloor() {

    let floorNo = this.form.controls['floorNo'].value;
    let secName = this.form.controls['sectionName'].value;
    this.section.floorNo = floorNo;
    this.section.sectionName = secName;
    if (this.id === 0) {
      this.locationService.addSection(this.section).subscribe((res) => {
        this.activeModal.close(true);
<<<<<<< HEAD
        this.Toast.fire({
          icon: 'success',
          title: "successfully added!"
        })
      },
        (error) => {
          this.isError = true
          this.error_msg = error;
=======
      },
        (error) => {
          this.isError = true
          // this.error_msg = error
          this.Toast.fire({
            icon: 'error',
            title: error
          })
>>>>>>> f3fada5b62d9fa1a028be3efc3a59e35705b164d
        });

    }
    else {
      this.locationService.updateSection(this.section, this.id).subscribe((res) => {
        this.activeModal.close(true);
<<<<<<< HEAD
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
=======
      },
        (error) => {
          this.isError = true
          // this.error_msg = error
          this.Toast.fire({
            icon: 'error',
            title: error
          })
        });

    }



>>>>>>> f3fada5b62d9fa1a028be3efc3a59e35705b164d
  }

  buildForm() {
    this.form = this.formBuilder.group({
<<<<<<< HEAD
      floorNo: ['', [Validators.required, Validators.min(0)]],
      sectionName: ['', [Validators.required,Validators.maxLength(16), NoSpaceValidator.noSpaceValidators]]
    });

=======
      floorNo: ['', [Validators.required, Validators.min(-1)]],
      sectionName: ['', [Validators.required, NoSpaceValidator.noSpaceValidators]]
    });


>>>>>>> f3fada5b62d9fa1a028be3efc3a59e35705b164d
    if (this.id > 0) {
      this.isAdd = false;
      this.locationService.getSection(this.id).subscribe((res: any) => {
        this.id = res.sectionId;
        this.section = res;

        this.form.patchValue({
          "floorNo": this.section.floorNo,
          "sectionName": this.section.sectionName
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
<<<<<<< HEAD
=======


>>>>>>> f3fada5b62d9fa1a028be3efc3a59e35705b164d
}
