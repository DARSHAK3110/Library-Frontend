import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Shelf } from 'src/app/model/shelf';
import { LocationService } from 'src/app/service/location.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-edit-shelf',
  templateUrl: './add-edit-shelf.component.html',
  styleUrls: ['./add-edit-shelf.component.css']
})
export class AddEditShelfComponent {

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
  saveShelf() {
    let floorNo = this.form.controls['floorNo'].value;
    let sectionId = this.form.controls['sectionName'].value;
    let shelfNo = this.form.controls['shelfNo'].value;
    this.shelf.shelfId = this.id;
    this.shelf.sectionId = sectionId;
    this.shelf.shelfNo = shelfNo;
    if (this.id === 0) {
      this.locationService.addShelf(this.shelf).subscribe((res) => {
        this.activeModal.close(true);
        this.Toast.fire({
          icon: 'success',
          title: "successfully added!"
        })
      },
        (error) => {
          this.isError = true
          this.error_msg = error;
          this.changeDetectorRef.detectChanges();
        });
    }
    else {
      this.locationService.updateShelf(this.shelf, this.id).subscribe((res) => {
        this.activeModal.close(true);
        this.Toast.fire({
          icon: 'success',
          title: "successfully updated!"
        })
      },
        (error) => {
          this.isError = true
          this.error_msg = error;
          this.changeDetectorRef.detectChanges();
        });
    }
  }

  buildForm() {
    this.form = this.formBuilder.group({
      floorNo: ['', [Validators.required, Validators.min(0)]],
      sectionName: ['', [Validators.required, Validators.min(0)]],
      shelfNo: ['', [Validators.required, Validators.min(0)]]
    });

    if (this.id > 0) {
      this.isAdd = false;
      this.locationService.getShelf(this.id).subscribe((res: any) => {
        this.id = res.shelfId;
        this.shelf = res;
        this.getSelection(this.shelf.floorId);
        this.form.patchValue({
          "floorNo": this.shelf.floorId,
          "sectionName": this.shelf.sectionId,
          "shelfNo": this.shelf.shelfNo
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

