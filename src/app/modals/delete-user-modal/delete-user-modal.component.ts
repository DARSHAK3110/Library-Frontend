import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-delete-user-modal',
  templateUrl: './delete-user-modal.component.html',
  styleUrls: ['./delete-user-modal.component.css'
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DeleteUserModalComponent {
  title!: string;
  prompt!: string;

  constructor(public activeModal: NgbActiveModal) {
  }
}
