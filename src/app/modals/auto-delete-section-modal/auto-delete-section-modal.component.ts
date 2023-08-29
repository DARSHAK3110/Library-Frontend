import { ChangeDetectorRef, Component, ViewEncapsulation } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Section } from 'src/app/model/section';
import { LocationService } from 'src/app/service/location.service';
import { NoSpaceValidator } from 'src/app/validator/noSpace.validator';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-auto-delete-section-modal',
  templateUrl: './auto-delete-section-modal.component.html',
  styleUrls: ['./auto-delete-section-modal.component.css']
})
export class AutoDeleteSectionModalComponent {
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
    console.log(this.id);
    
    this.buildForm();
    this.changeDetectorRef.detectChanges();
  }

  constructor(public activeModal: NgbActiveModal, private formBuilder: FormBuilder, private locationService: LocationService, private changeDetectorRef: ChangeDetectorRef) {
    locationService.getAllFloors().subscribe((res: any) => {
      this.floors = res.content;
      this.floorSelected = res.content[0]?.floorNo;
    },
      (error) => {
        this.Toast.fire({
          icon: 'error', 
          title: 'There are no floors'
        })

      }
    )
  }
  get fc() {
    return this.form.controls;
  }
  deleteSection() {

    let floorNo = this.form.controls['floorNo'].value;
    this.section.floorNo = floorNo;
    let secName = this.form.controls['sectionName'].value;
    this.section.sectionId = this.id;
    this.section.sectionName = secName;
      this.locationService.addSectionAuto(this.section).subscribe((res) => {
        this.activeModal.close(true);
        this.Toast.fire({
          icon: 'success',
          title: "successfully deleted!"
        })
      },
        (error) => {
          this.isError = true
          this.error_msg = error;
        });

    
   
  }

  buildForm() {
    this.form = this.formBuilder.group({
      floorNo: ['', [Validators.required, Validators.min(0)]],
      sectionName: ['', [Validators.required,Validators.maxLength(16), NoSpaceValidator.noSpaceValidators]]
    });
  }
}
