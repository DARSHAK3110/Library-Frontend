import { ChangeDetectorRef, Component, ViewEncapsulation } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Floor } from 'src/app/model/floor';
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

    this.id = value;
    this.buildForm();
    this.changeDetectorRef.detectChanges();
  }

  constructor(public activeModal: NgbActiveModal, private formBuilder: FormBuilder, private locationService: LocationService, private changeDetectorRef: ChangeDetectorRef) {
    locationService.getAllFloors().subscribe((res: any) => {
      this.floors = res.content;
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
  saveFloor() {

    let floorNo = this.form.controls['floorNo'].value;
    let secName = this.form.controls['sectionName'].value;
    this.section.floorNo = floorNo;
    this.section.sectionName = secName;
    if (this.id === 0) {
      this.locationService.addSection(this.section).subscribe((res) => {
        this.activeModal.close(true);
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
    else {
      this.locationService.updateSection(this.section, this.id).subscribe((res) => {
        this.activeModal.close(true);
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



  }

  buildForm() {
    this.form = this.formBuilder.group({
      floorNo: ['', [Validators.required, Validators.min(-1)]],
      sectionName: ['', [Validators.required, NoSpaceValidator.noSpaceValidators]]
    });


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


}
