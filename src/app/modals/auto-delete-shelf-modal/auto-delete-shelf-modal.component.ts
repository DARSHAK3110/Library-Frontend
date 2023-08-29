import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Shelf } from 'src/app/model/shelf';
import { LocationService } from 'src/app/service/location.service';
import { NoSpaceValidator } from 'src/app/validator/noSpace.validator';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-auto-delete-shelf-modal',
  templateUrl: './auto-delete-shelf-modal.component.html',
  styleUrls: ['./auto-delete-shelf-modal.component.css']
})
export class AutoDeleteShelfModalComponent {

  id: any;
  isError!: boolean;
  floorSelected: any;
  sectionSelected: any;
  floors: any;
  sections: any;
  isAdd!: boolean;
  error_msg!: string;

  shelf: Shelf = new Shelf();
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
  set shelfId(value: number) {
    this.id = value;
    this.buildForm();
    this.changeDetectorRef.detectChanges();
  }

  constructor(public activeModal: NgbActiveModal, private formBuilder: FormBuilder, private locationService: LocationService, private changeDetectorRef: ChangeDetectorRef) {
    locationService.getAllFloors().subscribe((res: any) => {
      this.floors = res.content;
      this.floorSelected = res.content[0].floorId;
      this.getSelection(this.floorSelected);
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
  deleteShelf() {
    let floorNo = this.form.controls['floorNo'].value;
    let sectionId = this.form.controls['sectionName'].value;
    this.shelf.shelfId = this.id;
    this.shelf.sectionId = sectionId;
    let shelfNo = this.form.controls['shelfNo'].value;
    this.shelf.shelfNo=shelfNo;
      this.locationService.addShelfAuto(this.shelf).subscribe((res) => {
        this.activeModal.close(true);
        this.Toast.fire({
          icon: 'success',
          title: 'Successfully Deleted!'
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
      sectionName: ['', [Validators.required, Validators.min(0)]],
      shelfNo: ['', [Validators.required, Validators.min(0)]]
    });
  }
  getSelection(floorSelection:any) {
    if (floorSelection != 0) {
      this.locationService.getAllSections(floorSelection).subscribe((res: any) => {
        this.sections = res;
        this.sectionSelected = res[0]?.sectionId; 
      },
        (error) => {
          this.sectionSelected = 0;
          this.Toast.fire({
            icon: 'error',
            title: "This floor has no section"
          })
        }
      )
    }
  }
}
