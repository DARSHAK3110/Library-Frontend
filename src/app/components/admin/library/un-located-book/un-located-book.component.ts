import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs';
import { BookService } from 'src/app/service/book.service';
import { ModalService } from 'src/app/service/modal.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-un-located-book',
  templateUrl: './un-located-book.component.html',
  styleUrls: ['./un-located-book.component.css']
})
export class UnLocatedBookComponent {
  displayedColumns: string[] = ['index', 'isbn', 'floorNo', 'sectionName', 'shelfNo', 'position', 'actions'];
  bookStatuses: any;
  id: any;
  dataSource: any;
  filter: any = "0";
  search: string = "";
  operationStatus!: boolean;
  isLoading = false;
  totalRows = 0;
  pageSize = 2;
  currentPage = 0;
  page: any;
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

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.page = this.route.snapshot.paramMap.get('page');
    this.getBookStatuses(this.id);
  }
  constructor(private _router: Router, private route: ActivatedRoute, private bookService: BookService, changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, private modalService: ModalService) {

    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);

  }
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  pageChanged(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    this.getBookStatuses(this.id);
  }


  getBookStatuses(bookId: number) {

    this.bookService.getBookStatusesByLocations(this.currentPage, this.pageSize, this.id, this.page).subscribe(
      (bookDto: any) => {
        this.bookStatuses = bookDto.content;
        this.dataSource = new MatTableDataSource(bookDto.content);
        this.totalRows = bookDto.totalElements;
      }, (error) => {
        console.log(error);
      }
    )
  }

  editBookLocation(bookStatusId: number) {
    this.modalService.onChangeBookStatus(bookStatusId).pipe(take(1)).subscribe(result => {
      this.bookService.checkOrphanBooksByLocation(this.id, this.page).pipe(take(1)).subscribe((res: any) => {
        let counter = Number(res.message);
        if (counter > 0) {
          console.log('floor'+this.id);
          
          this.getBookStatuses(this.id);
        }
        else {
          this.modalService.deleteLocationModal(this.id, this.page).pipe(take(1)).subscribe((res: any) => {
            if (this.page === 'location') {
              this._router.navigate([`/admin/library/location`]);
            }
            else if (this.page === 'shelf') {
              this._router.navigate([`/admin/library/shelf`]);
            }
            else if (this.page === 'section') {
              this._router.navigate([`/admin/library/section`]);
            }
            else {
              console.log('floor');
              
              this._router.navigate([`/admin/library/floor`]);
            }
          }, (error) => {
            console.log(error);
          })
        }
      }, (error) => {
        console.log(error);
      })
    })
  }
}
