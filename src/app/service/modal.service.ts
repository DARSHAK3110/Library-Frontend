import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, catchError, from, of, take } from 'rxjs';
import { DeleteUserModalComponent } from '../modals/delete-user-modal/delete-user-modal.component';
import { AddEditUserModalComponent } from '../modals/add-edit-user-modal/add-edit-user-modal.component';
import { AddEditFloorModalComponent } from '../modals/add-edit-floor-modal/add-edit-floor-modal.component';
import { AddEditSectionModalComponent } from '../modals/add-edit-section-modal/add-edit-section-modal.component';
import { AddEditShelfComponent } from '../modals/add-edit-shelf/add-edit-shelf.component';
import { AddEditLocationModalComponent } from '../modals/add-edit-location-modal/add-edit-location-modal.component';
import { AddEditAuthorModalComponent } from '../modals/add-edit-author-modal/add-edit-author-modal.component';
import { AddEditBookComponent } from '../modals/add-edit-book/add-edit-book.component';
import { AddEditBookStatusModalComponent } from '../modals/add-edit-book-status-modal/add-edit-book-status-modal.component';
import { Book } from '../model/book';
import { AddReservationModalComponent } from '../modals/add-reservation-modal/add-reservation-modal.component';
import { ChechInModalComponent } from '../modals/chech-in-modal/chech-in-modal.component';
import { ChechOutModalComponent } from '../modals/chech-out-modal/chech-out-modal.component';
import { DeleteAuthorComponent } from '../modals/delete-author/delete-author.component';
import { DeleteLocationModalComponent } from '../modals/delete-location-modal/delete-location-modal.component';
import { ChangeBookStatusModalComponent } from '../modals/change-book-status-modal/change-book-status-modal.component';
import { DeleteBookStatusModalComponent } from '../modals/delete-book-status-modal/delete-book-status-modal.component';
import { AddBookToFavouriteModalComponent } from '../modals/add-book-to-favourite-modal/add-book-to-favourite-modal.component';
import { AddBookReservationByUserModalComponent } from '../modals/add-book-reservation-by-user-modal/add-book-reservation-by-user-modal.component';
import { RemoveBookFromFavouriteModalComponent } from '../modals/remove-book-from-favourite-modal/remove-book-from-favourite-modal.component';
import { AcceptReservationModalComponent } from '../modals/accept-reservation-modal/accept-reservation-modal.component';
import { RejectReservationModalComponent } from '../modals/reject-reservation-modal/reject-reservation-modal.component';
import { AutoDeleteLocationModalComponent } from '../modals/auto-delete-location-modal/auto-delete-location-modal.component';
import { AutoDeleteShelfModalComponent } from '../modals/auto-delete-shelf-modal/auto-delete-shelf-modal.component';
import { AutoDeleteSectionModalComponent } from '../modals/auto-delete-section-modal/auto-delete-section-modal.component';
import { AutoDeleteFloorModalComponent } from '../modals/auto-delete-floor-modal/auto-delete-floor-modal.component';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  constructor(private ngbModal: NgbModal) { }

  onDelete(prompt = "Really?", title = "Confirm"): Observable<boolean> {
    const modal = this.ngbModal.open(DeleteUserModalComponent)
    modal.componentInstance.title = title;
    modal.componentInstance.prompt = prompt;
    return from(modal.result).pipe(catchError(error => {
      console.warn(error);
      return of(error);
    }))
  }

  onAddEdit(phoneNumber: number): Observable<boolean> {
    const modal = this.ngbModal.open(AddEditUserModalComponent)
    modal.componentInstance.userId = phoneNumber;

    return from(modal.result).pipe(catchError(error => {
      return of(error);
    }))

  }

  onAddEditFloor(floorId: number): Observable<boolean> {

    const modal = this.ngbModal.open(AddEditFloorModalComponent);
    modal.componentInstance.floorId = floorId;
    return from(modal.result).pipe(catchError(error => {
      return of(error);
    }))
  }

  onAddEditSection(sectionId: number): Observable<boolean> {

    const modal = this.ngbModal.open(AddEditSectionModalComponent);
    modal.componentInstance.sectionId = sectionId;
    return from(modal.result).pipe(catchError(error => {
      return of(error);
    }))
  }

  onAddEditShelf(shelfId: number): Observable<boolean> {

    const modal = this.ngbModal.open(AddEditShelfComponent);
    modal.componentInstance.shelfId = shelfId;
    return from(modal.result).pipe(catchError(error => {
      return of(error);
    }))
  }

  onAddEditLocation(locationId: number): Observable<boolean> {

    const modal = this.ngbModal.open(AddEditLocationModalComponent);
    modal.componentInstance.locationId = locationId;
    return from(modal.result).pipe(catchError(error => {
      return of(error);
    }))
  }

  onAddEditAuthor(authorId: number): Observable<boolean> {

    const modal = this.ngbModal.open(AddEditAuthorModalComponent);
    modal.componentInstance.authorId = authorId;
    return from(modal.result).pipe(catchError(error => {
      return of(error);
    }))
  }
  onDeleteAuthor(authorId: number) {
    const modal = this.ngbModal.open(DeleteAuthorComponent);
    modal.componentInstance.authorId = authorId;
    return from(modal.result).pipe(catchError(error => {
      return of(error);
    }))
  }

  deleteLocationModal(locationId: number, entity:any) {
    const modal = this.ngbModal.open(DeleteLocationModalComponent);
    modal.componentInstance.locationId = locationId;
    modal.componentInstance.deleteEntity = entity;
    return from(modal.result).pipe(catchError(error => {
      return of(error);
    }))
  }
  onAddEditBook(bookId: number): Observable<boolean> {

    const modal = this.ngbModal.open(AddEditBookComponent);
    modal.componentInstance.bookId = bookId;
    return from(modal.result).pipe(catchError(error => {
      return of(error);
    }))
  }
  onAddEditBookStatus(bookStatusId: number, book:Book) {
    const modal = this.ngbModal.open(AddEditBookStatusModalComponent);
    modal.componentInstance.bookStatusId = bookStatusId;
    modal.componentInstance.book = book;
    return from(modal.result).pipe(catchError(error => {
      return of(error);
    }))
  };

  onAddReservation(bookDetailsId: number) {
    const modal = this.ngbModal.open(AddReservationModalComponent);
    modal.componentInstance.bookDetailsId = bookDetailsId;
    return from(modal.result).pipe(catchError(error => {
      return of(error);
    }))
  }

  chechIn(bookStatusId: number,isReserved:boolean) {
    const modal = this.ngbModal.open(ChechInModalComponent);
    modal.componentInstance.bookStatusId = {bookStatusId};
    modal.componentInstance.reserved = isReserved;
    return from(modal.result).pipe(catchError(error => {
      return of(error);
    }))
  }

  chechOut(bookStatusId: number) {
    const modal = this.ngbModal.open(ChechOutModalComponent);
    modal.componentInstance.bookStatusId = bookStatusId;
    return from(modal.result).pipe(catchError(error => {
      return of(error);
    }))
  }

  onChangeBookStatus(bookStatusId: number) {
    const modal = this.ngbModal.open(ChangeBookStatusModalComponent);
    modal.componentInstance.bookStatusId = bookStatusId;
    return from(modal.result).pipe(catchError(error => {
      return of(error);
    }))
  }

  deleteBookStatus(bookStatusId: any) {
    const modal = this.ngbModal.open(DeleteBookStatusModalComponent);
    modal.componentInstance.bookStatusId = bookStatusId;
    return from(modal.result).pipe(catchError(error => {
      return of(error);
    }))
  }
  onDeleteBook(bookId: number) {
    const modal = this.ngbModal.open(DeleteBookStatusModalComponent);
    modal.componentInstance.bookDetailsId = bookId;
    return from(modal.result).pipe(catchError(error => {
      return of(error);
    }))
  }

  onAddBookToFavourite(bookId: number) {
    const modal = this.ngbModal.open(AddBookToFavouriteModalComponent);
    modal.componentInstance.bookDetailsId = bookId;
    return from(modal.result).pipe(catchError(error => {
      return of(error);
  }))
}
  onAddReservationByUser(bookId: number) {
    const modal = this.ngbModal.open(AddBookReservationByUserModalComponent);
    modal.componentInstance.bookDetailsId = bookId;
    return from(modal.result).pipe(catchError(error => {
      return of(error);
  }))}

  onRemoveBookFromFavourite(bookId: number) {
    const modal = this.ngbModal.open(RemoveBookFromFavouriteModalComponent);
    modal.componentInstance.bookDetailsId = bookId;
    return from(modal.result).pipe(catchError(error => {
      return of(error);
  }))
  }

  onAcceptReservation(reservationId: number, isbn:number) {
    const modal = this.ngbModal.open(AcceptReservationModalComponent, { size: 'lg', backdrop: 'static' });
    modal.componentInstance.reservationId = reservationId;
    modal.componentInstance.isbnNo = isbn;
    return from(modal.result).pipe(catchError(error => {
      return of(error);
    }))
  }

  onRejectReservation(reservationId: number) {
    const modal = this.ngbModal.open(RejectReservationModalComponent);
    modal.componentInstance.reservationId = reservationId;
    return from(modal.result).pipe(catchError(error => {
      return of(error);
    }))
  }
  autoDeleteLocationModal(locationId: number) {
    const modal = this.ngbModal.open(AutoDeleteLocationModalComponent);
    modal.componentInstance.locationId = locationId;
    return from(modal.result).pipe(catchError(error => {
      return of(error);
    }))
  }
  autoDeleteShelfModal(shelfId: number) {
    const modal = this.ngbModal.open(AutoDeleteShelfModalComponent);
    modal.componentInstance.shelfId = shelfId;
    return from(modal.result).pipe(catchError(error => {
      return of(error);
    }))
  }

  autoDeleteSectionModal(sectionId: number) {
    const modal = this.ngbModal.open(AutoDeleteSectionModalComponent);
    modal.componentInstance.sectionId = sectionId;
    return from(modal.result).pipe(catchError(error => {
      return of(error);
    }))
  }
  autoDeleteFloorModal(floorId: number) {
    const modal = this.ngbModal.open(AutoDeleteFloorModalComponent);
    modal.componentInstance.floorId = floorId;
    return from(modal.result).pipe(catchError(error => {
      return of(error);
    }))
  }
}
