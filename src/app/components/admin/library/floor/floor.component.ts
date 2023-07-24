import { Component, Input, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { take } from 'rxjs';
import { LocationService } from 'src/app/service/location.service';
import { ModalService } from 'src/app/service/modal.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-floor',
  templateUrl: './floor.component.html',
  styleUrls: ['./floor.component.css']
})
export class FloorComponent {

  displayedColumns: string[] = ['Floor Number'];
  floors: any;

 
  
  search: string = "";
  deleteUserResult: boolean = true;
  
  floorId!: number;
  operationStatus!: boolean;
  isLoading = false;
  totalRows = 0;
  pageSize = 2;
  currentPage = 0;
  pageSizeOptions: number[] = [2, 5, 10];

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

  }
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;



  pageChanged(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    this.getFloors();
  }

  getFloors() {
    this.locationService.getFloors(this.currentPage, this.pageSize, this.search).subscribe(
      (locationDto: any) => {
        
        this.floors = locationDto.content;
        this.totalRows = locationDto.totalElements;
      }, (error) => {

        this.Toast.fire({
          icon: 'error',
          title: 'Something went wrong!!'
        });
      }
    )
  }




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
