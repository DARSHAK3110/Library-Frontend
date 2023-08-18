import { Component, ViewChild } from '@angular/core';
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

<<<<<<< HEAD

  constructor(private _router: Router,private locationService: LocationService,private bookService:BookService, private modalService: ModalService) {
=======
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
  constructor(private locationService: LocationService, private modalService: ModalService) {
>>>>>>> f3fada5b62d9fa1a028be3efc3a59e35705b164d
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
<<<<<<< HEAD
        console.log(error);

=======
        this.Toast.fire({
          icon: 'error',
          title: 'Something went wrong!!'
        });
>>>>>>> f3fada5b62d9fa1a028be3efc3a59e35705b164d
      }
    )
  }

  addEditShelf(shelfId: number) {
    this.modalService.onAddEditShelf(shelfId).pipe(take(1)).subscribe(result => {
<<<<<<< HEAD
      this.getShelfs();
    }, (error) => {
      console.log(error);
    })
  }

  deleteShelf(shelfId: number) {
    this.bookService.checkOrphanBooksByLocation(shelfId,'shelf').pipe(take(1)).subscribe((res: any) => {
      let counter = Number(res.message);
      if (counter > 0) {
        this._router.navigate([`/admin/library/unlocated/shelf/${shelfId}`]);
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
=======

      if (result === true) {
        this.getShelfs();
        if (shelfId == 0) {
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

