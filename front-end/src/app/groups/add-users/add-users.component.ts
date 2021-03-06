import { Component, OnInit, OnDestroy, ViewChild, Inject  } from '@angular/core';
import { MatDialog, MatDialogRef, MatPaginator, MatTableDataSource, MAT_DIALOG_DATA  } from '@angular/material';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../../shared/models/user.model';
import { Subscription } from 'rxjs';
import { UiService } from '../../common/ui.service';
import { ApiService } from '../../core/services/api.service';
import { SelectionModel } from '@angular/cdk/collections';
import { switchMap, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-users',
  templateUrl: './add-users.component.html',
  styleUrls: ['./add-users.component.scss']
})
export class AddUsersComponent implements OnInit {

  users: any;
  group: any;
  private sub: Subscription = new Subscription();
  private sub1: Subscription = new Subscription();
  selection = new SelectionModel<User>(true, []);
  displayedColumns: string[] = ['select', 'position', 'name', 'username', 'role',  'actions' ];
  
  searchField: FormControl;
  searchForm: FormGroup;
  
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(public dialog: MatDialog,
              private api: ApiService,
              private fb: FormBuilder,
              private uiService: UiService,
              private router: Router,
              public dialogRef: MatDialogRef<AddUsersComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) { 
                
    this.searchField = new FormControl();
    this.searchForm = this.fb.group({searchField: this.searchField});  
    this.group = this.data.group;
  }
  
  ngOnInit() {
  
   this.getUsers();
   this.getSearchedUsers();
  }
  
  ngOnDestroy() {
    this.sub.unsubscribe();
    this.sub1.unsubscribe();
  }
 
  
  getUsers() {
    this.sub = this.api.get('admin/users')
      .subscribe(
        resp => { 
          this.users = new MatTableDataSource<User>(resp as User[]);
          this.users.paginator = this.paginator;
        },
        errMsg => console.log(errMsg) 
      );
  }
  
  getSearchedUsers(){
    this.sub1 = this.searchField.valueChanges.pipe(
        debounceTime(200),
        distinctUntilChanged(),
        switchMap(search => this.api.get('admin/users', {"search": search})),  
      ).subscribe(
          resp => {
            this.users = new MatTableDataSource<User>(resp as User[]);
            this.users.paginator = this.paginator;
          },  
          errMsg => console.log(errMsg) 
      )
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
  
  addSelectedUsers(){
    const selectedIds = this.selection.selected.map(user => user.id);
    
    if (selectedIds.length < 1) {
      this.uiService.showToast("You have not made any selection", 'Close');
    } else {
      this.api.post(`admin/groups/${this.group.id}/users`, {user_ids: selectedIds})
        .subscribe(
          resp => {  
            this.dialogRef.close("saved");
            this.router.navigate([`/admin/uam/groups/${this.group.id}/users`]);
          },
          errMsg => {
            console.log(errMsg)
          }
        );
    }
  }
  
  addUser(id: string) {
    this.api.post(`admin/groups/${this.group.id}/users`, {user_id: id})
      .subscribe(
        resp => {  
          this.dialogRef.close("saved");
          this.router.navigate([`/admin/uam/groups/${this.group.id}/users`]);
        },
        errMsg => {
          console.log(errMsg)
        }
      );

  }

}
