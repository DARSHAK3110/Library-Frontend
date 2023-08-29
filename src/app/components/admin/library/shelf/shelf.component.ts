import { Component, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { BookService } from 'src/app/service/book.service';
import { LocationService } from 'src/app/service/location.service';
import { ModalService } from 'src/app/service/modal.service';

@Component({
  selector: 'app-shelf',
  templateUrl: './shelf.component.html',
  styleUrls: ['./shelf.component.css']
})
export class ShelfComponent {

  displayedColumns: string[] = ['index', 'floorNo', 'sectionName', 'shelfNo', 'actions'];
  shelfs: any;
  dataSource: any;


  search: string = "";
  deleteUserResult: boolean = true;

  shelfId!: number;
  operationStatus!: boolean;
  isLoading = false;
  totalRows = 0;
  pageSize = 2;
  currentPage = 0;
  pageSizeOptions: number[] = [2, 5, 10];


  constructor(private _router: Router,private locationService: LocationService,private bookService:BookService, private modalService: ModalService) {
    this.getShelfs();
  }
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  pageChanged(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    this.getShelfs();
  }

  getShelfs() {
    this.locationService.getShelfs(this.currentPage, this.pageSize, this.search).subscribe(
      (locationDto: any) => {
        this.shelfs = locationDto.content;
        this.dataSource = new MatTableDataSource(locationDto.content);
        this.totalRows = locationDto.totalElements;
      }, (error) => {
        console.log(error);

      }
    )
  }

  addEditShelf(shelfId: number) {
    this.modalService.onAddEditShelf(shelfId).pipe(take(1)).subscribe(result => {
      this.getShelfs();
    }, (error) => {
      console.log(error);
    })
  }

  deleteShelf(shelfId: number, isAutomated:boolean) {
    this.bookService.checkOrphanBooksByLocation(shelfId,'shelf').pipe(take(1)).subscribe((res: any) => {
      let counter = Number(res.message);
      if (counter > 0) {
        if(isAutomated){
          this.modalService.autoDeleteShelfModal(shelfId).pipe(take(1)).subscribe((res: any) => {
            this.getShelfs();
          }, (error) => {
            console.log(error);
          })
        }
        else{
          this._router.navigate([`/admin/library/unlocated/shelf/${shelfId}`]);    
        }
       
      } else {
        this.modalService.deleteLocationModal(shelfId,'shelf').pipe(take(1)).subscribe((res: any) => {
          this.getShelfs();
        }, (error) => {
          console.log(error);
        })
      }

    }, (error) => {
      console.log(error);
    })
  }
}

