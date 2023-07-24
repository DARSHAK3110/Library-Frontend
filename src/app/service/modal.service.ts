import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, catchError, from, of, take } from 'rxjs';
import { DeleteUserModalComponent } from '../modals/delete-user-modal/delete-user-modal.component';
import { AddEditUserModalComponent } from '../modals/add-edit-user-modal/add-edit-user-modal.component';
import { AddEditFloorModalComponent } from '../modals/add-edit-floor-modal/add-edit-floor-modal.component';
import { AddEditSectionModalComponent } from '../modals/add-edit-section-modal/add-edit-section-modal.component';
import { AddEditShelfComponent } from '../modals/add-edit-shelf/add-edit-shelf.component';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor(private  ngbModal: NgbModal) { }

  onDelete(prompt = "Really?", title="Confirm"): Observable<boolean>{
    const modal = this.ngbModal.open(DeleteUserModalComponent)
    modal.componentInstance.title = title;
    modal.componentInstance.prompt = prompt;
    return from(modal.result).pipe(catchError(error=>{
      console.warn(error);
      return of(error);
    }))
  }

  onAddEdit(phoneNumber:number): Observable<boolean>{
    const modal = this.ngbModal.open(AddEditUserModalComponent)
    modal.componentInstance.userId = phoneNumber;
    
    return from(modal.result).pipe(catchError(error =>{
      return of(error);
    }))

  }

  onAddEditFloor(floorId: number): Observable<boolean>{
    
    const modal = this.ngbModal.open(AddEditFloorModalComponent);
    modal.componentInstance.floorId = floorId;
    return from(modal.result).pipe(catchError(error=>{
      return of(error);
    }))
  }

  onAddEditSection(sectionId: number): Observable<boolean>{
    
    const modal = this.ngbModal.open(AddEditSectionModalComponent);
    modal.componentInstance.sectionId = sectionId;
    return from(modal.result).pipe(catchError(error=>{
      return of(error);
    }))
  }

  onAddEditShelf(shelfId: number): Observable<boolean>{
    
    const modal = this.ngbModal.open(AddEditShelfComponent);
    modal.componentInstance.shelfId = shelfId;
    return from(modal.result).pipe(catchError(error=>{
      return of(error);
    }))
  }
}
