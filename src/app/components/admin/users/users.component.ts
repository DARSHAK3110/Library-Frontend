import { Component, Input, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { take } from 'rxjs';
import { DataService } from 'src/app/service/data.service';
import { LoginService } from 'src/app/service/login.service';
import { ModalService } from 'src/app/service/modal.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent {

  displayedColumns: string[] = ['firstName', 'lastName', 'phoneNumber','role', 'actions'];
  users: any;
  dataSource:any;
 
  
  searchFirst: string = "";
  searchLast: string = "";
  searchPhone: string = "";
  deleteUserResult: boolean = true;
  
  userId!: number;
  operationStatus!: boolean;
  isLoading = false;
  totalRows = 0;
  pageSize = 2;
  currentPage = 0;
  pageSizeOptions: number[] = [2, 5, 10];

  @Input() Toast:any;
  constructor(private userService: UserService, private loginService: LoginService, private modalService: ModalService,private dataService: DataService) {
    this.getUsers()
  }
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  pageChanged(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    this.getUsers();
  }

  getUsers() {
    this.userService.getUsers(this.currentPage, this.pageSize, this.searchFirst, this.searchLast, this.searchPhone).subscribe(
      (userDto: any) => {
        this.users = userDto.content;
        this.dataSource = new MatTableDataSource(userDto.content);
        this.totalRows = userDto.totalElements;
      }, (error) => {
        console.log(error);
        if(error === 'Forbidden'){
          this.loginService.logoutUser();
        }
        this.Toast.fire({
          icon: 'error',
          title: 'Something went wrong!!'
        });
      }
    )
  }


  deleteUser(phoneNumber: number) {
    this.modalService.onDelete("Are you sure delete this user?", "DeleteUser").pipe(take(1)).subscribe(result => {
      if (result === true) {
        this.userService.deleteUser(phoneNumber).subscribe((result => {
          this.Toast.fire({
            icon: 'success',
            title: 'Successfully deleted'
          });
          this.getUsers();
        }))

      }

    }, (error) => {
      this.Toast.fire({
        icon: 'error',
        title: 'something went wrong'
      })
    })

  }


  addEditUser(phoneNumber: number) {
    this.modalService.onAddEdit(phoneNumber).pipe(take(1)).subscribe(result => {
      if (result === true) {
        this.getUsers();
        if (phoneNumber == 0) {
          this.Toast.fire({
            icon: 'success',
            title: 'Successfully Added!'
          })
        }
        else {
          this.Toast.fire({
            icon: 'success',
            title: 'Successfully updated!'
          })
        }
      }
    }, (error) => {
    
      this.Toast.fire({
        icon: 'error',
        title: 'something went wrong'
      })
    })
  }
}
