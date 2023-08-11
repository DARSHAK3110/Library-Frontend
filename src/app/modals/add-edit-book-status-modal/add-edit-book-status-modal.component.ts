import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Book } from 'src/app/model/book';
import { BookStatus } from 'src/app/model/book-status';
import { Location } from 'src/app/model/location';
import { BookService } from 'src/app/service/book.service';
import { LocationService } from 'src/app/service/location.service';
import { NoSpaceValidator } from 'src/app/validator/noSpace.validator';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-edit-book-status-modal',
  templateUrl: './add-edit-book-status-modal.component.html',
  styleUrls: ['./add-edit-book-status-modal.component.css']
})
export class AddEditBookStatusModalComponent {
  id: any;
  isError!: boolean;
  floorSelected: any;
  sectionSelected: any;
  shelfSelected: any;
  positionSelected: any;
  floors: any;
  sections: any;
  bookHeader: Book = new Book();
  shelfs: any;
  positions: any;
  isAdd!: boolean;
  error_msg!: string;
  location: Location = new Location();
  bookStatus: BookStatus = new BookStatus();
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
  set bookStatusId(value: number) { 
    this.id = value;
    this.buildForm();
    this.changeDetectorRef.detectChanges();
  }

  set book(book: Book) {
    this.bookHeader = book;
  }

  constructor(public activeModal: NgbActiveModal, private formBuilder: FormBuilder, private bookService: BookService, private locationService: LocationService, private changeDetectorRef: ChangeDetectorRef) {
    locationService.getAllFloors().subscribe((res: any) => {
      this.floors = res.content;
      this.floorSelected = res.content[0].floorId;
      this.getSectionByFloor(this.floorSelected);
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
  savePosition() {
    let shelfNo = this.form.controls['shelfNo'].value;
    let position = this.form.controls['position'].value;
    this.bookStatus.bookStatusId = this.id;
    this.bookStatus.locationId = position;
    this.bookHeader.bookStatus = this.bookStatus;

    if (this.id != 0) {
      this.bookHeader.bookStatus.bookStatusId=this.bookStatus.bookStatusId;
    }
      this.bookService.updateBook(this.bookHeader, this.bookHeader.bookDetailsId).subscribe((res) => {
        this.activeModal.close(true);
      },
        (error) => {
          this.isError = true
         this.error_msg = error
        });

  }

  buildForm() {
    this.form = this.formBuilder.group({
      floorNo: ['', [Validators.required, Validators.min(-1)]],
      sectionName: ['', [Validators.required, Validators.min(-1)]],
      shelfNo: ['', [Validators.required, Validators.min(-1)]],
      position: ['', [Validators.required, NoSpaceValidator.noSpaceValidators]]
    });


    if (this.id > 0) {
      this.isAdd = false;
      this.bookService.getBookstatusesatus(this.id).subscribe((res: any) => {
       
        this.locationService.getLocation(res.locationId).subscribe((res: any) => {
        console.log(res);
        
        this.location = res;
        this.getSectionByFloor(this.location.floorId);
        
        this.form.patchValue({
          "floorNo": this.location.floorId,
          "sectionName": this.location.sectionId,
          "shelfNo": this.location.shelfNo,
          "position": this.location.locationId
        })
        
      },
      error=>console.log(error))
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
  getSectionByFloor(floorSelection: any) {
    if (floorSelection > 0) {
      this.locationService.getAllSections(floorSelection).subscribe((res: any) => {
        this.sections = res;
        this.sectionSelected = res[0]?.sectionId;
        this.getShelfBySection(this.sectionSelected);

      },
        (error) => {
          this.sectionSelected = 0;
          this.shelfSelected = 0;
          this.positionSelected = 0;
          this.Toast.fire({
            icon: 'error',
            title: 'This floor has no section'
          })
        }
      )
    }


  }

  getShelfBySection(sectionSelection: any) {
    if (sectionSelection != 0) {
      this.locationService.getAllShelfs(sectionSelection).subscribe((res: any) => {
        this.shelfs = res;
        this.shelfSelected = res[0]?.shelfId;
        this.getLocationByShelf(this.shelfSelected);

      },
        (error) => {
          this.shelfSelected = 0;
          this.positionSelected = 0;
          this.Toast.fire({
            icon: 'error',
            title: "This section has no shelf"
          })

        }
      )
    }


  }

  getLocationByShelf(shelfSelection: number) {
    if (shelfSelection != 0) {
      this.locationService.getAllPositions(shelfSelection).subscribe((res: any) => {
        this.positions = res;
        this.positionSelected = this.location.locationId;
      },
        (error) => {
          this.Toast.fire({
            icon: 'error',
            title: "This shelf has no location"
          })

        }
      )
    }
  }
}
