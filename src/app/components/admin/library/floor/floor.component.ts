import { Component, Input, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
<<<<<<< HEAD
import { MatTableDataSource } from '@angular/material/table';
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
  selector: 'app-floor',
  templateUrl: './floor.component.html',
  styleUrls: ['./floor.component.css']
})
export class FloorComponent {

<<<<<<< HEAD
  displayedColumns: string[] = ['index','floorNo','actions'];
  floors: any;
  dataSource:any;
=======
  displayedColumns: string[] = ['Floor Number'];
  floors: any;

 
  
>>>>>>> f3fada5b62d9fa1a028be3efc3a59e35705b164d
  search: string = "";
  deleteUserResult: boolean = true;
  
  floorId!: number;
  operationStatus!: boolean;
  isLoading = false;
  totalRows = 0;
  pageSize = 2;
  currentPage = 0;
  pageSizeOptions: number[] = [2, 5, 10];

<<<<<<< HEAD
  constructor(private _router: Router,private locationService: LocationService,private bookService:BookService, private modalService: ModalService) {
    this.getFloors();
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

    this.getFloors()

>>>>>>> f3fada5b62d9fa1a028be3efc3a59e35705b164d
  }
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

<<<<<<< HEAD
=======


>>>>>>> f3fada5b62d9fa1a028be3efc3a59e35705b164d
  pageChanged(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    this.getFloors();
  }

  getFloors() {
    this.locationService.getFloors(this.currentPage, this.pageSize, this.search).subscribe(
<<<<<<< HEAD
      (floorDto: any) => {
        this.dataSource = new MatTableDataSource(floorDto.content);
        this.floors = floorDto.content;
        this.totalRows = floorDto.totalElements;
      }, (error) => {
        console.log(error);
=======
      (locationDto: any) => {
        
        this.floors = locationDto.content;
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
  addEditFloor(floorId: number) {
    this.modalService.onAddEditFloor(floorId).pipe(take(1)).subscribe(result => {
      this.getFloors();
    }, (error)=>{
        console.log(error);
    });
  }

  deleteFloor(floorId: number) {
    this.bookService.checkOrphanBooksByLocation(floorId,'floor').pipe(take(1)).subscribe((res: any) => {
      let counter = Number(res.message);
      console.log(counter);
      
      if (counter > 0) {
        this._router.navigate([`/admin/library/unlocated/floor/${floorId}`]);
      } else {
        this.modalService.deleteLocationModal(floorId,'floor').pipe(take(1)).subscribe((res: any) => {
          this.getFloors();
        }, (error) => {
          console.log(error);
        })
      }
  
    }, (error) => {
      console.log(error);
    })
  }
}
=======



  addEditFloor(floorId: number) {

    this.modalService.onAddEditFloor(floorId).pipe(take(1)).subscribe(result => {

      if (result === true) {
        this.getFloors();
        if (floorId == 0) {
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

}
>>>>>>> f3fada5b62d9fa1a028be3efc3a59e35705b164d
