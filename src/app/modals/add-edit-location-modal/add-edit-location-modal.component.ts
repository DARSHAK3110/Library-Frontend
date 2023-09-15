import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Location } from 'src/app/model/location';
import { LocationService } from 'src/app/service/location.service';
import { NoSpaceValidator } from 'src/app/validator/noSpace.validator';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-edit-location-modal',
  templateUrl: './add-edit-location-modal.component.html',
  styleUrls: ['./add-edit-location-modal.component.css']
})
export class AddEditLocationModalComponent {
  id: any;
  isError!: boolean;
  floorSelected: any;
  sectionSelected: any;
  shelfSelected: any;
  floors: any;
  sections: any;
  shelfs:any;
  isAdd!: boolean;
  error_msg!: string;
  location: Location = new Location();
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
  });
  set locationId(value: number) {
    this.id = value;
    this.buildForm();
    this.changeDetectorRef.detectChanges();
  }

  constructor(public activeModal: NgbActiveModal, private formBuilder: FormBuilder, private locationService: LocationService, private changeDetectorRef: ChangeDetectorRef) {
    locationService.getAllFloors().subscribe((res: any) => {
      this.floors = res.content;
      this.floorSelected = res.content[0].floorId;
      this.getFloorSelection(this.floorSelected);
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
  savePosition() {
    let shelfNo = this.form.controls['shelfNo'].value;
    let position = this.form.controls['position'].value;
    this.location.locationId = this.id;
    this.location.position = position;
    this.location.shelfId = shelfNo;
    if (this.id === 0) {
      this.locationService.addLocation(this.location).subscribe((res) => {
        this.activeModal.close(true);
        this.Toast.fire({
          icon: 'success',
          title: 'Successfully Added!'
        })
      },
        (error) => {
          this.isError = true
          this.error_msg = error
          this.changeDetectorRef.detectChanges();
        });

    }
    else {
      this.locationService.updateLocation(this.location, this.id).subscribe((res) => {
        this.activeModal.close(true);
        this.Toast.fire({
          icon: 'success',
          title: 'Successfully Updated!'
        })
      },
        (error) => {
          this.isError = true
          this.error_msg = error
          this.changeDetectorRef.detectChanges();
        });

    }



  }

  buildForm() {
    this.form = this.formBuilder.group({
      floorNo: ['', [Validators.required, Validators.min(0)]],
      sectionName: ['', [Validators.required, Validators.min(0)]],
      shelfNo: ['', [Validators.required, Validators.min(0)]],
      position:['', [Validators.required,Validators.maxLength(16),NoSpaceValidator.noSpaceValidators]]
    });


    if (this.id != 0) {
      this.isAdd = false;
      this.locationService.getLocation(this.id).subscribe((res: any) => {
        this.id = res.locationId;
        this.location = res;
        this.getFloorSelection(this.location.floorId);
       
        
        this.form.patchValue({
          "floorNo": this.location.floorId,
          "sectionName": this.location.sectionId,
          "shelfNo": this.location.shelfNo,
          "position":this.location.position
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
  getFloorSelection(floorSelection:any) {
    if (floorSelection != 0) {
      this.locationService.getAllSections(floorSelection).subscribe((res: any) => {
        this.sections = res;
        this.sectionSelected = res[0]?.sectionId;
        this.getSectionSelection(this.sectionSelected);
        
      },
        (error) => {
          this.sectionSelected =0;
          this.shelfSelected = 0;
          this.Toast.fire({
            icon: 'error',
            title: "This floor has no section"
          })
        }
      )
    }


  }

  getSectionSelection(sectionSelection:any) {
    if (sectionSelection != 0) {
      this.locationService.getAllShelfs(sectionSelection).subscribe((res: any) => {
        this.shelfs = res;
        this.shelfSelected = res[0]?.shelfId;
         
      },
        (error) => {
          this.shelfSelected = 0;
          this.Toast.fire({
            icon: 'error',
            title: "This section has no shelf"
          })
        }
      )
    }


  }

}
