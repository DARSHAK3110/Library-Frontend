import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Location } from 'src/app/model/location';
import { BookService } from 'src/app/service/book.service';
import { LocationService } from 'src/app/service/location.service';
import { NoSpaceValidator } from 'src/app/validator/noSpace.validator';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-auto-delete-location-modal',
  templateUrl: './auto-delete-location-modal.component.html',
  styleUrls: ['./auto-delete-location-modal.component.css']
})
export class AutoDeleteLocationModalComponent {
  id: any;
  isError!: boolean;
  floorSelected: any;
  sectionSelected: any;
  shelfSelected: any;
  floors: any;
  sections: any;
  shelfs: any;
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

  constructor(public activeModal: NgbActiveModal,private bookService:BookService, private formBuilder: FormBuilder, private locationService: LocationService, private changeDetectorRef: ChangeDetectorRef) {
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
    this.locationService.addLocationAuto(this.location).subscribe((res) => {
      this.activeModal.close(true);
      this.Toast.fire({
        icon: 'success',
        title: 'Successfully Deleted!'
      })
    },
      (error) => {
        this.isError = true
        this.error_msg = error
        this.changeDetectorRef.detectChanges();
      });
  }

  buildForm() {
    this.form = this.formBuilder.group({
      floorNo: ['', [Validators.required, Validators.min(0)]],
      sectionName: ['', [Validators.required, Validators.min(0)]],
      shelfNo: ['', [Validators.required, Validators.min(0)]],
      position:['', [Validators.required,Validators.maxLength(16),NoSpaceValidator.noSpaceValidators]]
    });
  }
  getFloorSelection(floorSelection: any) {
    if (floorSelection != 0) {
      this.locationService.getAllSections(floorSelection).subscribe((res: any) => {
        this.sections = res;

        this.sectionSelected = res[0]?.sectionId;
        this.getSectionSelection(this.sectionSelected);

      },
        (error) => {
          this.sectionSelected = 0;
          this.shelfSelected = 0;
          this.Toast.fire({
            icon: 'error',
            title: "This floor has no section"
          })
        }
      )
    }


  }

  getSectionSelection(sectionSelection: any) {
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
