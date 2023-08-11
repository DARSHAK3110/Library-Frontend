import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs';
import { Book } from 'src/app/model/book';
import { BookService } from 'src/app/service/book.service';
import { LocationService } from 'src/app/service/location.service';
import { ModalService } from 'src/app/service/modal.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-book-in-detailed',
  templateUrl: './book-in-detailed.component.html',
  styleUrls: ['./book-in-detailed.component.css']
})
export class BookInDetailedComponent {
  displayedColumns: string[] = ['index', 'floorNo', 'sectionName', 'shelfNo', 'position', 'isAvailable', 'actions'];
  bookStatuses: any;
  file: any;
  fileName: any;
  dataSource: any;
  book: Book = new Book();
  filter: any = "0";
  search: string = "";
  deleteUserResult: boolean = true;
  bookId: any;
  bookStatusId!: number;
  operationStatus!: boolean;
  isLoading = false;
  totalRows = 0;
  pageSize = 2;
  currentPage = 0;
  pageSizeOptions: number[] = [2, 5, 10];
  private _mobileQueryListener: (() => void);
  mobileQuery: MediaQueryList;


  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
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
  setfileName(event: any) {
    if (event.target.files.length > 0) {
      this.fileName = event.target.files[0].name;
      this.file = event.target.files[0];
    }
  }
  ngOnInit(): void {
    this.bookId = this.route.snapshot.paramMap.get('id');
    this.getBook(this.bookId);
    this.getBookStatuses(this.bookId);
  }
  constructor(private route: ActivatedRoute, private bookService: BookService, changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, private modalService: ModalService) {

    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);

  }
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  pageChanged(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    this.getBookStatuses(this.bookId);
  }

  getBook(bookId: number) {
    this.bookService.getBook(bookId).subscribe((res: any) => {
      this.book = res;

    },
      (error) => {
        console.log(error);

      });
  }
  getBookStatuses(bookId: number) {
    this.bookService.getBookStatuses(this.currentPage, this.pageSize, this.search, bookId, Number(this.filter)).subscribe(
      (bookDto: any) => {
        this.bookStatuses = bookDto.content;
        this.dataSource = new MatTableDataSource(bookDto.content);
        this.totalRows = bookDto.totalElements;
      }, (error) => {
        console.log(error);

      }
    )
  }

  addEditBookStatus(bookStatusId: number) {
    this.modalService.onAddEditBookStatus(bookStatusId, this.book).pipe(take(1)).subscribe(result => {

      this.getBookStatuses(this.bookId);
    }, (error) => {
      console.log(error);

    })

  }

  checkIn(bookStatusId: number) {

    this.modalService.chechIn(bookStatusId).subscribe((res) => {
      this.getBookStatuses(this.bookId);
    },
      (error) => {
        console.log(error);
      }
    )
  }
  checkOut(bookStatusId: number,) {
    this.modalService.chechOut(bookStatusId).subscribe((res) => {
      this.getBookStatuses(this.bookId);
    },
      (error) => {
        console.log(error);
      }
    )
  }
  filterChange(event: any) {
    console.log(event.value);
    this.filter = event.value;
    this.getBookStatuses(this.bookId);
  }

  submitFile() {
    this.bookService.sendFile(this.file,this.book.isbn).subscribe(
      (res:any)=>{
        this.getBookStatuses(this.bookId);
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
  deleteBookStatus(bookStatusId: any){
    this.modalService.deleteBookStatus(bookStatusId).subscribe((res:any)=>{
      this.getBookStatuses(this.bookId);
    },
    (error)=>{
      this.Toast.fire({
        icon: 'error',
        title: error
      })
    })
  }
 
}
