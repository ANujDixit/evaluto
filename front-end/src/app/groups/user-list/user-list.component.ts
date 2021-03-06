import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MatPaginator, MatTableDataSource  } from '@angular/material';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../core/services/api.service';
import { Subscription } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import { User } from '../../shared/models/user.model';
import { SelectionModel } from '@angular/cdk/collections';
import { UiService } from '../../common/ui.service';
import { AddUsersComponent as AddUsersComponentDialog } from '../add-users/add-users.component';
@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit, OnDestroy {
  
  users: any;
  group: any;
  private sub: Subscription = new Subscription();

  searchField: FormControl;
  searchForm: FormGroup;
  selection = new SelectionModel<User>(true, []);
  displayedColumns: string[] = ['select', 'position', 'name', 'username', 'actions' ];
  
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private api: ApiService,
              private route: ActivatedRoute,
              private fb: FormBuilder,
              private uiService: UiService,
              public dialog: MatDialog) { 
    this.searchField = new FormControl();
    this.searchForm = this.fb.group({searchField: this.searchField});     
  }

  ngOnInit() {
   this.getGroup();  
  }
  
  getGroup() {
    this.sub = this.route.params.pipe(
      map(params => params['groupId']),
      switchMap(id => this.api.get(`admin/groups/${id}`))
    ).subscribe(
        resp => {
          this.group = resp       
          this.users = new MatTableDataSource<User>(resp.users as User[]);          
          this.users.paginator = this.paginator;
        },  
        errMsg => console.log(errMsg) 
    )
  }
  
  ngOnDestroy() {
    this.sub.unsubscribe();
 
  }

  removeSelectedUsers(){
    const selectedIds = this.selection.selected.map(user => user.id);
    
    if (selectedIds.length < 1) {
      this.uiService.showToast("You have not made any selection", 'Close');
    } else {
      if(confirm('Are you sure you want to remove selected users from this group?')){
        const groupId = this.route.snapshot.params['groupId']
        this.api.post(`admin/groups/${groupId}/users/delete_all`, {user_ids: selectedIds})
          .subscribe(
            resp => {  
              this.uiService.showToast("Users Removed Successfully", 'Close');
              this.getGroup();
            },
            errMsg => {
              console.log(errMsg)
            }
          );
      }
    }
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.users.data.length;
    return numSelected === numRows;
  }
  
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.users.data.forEach(row => this.selection.select(row));
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddUsersComponentDialog, {
      width: '1500px',
      data: { group: this.group }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === "saved") {
        this.uiService.showToast("User added to Group Successfully", 'Close');
        this.getGroup();
      }
    });
  }
  
  removeUser(id: string) {
    if(confirm('Are you sure you want to remove user from the group?')){
      this.api.delete(`admin/groups/${this.group.id}/users/${id}`)
        .subscribe(
          resp => {  
            this.uiService.showToast("User Remove Successfully", 'Close');
            this.getGroup();
          },
          errMsg => {
            console.log(errMsg)
          }
        );
    }
  }

}
