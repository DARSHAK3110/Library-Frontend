import { Component, Input, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { map } from 'rxjs';
import { DataService } from 'src/app/service/data.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent {

  file: any;
  fileName: any;
  selectedField: string = "author";

  totalRows = 0;
  pageSize = 2;
  currentPage = 0;
  finalField!: string;
  uploadId!: number;

  pageChanged(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    this.getData();
  }
  @Input() Toast: any;
  displayedColumns: string[] = [];
  dataSource: any;
  isDataAvail = false;
  mapArray: Map < String, Object > [] = [];
  columnMapper: {[key: string]: string[]} = {"author":["authorName"],
    "book":["title","publicationDate", "isbn","authorId"],
    "genre":["genreName"],
    "member":["name","email","phone"],
    "reservation":["bookId","reservationDate","memberId"],
    "borrowing":["bookId","borrowingDate","dueDate","returnDate","memberId"],
    "librarian":["name","email","phone"]
};
  constructor(private dataService: DataService) {
  }
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  setfileName(event: any) {
    if (event.target.files.length > 0) {
      this.fileName = event.target.files[0].name;
      this.file = event.target.files[0];
    }
  }
  submitFile() {
    this.displayedColumns = this.columnMapper[this.selectedField];
    this.finalField = this.selectedField;
    this.dataService.sendFile(this.file,this.selectedField).subscribe(
      (res:any)=>{
           this.isDataAvail=true;
            this.mapArray =  res.result.data;
            this.uploadId = res.result.uploadId;
            this.totalRows = res.result.insertedRows;
            this.dataSource = new MatTableDataSource(this.mapArray);
            this.Toast.fire({
              icon: 'success',
              title: 'Successfully Added!'
            })
          
        },
        (error)=>{
          console.log(error);
          
         this.Toast.fire({
            icon: 'error',
            title: error
          })
        }
      )
  }

  getData(){
    this.dataService.fetchData(this.finalField, this.pageSize,this.currentPage,this.uploadId).subscribe(
      (res:any)=>{
        this.isDataAvail=true;
        this.mapArray =  res.result.data.content;
        this.uploadId = res.result.uploadId;
        this.totalRows = res.result.data.totalElements;
        this.dataSource = new MatTableDataSource(this.mapArray);
      
    },
    (error)=>{
      this.Toast.fire({
        icon: 'error',
        title: error
      })
      }
    );
  }
}
