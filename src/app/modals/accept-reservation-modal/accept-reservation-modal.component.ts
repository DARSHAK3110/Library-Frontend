import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { BookService } from 'src/app/service/book.service';
import Swal from 'sweetalert2';
import { take } from 'rxjs';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { MediaMatcher } from '@angular/cdk/layout';
import { ModalService } from 'src/app/service/modal.service';
import { UserService } from 'src/app/service/user.service';
@Component({
  selector: 'app-accept-reservation-modal',
  templateUrl: './accept-reservation-modal.component.html',
  styleUrls: ['./accept-reservation-modal.component.css']
})
export class AcceptReservationModalComponent {
  displayedColumns: string[] = ['index', 'floorNo', 'sectionName', 'shelfNo', 'position', 'actions'];
  bookStatuses: any;
  dataSource: any;
  id: any;
  isError!: boolean;
  isAdd!: boolean;
  error_msg!: string;
  form: any;
  operationStatus!: boolean;
  isLoading = false;
  totalRows = 0;
  pageSize = 2;
  isbn: any;
  currentPage = 0;
  pageSizeOptions: number[] = [2, 5, 10];
  private _mobileQueryListener: (() => void);
  mobileQuery: MediaQueryList;
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
  set reservationId(value: number) {
    this.id = value;
    this.changeDetectorRef.detectChanges();
  }

  set isbnNo(value: number) {
    console.log(value + "ad");

    this.isbn = value;
    this.getBookStatuses(this.isbn);
    this.changeDetectorRef.detectChanges();
  }
  constructor(private userService:UserService,private route: ActivatedRoute, media: MediaMatcher, private modalService: ModalService, public activeModal: NgbActiveModal, private changeDetectorRef: ChangeDetectorRef, private bookService: BookService) {
    this.mobileQuery = media.matchMedia('(max-width: 1000px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);

  }


  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }


  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  pageChanged(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    this.getBookStatuses(this.isbn);
  }

  getBookStatuses(isbn: number) {
    this.bookService.getBookStatusesByIsbn(this.currentPage, this.pageSize, "", isbn, Number(0)).subscribe(
      (bookDto: any) => {
        this.bookStatuses = bookDto.content;
        this.dataSource = new MatTableDataSource(bookDto.content);
        this.totalRows = bookDto.totalElements;
      }, (error) => {
        console.log(error);

      }
    )
  }

  reserveBookStatus(bookStatusId: number) {

      this.bookService.acceptReservation(this.id,bookStatusId).subscribe((res:any) => {
        this.userService.getUser(Number(res.message)).subscribe((res:any)=>{
          this.bookService.sendMail(this.id,res.email,true).subscribe((res:any)=>{
          })
        })
        this.activeModal.close(true);
        this.Toast.fire({
          icon: 'success',
          title: 'Successfully accepted request!!'
        })
      },
        (error) => {
          this.isError = true
          this.error_msg = error
          this.activeModal.close(true);
          this.Toast.fire({
            icon: 'error',
            title: 'Something went wrong !!'
          })
        });
      }

}
