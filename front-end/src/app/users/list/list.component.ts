import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MatPaginator, MatTableDataSource  } from '@angular/material';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CreateComponent as CreateComponentDialog } from '../create/create.component';
import { User } from '../../shared/models/user.model';
import { Subscription } from 'rxjs';
import { UiService } from '../../common/ui.service';
import { ApiService } from '../../core/services/api.service';
import { SelectionModel } from '@angular/cdk/collections';
import { switchMap, debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit, OnDestroy {

  users: any;
  user = {};
  private sub: Subscription = new Subscription();
  private sub1: Subscription = new Subscription();
  selection = new SelectionModel<User>(true, []);
  displayedColumns: string[] = ['select', 'position', 'name', 'username', 'role', 'actions' ];
  
  searchField: FormControl;
  searchForm: FormGroup;
  
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(public dialog: MatDialog,
              private api: ApiService,
              private fb: FormBuilder,
              private uiService: UiService) { 
                
    this.searchField = new FormControl();
    this.searchForm = this.fb.group({searchField: this.searchField});  
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


  deleteSelection(){
    const selectedIds = this.selection.selected.map(user => user.id);
    
    if (selectedIds.length < 1) {
      this.uiService.showToast("You have not made any selection", 'Close');
    } else {
      if(confirm('Are you sure you want to delete them?')){
        this.api.post('admin/users/delete_all', selectedIds)
          .subscribe(
            resp => {  
              this.uiService.showToast("Users Deleted Successfully", 'Close');
              this.getUsers();
            },
            errMsg => {
              console.log(errMsg)
            }
          );
      }
    }
  }
  
  delete(id: string) {
    if(confirm('Are you sure you want to delete it?')){
      this.api.delete(`admin/users/${id}`)
        .subscribe(
          resp => {  
            this.uiService.showToast("User Deleted Successfully", 'Close');
            this.getUsers();
          },
          errMsg => {
            console.log(errMsg)
          }
        );
    }
  }

}
