import { Component, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { BookService } from 'src/app/service/book.service';
import { LocationService } from 'src/app/service/location.service';
import { ModalService } from 'src/app/service/modal.service';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css']
})
export class LocationComponent {
  displayedColumns: string[] = ['index', 'floorNo', 'sectionName', 'shelfNo', 'position', 'actions'];
  locations: any;
  dataSource: any;

  search: string = "";
  deleteUserResult: boolean = true;

  locationId!: number;
  operationStatus!: boolean;
  isLoading = false;
  totalRows = 0;
  pageSize = 2;
  currentPage = 0;
  pageSizeOptions: number[] = [2, 5, 10];

  constructor(private _router: Router,private locationService: LocationService, private bookService: BookService, private modalService: ModalService) {
    this.getLocations();
  }
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  pageChanged(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    this.getLocations();
  }

  getLocations() {
    this.locationService.getLocations(this.currentPage, this.pageSize, this.search).subscribe(
      (locationDto: any) => {
        this.locations = locationDto.content;
        this.dataSource = new MatTableDataSource(locationDto.content);
        this.totalRows = locationDto.totalElements;
      }, (error) => {
        console.log(error);
      }
    )
  }

  addEditLocation(locationId: number) {
    this.modalService.onAddEditLocation(locationId).pipe(take(1)).subscribe(result => {
      this.getLocations();
    }, (error) => {
      console.log(error);
    })

  }
  deleteLocation(locationId: number) {
    this.bookService.checkOrphanBooksByLocation(locationId,'location').pipe(take(1)).subscribe((res: any) => {
      let counter = Number(res.message);
      if (counter > 0) {
        this._router.navigate([`/admin/library/unlocated/location/${locationId}`]);
      } else {
        this.modalService.deleteLocationModal(locationId,'location').pipe(take(1)).subscribe((res: any) => {
          this.getLocations();
        }, (error) => {
          console.log(error);
        })
      }

    }, (error) => {
      console.log(error);
    })
  }
}
