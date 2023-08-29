import { Component, Input, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { BookService } from 'src/app/service/book.service';
import { LocationService } from 'src/app/service/location.service';
import { ModalService } from 'src/app/service/modal.service';

@Component({
  selector: 'app-floor',
  templateUrl: './floor.component.html',
  styleUrls: ['./floor.component.css']
})
export class FloorComponent {

  displayedColumns: string[] = ['index','floorNo','actions'];
  floors: any;
  dataSource:any;
  search: string = "";
  deleteUserResult: boolean = true;
  
  floorId!: number;
  operationStatus!: boolean;
  isLoading = false;
  totalRows = 0;
  pageSize = 2;
  currentPage = 0;
  pageSizeOptions: number[] = [2, 5, 10];

  constructor(private _router: Router,private locationService: LocationService,private bookService:BookService, private modalService: ModalService) {
    this.getFloors();
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
      (floorDto: any) => {
        this.dataSource = new MatTableDataSource(floorDto.content);
        this.floors = floorDto.content;
        this.totalRows = floorDto.totalElements;
      }, (error) => {
        console.log(error);
      }
    )
  }

  addEditFloor(floorId: number) {
    this.modalService.onAddEditFloor(floorId).pipe(take(1)).subscribe(result => {
      this.getFloors();
    }, (error)=>{
        console.log(error);
    });
  }

  deleteFloor(floorId: number, isAutomated:boolean) {
    this.bookService.checkOrphanBooksByLocation(floorId,'floor').pipe(take(1)).subscribe((res: any) => {
      let counter = Number(res.message);
      console.log(counter);
      
      if (counter > 0) {
        if(isAutomated){
          this.modalService.autoDeleteFloorModal(floorId).pipe(take(1)).subscribe((res: any) => {
            this.getFloors();
          }, (error) => {
            console.log(error);
          })
        }
        else{
          this._router.navigate([`/admin/library/unlocated/floor/${floorId}`]);
        }
        
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
