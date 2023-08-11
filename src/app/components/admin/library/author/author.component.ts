import { Component, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { take } from 'rxjs';
import { LocationService } from 'src/app/service/location.service';
import { ModalService } from 'src/app/service/modal.service';
@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.css']
})
export class AuthorComponent {

  displayedColumns: string[] = ['index', 'authorName', 'dob', 'actions'];
  authors: any;
  dataSource: any;

  search: string = "";
  deleteUserResult: boolean = true;

  authorId!: number;
  operationStatus!: boolean;
  isLoading = false;
  totalRows = 0;
  pageSize = 2;
  currentPage = 0;
  pageSizeOptions: number[] = [2, 5, 10];

  constructor(private locationService: LocationService, private modalService: ModalService) {
    this.getAuthors()
  }
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  pageChanged(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    this.getAuthors();
  }

  getAuthors() {
    this.locationService.getAuthors(this.currentPage, this.pageSize, this.search).subscribe(
      (locationDto: any) => {
        this.dataSource = new MatTableDataSource(locationDto.content);
        this.authors = locationDto.content;
        this.totalRows = locationDto.totalElements;
      }, (error) => {
        console.log(error);
      }
    )
  }

  addEditAuthor(authorId: number) {
    this.modalService.onAddEditAuthor(authorId).pipe(take(1)).subscribe(result => {
      this.getAuthors();
    }, (error) => {
      console.log(error);
    })

  }

  deleteAuthor(authorId: number) {
    this.modalService.onDeleteAuthor(authorId).pipe(take(1)).subscribe(result => {
      this.getAuthors();
    }, (error) => {
      console.log(error);
    })
  }

}
