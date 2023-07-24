import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { take } from 'rxjs';
import { LocationService } from 'src/app/service/location.service';
import { ModalService } from 'src/app/service/modal.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.css']
})
export class SectionComponent {
  displayedColumns: string[] = ['index','floorNo','sectionName','actions'];
  sections: any;
  dataSource: any;
 
  
  search: string = "";
  deleteUserResult: boolean = true;
  
  sectionId!: number;
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
      (locationDto: any) => {
        
        this.sections = locationDto.content;
        this.dataSource = new MatTableDataSource(locationDto.content);
        this.totalRows = locationDto.totalElements;
      }, (error) => {

        this.Toast.fire({
          icon: 'error',
          title: 'Something went wrong!!'
        });
      }
    )
  }




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


}
