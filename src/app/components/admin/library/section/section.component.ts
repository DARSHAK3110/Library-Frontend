import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { BookService } from 'src/app/service/book.service';
import { LocationService } from 'src/app/service/location.service';
import { ModalService } from 'src/app/service/modal.service';

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

  constructor(private _router:Router,private locationService: LocationService,private bookService:BookService, private modalService: ModalService) {
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
      (sectionDto: any) => {
        this.sections = sectionDto.content;
        this.dataSource = new MatTableDataSource(sectionDto.content);
        this.totalRows = sectionDto.totalElements;
      }, (error) => {
        console.log(error);
      }
    )
  }

  addEditSection(sectionId: number) {
    this.modalService.onAddEditSection(sectionId).pipe(take(1)).subscribe(result => {
        this.getSections();
    }, (error) => {
      console.log(error);
    })
  }
  deleteSection(sectionId: number,isAutomated:boolean) {
    this.bookService.checkOrphanBooksByLocation(sectionId,'section').pipe(take(1)).subscribe((res: any) => {
      let counter = Number(res.message);
      if (counter > 0) {
        if(isAutomated){
          this.modalService.autoDeleteSectionModal(sectionId).pipe(take(1)).subscribe((res: any) => {
            this.getSections();
          }, (error) => {
            console.log(error);
          })
        }
        else{
          this._router.navigate([`/admin/library/unlocated/section/${sectionId}`]);
        }
      } else {
        this.modalService.autoDeleteSectionModal(sectionId).pipe(take(1)).subscribe((res: any) => {
          this.getSections();
        }, (error) => {
          console.log(error);
        })
      }
    }, (error) => {
      console.log(error);
    })
  }
}
