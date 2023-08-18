import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
<<<<<<< HEAD
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { BookService } from 'src/app/service/book.service';
import { LocationService } from 'src/app/service/location.service';
import { ModalService } from 'src/app/service/modal.service';
=======
import { take } from 'rxjs';
import { LocationService } from 'src/app/service/location.service';
import { ModalService } from 'src/app/service/modal.service';
import Swal from 'sweetalert2';
>>>>>>> f3fada5b62d9fa1a028be3efc3a59e35705b164d

@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.css']
})
export class SectionComponent {
  displayedColumns: string[] = ['index','floorNo','sectionName','actions'];
  sections: any;
  dataSource: any;
 
<<<<<<< HEAD
=======
  
>>>>>>> f3fada5b62d9fa1a028be3efc3a59e35705b164d
  search: string = "";
  deleteUserResult: boolean = true;
  
  sectionId!: number;
  operationStatus!: boolean;
  isLoading = false;
  totalRows = 0;
  pageSize = 2;
  currentPage = 0;
  pageSizeOptions: number[] = [2, 5, 10];

<<<<<<< HEAD
  constructor(private _router:Router,private locationService: LocationService,private bookService:BookService, private modalService: ModalService) {
=======
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
  constructor(private locationService: LocationService, private modalService: ModalService) {
>>>>>>> f3fada5b62d9fa1a028be3efc3a59e35705b164d
    this.getSections();
  }
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  pageChanged(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    this.getSections();
  }

  getSections() {
    this.locationService.getSections(this.currentPage, this.pageSize, this.search).subscribe(
<<<<<<< HEAD
      (sectionDto: any) => {
        this.sections = sectionDto.content;
        this.dataSource = new MatTableDataSource(sectionDto.content);
        this.totalRows = sectionDto.totalElements;
      }, (error) => {
        console.log(error);
=======
      (locationDto: any) => {
        
        this.sections = locationDto.content;
        this.dataSource = new MatTableDataSource(locationDto.content);
        this.totalRows = locationDto.totalElements;
      }, (error) => {

        this.Toast.fire({
          icon: 'error',
          title: 'Something went wrong!!'
        });
>>>>>>> f3fada5b62d9fa1a028be3efc3a59e35705b164d
      }
    )
  }

<<<<<<< HEAD
  addEditSection(sectionId: number) {
    this.modalService.onAddEditSection(sectionId).pipe(take(1)).subscribe(result => {
        this.getSections();
    }, (error) => {
      console.log(error);
    })
  }
  deleteSection(sectionId: number) {
    this.bookService.checkOrphanBooksByLocation(sectionId,'section').pipe(take(1)).subscribe((res: any) => {
      let counter = Number(res.message);
      if (counter > 0) {
        
        this._router.navigate([`/admin/library/unlocated/section/${sectionId}`]);
      } else {
        this.modalService.deleteLocationModal(sectionId,'section').pipe(take(1)).subscribe((res: any) => {
          this.getSections();
        }, (error) => {
          console.log(error);
        })
      }
    }, (error) => {
      console.log(error);
    })
  }
=======



  addEditSection(sectionId: number) {

    this.modalService.onAddEditSection(sectionId).pipe(take(1)).subscribe(result => {

      if (result === true) {
        this.getSections();
        if (sectionId == 0) {
          this.Toast.fire({
            icon: 'success',
            title: 'Successfully Added!'
          })
        }
        else {
          this.Toast.fire({
            icon: 'success',
            title: 'Successfully updated!'
          })
        }
      }


    }, (error) => {
    
      this.Toast.fire({
        icon: 'error',
        title: 'something went wrong'
      })
    })

  }


>>>>>>> f3fada5b62d9fa1a028be3efc3a59e35705b164d
}
