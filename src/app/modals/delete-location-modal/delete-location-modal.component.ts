import { ChangeDetectorRef, Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { LocationService } from 'src/app/service/location.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-delete-location-modal',
  templateUrl: './delete-location-modal.component.html',
  styleUrls: ['./delete-location-modal.component.css']
})
export class DeleteLocationModalComponent {
  id:any;
  isError!:boolean;
  isAdd!:boolean;
  error_msg!:string;
  form:any;
  entity:any;
  Toast:any = Swal.mixin({
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
  set locationId(value: number) { 
    this.id = value; 
    this.changeDetectorRef.detectChanges();
  }
 
  set deleteEntity(value: any) { 
    this.entity = value; 
    this.changeDetectorRef.detectChanges();
  }
  constructor(public activeModal: NgbActiveModal,private changeDetectorRef: ChangeDetectorRef, private locationService: LocationService) {
   
  }
  deleteLocation(){
    if(this.entity === 'location'){
      this.locationService.deleteLocation(this.id).subscribe((res)=>{
        this.activeModal.close(true);
        this.Toast.fire({
          icon: 'success',
          title: 'Successfully deleted location'
        })
      },
      (error)=>{
        this.isError = true
        this.error_msg = error;
        this.changeDetectorRef.detectChanges();
      });
    }

    else if(this.entity === 'shelf'){
      this.locationService.deleteShelf(this.id).subscribe((res)=>{
        this.activeModal.close(true);
        this.Toast.fire({
          icon: 'success',
          title: 'Successfully deleted shelf'
        })
      },
      (error)=>{
        this.isError = true
        this.error_msg = error;
        this.changeDetectorRef.detectChanges();
      });
    }

    else if(this.entity === 'section'){
      this.locationService.deleteSection(this.id).subscribe((res)=>{
        this.activeModal.close(true);
        this.Toast.fire({
          icon: 'success',
          title: 'Successfully deleted section'
        })
      },
      (error)=>{
        this.isError = true
        this.error_msg = error;
        this.changeDetectorRef.detectChanges();
      });
    }
    
    else if(this.entity === 'floor'){
      this.locationService.deleteFloor(this.id).subscribe((res)=>{
        this.activeModal.close(true);
        this.Toast.fire({
          icon: 'success',
          title: 'Successfully deleted floor'
        })
      },
      (error)=>{
        this.isError = true
        this.error_msg = error;
        this.changeDetectorRef.detectChanges();
      });
    }
  } 
}
